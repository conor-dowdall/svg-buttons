import ToggleSvgButton from "../toggle-svg-button.js";

class ResizeToggleSvgButton extends ToggleSvgButton {
  static svgFilePath =
    "../icons/resize_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
  static buttonAriaLabel = "Resize";
}

customElements.define("resize-toggle-svg-button", ResizeToggleSvgButton);
export default ResizeToggleSvgButton;
