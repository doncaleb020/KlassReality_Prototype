import { useEffect, useState } from "react";
import KRButton from "../../../components/krButton/KRButton";
import "./ViewExperience.css";
import { DeploySession, GetAllExperience } from "../../../services/Index";
import { Flip, ToastContainer, toast } from "react-toastify";

const ViewExperience = () => {
  const [experience, setExperience] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    GetAllExperience()
      .then((res) => {
        setExperience(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleSelect = (id) => {
    if (selectedValue == id) {
      setSelectedValue(null);
    } else {
      setSelectedValue(id);
    }
  };

  const onSubmit = () => {
    DeploySession(selectedValue)
      .then(() => {
        toast.success("Experience Deployed Successfully!", {
          position: "top-right",
          autoClose: 300,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
          transition: Flip,
        });
        handleRefresh();
        setSelectedValue(null);
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
        console.log(err);
      });
  };
  return (
    <div className="view-exp-wrp">
      <ToastContainer />
      <p className="title">View Experience</p>
      <div className="exp-card-wrp">
        {experience.map((item, index) => (
          <button
            onClick={() => handleSelect(item.id)}
            key={index}
            className={`exp-card ${selectedValue == item.id ? "selected" : ""}`}
          >
            {item.sectionOrClass}
          </button>
        ))}
      </div>
      <div className="deploy-wrp">
        <KRButton
          className="deploy-btn"
          label="Deploy"
          color="#fff"
          disabled={!selectedValue}
          onClick={() => onSubmit()}
          backgroundColor="var(--button-color)"
        />
      </div>
    </div>
  );
};

export default ViewExperience;
