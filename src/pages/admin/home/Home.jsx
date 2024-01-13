import { useNavigate } from "react-router-dom";
import "./Home.css";
import Labels from "../../../common/Labels";

const Home = () => {
  const nav = useNavigate();
  const handleClick = (to) => {
    nav(to);
  };
  return (
    <div className="home_wrp">
      <button className="kr-nav-card" onClick={() => handleClick("/create-experience")}>
        {Labels.home.create}
      </button>
      <button className="kr-nav-card" onClick={() => handleClick("/view-experience")}>
        {Labels.home.view}
      </button>
    </div>
  );
};

export default Home;
