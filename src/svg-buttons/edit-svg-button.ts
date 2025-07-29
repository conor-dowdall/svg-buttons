import SvgButton from "../svg-button.js";

class EditSvgButton extends SvgButton {
  static svgFilePath =
    "../icons/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
  static buttonAriaLabel = "Edit";
}

customElements.define("edit-svg-button", EditSvgButton);
export default EditSvgButton;
