import {ActionConfig} from "./actions";

export namespace chips {
  /**
   * Abstract Chip options.
   *
   * @property {string} [icon] Name of the chip icon.
   * @property {string} [icon_color] Color of the chip icon.
   * @property {string} [content] Content of the chip.
   * @property {ActionConfig} [tap_action] Action to perform on tapping a chip.
   * @property {ActionConfig} [double_tap_action] Action to perform on double-tapping a chip.
   * @property {ActionConfig} [hold_action] Action to perform on holding a chip.
   */
  export interface abstractChipOptions {
    icon?: string;
    icon_color?: string;
    content?: string;
    tap_action?: ActionConfig
    double_tap_action?: ActionConfig
    hold_action?: ActionConfig
  }

  export interface climateChipOptions extends abstractChipOptions {}
  export interface coverChipOptions extends abstractChipOptions {}
  export interface fanChipOptions extends abstractChipOptions {}
  export interface lightChipOptions extends abstractChipOptions {}
  export interface switchChipOptions extends abstractChipOptions {}

  /**
   * Weather Chip options.
   *
   * @property {boolean} [show_temperature] True to show the current temperature.
   * @property {boolean} [show_conditions] True to show the current conditions.
   */
  export interface weatherChipOptions extends abstractChipOptions {
    show_temperature?: boolean;
    show_conditions?: boolean;
  }

  export interface genericChip extends Partial<abstractChipOptions> {
    type: string;
  }

  export interface weatherChip extends genericChip {
    type: string;
    entity: string;
  }

}
