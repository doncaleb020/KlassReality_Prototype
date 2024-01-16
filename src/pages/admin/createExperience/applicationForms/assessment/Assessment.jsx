import { useNavigate } from "react-router-dom";
import Labels from "../../../../../common/Labels";
import KRButton from "../../../../../components/krButton/KRButton";
import "./Assessment.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { assessmentData as AssessmentData } from "../../../../../redux/features/counter/applicationSlice";
import KRCheckBox from "../../../../../components/krCheckbox/KRCheckBox";
import { CreateAssessments } from "../../../../../services/Index";

const Assessment = () => {
  const assessmentData = useSelector(
    (state) => state.application.assessmentData
  );
  const dispatch = useDispatch();
  const [assessment, setAssessment] = useState(assessmentData);
  const [disabled, setDisabled] = useState(true);
  const nav = useNavigate();

  const goBack = () => {
    nav("/create-experience");
  };

  const handleDelete = () => {
    if (assessment.length > 1) {
      const updatedAssessment = assessment.slice(0, assessment.length - 1);
      setAssessment(updatedAssessment);
      dispatch(AssessmentData(updatedAssessment));
    }
  };

  const onConfirm = () => {
    CreateAssessments(assessment)
      .then((res) => {
        setAssessment(res);
        dispatch(AssessmentData(res));
        goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e, index, ansIndex) => {
    const { name, value } = e.target;
    const duplicateArray = structuredClone(assessment);
    if (name === "question") {
      duplicateArray[index][name] = value;
    } else if (name === "isCorrect") {
      duplicateArray[index].options[ansIndex][name] = value;
    } else {
      duplicateArray[index].options[ansIndex].text = value;
    }
    setAssessment(duplicateArray);
    dispatch(AssessmentData(duplicateArray));
  };

  const createNewQuestion = () => {
    return {
      question: "",
      options: [
        {
          text: "",
          isCorrect: false,
        },
        {
          text: "",
          isCorrect: false,
        },
        {
          text: "",
          isCorrect: false,
        },
        {
          text: "",
          isCorrect: false,
        },
      ],
      sessionId: assessmentData[0].sessionId,
    };
  };
  useEffect(() => {
    const isAllValid = assessment.every((item) => {
      const isQuestionValid =
        item.question.trim() !== "" && item.question.length > 5;
      const isCorrectValid = item.options.some(
        (ans) => ans.isCorrect
      );
      const isTextValid = item.options.every(
        (ans) => ans.text.trim() !== ""
      );
      return isQuestionValid && isTextValid && isCorrectValid;
    });

    setDisabled(!isAllValid);
  }, [assessment]);

  const AddNewQuestion = () => {
    const duplicateQuestion = createNewQuestion();
    setAssessment([...assessment, duplicateQuestion]);
  };
  return (
    <div className="assessment-wrp">
      <p className="title">Assessment</p>
      {assessment.map((asses, index) => (
        <div className="mcq-qrp" key={index}>
          <p className="sub-title">MCQ {index + 1}</p>
          <div className="que-wrp">
            <p className="que-title">Question {index + 1}</p>
            <input
              name="question"
              value={asses.question}
              placeholder="Enter the question here ............"
              onChange={(e) => handleChange(e, index)}
              className="que-input"
            />
          </div>
          <div className="ans-wrp">
            {asses.options.map((ans, i) => (
              <div className="ans" key={i}>
                <p>{i + 1})</p>
                <input
                  value={ans.text}
                  onChange={(e) => handleChange(e, index, i)}
                  className="ans-input"
                />
                <KRCheckBox
                  name="isCorrect"
                  onchange={(e) => handleChange(e, index, i)}
                  value={ans.isCorrect}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="form-btn-wrp">
        <KRButton
          label="Delete"
          backgroundColor="red"
          color="#fff"
          style={{ border: "none" }}
          onClick={() => handleDelete()}
        />
        <KRButton
          label="New Question"
          backgroundColor="#586d44"
          color="#fff"
          style={{ border: "none" }}
          onClick={() => AddNewQuestion()}
        />
      </div>
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
          disabled={disabled}
          onClick={() => onConfirm()}
        />
      </div>
    </div>
  );
};

export default Assessment;
