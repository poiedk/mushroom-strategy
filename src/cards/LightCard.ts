import {AbstractCard} from "./AbstractCard";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Light Card Class
 *
 * Used to create a card for controlling an entity of the light domain.
 *
 * @class
 * @extends AbstractCard
 */
class LightCard extends AbstractCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.lightCardOptions}
   * @private
   */
  #defaultSettings: cards.lightCardOptions = {
    type: "custom:mushroom-light-card",
    icon: undefined,
    show_brightness_control: true,
    show_color_control: true,
    use_light_color: true,
    double_tap_action: {
      target: {
        entity_id: undefined,
      },
      action: "call-service",
      service: "light.turn_on",
      data: {
        rgb_color: [255, 255, 255],
      },
    },
  };

  /**
   * Class constructor.
   *
   * @param {generic.hassEntity} entity The hass entity to create a card for.
   * @param {cards.lightCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: generic.hassEntity, options: cards.lightCardOptions = {}) {
    super(entity);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {LightCard};
