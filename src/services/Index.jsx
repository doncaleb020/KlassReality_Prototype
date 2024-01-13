import requests from "./httpServices";

// ========================================== POST =============================================
export const TeacherLogin = async (data) => {
  return await requests.post(`auth/login`, data);
};