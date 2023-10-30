import {Helper} from "../Helper";
import {TitleCard} from "../cards/TitleCard";
import {AbstractView} from "./AbstractView";
import {views} from "../types/views";
import {cards} from "../types/cards";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Cover View Class.
 *
 * Used to create a view for entities of the cover domain.
 *
 * @class CoverView
 * @extends AbstractView
 */
class CoverView extends AbstractView {
  /**
   * Domain of the view's entities.
   *
   * @type {string}
   * @private
   * @static
   */
  static #domain: string = "cover";

  /**
   * Default settings for the view.
   *
   * @type {views.viewOptions}
   * @private
   */
  #defaultSettings: views.viewOptions = {
    title: "Covers",
    path: "covers",
    icon: "mdi:window-open",
    subview: false,
    titleCardOptions: {
      iconOn: "mdi:arrow-up",
      iconOff: "mdi:arrow-down",
      onService: "cover.open_cover",
      offService: "cover.close_cover",
    },
  };

  /**
   * Default settings for the view's title card.
   *
   * @type {cards.titleCardOptions}
   * @private
   */
  #viewTitleCardOption: cards.titleCardOptions = {
    title: "All Covers",
    subtitle: Helper.getCountTemplate(CoverView.#domain, "eq", "open") + " covers open",
  };

  /**
   * Class constructor.
   *
   * @param {viewOptions} [options={}] Options for the view.
   */
  constructor(options: views.viewOptions = {}) {
    super(CoverView.#domain);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);

    // Create a title card to switch all entities of the domain.
    this.viewTitleCard = new TitleCard(Helper.areas, {
      ...this.#viewTitleCardOption,
      ...("titleCardOptions" in this.settings ? this.settings.titleCardOptions : {}) as cards.titleCardOptions,
    }).createCard();
  }
}

export {CoverView};
