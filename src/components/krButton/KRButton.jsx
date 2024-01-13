import PropTypes from "prop-types";
import "./KRButton.css";

/**
 * @typedef {Object} KRButtonProps
 * @property {string} [backgroundColor] - Background color of the button in CSS color format (e.g., 'rgba(45, 106, 79, 1)').
 * @property {string} [color] - Text color of the button in CSS color format (e.g., 'white').
 * @property {string} [label] - The label/text for the button.
 * @property {() => void} onClick - Event handler for button click.
 * @property {string | { [key: string]: boolean }} [className] - Custom class name(s) for the component.
 * @property {React.CSSProperties} [style] - Custom inline styles for the component.
 * @property {boolean} [disabled] - Set to true to disable the button.
 */

/**
 * Custom button component.
 * @param {KRButtonProps} props - The props for the component.
 */
const KRButton = ({
  backgroundColor,
  color,
  label,
  onClick,
  className,
  size,
  style,
  disabled,
  loading,
  rounded,
}) => {
  const buttonStyle = {
    backgroundColor,
    color,
    width: "fit-content", // Set width to fit the content
    alignItems: "center",
    justifyContent: "center",
    ...style,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`kr-button ${rounded ? "rounded" : ""} ${size} ${className} ${
        disabled ? "disabled" : ""
      } `}
      style={buttonStyle}
      disabled={disabled}
    >
      {label} <span className={`${loading ? "loading" : ""}`}></span>
    </button>
  );
};

KRButton.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "large", "default"]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  rounded: PropTypes.bool,
};

KRButton.defaultProps = {
  backgroundColor: "#fff", // Default background color
  color: "#000", // Default text color
  disabled: false,
  size: "default",
  className: "",
  rounded: false,
};

export default KRButton;
