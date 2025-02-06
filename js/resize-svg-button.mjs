import SvgButton from "./svg-button.mjs";

class ResizeSvgButton extends SvgButton {
  static svgFilePath =
    "../icons/resize_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
  static ariaLabel = "Resize";
}

customElements.define("resize-svg-button", ResizeSvgButton);
export default ResizeSvgButton;
