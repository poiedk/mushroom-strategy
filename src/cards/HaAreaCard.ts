import {AbstractCard} from "./AbstractCard";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * HA Area Card Class
 *
 * Used to create a card for an entity of the area domain using the built-in type 'area'.
 *
 * @class
 * @extends AbstractCard
 */
class AreaCard extends AbstractCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.HaAreaCardOptions}
   * @private
   */
  #defaultSettings: cards.HaAreaCardOptions = {
    type: "area",
    area: "",
    navigation_path: undefined,
  };

  /**
   * Class constructor.
   *
   * @param {generic.areaEntity} area The area entity to create a card for.
   * @param {cards.HaAreaCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */

  constructor(area: generic.areaEntity, options: cards.HaAreaCardOptions = {}) {
    super(area);

    // Initialize the default settings.
    this.#defaultSettings.area = area.area_id ?? area.name;
    this.#defaultSettings.navigation_path = area.area_id ?? area.name;

    // Enforce the card type.
    delete options.type;

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {AreaCard};
