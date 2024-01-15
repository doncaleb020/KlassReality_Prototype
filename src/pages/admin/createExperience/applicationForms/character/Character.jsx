import "./Character.css";
import KRScript from "../../../../../components/krScript/KRScript";
import KRButton from "../../../../../components/krButton/KRButton";
import Labels from "../../../../../common/Labels";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import Validation from "../../../../../common/Validation";
import { contentData as ContentData } from "../../../../../redux/features/counter/applicationSlice";

const Character = () => {
  const dispatch = useDispatch();
  const contentData = useSelector((state) => state.application.contentData);
  const [content, setContent] = useState(contentData);

  // const { validateContent } = Validation();

  // const [validate, setValidate] = useState(validateContent);

  const handleChange = (e) => {
    const value = e.target.value;
    // setValidate((prevState) => ({
    //   ...prevState,
    //   is_experience: value != "" ? true : false,
    // }));
    const duplicateObject = { ...content };

    setContent({ ...duplicateObject, script: value });
    dispatch(ContentData({ ...duplicateObject, script: value }));
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
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};

export default Character;
