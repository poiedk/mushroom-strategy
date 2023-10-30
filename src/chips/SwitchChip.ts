import {Helper} from "../Helper";
import {chips} from "../types/chips";
import {AbstractChip} from "./AbstractChip";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Switch Chip class.
 *
 * Used to create a chip to indicate how many switches are on and to turn all off.
 */
class SwitchChip extends AbstractChip {
  /**
   * Default settings of the chip.
   *
   * @private
   * @readonly
   * @static
   */
  static readonly #defaultSettings: chips.fanChipOptions = {
    icon: "mdi:dip-switch",
    icon_color: "blue",
    content: Helper.getCountTemplate("switch", "eq", "on"),
    tap_action: {
      action: "call-service",
      service: "switch.turn_off",
      target: {
        area_id: [],
      },
      data: {},
    },
    hold_action: {
      action: "navigate",
      navigation_path: "switches",
    },
  };

  /**
   * Class Constructor.
   *
   * @param {chips.switchChipOptions} options The chip options.
   */
  constructor(options: chips.switchChipOptions = {}) {
    if (!Helper.isInitialized()) {
      throw new Error("The Helper module must be initialized before using this one.");
    }

    super("template", {...SwitchChip.#defaultSettings, ...options});
  }
}

export {SwitchChip};
