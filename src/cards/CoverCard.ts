import {AbstractCard} from "./AbstractCard";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Cover Card Class
 *
 * Used to create a card for controlling an entity of the cover domain.
 *
 * @class
 * @extends AbstractCard
 */
class CoverCard extends AbstractCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.coverCardOptions}
   * @private
   */
  #defaultSettings: cards.coverCardOptions = {
    type: "custom:mushroom-cover-card",
    icon: undefined,
    show_buttons_control: true,
    show_position_control: true,
    show_tilt_position_control: true,
  };

  /**
   * Class constructor.
   *
   * @param {generic.hassEntity} entity The hass entity to create a card for.
   * @param {cards.coverCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: generic.hassEntity, options: cards.coverCardOptions = {}) {
    super(entity);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {CoverCard};
