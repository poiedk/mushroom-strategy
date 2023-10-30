import {chips} from "../types/chips";
import {HassServiceTarget} from "home-assistant-js-websocket";

/**
 * Abstract Chip class.
 *
 * To create a new chip, extend this one.
 *
 * @class
 * @abstract
 */
class AbstractChip {
  /**
   * Settings of the chip.
   *
   * @type {chips.abstractOptions}
   * @private
   */
  readonly settings: chips.abstractChipOptions;

  /**
   * The type of the chip.
   *
   * @type {string}
   * @private
   */
  readonly #type: string;

  /**
   * Class Constructor.
   *
   * @param {string} type The type of the chip.
   * @param {chips.abstractChipOptions} options Chip options.
   */
  constructor(type: string, options: chips.abstractChipOptions = {}) {
    this.#type = type;
    this.settings = options;
  }

  /**
   * Set the target from where to switch off the fans.
   *
   * @param {HassServiceTarget} target Target from where to switch off the fans.
   */
  setTarget(target: HassServiceTarget) {
    if (this.settings.tap_action && ("target" in this.settings.tap_action)) {
      this.settings.tap_action.target = target;
    }
  }

  // noinspection JSUnusedGlobalSymbols Method is called on dymanically imported classes.
  /**
   * Get the chip.
   *
   * @returns  {chips.genericChip} A chip.
   */
  getChip(): chips.genericChip {
    return {
      type: this.#type,
      ...this.settings,
    };
  }
}

export {AbstractChip};
