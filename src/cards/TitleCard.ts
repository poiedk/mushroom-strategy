import {cards} from "../types/cards";
import {generic} from "../types/generic";

/**
 * Title Card class.
 *
 * Used for creating a Title Card.
 *
 * @class
 */
class TitleCard {
  /**
   * @type {string[]} An array of area ids.
   * @private
   */
  readonly #areaIds: string[];

  /**
   * Default settings of the card.
   *
   * @type {cards.titleCardOptions}
   * @private
   */
  readonly #defaultSettings: cards.titleCardOptions = {
    title: undefined,
    subtitle: undefined,
    showControls: true,
    iconOn: "mdi:power-on",
    iconOff: "mdi:power-off",
    onService: "none",
    offService: "none",
  };

  /**
   * Class constructor.
   *
   * @param {areaEntity[]} areas An array of area entities.
   * @param {titleCardOptions} options Title Card options.
   */
  constructor(areas: generic.areaEntity[], options: cards.titleCardOptions = {}) {
    //TODO: area_id === null represents Undisclosed area. Now casted to "" below and filtered out.
    this.#areaIds = areas.map(area => area.area_id ? area.area_id : "").filter((area_id) => area_id !== "");
    this.#defaultSettings = {
      ...this.#defaultSettings,
      ...options,
    };
  }

  /**
   * Create a Title card.
   *
   * @return {cards.horizontalStack} A Title card.
   */
  createCard(): cards.horizontalStack {
    const cards: { [p: string]: any }[] = [
      {
        type: "custom:mushroom-title-card",
        title: this.#defaultSettings.title,
        subtitle: this.#defaultSettings.subtitle,
      },
    ];

    if (this.#defaultSettings.showControls) {
      cards.push({
        type: "horizontal-stack",
        cards: [
          {
            type: "custom:mushroom-template-card",
            icon: this.#defaultSettings.iconOff,
            layout: "vertical",
            icon_color: "red",
            tap_action: {
              action: "call-service",
              service: this.#defaultSettings.offService,
              target: {
                area_id: this.#areaIds,
              },
              data: {},
            },
          },
          {
            type: "custom:mushroom-template-card",
            icon: this.#defaultSettings.iconOn,
            layout: "vertical",
            icon_color: "amber",
            tap_action: {
              action: "call-service",
              service: this.#defaultSettings.onService,
              target: {
                area_id: this.#areaIds,
              },
              data: {},
            },
          },
        ],
      });
    }

    return {
      type: "horizontal-stack",
      cards: cards,
    };
  }
}

export {TitleCard};
