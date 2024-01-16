import moment from "moment";

const ApplicationModal = () => {
  const sessionModal = {
    sessionTimeAndDate: moment().format(),
    sessionStartedTime: moment().startOf("day").toISOString(),
    sessionEndedTime: moment().endOf("day").toISOString(),
    grade: "string",
    sectionOrClass: "",
    sessionStatus: "pending",
    subject: "string",
    feedback: "string",
    sessionDuration: 0,
  };
  const contentModal = {
    sessionId: "",
    script: "",
    model: "",
    image: "",
  };
  const assessmentModal = [
    {
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
      sessionId: "",
    },
  ];
  return {
    assessmentModal,
    contentModal,
    sessionModal,
  };
};

export default ApplicationModal;
