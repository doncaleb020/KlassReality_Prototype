import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import PropTypes from "prop-types";
import './KRCheckBox.css'

const KRCheckBox = ({ name, value, onchange, disabled }) => {
  const [checked, setChecked] = useState(value || false);
  const handleChange = () => {
    setChecked(!checked);
    onchange({ target: { value: !value, name: name } });
  };
  return (
    <button
      className="kr-check-box-wrp"
      onClick={() => handleChange()}
      disabled={disabled}
    >
      {checked ? (
        <FaCheckCircle className="check" />
      ) : (
        <FaCircleXmark className="uncheck" />
      )}
    </button>
  );
};

KRCheckBox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onchange: PropTypes.func,
  disabled: PropTypes.bool,
};
KRCheckBox.defaultProps = {
  name: "checkbox",
  value: false,
  disabled: false,
};
export default KRCheckBox;
