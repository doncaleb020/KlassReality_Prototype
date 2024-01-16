import { useNavigate } from "react-router-dom";
import Labels from "../../../common/Labels";
import KRButton from "../../../components/krButton/KRButton";
import KRInputBox from "../../../components/krInputBox/KRInputBox";
import "./createExperience.css";
import { CreateSession, DeploySession } from "../../../services/Index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  session as Session,
  contentData as ContentData,
  resetApplication,
} from "../../../redux/features/counter/applicationSlice";
import Validation from "../../../common/Validation";
const CreateExperience = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.application.session);
  const contentData = useSelector((state) => state.application.contentData);
  const assessmentData = useSelector(
    (state) => state.application.assessmentData
  );
  const [experience, setExperience] = useState(session);

  const { validateExperience } = Validation();

  const [validate, setValidate] = useState(validateExperience);
  const nav = useNavigate();

  const handleNavigate = (to) => {
    nav(to);
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValidate((prevState) => ({
      ...prevState,
      is_experience: value != "" ? true : false,
    }));
    const duplicateObject = { ...experience };
    duplicateObject[name] = value;
    setExperience(duplicateObject);
    dispatch(Session(duplicateObject));
  };

  const onsubmit = () => {
    CreateSession(session)
      .then((res) => {
        setExperience(res);
        dispatch(Session(res));
        setValidate((prevState) => ({
          ...prevState,
          is_sessionId: true,
        }));
        const duplicateContent = { ...contentData };
        let newContent = { ...duplicateContent, sessionId: res.id };
        dispatch(ContentData(newContent));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deployExperience = () => {
    DeploySession(experience.id)
      .then((res) => {
        console.log(res)
        dispatch(resetApplication());
        nav("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if ("id" in experience) {
      setValidate((prev) => ({
        ...prev,
        is_sessionId: true,
        is_experience: true,
      }));
    }
    if (contentData.script !== "") {
      setValidate((prev) => ({ ...prev, is_character: true }));
    }
    if (contentData.model !== "") {
      setValidate((prev) => ({ ...prev, is_model: true }));
    }
    if (contentData.image !== "") {
      setValidate((prev) => ({ ...prev, is_image: true }));
    }
    if (assessmentData[0] && assessmentData[0].id) {
      setValidate((prev) => ({ ...prev, is_assessment: true }));
    }
  }, [experience]);

  return (
    <div className="content-wrp">
      <p className="title">{Labels.content.title}</p>
      <div className="exp-input-wrp">
        <KRInputBox
          name="sectionOrClass"
          onChange={(e) => handleChange(e)}
          placeholder={Labels.content.experience}
          value={experience.sectionOrClass}
          disabled={validate.is_sessionId}
        />
        <KRButton
          label="Create"
          size="small"
          backgroundColor="var(--button-color)"
          color="#fff"
          onClick={() => onsubmit()}
          disabled={!validate.is_experience || validate.is_sessionId}
        />
      </div>
      <div className="content-btn-group">
        <KRButton
          label={Labels.content.character}
          size="large"
          onClick={() => handleNavigate("/character")}
          disabled={!validate.is_sessionId}
        />
        <KRButton
          label={Labels.content.model}
          size="large"
          onClick={() => handleNavigate("/3d-model")}
          disabled={!validate.is_character}
        />
        <KRButton
          label={Labels.content.video}
          size="large"
          onClick={() => handleNavigate("/360-video")}
          disabled={!validate.is_model}
        />
        <KRButton
          label={Labels.content.assessment}
          size="large"
          onClick={() => handleNavigate("/assessment")}
          disabled={!validate.is_image}
        />
      </div>
      <KRButton
        label={Labels.content.create_btn}
        backgroundColor="var(--button-color)"
        color="#fff"
        rounded={true}
        disabled={!validate.is_assessment}
        onClick={() => deployExperience()}
      />
    </div>
  );
};

export default CreateExperience;
