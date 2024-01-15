import { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./KRUpload.css"; // Import the CSS file
import { RiDeleteBinFill } from "react-icons/ri";
import { MdFileUpload } from "react-icons/md";

/**
 * @typedef {Object} KRUploadProps
 * @property {string} [accept] - The file types accepted for upload (e.g., 'image/*', '.pdf', '.docx').
 * @property {(files: FileList) => void} onChange - Event handler for file selection.
 * @property {string} [label] - The label text for the file upload button.
 * @property {string | { [key: string]: boolean }} [labelClassName] - Custom class name(s) for the label.
 * @property {React.CSSProperties} [labelStyle] - Custom inline styles for the label.
 * @property {string | { [key: string]: boolean }} [className] - Custom class name(s) for the component.
 * @property {React.CSSProperties} [style] - Custom inline styles for the component.
 * @property {boolean} [disabled] - Set to true to disable the file upload button.
 * @property {boolean} [required] - Set to true to mark the file upload as required.
 * @property {number} [maxSize] - The maximum allowed file size in bytes.
 */

const KRUpload = ({
  onChange,
  className,
  style,
  disabled,
  required,
  maxSize,
  labelPosition,
  name,
  errorMessage,
  value,
  onDelete,
  fileType,
}) => {
  const [fileValue, setFileValue] = useState(value || "");
  const [error, setError] = useState(errorMessage);

  const inputRef = useRef(null);

  const handleFileUploadButtonClick = () => {
    if (!disabled) {
      setError("");
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (maxSize) {
      const selectedFile = files[0];
      if (selectedFile && selectedFile.size > maxSize * 1000000) {
        setError(`File size exceeds the limit of ${maxSize} MB.`);
        return;
      }
    }

    const file = URL.createObjectURL(e.target.files[0]);
    setFileValue(file);
    onChange(e);
  };

  const handleDeleteFile = () => {
    inputRef.current.value = null;
    setFileValue("");
    setError("");
    if (onDelete) {
      onDelete(name, fileValue);
    }
  };

  const defaultStyles = {
    padding: "1vw 3vw",
    borderRadius: "5px",
    fontSize: "1.1vw",
    fontWeight: 600,
    background: "#1B4332",
    color: "#fff",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    outline: "none",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    ...style, // Allow custom inline styles to override default styles
  };

  return (
    <div className={`upload_file_wrapper ${labelPosition}`}>
      <div>
        <div className="kr-upload-button-wrapper">
          <button
            className={`kr-button ${className}
              ${disabled || fileValue != "" ? "disabled" : ""}`}
            style={defaultStyles}
            onClick={handleFileUploadButtonClick}
            type="button"
            disabled={disabled || fileValue != ""}
          >
            <MdFileUpload />
            {"Upload"}
          </button>
          <div
            style={{ visibility: `${error != "" ? "unset" : "hidden"}` }}
            className={`p-file-upload-error ${error != "" ? "error" : ""}`}
          >
            {error}
          </div>

          <div
            className="upload_view_delete"
            style={{
              visibility: `${fileValue ? "unset" : "hidden"}`,
            }}
          >
            
            <button onClick={handleDeleteFile}>
              <RiDeleteBinFill />
            </button>
          </div>
        </div>
        <input
          type="file"
          ref={inputRef}
          accept={fileType}
          name={name}
          disabled={disabled}
          onChange={handleFileChange}
          style={{ display: "none" }}
          required={required}
        />
      </div>
    </div>
  );
};

KRUpload.propTypes = {
  accept: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  labelClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  labelStyle: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  maxSize: PropTypes.number,
  labelPosition: PropTypes.string,
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  preview: PropTypes.bool,
  value: PropTypes.string,
  whiteBg: PropTypes.bool,
  onDelete: PropTypes.func,
  fileType: PropTypes.string,
};

KRUpload.defaultProps = {
  disabled: false,
  required: false,
  labelPosition: "top",
  name: "",
  errorMessage: "",
  value: "",
};

export default KRUpload;
