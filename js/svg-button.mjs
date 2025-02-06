const buttonStyles = new CSSStyleSheet(); // Create a stylesheet object (outside the class for potential reuse)

class SvgButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.button = document.createElement("button");
    this.shadowRoot.appendChild(this.button);
    this.shadowRoot.adoptedStyleSheets = [buttonStyles]; // Apply the stylesheet object
    this._isLoaded = false;
  }

  async connectedCallback() {
    try {
      await this.loadComponentStyles(); // Load CSS first
      await this.loadSvg(); // Then load SVG
    } catch (error) {
      console.error("Error during component initialization:", error);
      // Handle overall component initialization error if needed
    }
  }

  async loadComponentStyles() {
    try {
      const response = await fetch("../css/svg-button.css"); // Fetch CSS file
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} fetching CSS`);
      }
      const cssText = await response.text();
      await buttonStyles.replace(cssText); // Asynchronously replace stylesheet content
    } catch (error) {
      console.error("Failed to load CSS file", error);
      // Fallback or error handling for CSS loading if necessary
      // For now, component might render without styles if CSS fails to load
    }
  }

  async loadSvg() {
    if (!this.constructor.svgFilePath) {
      console.error(
        `${this.constructor.name}: static svgFilePath must be defined.`
      );
      return;
    }

    try {
      this.setLoadingState(true); // Indicate loading

      const response = await fetch(this.constructor.svgFilePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} fetching SVG`);
      }
      const svgContent = await response.text();
      this.button.innerHTML = svgContent;
      this.button.setAttribute(
        "aria-label",
        this.ariaLabel || this.constructor.ariaLabel || "SVG Button"
      );
      this.setLoadingState(false); // Loading complete
      this._isLoaded = true;
    } catch (error) {
      console.error(
        `${this.constructor.name}: Failed to load SVG from ${this.constructor.svgFilePath}`,
        error
      );
      this.setLoadingState(false); // Stop loading state even on error
      this.button.innerHTML =
        '<span aria-hidden="true">Error loading SVG</span>'; // Fallback content
      this.button.setAttribute(
        "aria-label",
        `Error loading SVG icon: ${this.constructor.ariaLabel || "SVG Button"}`
      ); // Update aria-label for error
    }
  }

  setLoadingState(isLoading) {
    if (isLoading) {
      this.button.setAttribute("aria-busy", "true"); // Indicate busy state for accessibility
      this.button.classList.add("loading"); // Add a loading class for styling (optional)
      // You could also add visual loading indicators here if desired (spinners, etc.)
    } else {
      this.button.removeAttribute("aria-busy");
      this.button.classList.remove("loading");
    }
  }

  static get observedAttributes() {
    return ["aria-label"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "aria-label") {
      this.ariaLabel = newValue;
      if (this.button && this._isLoaded) {
        // Only update aria-label after SVG is loaded
        this.button.setAttribute(
          "aria-label",
          this.ariaLabel || this.constructor.ariaLabel || "SVG Button"
        );
      }
    }
  }
}

export default SvgButton;
