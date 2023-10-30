import {Helper} from "../Helper";
import {chips} from "../types/chips";
import {AbstractChip} from "./AbstractChip";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Light Chip class.
 *
 * Used to create a chip to indicate how many lights are on and to turn all off.
 */
class LightChip extends AbstractChip {
  /**
   * Default options of the chip.
   *
   * @private
   */
  static readonly #defaultSettings: chips.lightChipOptions = {
    icon: "mdi:lightbulb-group",
    icon_color: "amber",
    content: Helper.getCountTemplate("light", "eq", "on"),
    tap_action: {
      action: "call-service",
      service: "light.turn_off",
      target: {
        area_id: [],
      },
      data: {},
    },
    hold_action: {
      action: "navigate",
      navigation_path: "lights",
    },
  };

  constructor(options: chips.lightChipOptions = {}) {
    if (!Helper.isInitialized()) {
      throw new Error("The Helper module must be initialized before using this one.");
    }

    super("template", {...LightChip.#defaultSettings, ...options});
  }
}

export {LightChip};
