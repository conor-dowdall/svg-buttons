const buttonStyles = new CSSStyleSheet();

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
    try {
      const response = await fetch("../css/svg-button.css"); // Fetch CSS file
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} fetching CSS`);
      }
      const cssText = await response.text();
      await buttonStyles.replace(cssText); // Asynchronously replace stylesheet content
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
      this.button.setAttribute("aria-busy", "true"); // Indicate busy state for accessibility

      const response = await fetch(svgFilePath);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} fetching SVG`);
      }

      const svgContent = await response.text();
      const svgElement = new DOMParser().parseFromString(
        svgContent,
        "image/svg+xml"
      ).documentElement;
      svgElement.setAttribute("aria-hidden", "true");
      this.button.innerHTML = svgElement.outerHTML;

      this.button.removeAttribute("aria-busy");
    } catch (error) {
      console.error(
        `${this.constructor.name}: Failed to load SVG from ${SvgButtonClass.svgFilePath}`,
        error
      );
      this.button.innerHTML = "X";
      this.button.setAttribute(
        "aria-label",
        `Error loading SVG icon: ${
          SvgButtonClass.buttonAriaLabel || "Generic Button"
        }`
      ); // Update aria-label for error
      this.button.removeAttribute("aria-busy");
    }
  }

  get buttonAriaLabel(): string {
    return (
      this.getAttribute("button-aria-label") ||
      (this.constructor as typeof SvgButton).buttonAriaLabel ||
      "Generic Button"
    );
  }

  set buttonAriaLabel(value: string | null) {
    if (value == null) {
      this.removeAttribute("button-aria-label");
    } else {
      this.setAttribute("button-aria-label", value);
    }
  }

  private updateButtonAriaLabel() {
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
