import PropTypes from "prop-types";
import "./KRScript.css";

/**
 * @typedef {'text' | 'email' | 'password' | 'number'} InputType
 */

/**
 * @typedef {'small' | 'large' | 'default'} InputSize
 */

/**
 * @typedef {Object} KRInputBoxProps
 * @property {string} placeholder - The placeholder text for the input.
 * @property {string} defaultValue - The defaultValue of the input.
 * @property {string} value - The value of the input.
 * @property {string} name - The name attribute of the input.
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} onChange - Event handler for input changes.
 * @property {string | { [key: string]: boolean }} [className] - Custom class name(s) for the component.
 * @property {React.CSSProperties} [style] - Custom inline styles for the component.
 * @property {boolean} [disabled] - Set to true to disable the input.
 * @property {boolean} [required] - Set to true to mark the input as required.
 * @property {(event: React.FocusEvent<HTMLInputElement>) => void} [onFocus] - Event handler for input focus.
 * @property {(event: React.FocusEvent<HTMLInputElement>) => void} [onBlur] - Event handler for input blur.
 * @property {number} [maxlength] - The maximum number of characters allowed in the input.
 */

/**
 * Custom input box component.
 * @param {KRInputBoxProps} props - The props for the component.
 */
const KRScript = ({
  placeholder,
  defaultValue,
  value,
  name,
  onChange,
  onFocus,
  onBlur,
  autoFocus,
  className,
  style,
  disabled,
  required,
  maxlength, // Add maxlength prop
}) => {
  return (
    <div style={{ width: "100%" }}>
      <textarea
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        name={name}
        onChange={onChange}
        autoComplete="off"
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        className={`kr-script ${className}`}
        style={{
          width: "100%",
          ...style,
        }} // Apply both base and size-specific styles
        disabled={disabled}
        required={required}
        maxLength={maxlength} // Set the maxlength attribute
      />
    </div>
  );
};

KRScript.propTypes = {
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  maxlength: PropTypes.number, // Add prop type for maxlength
};

KRScript.defaultProps = {
  disabled: false,
  required: false,
};

export default KRScript;
