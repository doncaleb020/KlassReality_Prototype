import "./Character.css";
import KRScript from "../../../../../components/krScript/KRScript";
import KRButton from "../../../../../components/krButton/KRButton";
import Labels from "../../../../../common/Labels";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import Validation from "../../../../../common/Validation";
import { contentData as ContentData } from "../../../../../redux/features/counter/applicationSlice";
import { CreateContent } from "../../../../../services/Index";
import { Flip, ToastContainer, toast } from "react-toastify";

const Character = () => {
  const dispatch = useDispatch();
  const contentData = useSelector((state) => state.application.contentData);
  const [content, setContent] = useState(contentData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const duplicateObject = { ...content };

    setContent({ ...duplicateObject, script: value });
    dispatch(ContentData({ ...duplicateObject, script: value }));
  };

  const nav = useNavigate();
  const goBack = () => {
    nav("/create-experience");
  };
  const onConfirm = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("sessionId", content.sessionId);
    formData.append("script", content.script);
    CreateContent(formData)
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
        const duplicateObject = { ...content };
        setContent({ ...duplicateObject, id: res._id });
        dispatch(ContentData({ ...duplicateObject, id: res._id }));
        setLoading(false);
        setTimeout(() => {
          goBack();
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("̌Error Status Code 500", {
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
  return (
    <div className="character-wrp">
      <ToastContainer />
      <p className="title">{Labels.character.title}</p>
      <p className="sub-title">{Labels.character.sub_title}</p>
      <KRScript
        placeholder="Script"
        name="script"
        value={content.script}
        onChange={(e) => handleChange(e)}
      />
      <div className="form-btn-wrp">
        <KRButton
          label={Labels.cancel}
          color="#fff"
          backgroundColor="#6d4444"
          onClick={() => goBack()}
          style={{ border: "none" }}
        />
        <KRButton
          label={Labels.confirm}
          color="#fff"
          backgroundColor="#586d44"
          onClick={() => onConfirm()}
          disabled={!(content.script != "")}
          style={{ border: "none" }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Character;
