import PropTypes from "prop-types";
import "./KRInputBox.css";

/**
 * @typedef {'text' | 'email' | 'password' | 'number'} InputType
 */

/**
 * @typedef {'small' | 'large' | 'default'} InputSize
 */

/**
 * @typedef {Object} KRInputBoxProps
 * @property {string} label - The label for the input box.
 * @property {InputType} type - The type of the input ('text', 'email', 'password', 'number').
 * @property {string} placeholder - The placeholder text for the input.
 * @property {string} defaultValue - The defaultValue of the input.
 * @property {string} value - The value of the input.
 * @property {string} name - The name attribute of the input.
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} onChange - Event handler for input changes.
 * @property {InputSize} [size] - Size of the input ('small', 'large', or 'default').
 * @property {string | { [key: string]: boolean }} [className] - Custom class name(s) for the component.
 * @property {React.CSSProperties} [style] - Custom inline styles for the component.
 * @property {boolean} [disabled] - Set to true to disable the input.
 * @property {boolean} [required] - Set to true to mark the input as required.
 * @property {LabelPosition} [labelPosition] - Set the position of the label ('top' or 'left').
 * @property {(event: React.FocusEvent<HTMLInputElement>) => void} [onFocus] - Event handler for input focus.
 * @property {(event: React.FocusEvent<HTMLInputElement>) => void} [onBlur] - Event handler for input blur.
 * @property {number} [maxlength] - The maximum number of characters allowed in the input.
 * @property {string} [errorMessage] - The error message to display when validation fails.
 */

/**
 * Custom input box component.
 * @param {KRInputBoxProps} props - The props for the component.
 */
const KRInputBox = ({
  label,
  type,
  placeholder,
  defaultValue,
  value,
  name,
  onChange,
  onFocus,
  onBlur,
  autoFocus,
  size,
  className,
  style,
  disabled,
  required,
  labelPosition,
  maxlength, // Add maxlength prop
  errorMessage,
}) => {
  return (
    <div
      style={
        labelPosition === "left"
          ? { width: "100%", display: "flex", alignItems: "center" }
          : {}
      }
    >
      {labelPosition === "top" && (
        <div>
          <label style={{ color: "#2D6A4F" }} className={`input-label ${size}`}>
            {label}
          </label>
        </div>
      )}
      {labelPosition === "left" && (
        <label
          className={`kr-input-label ${size}`}
          style={{
            paddingRight: "5px",
            color: "#2D6A4F",
            width: `${labelPosition === "left" ? "40%" : "100%"}`,
            marginBottom: "1rem",
          }}
        >
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <div style={{ width: `${labelPosition === "left" ? "60%" : "100%"}` }}>
        <input
          type={type === "number" ? "text" : type} // Use "text" type for "number" type validation
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          name={name}
          onChange={onChange}
          autoComplete="off"
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={autoFocus}
          className={`kr-input-box ${size} ${className}`}
          style={{
            width: "100%",
            ...style,
          }} // Apply both base and size-specific styles
          disabled={disabled}
          required={required}
          maxLength={maxlength} // Set the maxlength attribute
        />
        <p
          className="input_error"
          style={{
            visibility: `${errorMessage != "" ? "unset" : "hidden"}`,
          }}
        >
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

KRInputBox.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password", "number"]).isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
  size: PropTypes.oneOf(["small", "large", "default"]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  labelPosition: PropTypes.oneOf(["top", "left"]),
  maxlength: PropTypes.number, // Add prop type for maxlength
  errorMessage: PropTypes.string,
};

KRInputBox.defaultProps = {
  type: "text",
  labelPosition: "top",
  size: "default",
  disabled: false,
  required: false,
  errorMessage: "",
  style: {
    borderRadius: "4rem",
    background: "#fff",
    border: "3px solid #ba28a9",
    outline: "0",
    margin: "10px 0",
  },
};

export default KRInputBox;
