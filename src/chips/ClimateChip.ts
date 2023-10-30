import {Helper} from "../Helper";
import {AbstractChip} from "./AbstractChip";
import {chips} from "../types/chips";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Climate Chip class.
 *
 * Used to create a chip to indicate how many climates are operating.
 */
class ClimateChip extends AbstractChip {
  /**
   * Default settings of the chip.
   *
   * @type {chips.climateChipOptions}
   *
   * @private
   * @readonly
   * @static
   */
  static readonly #defaultSettings: chips.climateChipOptions = {
    icon: "mdi:thermostat",
    icon_color: "orange",
    content: Helper.getCountTemplate("climate", "ne", "off"),
    tap_action: {
      action: "navigate",
      navigation_path: "climates",
    },
    hold_action: {
      action: "navigate",
      navigation_path: "climates",
    },
  };

  /**
   * Class Constructor.
   *
   * @param {chips.climateChipOptions} options The chip options.
   */
  constructor(options: chips.climateChipOptions = {}) {
    if (!Helper.isInitialized()) {
      throw new Error("The Helper module must be initialized before using this one.");
    }

    super("template", {...ClimateChip.#defaultSettings, ...options});
  }
}

export {ClimateChip};
