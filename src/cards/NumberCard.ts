import {AbstractCard} from "./AbstractCard";
import {generic} from "../types/generic";
import {cards} from "../types/cards";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported
/**
 * Number Card Class
 *
 * Used to create a card for controlling an entity of the number domain.
 *
 * @class
 * @extends AbstractCard
 */
class NumberCard extends AbstractCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.numberCardOptions}
   * @private
   */
  #defaultSettings: cards.numberCardOptions = {
    type: "custom:mushroom-number-card",
    icon: undefined,
  };

  /**
   * Class constructor.
   *
   * @param {generic.hassEntity} entity The hass entity to create a card for.
   * @param {cards.numberCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: generic.hassEntity, options: cards.numberCardOptions = {}) {
    super(entity);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {NumberCard};
