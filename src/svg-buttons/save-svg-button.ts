import SvgButton from "../svg-button.js";

class SaveSvgButton extends SvgButton {
  static svgFilePath =
    "../icons/save_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
  static buttonAriaLabel = "Save";
}

customElements.define("save-svg-button", SaveSvgButton);
export default SaveSvgButton;
