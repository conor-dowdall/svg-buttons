import SvgButton from "../svg-button.js";

class PaletteSvgButton extends SvgButton {
  static svgFilePath =
    "../icons/palette_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
  static buttonAriaLabel = "Palette";
}

customElements.define("palette-svg-button", PaletteSvgButton);
export default PaletteSvgButton;
