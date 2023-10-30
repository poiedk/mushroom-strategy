import {Helper} from "../Helper";
import {TitleCard} from "../cards/TitleCard";
import {cards} from "../types/cards";
import {views} from "../types/views";

/**
 * Abstract View Class.
 *
 * To create a new view, extend the new class with this one.
 *
 * @class
 * @abstract
 */
class AbstractView {
  /**
   * Settings of the view.
   *
   * @type {views.abstractOptions}
   */
  settings: views.abstractOptions = {
    title: undefined,
    path: undefined,
    icon: "mdi:view-dashboard",
    subview: false,
  };

  /**
   * A card to switch all entities in the view.
   *
   * @type {cards.horizontalStack}
   */
  viewTitleCard: cards.horizontalStack | undefined;

  /**
   *
   * The domain of which we operate the devices.
   * @private
   */
  readonly #domain?: string;

  /**
   * Class constructor.
   *
   * @param {string} [domain] The domain which the view is representing.
   *
   * @throws {Error} If trying to instantiate this class.
   * @throws {Error} If the Helper module isn't initialized.
   */
  constructor(domain: string = "") {
    if (this.constructor === AbstractView) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    if (!Helper.isInitialized()) {
      throw new Error("The Helper module must be initialized before using this one.");
    }

    if (domain) {
      this.#domain = domain;
    }
  }

  /**
   * Create the cards to include in the view.
   *
   * @return {Promise} An array of card objects.
   */
  async createViewCards(): Promise<any> {
    const viewCards = [];

    // Create cards for each area.
    for (const area of Helper.areas) {
      const areaCards = [];
      const entities = Helper.getDeviceEntities(area, this.#domain ?? "");
      const className = Helper.sanitizeClassName(this.#domain + "Card");
      const cardModule = await import(`../cards/${className}`);

      // Create a card for each domain-entity of the current area.
      for (const entity of entities) {
        let cardOptions = Helper.strategyOptions.card_options?.[entity.entity_id] ?? {};
        let deviceOptions = Helper.strategyOptions.card_options?.[entity.device_id] ?? {};

        if (cardOptions.hidden || deviceOptions.hidden) {
          continue;
        }

        areaCards.push(new cardModule[className](entity, cardOptions).getCard());
      }

      // Vertical stack the area cards if it has entities.
      if (areaCards.length) {
        const titleCardOptions: any = ("titleCardOptions" in this.settings) ? this.settings.titleCardOptions : {};

        // Create and insert a Title card.
        areaCards.unshift(new TitleCard(
          [area],
          {
            title: area.name,
            ...titleCardOptions,
          },
        ).createCard());

        viewCards.push({
          type: "vertical-stack",
          cards: areaCards,
        });
      }
    }

    viewCards.unshift(viewCards.length ? this.viewTitleCard : {
      type: "custom:mushroom-title-card",
      title: "No Entities Available",
      subtitle: "They're either hidden by the configuration or by Home Assistant.",
    });

    return viewCards;
  }

  /**
   * Get a view object.
   *
   * The view includes the cards which are created by method createViewCards().
   *
   * @returns {Promise} The view object.
   */
  async getView(): Promise<any> {
    return {
      ...this.settings,
      cards: await this.createViewCards(),
    };
  }
}

export {AbstractView};
