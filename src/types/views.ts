import {cards} from "./cards";

export namespace views {
  /**
   * Options to create a view.
   *
   * @property {string} [title] The title or name.
   * @property {string} [path] Paths are used in the URL.
   * @property {string} [icon] The icon of the view.
   * @property {boolean} [subview]  Mark the view as “Subview”.
   *
   * @see https://www.home-assistant.io/dashboards/views/
   */
  export interface abstractOptions {
    title?: string;
    path?: string;
    icon?: string;
    subview?: boolean;
  }

  /**
   * Options for the extended View class.
   *
   * @property {titleCardOptions} [titleCardOptions] Options for the title card per area.
   */
  export interface viewOptions extends abstractOptions {
    titleCardOptions?: cards.titleCardOptions;
  }
}






