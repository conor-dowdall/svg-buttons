import SvgButton from "./svg-button.js";

class ToggleSvgButton extends SvgButton {
  static observedAttributes = [...super.observedAttributes, "pressed"];

  constructor() {
    super();
  }

  async connectedCallback() {
    try {
      await super.connectedCallback();

      this.updateAriaPressedAttribute();

      this.button.addEventListener("click", () => {
        this.pressed = !this.pressed;
      });
    } catch (error) {
      console.error("Error during component initialization:", error);
    }
  }

  get pressed(): boolean {
    return this.hasAttribute("pressed");
  }

  set pressed(value: boolean) {
    if (value) {
      this.setAttribute("pressed", "");
    } else {
      this.removeAttribute("pressed");
    }
  }

  protected updateAriaPressedAttribute() {
    this.button.setAttribute("aria-pressed", String(this.pressed));
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === "pressed") {
      this.updateAriaPressedAttribute();
    }
  }
}

customElements.define("toggle-svg-button", ToggleSvgButton);

export default ToggleSvgButton;
