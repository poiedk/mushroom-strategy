import {Helper} from "../Helper";
import {TitleCard} from "../cards/TitleCard";
import {AbstractView} from "./AbstractView";
import {views} from "../types/views";
import {cards} from "../types/cards";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Camera View Class.
 *
 * Used to create a view for entities of the camera domain.
 *
 * @class CameraView
 * @extends AbstractView
 */
class CameraView extends AbstractView {
  /**
   * Domain of the view's entities.
   *
   * @type {string}
   * @private
   * @static
   */
  static #domain: string = "camera";

  /**
   * Default settings for the view.
   *
   * @type {views.viewOptions}
   * @private
   */
  #defaultSettings: views.viewOptions = {
    title: "Cameras",
    path: "cameras",
    icon: "mdi:cctv",
    subview: false,
    titleCardOptions: {
      showControls: false,
    },
  };

  /**
   * Default settings for the view's title card.
   *
   * @type {cards.titleCardOptions}
   * @private
   */
  #viewTitleCardSettings: cards.titleCardOptions = {
    title: "All Cameras",
  };

  /**
   * Class constructor.
   *
   * @param {viewOptions} [options={}] Options for the view.
   */
  constructor(options: views.viewOptions = {}) {
    super(CameraView.#domain);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);

    // Create a title card to switch all entities of the domain.
    this.viewTitleCard = new TitleCard(Helper.areas, {
      ...this.#viewTitleCardSettings,
      ...this.settings,
    }).createCard();
  }
}

export {CameraView};
