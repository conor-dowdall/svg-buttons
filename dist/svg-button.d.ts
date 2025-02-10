declare class SvgButton extends HTMLElement {
    button: HTMLButtonElement;
    static svgFilePath: string | undefined;
    static buttonAriaLabel: string;
    static observedAttributes: string[];
    constructor();
    connectedCallback(): Promise<void>;
    loadCss(): Promise<void>;
    loadSvg(): Promise<void>;
    get buttonAriaLabel(): string;
    set buttonAriaLabel(value: string | null);
    protected updateButtonAriaLabel(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
export default SvgButton;
//# sourceMappingURL=svg-button.d.ts.map