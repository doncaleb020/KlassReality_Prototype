import { useNavigate } from "react-router-dom";
import Labels from "../../../common/Labels";
import KRButton from "../../../components/krButton/KRButton";
import KRInputBox from "../../../components/krInputBox/KRInputBox";
import "./createExperience.css";
const CreateExperience = () => {
  const nav = useNavigate();
  const handleNavigate = (to) => {
    nav(to);
  };
  const onsubmit = () => {};
  return (
    <div className="content-wrp">
      <p className="title">{Labels.content.title}</p>
      <div className="exp-input-wrp">
        <KRInputBox name="experience" placeholder={Labels.content.experience} />
      </div>
      <div className="content-btn-group">
        <KRButton
          label={Labels.content.character}
          size="large"
          onClick={() => handleNavigate("/character")}
        />
        <KRButton
          label={Labels.content.model}
          size="large"
          onClick={() => handleNavigate("/3d-modal")}
        />
        <KRButton
          label={Labels.content.image}
          size="large"
          onClick={() => handleNavigate("/360-image")}
        />
        <KRButton
          label={Labels.content.assessment}
          size="large"
          onClick={() => handleNavigate("/assessment")}
        />
      </div>
      <KRButton
        label={Labels.content.create_btn}
        backgroundColor="var(--button-color)"
        color="#fff"
        rounded={true}
        onClick={() => onsubmit()}
      />
    </div>
  );
};

export default CreateExperience;
