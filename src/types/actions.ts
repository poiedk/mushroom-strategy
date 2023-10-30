import {HassServiceTarget} from "home-assistant-js-websocket";
import {HapticType} from "custom-card-helpers";

export interface ToggleMenuActionConfig extends BaseActionConfig {
  action: "toggle-menu";
}
export interface ToggleActionConfig extends BaseActionConfig {
  action: "toggle";
}
export interface CallServiceActionConfig extends BaseActionConfig {
  action: "call-service";
  service: string;
  data?: {
    entity_id?: string | [string];
    [key: string]: any;
  };
  target?: HassServiceTarget;
  repeat?: number;
  haptic?: HapticType;
}
export interface NavigateActionConfig extends BaseActionConfig {
  action: "navigate";
  navigation_path: string;
}
export interface UrlActionConfig extends BaseActionConfig {
  action: "url";
  url_path: string;
}
export interface MoreInfoActionConfig extends BaseActionConfig {
  action: "more-info";
  entity?: string;
}
export interface NoActionConfig extends BaseActionConfig {
  action: "none";
}
export interface CustomActionConfig extends BaseActionConfig {
  action: "fire-dom-event";
}
/**
 * `repeat` and `haptic` are specifically for use in custom cards like the Button-Card
 */
export interface BaseActionConfig {
  confirmation?: ConfirmationRestrictionConfig;
  repeat?: number;
  haptic?: HapticType;
}
export interface ConfirmationRestrictionConfig {
  text?: string;
  exemptions?: RestrictionConfig[];
}
export interface RestrictionConfig {
  user: string;
}
export declare type ActionConfig =
  ToggleActionConfig
  | CallServiceActionConfig
  | NavigateActionConfig
  | UrlActionConfig
  | MoreInfoActionConfig
  | NoActionConfig
  | CustomActionConfig
  | ToggleMenuActionConfig;
