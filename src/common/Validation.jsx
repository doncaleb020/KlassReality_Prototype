const Validation = () => {
  const validateExperience = {
    is_experience: false,
    is_sessionId: false,
    is_character: false,
    is_model: false,
    is_image: false,
    is_assessment: false,
  };
  const validateContent = {
    sessionId: "",
    script: "",
    model: "",
    image: "",
  };

  const validateAssessment = [
    {
      question: false,
      options: [
        {
          text: false,
          isCorrect: false,
        },
        {
          text: false,
          isCorrect: false,
        },
        {
          text: false,
          isCorrect: false,
        },
        {
          text: false,
          isCorrect: false,
        },
      ],
    },
  ];

  return {
    validateExperience,
    validateContent,
    validateAssessment
  };
};

export default Validation;
