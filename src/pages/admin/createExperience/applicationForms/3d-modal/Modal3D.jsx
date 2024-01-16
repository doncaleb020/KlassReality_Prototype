import "./Modal3D.css";
import KRScript from "../../../../../components/krScript/KRScript";
import Labels from "../../../../../common/Labels";
import KRButton from "../../../../../components/krButton/KRButton";
import KRUpload from "../../../../../components/krUpload/KRUpload";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { contentData as ContentData } from "../../../../../redux/features/counter/applicationSlice";
import { useNavigate } from "react-router-dom";
import { PatchContent } from "../../../../../services/Index";

const Modal3D = () => {
  const dispatch = useDispatch();
  const contentData = useSelector((state) => state.application.contentData);
  const [content, setContent] = useState(contentData);

  const handleFile = async (e) => {
    const { name, files } = e.target;
    const duplicateObject = { ...content };
    duplicateObject[name] = files[0];
    setContent(duplicateObject);
  };

  const handleDeleteFile = () => {
    const duplicateObject = { ...content };
    duplicateObject.model = "";
    setContent(duplicateObject);
  };
  const nav = useNavigate();
  const goBack = () => {
    nav("/create-experience");
  };
  const onConfirm = () => {
    const formData = new FormData();
    formData.append("model", content.model);
    PatchContent(content.id, formData)
      .then((res) => {
        const duplicateObject = { ...content };
        setContent({ ...duplicateObject, model: res.model });
        dispatch(ContentData({ ...duplicateObject, model: res.model }));
        goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="model-wrp">
      <p className="title">{Labels.model3d.title}</p>
      <KRUpload
        name="model"
        disabled={false}
        errorMessage={""}
        value={content.model}
        onDelete={handleDeleteFile}
        fileType=".fbx,.glb"
        label="Upload 3D model"
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
