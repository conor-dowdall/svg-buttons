import SvgButton from "./svg-button.js";
declare class ToggleSvgButton extends SvgButton {
    static observedAttributes: string[];
    constructor();
    connectedCallback(): Promise<void>;
    get pressed(): boolean;
    set pressed(value: boolean);
    protected updateAriaPressedAttribute(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
export default ToggleSvgButton;
//# sourceMappingURL=toggle-svg-button.d.ts.map