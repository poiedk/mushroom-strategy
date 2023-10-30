import {Helper} from "../Helper";
import {AbstractView} from "./AbstractView";
import {cards} from "../types/cards";
import {views} from "../types/views";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Home View Class.
 *
 * Used to create a Home view.
 *
 * @class HomeView
 * @extends AbstractView
 */
class HomeView extends AbstractView {
  /**
   * Default settings for the view.
   *
   * @type {views.viewOptions}
   * @private
   */
  #defaultSettings: views.viewOptions = {
    title: "Home",
    path: "home",
    subview: false,
  };

  /**
   * Class constructor.
   *
   * @param {views.viewOptions} [options={}] Options for the view.
   */
  constructor(options: views.viewOptions = {}) {
    super();

    this.settings = Object.assign(this.settings, this.#defaultSettings, options);
  }

  /**
   * Create the cards to include in the view.
   *
   * @return {Promise} A promise of a card object array.
   * @override
   */
  async createViewCards(): Promise<any> {
    return await Promise.all([
      this.#createChips(),
      this.#createPersonCards(),
      this.#createAreaCards(),
    ]).then(([chips, personCards, areaCards]) => {
      const options = Helper.strategyOptions;
      const homeViewCards: { [p: string]: any }[] = [
        {
          type: "custom:mushroom-chips-card",
          alignment: "center",
          chips: chips,
        },
        {
          type: "horizontal-stack",
          cards: personCards,
        },
        {
          type: "custom:mushroom-template-card",
          primary: "{% set time = now().hour %} {% if (time >= 18) %} Good Evening, {{user}}! {% elif (time >= 12) %} Good Afternoon, {{user}}! {% elif (time >= 5) %} Good Morning, {{user}}! {% else %} Hello, {{user}}! {% endif %}",
          icon: "mdi:hand-wave",
          icon_color: "orange",
          tap_action: {
            action: "none",
          },
          double_tap_action: {
            action: "none",
          },
          hold_action: {
            action: "none",
          },
        },
      ];

      // Add quick access cards.
      if (options.quick_access_cards) {
        homeViewCards.push(...options.quick_access_cards);
      }

      // Add area cards.
      homeViewCards.push({
        type: "vertical-stack",
        cards: areaCards,
      });

      // Add custom cards.
      if (options.extra_cards) {
        homeViewCards.push(...options.extra_cards);
      }

      return homeViewCards;
    });
  }

  /**
   * Create the chips to include in the view.
   *
   * @return {Promise} A chip object array.
   */
  async #createChips(): Promise<any> {
    const chips = [];
    const chipOptions = Helper.strategyOptions.chips;

    // TODO: Get domains from config.
    const exposed_chips = ["light", "fan", "cover", "switch", "climate"];
    // Create a list of area-ids, used for switching all devices via chips
    const areaIds = Helper.areas.map(area => area.area_id); //TODO: Pass areas to constructor.

    let chipModule;

    // Weather chip.
    const weatherEntityId = chipOptions?.weather_entity ?? Helper.entities.find(
      (entity: any) => entity.entity_id.startsWith("weather.") && entity.disabled_by == null && entity.hidden_by == null,
    )?.entity_id;

    if (weatherEntityId) {
      try {
        chipModule = await import("../chips/WeatherChip");
        const weatherChip = new chipModule.WeatherChip(weatherEntityId);

        chips.push(weatherChip.getChip());
      } catch (e) {
        console.error(Helper.debug ? e : "An error occurred while creating the weather chip!");
      }
    }

    // Numeric chips.
    for (let chipType of exposed_chips) {
      if (chipOptions?.[`${chipType}_count` as string] ?? true) {
        const className = Helper.sanitizeClassName(chipType + "Chip");
        try {
          chipModule = await import((`../chips/${className}`));
          const chip = new chipModule[className]({}, areaIds);

          chips.push(chip.getChip());
        } catch (e) {
          console.error(Helper.debug ? e : `An error occurred while creating the ${chipType} chip!`);
        }
      }
    }

    // Extra chips.
    if (chipOptions?.extra_chips) {
      chips.push(...chipOptions.extra_chips);
    }

    return chips;
  }

  /**
   * Create the person cards to include in the view.
   *
   * @return {cards.entityCard[]} A card object array.
   */
  #createPersonCards(): cards.entityCard[] {
    const cards: any = [];

    import("../cards/PersonCard").then(personModule => {
      for (const person of Helper.entities.filter((entity: any) => {
        return entity.entity_id.startsWith("person.")
          && entity.hidden_by == null
          && entity.disabled_by == null;
      })) {
        cards.push(new personModule.PersonCard(person).getCard());
      }
    });

    return cards;
  }

  /**
   * Create the area cards to include in the view.
   *
   * Area cards are grouped into two areas per row.
   *
   * @return {Promise} A card object array.
   */
  async #createAreaCards(): Promise<any> {
    /**
     * Cards to be stacked vertically.
     *
     * Contains a Title card and horizontal stacks of Area cards.
     *
     * @type {Object<string, *>}
     */
    const groupedCards: { [p: string]: any }[] = [
      {
        type: "custom:mushroom-title-card",
        title: "Areas",
      },
    ];
    let areaCards = [];

    for (const [i, area] of Helper.areas.entries()) {
      let module;
      let moduleName =
            Helper.strategyOptions.areas[area.area_id ?? "undisclosed"]?.type ??
            Helper.strategyOptions.areas["_"]?.type ??
            "default";

      // Load module by type in strategy options.
      try {
        module = await import((`../cards/${moduleName}`));
      } catch (e) {
        // Fallback to the default strategy card.
        module = await import("../cards/AreaCard");

        if (Helper.strategyOptions.debug && moduleName !== "default") {
          console.error(e);
        }
      }

      // Get a card for the area.
      if (!Helper.strategyOptions.areas[area.area_id as string]?.hidden) {
        let options = {
          ...Helper.strategyOptions.areas["_"],
          ...Helper.strategyOptions.areas[area.area_id ?? "undisclosed"],
        };

        areaCards.push(new module.AreaCard(area, options).getCard());
      }

      // Horizontally group every two area cards if all cards are created.
      if (i === Helper.areas.length - 1) {
        for (let i = 0; i < areaCards.length; i += 2) {
          groupedCards.push({
            type: "horizontal-stack",
            cards: areaCards.slice(i, i + 2),
          });
        }
      }
    }

    return groupedCards;
  }
}

export {HomeView};
