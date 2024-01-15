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
  return {
    validateExperience,
    validateContent,
  };
};

export default Validation;
