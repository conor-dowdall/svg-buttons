import SvgButton from "../svg-button.js";

class CloseSvgButton extends SvgButton {
  static svgFilePath =
    "../icons/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
  static buttonAriaLabel = "Close";
}

customElements.define("close-svg-button", CloseSvgButton);
export default CloseSvgButton;
