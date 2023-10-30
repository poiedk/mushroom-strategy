import {AbstractCard} from "./AbstractCard";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Fan Card Class
 *
 * Used to create a card for controlling an entity of the fan domain.
 *
 * @class
 * @extends AbstractCard
 */
class FanCard extends AbstractCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.fanCardOptions}
   * @private
   */
  #defaultSettings: cards.fanCardOptions = {
    type: "custom:mushroom-fan-card",
    icon: undefined,
    show_percentage_control: true,
    show_oscillate_control: true,
    icon_animation: true,
  };

  /**
   * Class constructor.
   *
   * @param {generic.hassEntity} entity The hass entity to create a card for.
   * @param {cards.fanCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: generic.hassEntity, options: cards.fanCardOptions = {}) {
    super(entity);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {FanCard};
