import {AbstractCard} from "./AbstractCard";
import {cards} from "../types/cards";
import {generic} from "../types/generic";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Mediaplayer Card Class
 *
 * Used to create a card for controlling an entity of the media_player domain.
 *
 * @class
 * @extends AbstractCard
 */
class MediaPlayerCard extends AbstractCard {
  /**
   * Default settings of the card.
   *
   * @type {cards.mediaPlayerCardOptions}
   * @private
   */
  #defaultSettings: cards.mediaPlayerCardOptions = {
    type: "custom:mushroom-media-player-card",
    icon: undefined,
    use_media_info: true,
    media_controls: [
      "on_off",
      "play_pause_stop",
    ],
    show_volume_level: true,
    volume_controls: [
      "volume_mute",
      "volume_set",
      "volume_buttons",
    ],
  };

  /**
   * Class constructor.
   *
   * @param {generic.hassEntity} entity The hass entity to create a card for.
   * @param {cards.mediaPlayerCardOptions} [options={}] Options for the card.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(entity: generic.hassEntity, options: cards.mediaPlayerCardOptions = {}) {
    super(entity);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }
}

export {MediaPlayerCard};
