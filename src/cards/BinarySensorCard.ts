import {SensorCard} from "./SensorCard";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Sensor Card Class
 *
 * Used to create a card for controlling an entity of the binary_sensor domain.
 *
 * @class
 * @extends SensorCard
 */
class BinarySensorCard extends SensorCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.sensorCardOptions}
   * @private
   */
  #defaultSettings: cards.sensorCardOptions = {
    type: "custom:mushroom-entity-card",
    icon: "mdi:power-cycle",
    icon_color: "green",
  };

  /**
   * Class constructor.
   *
   * @param {generic.hassEntity} entity The hass entity to create a card for.
   * @param {cards.sensorCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: generic.hassEntity, options: cards.sensorCardOptions = {}) {
    super(entity);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {BinarySensorCard};
