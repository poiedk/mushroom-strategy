import {Helper} from "../Helper";
import {chips} from "../types/chips";
import {AbstractChip} from "./AbstractChip";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Fan Chip class.
 *
 * Used to create a chip to indicate how many fans are on and to turn all off.
 */
class FanChip extends AbstractChip {
  /**
   * Default settings of the chip.
   *
   * @private
   * @readonly
   * @static
   */
  static readonly #defaultSettings: chips.fanChipOptions = {
    icon: "mdi:fan",
    icon_color: "green",
    content: Helper.getCountTemplate("fan", "eq", "on"),
    tap_action: {
      action: "call-service",
      service: "fan.turn_off",
      target: {
        area_id: [],
      },
      data: {},
    },
    hold_action: {
      action: "navigate",
      navigation_path: "fans",
    },
  };

  /**
   * Class Constructor.
   *
   * @param {chips.fanChipOptions} options The chip options.
   */
  constructor(options: chips.fanChipOptions = {}) {
    if (!Helper.isInitialized()) {
      throw new Error("The Helper module must be initialized before using this one.");
    }

    super("template", {...FanChip.#defaultSettings, ...options});
  }
}

export {FanChip};
