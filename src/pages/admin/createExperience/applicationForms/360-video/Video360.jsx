import './Video360.css'
import KRScript from "../../../../../components/krScript/KRScript";
import KRButton from "../../../../../components/krButton/KRButton";
import Labels from '../../../../../common/Labels';

const Video360 = () => {
  return (
    <div className="character-wrp">
      <p className="title">{Labels.video360.title}</p>
      <KRScript placeholder="Script" />
      <div className="form-btn-wrp">
        <KRButton
          label={Labels.cancel}
          color="#fff"
          backgroundColor="#6d4444"
          style={{ border: "none" }}
        />
        <KRButton
          label={Labels.confirm}
          color="#fff"
          backgroundColor="#586d44"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};

export default Video360;
