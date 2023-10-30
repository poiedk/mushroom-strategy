import {Helper} from "../Helper";
import {TitleCard} from "../cards/TitleCard";
import {AbstractView} from "./AbstractView";
import {views} from "../types/views";
import {cards} from "../types/cards";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Climate View Class.
 *
 * Used to create a view for entities of the climate domain.
 *
 * @class ClimateView
 * @extends AbstractView
 */
class ClimateView extends AbstractView {
  /**
   * Domain of the view's entities.
   *
   * @type {string}
   * @private
   * @static
   */
  static #domain: string = "climate";

  /**
   * Default settings for the view.
   *
   * @type {views.viewOptions}
   * @private
   */
  #defaultSettings: views.viewOptions = {
    title: "Climates",
    path: "climates",
    icon: "mdi:thermostat",
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
    title: "All Climates",
    subtitle: Helper.getCountTemplate(ClimateView.#domain, "ne", "off") + " climates on",
  };

  /**
   * Class constructor.
   *
   * @param {viewOptions} [options={}] Options for the view.
   */
  constructor(options: views.viewOptions = {}) {
    super(ClimateView.#domain);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);

    // Create a title card to switch all entities of the domain.
    this.viewTitleCard = new TitleCard(Helper.areas, {
      ...this.#viewTitleCardSettings,
      ...("titleCardOptions" in this.settings ? this.settings.titleCardOptions : {}) as cards.titleCardOptions,
    }).createCard();
  }
}

export {ClimateView};
