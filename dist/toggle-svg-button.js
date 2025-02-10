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
            this.addEventListener("click", () => {
                this.pressed = !this.pressed;
            });
        }
        catch (error) {
            console.error("Error during component initialization:", error);
        }
    }
    get pressed() {
        return this.hasAttribute("pressed");
    }
    set pressed(value) {
        if (value) {
            this.setAttribute("pressed", "");
        }
        else {
            this.removeAttribute("pressed");
        }
    }
    updateAriaPressedAttribute() {
        this.button.setAttribute("aria-pressed", String(this.pressed));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name === "pressed") {
            this.updateAriaPressedAttribute();
        }
    }
}
customElements.define("toggle-svg-button", ToggleSvgButton);
export default ToggleSvgButton;
//# sourceMappingURL=toggle-svg-button.js.map