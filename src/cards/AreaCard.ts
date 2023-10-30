import {AbstractCard} from "./AbstractCard";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Area Card Class
 *
 * Used to create a card for an entity of the area domain.
 *
 * @class
 * @extends AbstractCard
 */
class AreaCard extends AbstractCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.areaCardOptions}
   * @private
   */
  #defaultSettings: cards.areaCardOptions = {
    type: "custom:mushroom-template-card",
    primary: undefined,
    icon: "mdi:texture-box",
    icon_color: "blue",
    tap_action: {
      action: "navigate",
      navigation_path: "",
    },
    hold_action: {
      action: "none",
    },
  };

  /**
   * Class constructor.
   *
   * @param {generic.areaEntity} area The area entity to create a card for.
   * @param {cards.areaCardOptions} [options={}] Options for the card.
   *
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(area: generic.areaEntity, options: cards.areaCardOptions = {}) {
    super(area);

    // Don't override the default card type if default is set in the strategy options.
    if (options.type === "default") {
      delete options.type;
    }

    // Initialize default settings.
    this.#defaultSettings.primary = area.name;
    if (this.#defaultSettings.tap_action && ("navigation_path" in this.#defaultSettings.tap_action)) {
      this.#defaultSettings.tap_action.navigation_path = area.area_id ?? area.name;
    }

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {AreaCard};
