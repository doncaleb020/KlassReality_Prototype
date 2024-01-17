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
import { Flip, ToastContainer, toast } from "react-toastify";

const Modal3D = () => {
  const dispatch = useDispatch();
  const contentData = useSelector((state) => state.application.contentData);
  const [content, setContent] = useState(contentData);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const { name, files } = e.target;
    const duplicateObject = { ...content };
    duplicateObject[name] = files[0];
    setContent(duplicateObject);
  };
  const handleScript = (e) => {
    const { name, value } = e.target;
    const duplicateObject = { ...content };
    duplicateObject[name] = value;
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
    setLoading(true);
    const formData = new FormData();
    formData.append("model", content.model);
    formData.append("modelScript", content.modelScript);
    PatchContent(content.id, formData)
      .then((res) => {
        toast.success("Successfully Created!", {
          position: "top-right",
          autoClose: 300,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
          transition: Flip,
        });
        setLoading(false);
        const duplicateObject = { ...content };
        setContent({ ...duplicateObject, model: res.model });
        dispatch(ContentData({ ...duplicateObject, model: res.model }));
        setTimeout(() => {
          goBack();
        }, 1500);
      })
      .catch((err) => {
        toast.error("Error Status Code 500", {
          position: "top-right",
          autoClose: 300,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
          transition: Flip,
        });
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="model-wrp">
      <ToastContainer />
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
        value={content.modelScript}
        name="modelScript"
        onChange={(e) => handleScript(e)}
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
          loading={loading}
          disabled={!(content.model != "" && content.modelScript != "")}
          onClick={() => onConfirm()}
        />
      </div>
    </div>
  );
};

export default Modal3D;
