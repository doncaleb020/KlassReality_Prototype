import requests from "./httpServices";

// ========================================== POST =============================================
export const TeacherLogin = async (data) => {
  return await requests.post(`auth/login`, data);
};
export const CreateSession = async (data) => {
  return await requests.post(`sessions`, data);
};
export const CreateContent = async (data) => {
  return await requests.post(`content`, data);
};
export const PatchContent = async (id, data) => {
  return await requests.patch(`content/${id}`, data);
};
export const CreateAssessments = async (data) => {
  return await requests.post(`assessments`, data);
};
export const DeploySession = async (id) => {
  return await requests.patch(`sessions/deploy/${id}`);
};
export const DeleteSession = async (id) => {
  return await requests.delete(`sessions/${id}`);
};
export const GetAllExperience = async () => {
  return await requests.get(`sessions`);
};
