import {ActionConfig} from "./actions";

export namespace cards {
  /**
   * Options property of the Abstract Card.
   *
   * @property {string} type The type of the card.
   * @property {string} icon Icon of the card.
   * @property {ActionConfig} [tap_action] Action to perform on tapping a card.
   * @property {ActionConfig} [double_tap_action] Action to perform on double-tapping a card.
   * @property {ActionConfig} [hold_action] Action to perform on holding a card.
   */
  export interface abstractOptions {
    type: string;
    icon: string;
    tap_action?: ActionConfig;
    double_tap_action?: ActionConfig;
    hold_action?: ActionConfig;
  }

  /**
   * Entity Card.
   *
   * @property {string | undefined} entity The id of an entity.
   */
  export interface entityCard extends abstractOptions {
    entity: string | undefined;
  }

  /**
   * A horizontal stack of cards.
   *
   * @property {string} type The stack type.
   * @property {Object[]} cards The content of the stack.
   */
  export interface horizontalStack {
    type: "horizontal-stack",
    cards: { [p: string]: any }[],
  }

  /**
   * A vertical stack of cards.
   *
   * @property {string} type The stack type.
   * @property {Object[]} cards The content of the stack.
   */
  export interface verticalStack {
    type: "vertical-stack",
    cards: { [p: string]: any }[],
  }

  /**
   * Title Card options.
   *
   * @property {string} [title] Title to render. May contain templates.
   * @property {string} [subtitle] Subtitle to render. May contain templates.
   * @property {boolean} [showControls=true] False to hide controls.
   * @property {string} [iconOn] Icon to show for switching entities from off state.
   * @property {string} [iconOff] Icon to show for switching entities to off state.
   * @property {string} [onService=none] Service to call for switching entities from off state.
   * @property {string} [offService=none] Service to call for switching entities to off state.
   */
  export interface titleCardOptions {
    title?: string;
    subtitle?: string;
    showControls?: boolean;
    iconOn?: string;
    iconOff?: string;
    onService?: string;
    offService?: string;
  }

  /**
   * Light Card options.
   *
   * @property {boolean} [show_brightness_control=true]  Show a slider to control brightness.
   * @property {boolean} [show_color_control=true] Show a slider to control RGB color.
   * @property {boolean} [use_light_color=true] Colorize the icon and slider according light temperature or color.
   * @property {ActionConfig} [double_tap_action] Action to perform on double-tapping a card.
   */
  export interface lightCardOptions extends Partial<abstractOptions> {
    show_brightness_control?: boolean;
    show_color_control?: boolean;
    use_light_color?: boolean;
    double_tap_action?: ActionConfig;
  }

  /**
   * Cover Card options.
   *
   * @property {boolean} [show_buttons_control=true] Show buttons to open, close and stop cover.
   * @property {boolean} [show_position_control=true] Show a slider to control position of the cover.
   * @property {boolean} [show_tilt_position_control=true] Show a slider to control tilt position of the cover.
   */
  export interface coverCardOptions extends Partial<abstractOptions> {
    show_buttons_control?: boolean;
    show_position_control?: boolean;
    show_tilt_position_control?: boolean;
  }

  /**
   * Fan Card options.
   *
   * @property {boolean} [show_percentage_control=true] Show a slider to control speed.
   * @property {boolean} [show_oscillate_control=true] Show a button to control oscillation.
   * @property {boolean} [icon_animation=true] Animate the icon when fan is on.
   */
  export interface fanCardOptions extends Partial<abstractOptions> {
    show_percentage_control?: boolean;
    show_oscillate_control?: boolean;
    icon_animation?: boolean;
  }

  export interface lockCardOptions extends Partial<abstractOptions> {}
  export interface switchCardOptions extends Partial<abstractOptions> {}

  /**
   * Climate Card options.
   *
   * @property {["off", "cool", "heat", "fan_only"]} [hvac_modes] Show buttons to control target temperature.
   * @property {boolean} [show_temperature_control=true] Show buttons to control target temperature.
   */
  export interface climateCardOptions extends Partial<abstractOptions> {
    hvac_modes?: ["off", "cool", "heat", "fan_only"];
    show_temperature_control?: boolean;
  }

  /**
   * Camera Card options.
   *
   * @property {boolean} [show_name=false] Show name in footer.
   * @property {boolean} [show_state=false] Show state in footer.
   * @property {string} [camera_view=live] Show the live view if set to "live" and the stream is enabled.
   */
  export interface cameraCardOptions extends Partial<abstractOptions> {
    show_name?: boolean;
    show_state?: boolean;
    camera_view?: string;
  }

  /**
   * Person Card options.
   *
   * @property {string} [layout] Layout of the card.
   *                             Vertical, horizontal, and default layouts are supported.
   * @property {("name" | "state" | "last-changed" | "last-updated" | "none")} [primary_info=name] Info to show as
   *                                                                                               primary info.
   * @property {("name" | "state" | "last-changed" | "last-updated" | "none")} [secondary_info=sate] Info to show as
   *                                                                                                 secondary info.
   * @property {("icon" | "entity-picture" | "none")} [icon_type=icon] Type of icon to display.
   */
  export interface personCardOptions extends Partial<abstractOptions> {
    layout?: string;
    primary_info?: ("name" | "state" | "last-changed" | "last-updated" | "none");
    secondary_info?: ("name" | "state" | "last-changed" | "last-updated" | "none");
    icon_type?: ("icon" | "entity-picture" | "none");
  }

  /**
   * Area Card options.
   *
   * @property {string} [name] The name of the area
   * @property {string} [icon] Icon to render which may contain templates.
   * @property {string} [icon_color] Icon color to render which may contain templates.
   * @property {string} [primary] Primary info to render which may contain templates.
   */
  export interface areaCardOptions extends Partial<abstractOptions> {
    name?: string;
    icon?: string;
    icon_color?: string;
    primary?: string;
    tap_action?: ActionConfig;
    double_tap_action?: ActionConfig;
    hold_action?: ActionConfig;
  }

  /**
   * HA Area Card options.
   *
   * @property {string} [type] The type of the card.
   * @property {string} [area] The id of the area.
   * @property {boolean} [show_camera] Changes the area picture to a live feed of the camera set for the area.
   * @property {string} [navigation_path] The id of the view to navigate to.
   *                                      See https://www.home-assistant.io/dashboards/views/
   * @property {string} [theme] Override the used theme for this card with any loaded theme.
   *                            See https://www.home-assistant.io/integrations/frontend/.
   */
  export interface HaAreaCardOptions {
    type?: string;
    area?: string;
    show_camera?: string;
    navigation_path?: string;
    theme?: string;
  }

  /**
   * Media Player Card options.
   *
   * @property {boolean} [use_media_info=true] Use media info instead of name, state, and icon when media is playing.
   * @property {string[]} [media_controls="on_off", "play_pause_stop"] List of controls to display.
   *                                                                   (on_off, shuffle, previous, play_pause_stop,
   *                                                                    next, repeat)
   * @property {boolean} [show_volume_level=true] Show volume level next to media state when media is playing.
   * @property {string[]} [volume_controls="volume_mute", "volume_set", "volume_buttons"] List of controls to display.
   */
  export interface mediaPlayerCardOptions extends Partial<abstractOptions> {
    use_media_info?: boolean;
    media_controls?: string[];
    show_volume_level?: boolean;
    volume_controls?: string[];
  }

  /**
   * Sensor Card options.
   *
   * @property {string} [icon_color] Custom color for icon when entity is state is active.
   * @property {boolean} [animate] Add a reveal animation to the graph.
   * @property {string} [line_color] Set a custom color for the graph line.
   *                                 Provide a list of colors for multiple graph entries.
   */
  export interface sensorCardOptions extends Partial<abstractOptions> {
    icon_color?: string;
    animate?: boolean;
    line_color?: string;
  }

  /**
   * Miscellaneous Card options.
   *
   * @property {string} [icon_color] Custom color for icon when entity is state is active.
   */
  export interface miscellaneousCardOptions extends Partial<abstractOptions> {
    icon_color?: string;
  }
}









