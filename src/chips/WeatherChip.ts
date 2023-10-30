import {chips} from "../types/chips";

// noinspection JSUnusedGlobalSymbols False positive.
/**
 * Weather Chip class.
 *
 * Used to create a chip for showing the weather.
 */
class WeatherChip {
  /**
   * The id of the weather entity to show data from.
   *
   * @private
   */
  readonly #entityId;

  /**
   * Default settings of the chip.
   *
   * @private
   * @readonly
   */
  readonly #defaultSettings: chips.weatherChipOptions = {
    show_temperature: true,
    show_conditions: true,
  };

  /**
   * Class Constructor.
   *
   * @param entityId Id of a weather entity.
   * @param options Weather Chip options.
   */
  constructor(entityId: string, options: chips.weatherChipOptions = {}) {
    this.#entityId = entityId;
    this.#defaultSettings = {
      ...this.#defaultSettings,
      ...options,
    };
  }

  /**
   * Get the Weather chip.
   *
   * @returns {chips.weatherChip} A chip.
   */
  getChip(): chips.weatherChip {
    return {
      type: "weather",
      entity: this.#entityId,
      ...this.#defaultSettings,
    };
  }
}

export {WeatherChip};
