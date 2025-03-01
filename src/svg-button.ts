const buttonStyles = new CSSStyleSheet();

/** @internal Promise that resolves when the CSS is loaded.
 * The same CSS is used for all SvgButtons, hence outside the class
 */
let cssLoadingPromise: Promise<void> | null = null;

/**
 * Base class for SVG-based button web components.
 * Provides shared functionality for loading and displaying SVG icons with proper accessibility.
 *
 * @example
 * ```ts
 * class SettingsSvgButton extends SvgButton {
 *   static svgFilePath = "../icons/settings.svg";
 *   static buttonAriaLabel = "Settings";
 * }
 * customElements.define("settings-svg-button", SettingsSvgButton);
 * export default SettingsSvgButton;
 * ```
 */
class SvgButton extends HTMLElement {
  /** Internal button element that holds the SVG icon */
  button: HTMLButtonElement;

  /** Path to the SVG icon file, must be defined by subclasses */
  static svgFilePath: string | undefined;

  /** Default ARIA label for the button, can be overridden by attributes */
  static buttonAriaLabel: string = "Generic Button";

  /** List of attributes that trigger callback when changed */
  static observedAttributes = ["button-aria-label"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.button = document.createElement("button");
    this.shadowRoot!.appendChild(this.button);
    this.shadowRoot!.adoptedStyleSheets = [buttonStyles]; // Apply the stylesheet object
  }

  /**
   * Lifecycle callback when element is connected to the DOM.
   * Loads CSS and SVG resources, then updates accessibility labels.
   */
  async connectedCallback() {
    try {
      await this.loadCss();
      await this.loadSvg();
      this.updateButtonAriaLabel();
    } catch (error) {
      console.error("Error during component initialization:", error);
    }
  }
  /**
   * Loads shared CSS styles if not already loaded.
   * Uses a Promise to prevent multiple simultaneous loads.
   */
  async loadCss() {
    try {
      if (!cssLoadingPromise) {
        cssLoadingPromise = this.loadCssFile();
      }
      await cssLoadingPromise;
    } catch (error) {
      console.error("Failed to load CSS file", error);
    }
  }

  /**
   * Fetches and applies the CSS file to the shared stylesheet.
   * @returns Promise that resolves when CSS is loaded and applied
   */
  private async loadCssFile(): Promise<void> {
    const cssUrl = new URL("../css/svg-button.css", import.meta.url).href;
    const response = await fetch(cssUrl);
    if (!response.ok)
      throw new Error(`HTTP error! status: ${response.status} fetching CSS`);

    const cssText = await response.text();
    buttonStyles.replace(cssText);
  }

  /**
   * Loads and displays the SVG icon for this button.
   * Uses the static svgFilePath defined by the subclass.
   */
  private async loadSvg() {
    const SvgButtonClass = this.constructor as typeof SvgButton;
    const svgFilePath = SvgButtonClass.svgFilePath;

    if (!svgFilePath) {
      console.error(
        `${SvgButtonClass.name}: static svgFilePath must be defined.`
      );
      return;
    }

    try {
      const svgUrl = new URL(svgFilePath, import.meta.url).href;
      const response = await fetch(svgUrl);

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status} fetching SVG`);

      const svgContent = await response.text();
      const svgElement = new DOMParser().parseFromString(
        svgContent,
        "image/svg+xml"
      ).documentElement;

      svgElement.setAttribute("aria-hidden", "true");

      this.button.innerHTML = svgElement.outerHTML;
    } catch (error) {
      console.error(
        `${this.constructor.name}: Failed to load SVG from ${SvgButtonClass.svgFilePath}`,
        error
      );
      this.button.innerHTML = "X";
    }
  }

  /**
   * Gets the current ARIA label for the button.
   * Returns either the attribute value or the static default.
   */
  get buttonAriaLabel(): string {
    return (
      this.getAttribute("button-aria-label") ||
      (this.constructor as typeof SvgButton).buttonAriaLabel
    );
  }

  /**
   * Sets the ARIA label for the button.
   * @param value - New label text, or null to remove custom label
   */
  set buttonAriaLabel(value: string | null) {
    if (value == null) {
      this.removeAttribute("button-aria-label");
    } else {
      this.setAttribute("button-aria-label", value);
    }
  }

  /**
   * Updates the button's aria-label attribute based on current state.
   * Called when the button-aria-label attribute changes.
   */
  protected updateButtonAriaLabel() {
    this.button.setAttribute("aria-label", this.buttonAriaLabel);
  }

  /**
   * Lifecycle callback for attribute changes.
   * @param name - Name of changed attribute
   * @param _oldValue - Previous value of attribute
   * @param _newValue - New value of attribute
   */
  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    _newValue: string | null
  ) {
    if (name === "button-aria-label") {
      this.updateButtonAriaLabel();
    }
  }
}

export default SvgButton;
