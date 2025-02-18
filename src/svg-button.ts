const buttonStyles = new CSSStyleSheet();
let cssLoaded = false;

class SvgButton extends HTMLElement {
  button: HTMLButtonElement;

  static svgFilePath: string | undefined;
  static buttonAriaLabel: string = "Generic Button";
  static observedAttributes = ["button-aria-label"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.button = document.createElement("button");
    this.shadowRoot!.appendChild(this.button);
    this.shadowRoot!.adoptedStyleSheets = [buttonStyles]; // Apply the stylesheet object
  }

  async connectedCallback() {
    try {
      await this.loadCss();
      await this.loadSvg();

      this.updateButtonAriaLabel();
    } catch (error) {
      console.error("Error during component initialization:", error);
    }
  }

  async loadCss() {
    if (cssLoaded) return;

    try {
      const cssUrl = new URL("../css/svg-button.css", import.meta.url).href;
      const response = await fetch(cssUrl);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status} fetching CSS`);

      const cssText = await response.text();
      buttonStyles.replaceSync(cssText); // Synchronously replace stylesheet content
      cssLoaded = true;
    } catch (error) {
      console.error("Failed to load CSS file", error);
    }
  }

  async loadSvg() {
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

  get buttonAriaLabel(): string {
    return (
      this.getAttribute("button-aria-label") ||
      (this.constructor as typeof SvgButton).buttonAriaLabel
    );
  }

  set buttonAriaLabel(value: string | null) {
    if (value == null) {
      this.removeAttribute("button-aria-label");
    } else {
      this.setAttribute("button-aria-label", value);
    }
  }

  protected updateButtonAriaLabel() {
    this.button.setAttribute("aria-label", this.buttonAriaLabel);
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (name === "button-aria-label") {
      this.updateButtonAriaLabel();
    }
  }
}

export default SvgButton;
