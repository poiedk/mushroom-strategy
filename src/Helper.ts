import {optionDefaults} from "./optionDefaults";
import {generic} from "./types/generic";
import {HassEntities, HassEntity} from "home-assistant-js-websocket";
import deepmerge from "deepmerge";
import strategyOptions = generic.strategyOptions;

/**
 * Helper Class
 *
 * Contains the objects of Home Assistant's registries and helper methods.
 */
class Helper {
  /**
   * An array of entities from Home Assistant's entity registry.
   *
   * @type {generic.hassEntity[]}
   * @private
   */
  static #entities: generic.hassEntity[];

  /**
   * An array of entities from Home Assistant's device registry.
   *
   * @type {generic.deviceEntity[]}
   * @private
   */
  static #devices: generic.deviceEntity[];

  /**
   * An array of entities from Home Assistant's area registry.
   *
   * @type {generic.areaEntity[]}
   * @private
   */
  static #areas: generic.areaEntity[] = [];

  /**
   * An array of state entities from Home Assistant's Hass object.
   *
   * @type {HassEntities}
   * @private
   */
  static #hassStates: HassEntities;

  /**
   * Indicates whether this module is initialized.
   *
   * @type {boolean} True if initialized.
   * @private
   */
  static #initialized: boolean = false;

  /**
   * The Custom strategy configuration.
   *
   * @type {generic.strategyOptions}
   * @private
   */
  static #strategyOptions: generic.strategyOptions;

  /**
   * Set to true for more verbose information in the console.
   *
   * @type {boolean}
   * @private
   */
  static #debug: boolean;

  /**
   * Class constructor.
   *
   * This class shouldn't be instantiated directly.
   * Instead, it should be initialized with method initialize().
   *
   * @throws {Error} If trying to instantiate this class.
   */
  constructor() {
    throw new Error("This class should be invoked with method initialize() instead of using the keyword new!");
  }

  /**
   * Custom strategy configuration.
   *
   * @returns {generic.strategyOptions}
   * @static
   */
  static get strategyOptions(): generic.strategyOptions {
    return this.#strategyOptions;
  }

  /**
   * Get the entities from Home Assistant's area registry.
   *
   * @returns {generic.areaEntity[]}
   * @static
   */
  static get areas(): generic.areaEntity[] {
    return this.#areas;
  }

  /**
   * Get the devices from Home Assistant's device registry.
   *
   * @returns {generic.deviceEntity[]}
   * @static
   */
  static get devices(): generic.deviceEntity[] {
    return this.#devices;
  }

  /**
   * Get the entities from Home Assistant's entity registry.
   *
   * @returns {generic.hassEntity[]}
   * @static
   */
  static get entities(): generic.hassEntity[] {
    return this.#entities;
  }

  /**
   * Get the current debug mode of the mushroom strategy.
   *
   * @returns {boolean}
   * @static
   */
  static get debug(): boolean {
    return this.#debug;
  }

  /**
   * Initialize this module.
   *
   * @param {generic.dashBoardInfo} info Strategy information object.
   * @returns {Promise<void>}
   * @static
   */
  static async initialize(info: generic.dashBoardInfo): Promise<void> {
    // Initialize properties.
    this.#hassStates = info.hass.states;
    this.#strategyOptions = deepmerge(optionDefaults, info.config?.strategy?.options) as strategyOptions;
    this.#debug = this.#strategyOptions.debug ?? false;

    try {
      // Query the registries of Home Assistant.
      [Helper.#entities, Helper.#devices, Helper.#areas] = await Promise.all([
        info.hass.callWS({type: "config/entity_registry/list"}) as Promise<generic.hassEntity[]>,
        info.hass.callWS({type: "config/device_registry/list"}) as Promise<generic.deviceEntity[]>,
        info.hass.callWS({type: "config/area_registry/list"}) as Promise<generic.areaEntity[]>,
      ]);
    } catch (e) {
      console.error(Helper.debug ? e : "An error occurred while querying Home assistant's registries!");
      throw 'Check the console for details';
    }

    // Create and add the undisclosed area if not hidden in the strategy options.
    if (!this.#strategyOptions.areas.undisclosed?.hidden) {
      this.#strategyOptions.areas.undisclosed = {
        ...optionDefaults.areas.undisclosed,
        ...this.#strategyOptions.areas.undisclosed,
      };

      // Make sure the area_id of the custom undisclosed area remains null.
      this.#strategyOptions.areas.undisclosed.area_id = null;

      this.#areas.push(this.#strategyOptions.areas.undisclosed);
    }

    // Merge custom areas of the strategy options into hass areas.
    this.#areas = Helper.areas.map(area => {
      return {...area, ...this.#strategyOptions.areas?.[area.area_id ?? "undisclosed"]};
    });

    // Sort hass areas by order first and then by name.
    this.#areas.sort((a, b) => {
      return (a.order ?? Infinity) - (b.order ?? Infinity) || a.name.localeCompare(b.name);
    });

    // Sort views of the strategy options by order first and then by title.
    this.#strategyOptions.views = Object.fromEntries(
      Object.entries(this.#strategyOptions.views).sort(([, a], [, b]) => {
        return (a.order ?? Infinity) - (b.order ?? Infinity) || a.title?.localeCompare(b.title);
      }),
    );

    // Sort domains of the strategy options by order first and then by title.
    this.#strategyOptions.domains = Object.fromEntries(
      Object.entries(this.#strategyOptions.domains).sort(([, a], [, b]) => {
        return (a.order ?? Infinity) - (b.order ?? Infinity) || (a.title ?? "undefined").localeCompare(b.title ?? "undefined");
      }),
    );

    this.#initialized = true;
  }

  /**
   * Get the initialization status of the Helper class.
   *
   * @returns {boolean} True if this module is initialized.
   * @static
   */
  static isInitialized(): boolean {
    return this.#initialized;
  }

  /**
   * Get a template string to define the number of a given domain's entities with a certain state.
   *
   * States are compared against a given value by a given operator.
   *
   * @param {string} domain The domain of the entities.
   * @param {string} operator The Comparison operator between state and value.
   * @param {string} value The value to which the state is compared against.
   *
   * @return {string} The template string.
   * @static
   */
  static getCountTemplate(domain: string, operator: string, value: string): string {
    // noinspection JSMismatchedCollectionQueryUpdate (False positive per 17-04-2023)
    /**
     * Array of entity state-entries, filtered by domain.
     *
     * Each element contains a template-string which is used to access home assistant's state machine (state object) in
     * a template.
     * E.g. "states['light.kitchen']"
     *
     * The array excludes hidden and disabled entities.
     *
     * @type {string[]}
     */
    const states: string[] = [];

    if (!this.isInitialized()) {
      console.warn("Helper class should be initialized before calling this method!");
    }

    // Get the ID of the devices which are linked to the given area.
    for (const area of this.#areas) {
      const areaDeviceIds = this.#devices.filter((device: any) => {
        return device.area_id === area.area_id;
      }).map((device: generic.deviceEntity) => {
        return device.id;
      });

      // Get the entities of which all conditions of the callback function are met. @see areaFilterCallback.
      const newStates = this.#entities.filter(
        this.#areaFilterCallback, {
          area: area,
          domain: domain,
          areaDeviceIds: areaDeviceIds,
        })
        .map((entity: any) => `states['${entity.entity_id}']`);

      states.push(...newStates);
    }

    return `{% set entities = [${states}] %} {{ entities | selectattr('state','${operator}','${value}') | list | count }}`;
  }

  /**
   * Get device entities from the entity registry, filtered by area and domain.
   *
   * The entity registry is a registry where Home-Assistant keeps track of all entities.
   * A device is represented in Home Assistant via one or more entities.
   *
   * The result excludes hidden and disabled entities.
   *
   * @param {generic.areaEntity} area Area entity.
   * @param {string} domain The domain of the entity-id.
   *
   * @return {generic.hassEntity[]} Array of device entities.
   * @static
   */
  static getDeviceEntities(area: generic.areaEntity, domain: string): generic.hassEntity[] {
    if (!this.isInitialized()) {
      console.warn("Helper class should be initialized before calling this method!");
    }

    // Get the ID of the devices which are linked to the given area.
    const areaDeviceIds = this.#devices.filter((device: any) => {
      return device.area_id === area.area_id;
    }).map((device: any) => {

      return device.id;
    });

    // Return the entities of which all conditions of the callback function are met. @see areaFilterCallback.
    return this.#entities.filter(
      this.#areaFilterCallback, {
        area: area,
        domain: domain,
        areaDeviceIds: areaDeviceIds,
      })
      .sort((a: any, b: any) => {
        /** @type hassEntity */
        return a.original_name?.localeCompare(b.original_name);
      });
  }

  /**
   * Get state entities, filtered by area and domain.
   *
   * The result excludes hidden and disabled entities.
   *
   * @param {generic.areaEntity} area Area entity.
   * @param {string} domain Domain of the entity-id.
   *
   * @return {HassEntity[]} Array of state entities.
   */
  static getStateEntities(area: generic.areaEntity, domain: string): HassEntity[] {
    if (!this.isInitialized()) {
      console.warn("Helper class should be initialized before calling this method!");
    }

    const states: HassEntity[] = [];

    // Create a map for the hassEntities and devices {id: object} to improve lookup speed.
    const entityMap: {
      [s: string]: generic.hassEntity;
    } = Object.fromEntries(this.#entities.map((entity: any) => [entity.entity_id, entity]));
    const deviceMap: {
      [s: string]: generic.deviceEntity;
    } = Object.fromEntries(this.#devices.map((device: any) => [device.id, device]));

    // Get states whose entity-id starts with the given string.
    const stateEntities = Object.values(this.#hassStates).filter(
      (state: any) => state.entity_id.startsWith(`${domain}.`),
    );

    for (const state of stateEntities) {
      const hassEntity = entityMap[state.entity_id];
      const device = deviceMap[hassEntity?.device_id];

      // Collect states of which any (whichever comes first) of the conditions below are met:
      // 1. The linked entity is linked to the given area.
      // 2. The entity is linked to a device, and the linked device is linked to the given area.
      if (
        (hassEntity?.area_id === area.area_id)
        || (device && device.area_id === area.area_id)
      ) {
        states.push(state);
      }
    }

    return states;
  }

  /**
   * Sanitize a classname.
   *
   * The name is sanitized by capitalizing the first character of the name or after an underscore.
   * Underscores are removed.
   *
   * @param {string} className Name of the class to sanitize.
   * @returns {string} The sanitized classname.
   */
  static sanitizeClassName(className: string): string {
    className = className.charAt(0).toUpperCase() + className.slice(1);

    return className.replace(/([-_][a-z])/g, (group: any) => group
      .toUpperCase()
      .replace("-", "")
      .replace("_", ""),
    );
  }

  /**
   * Get the ids of the views which aren't set to hidden in the strategy options.
   *
   * @return {string[]} An array of view ids.
   */
  static getExposedViewIds(): string[] {
    if (!this.isInitialized()) {
      console.warn("Helper class should be initialized before calling this method!");
    }

    return this.#getObjectKeysByPropertyValue(this.#strategyOptions.views, "hidden", false);
  }

  /**
   * Get the ids of the domain ids which aren't set to hidden in the strategy options.
   *
   * @return {string[]} An array of domain ids.
   */
  static getExposedDomainIds(): string[] {
    if (!this.isInitialized()) {
      console.warn("Helper class should be initialized before calling this method!");
    }

    return this.#getObjectKeysByPropertyValue(this.#strategyOptions.domains, "hidden", false);
  }

  /**
   * Callback function for filtering entities.
   *
   * Entities of which all the conditions below are met are kept:
   * 1. Or/Neither the entity's linked device (if any) or/nor the entity itself is lined to the given area.
   *    (See variable areaMatch)
   * 2. The entity's domain matches the given domain.
   * 3. The entity is not hidden and is not disabled.
   *
   * @param {generic.hassEntity} entity The current hass entity to evaluate.
   * @this {areaFilterContext}
   *
   * @return {boolean} True to keep the entity.
   * @static
   */
  static #areaFilterCallback(
    this: {
      area: generic.areaEntity,
      areaDeviceIds: string[],
      domain: string,
    },
    entity: generic.hassEntity): boolean {
    const areaMatch = this.area.area_id
      // Area is a hass entity;
      // The entity's linked device or the entity itself is linked to the given area.
      ? this.areaDeviceIds.includes(entity.device_id) || entity.area_id === this.area.area_id
      // Undisclosed area;
      // Neither the entity's linked device (if any), nor the entity itself is linked to any area.
      : (this.areaDeviceIds.includes(entity.device_id) || !entity.device_id) && !entity.area_id;

    return (
      areaMatch
      && entity.entity_id.startsWith(`${this.domain}.`)
      && entity.hidden_by == null && entity.disabled_by == null
    );
  }

  /**
   * Get the keys of nested objects by its property value.
   *
   * @param {Object<string, any>} object An object of objects.
   * @param {string|number} property The name of the property to evaluate.
   * @param {*} value The value which the property should match.
   *
   * @return {string[]} An array with keys.
   */
  static #getObjectKeysByPropertyValue(
    object: { [p: string | number]: any },
    property: string | number, value: any
  ): string[] {
    const keys = [];

    for (const key of Object.keys(object)) {
      if (object[key][property] === value) {
        keys.push(key);
      }
    }

    return keys;
  }
}

export {Helper};
