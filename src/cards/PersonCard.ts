import {AbstractCard} from "./AbstractCard";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

/**
 * Person Card Class
 *
 * Used to create a card for an entity of the person domain.
 *
 * @class
 * @extends AbstractCard
 */
class PersonCard extends AbstractCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.personCardOptions}
   * @private
   */
  #defaultSettings: cards.personCardOptions = {
    type: "custom:mushroom-person-card",
    layout: "vertical",
    primary_info: "none",
    secondary_info: "none",
    icon_type: "entity-picture",
  };

  /**
   * Class constructor.
   *
   * @param {generic.hassEntity} entity The hass entity to create a card for.
   * @param {cards.personCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: generic.hassEntity, options: cards.personCardOptions = {}) {
    super(entity);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {PersonCard};
