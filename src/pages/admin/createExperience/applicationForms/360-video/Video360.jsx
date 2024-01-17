import "./Video360.css";
import KRScript from "../../../../../components/krScript/KRScript";
import KRButton from "../../../../../components/krButton/KRButton";
import Labels from "../../../../../common/Labels";
import KRUpload from "../../../../../components/krUpload/KRUpload";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  contentData as ContentData,
  assessmentData as AssessmentData,
} from "../../../../../redux/features/counter/applicationSlice";
import { PatchContent } from "../../../../../services/Index";
import { Flip, ToastContainer, toast } from "react-toastify";

const Video360 = () => {
  const dispatch = useDispatch();
  const contentData = useSelector((state) => state.application.contentData);
  const assessmentData = useSelector(
    (state) => state.application.assessmentData
  );
  const [content, setContent] = useState(contentData);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e) => {
    const { name, files } = e.target;
    const duplicateObject = { ...content };
    duplicateObject[name] = files[0];
    setContent(duplicateObject);
  };

  const handleDeleteFile = () => {
    const duplicateObject = { ...content };
    duplicateObject.image = "";
    setContent(duplicateObject);
  };
  const nav = useNavigate();
  const goBack = () => {
    nav("/create-experience");
  };
  const onConfirm = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", content.image);
    formData.append("imageScript", content.imageScript);
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
        const duplicateAssessment = structuredClone(assessmentData);
        setContent({ ...duplicateObject, image: res.image });
        dispatch(ContentData({ ...duplicateObject, image: res.image }));
        duplicateAssessment[0].sessionId = res.sessionId;
        dispatch(AssessmentData(duplicateAssessment));
        setTimeout(() => {
          goBack();
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
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
        console.log(err);
      });
  };

  const handleScript = (e) => {
    const { name, value } = e.target;
    const duplicateObject = { ...content };
    duplicateObject[name] = value;
    setContent(duplicateObject);
  };
  return (
    <div className="video-wrp">
      <ToastContainer />
      <p className="title">{Labels.video360.title}</p>
      <KRUpload
        name="image"
        disabled={false}
        maxSize={10}
        errorMessage={""}
        value={content.image}
        onDelete={handleDeleteFile}
        fileType=".mp4"
        label="Upload 360 Video"
        onChange={(e) => handleFile(e)}
      />
      <KRScript
        placeholder="Script"
        value={content.imageScript}
        name="imageScript"
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
          disabled={!(content.image != "" && content.imageScript != "")}
          onClick={() => onConfirm()}
        />
      </div>
    </div>
  );
};

export default Video360;
