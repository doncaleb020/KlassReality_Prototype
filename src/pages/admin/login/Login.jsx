import { useState } from "react";
import Labels from "../../../common/Labels";
import KRButton from "../../../components/krButton/KRButton";
import KRInputBox from "../../../components/krInputBox/KRInputBox";
import { TeacherLogin } from "../../../services/Index";
import "./Login.css";
import { useLocalStorage } from "../../../redux/useLocalStorage";
import { useDispatch } from "react-redux";
import {
  accessToken,
  refreshToken,
  user,
} from "../../../redux/features/counter/adminSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();

  const [, setAccessToken] = useLocalStorage("accessToken", null);
  const [, setRefreshToken] = useLocalStorage("refreshToken", null);
  const [, setUserData] = useLocalStorage("user", null);
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleCredentials = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    TeacherLogin(credentials)
      .then((res) => {
        setAccessToken(res.tokens.access.token);
        dispatch(accessToken(res.tokens.access.token));

        setRefreshToken(res.tokens.refresh.token);
        dispatch(refreshToken(res.tokens.refresh.token));

        setUserData(res.user);
        dispatch(user(res.user));

        nav("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login_wrapper">
      <p className="title">{Labels.login.title}</p>
      <div className="login_input_wrp">
        <KRInputBox
          name="email"
          value={credentials.email}
          placeholder={Labels.login.username}
          onChange={(e) => handleCredentials(e)}
          type="text"
        />
        <KRInputBox
          name="password"
          value={credentials.password}
          placeholder={Labels.login.password}
          onChange={(e) => handleCredentials(e)}
          type="password"
        />
      </div>
      <KRButton
        label={Labels.login.loginBtnTitle}
        onClick={onSubmit}
        rounded={true}
        backgroundColor="var(--button-color)"
        color="#fff"
      />
    </div>
  );
};

export default Login;
