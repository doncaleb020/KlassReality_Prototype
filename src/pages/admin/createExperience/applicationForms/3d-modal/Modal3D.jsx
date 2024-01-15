import "./Modal3D.css";
import KRScript from "../../../../../components/krScript/KRScript";
import Labels from "../../../../../common/Labels";
import KRButton from "../../../../../components/krButton/KRButton";
import KRUpload from "../../../../../components/krUpload/KRUpload";
import common from "../../../../../common/common";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { contentData as ContentData } from "../../../../../redux/features/counter/applicationSlice";
import { useNavigate } from "react-router-dom";

const Modal3D = () => {
  const { convertImageToBase64 } = common();
  const dispatch = useDispatch();
  const contentData = useSelector((state) => state.application.contentData);
  const [content, setContent] = useState(contentData);

  const handleFile = async (e) => {
    const { name, files } = e.target;
    const duplicateObject = { ...content };
    await convertImageToBase64(files[0])
      .then((res) => (duplicateObject[name] = res))
      .catch((err) => console.log(err));
    setContent(duplicateObject);
    dispatch(ContentData(duplicateObject));
  };
  const handleDeleteFile = () => {
    const duplicateObject = { ...content };
    duplicateObject.model = "";
    setContent(duplicateObject);
    dispatch(ContentData(duplicateObject));
  };
  const nav = useNavigate();
  const goBack = () => {
    nav("/create-experience");
  };
  const onConfirm = () => {
    goBack();
  };
  return (
    <div className="character-wrp">
      <p className="title">{Labels.model3d.title}</p>
      <KRUpload
        name="model"
        disabled={false}
        maxSize={10}
        errorMessage={""}
        value={content.model}
        onDelete={handleDeleteFile}
        fileType="image"
        onChange={(e) => handleFile(e)}
      />
      <KRScript
        placeholder="Script"
        value={content.script}
        disabled={true}
        onChange={() => console.log("hii")}
      />
      <div className="form-btn-wrp">
        <KRButton
          label={Labels.cancel}
          color="#fff"
          backgroundColor="#6d4444"
          style={{ border: "none" }}
          onClick={() => goBack()}
        />
        <KRButton
          label={Labels.confirm}
          color="#fff"
          backgroundColor="#586d44"
          style={{ border: "none" }}
          onClick={() => onConfirm()}
        />
      </div>
    </div>
  );
};

export default Modal3D;
