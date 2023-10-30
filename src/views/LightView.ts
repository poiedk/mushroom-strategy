import {Helper} from "../Helper";
import {TitleCard} from "../cards/TitleCard";
import {AbstractView} from "./AbstractView";
import {views} from "../types/views";
import {cards} from "../types/cards";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Light View Class.
 *
 * Used to create a view for entities of the light domain.
 *
 * @class LightView
 * @extends AbstractView
 */
class LightView extends AbstractView {
  /**
   * Domain of the view's entities.
   *
   * @type {string}
   * @private
   * @static
   */
  static #domain: string = "light";

  /**
   * Default settings for the view.
   *
   * @type {views.viewOptions}
   * @private
   */
  #defaultSettings: views.viewOptions = {
    title: "Lights",
    path: "lights",
    icon: "mdi:lightbulb-group",
    subview: false,
    titleCardOptions: {
      showControls: true,
      iconOn: "mdi:lightbulb",
      iconOff: "mdi:lightbulb-off",
      onService: "light.turn_on",
      offService: "light.turn_off",
    },
  };

  /**
   * Default settings for the view's title card.
   *
   * @type {cards.titleCardOptions}
   * @private
   */
  #viewTitleCardSettings: cards.titleCardOptions = {
    title: "All Lights",
    subtitle: Helper.getCountTemplate(LightView.#domain, "eq", "on") + " lights on",
  };

  /**
   * Class constructor.
   *
   * @param {viewOptions} [options={}] Options for the view.
   */
  constructor(options: views.viewOptions = {}) {
    super(LightView.#domain);

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);

    // Create a title card to switch all entities of the domain.
    this.viewTitleCard = new TitleCard(Helper.areas, {
      ...this.#viewTitleCardSettings,
      ...this.settings,
    }).createCard();
  }
}

export {LightView};
