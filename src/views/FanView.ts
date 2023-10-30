import {Helper} from "../Helper";
import {TitleCard} from "../cards/TitleCard";
import {AbstractView} from "./AbstractView";
import {views} from "../types/views";
import {cards} from "../types/cards";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Fan View Class.
 *
 * Used to create a view for entities of the fan domain.
 *
 * @class FanView
 * @extends AbstractView
 */
class FanView extends AbstractView {
  /**
   * Domain of the view's entities.
   *
   * @type {string}
   * @private
   * @static
   */
  static #domain: string = "fan";

  /**
   * Default settings for the view.
   *
   * @type {views.viewOptions}
   * @private
   */
  #defaultSettings: views.viewOptions = {
    title: "Fans",
    path: "fans",
    icon: "mdi:fan",
    subview: false,
    titleCardOptions: {
      iconOn: "mdi:fan",
      iconOff: "mdi:fan-off",
      onService: "fan.turn_on",
      offService: "fan.turn_off",
    },
  };

  /**
   * Default settings for the view's title card.
   *
   * @type {cards.titleCardOptions}
   * @private
   */
  #viewTitleCardOption: cards.titleCardOptions = {
    title: "All Fans",
    subtitle: Helper.getCountTemplate(FanView.#domain, "eq", "on") + " fans on",
  };

  /**
   * Class constructor.
   *
   * @param {views.viewOptions} [options={}] Options for the view.
   */
  constructor(options: views.viewOptions = {}) {
    super(FanView.#domain);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);

    // Create a title card to switch all entities of the domain.
    this.viewTitleCard = new TitleCard(Helper.areas, {
      ...this.#viewTitleCardOption,
      ...("titleCardOptions" in this.settings ? this.settings.titleCardOptions : {}) as cards.titleCardOptions,
    }).createCard();
  }
}

export {FanView};
