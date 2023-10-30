import {Helper} from "../Helper";
import {chips} from "../types/chips";
import {AbstractChip} from "./AbstractChip";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Cover Chip class.
 *
 * Used to create a chip to indicate how many covers aren't closed.
 */
class CoverChip extends AbstractChip {
  /**
   * Default settings of the chip.
   *
   * @private
   * @readonly
   * @static
   */
  static readonly #defaultSettings: chips.coverChipOptions = {
    icon: "mdi:window-open",
    icon_color: "cyan",
    content: Helper.getCountTemplate("cover", "eq", "open"),
    tap_action: {
      action: "navigate",
      navigation_path: "covers",
    },
  };

  /**
   * Class Constructor.
   *
   * @param {chips.coverChipOptions} options The chip options.
   */
  constructor(options: chips.coverChipOptions = {}) {
    if (!Helper.isInitialized()) {
      throw new Error("The Helper module must be initialized before using this one.");
    }

    super("template", {...CoverChip.#defaultSettings, ...options});
  }
}

export {CoverChip};
