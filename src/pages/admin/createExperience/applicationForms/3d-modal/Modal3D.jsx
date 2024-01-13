import './Modal3D.css'
import KRScript from '../../../../../components/krScript/KRScript'
import Labels from '../../../../../common/Labels'
import KRButton from '../../../../../components/krButton/KRButton'

const Modal3D = () => {
  return (
    <div className="character-wrp">
      <p className="title">{Labels.model3d.title}</p>
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
  )
}

export default Modal3D