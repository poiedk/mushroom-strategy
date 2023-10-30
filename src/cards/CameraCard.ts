import {AbstractCard} from "./AbstractCard";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Camera Card Class
 *
 * Used to create a card for controlling an entity of the camera domain.
 *
 * @class
 * @extends AbstractCard
 */
class CameraCard extends AbstractCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.cameraCardOptions}
   * @private
   */
  #defaultSettings: cards.cameraCardOptions = {
    type: "picture-entity",
    show_name: false,
    show_state: false,
    camera_view: "live",
  };

  /**
   * Class constructor.
   *
   * @param {generic.hassEntity} entity The hass entity to create a card for.
   * @param {cards.cameraCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: generic.hassEntity, options: cards.cameraCardOptions = {}) {
    super(entity);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {CameraCard};
