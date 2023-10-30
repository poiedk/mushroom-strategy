import {AbstractCard} from "./AbstractCard";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Climate Card Class
 *
 * Used to create a card for controlling an entity of the climate domain.
 *
 * @class
 * @extends AbstractCard
 */
class ClimateCard extends AbstractCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.climateCardOptions}
   * @private
   */
  #defaultSettings: cards.climateCardOptions = {
    type: "custom:mushroom-climate-card",
    icon: undefined,
    hvac_modes: [
      "off",
      "cool",
      "heat",
      "fan_only",
    ],
    show_temperature_control: true,
  };

  /**
   * Class constructor.
   *
   * @param {generic.hassEntity} entity The hass entity to create a card for.
   * @param {cards.climateCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: generic.hassEntity, options: cards.climateCardOptions = {}) {
    super(entity);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {ClimateCard};
