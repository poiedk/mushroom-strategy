import {AbstractCard} from "./AbstractCard";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

/**
 * Miscellaneous Card Class
 *
 * Used to create a card an entity of any domain.
 *
 * @class
 * @extends AbstractCard
 */
class MiscellaneousCard extends AbstractCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.miscellaneousCardOptions}
   * @private
   */
  #defaultSettings: cards.miscellaneousCardOptions = {
    type: "custom:mushroom-entity-card",
    icon_color: "blue-grey",
  };

  /**
   * Class constructor.
   *
   * @param {generic.hassEntity} entity The hass entity to create a card for.
   * @param {cards.miscellaneousCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: generic.hassEntity, options: cards.miscellaneousCardOptions = {}) {
    super(entity);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {MiscellaneousCard};
