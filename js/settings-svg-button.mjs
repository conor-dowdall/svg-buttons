import SvgButton from "./svg-button.mjs";

class SettingsSvgButton extends SvgButton {
  static svgFilePath =
    "../icons/settings_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
  static ariaLabel = "Settings";
}

customElements.define("settings-svg-button", SettingsSvgButton);
export default SettingsSvgButton;
