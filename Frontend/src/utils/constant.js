const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://job-portal-sbnz.onrender.com";

export const USER_API_END_POINT = `${BASE_URL}/api/v1/users`;
export const JOB_API_END_POINT = `${BASE_URL}/api/v1/jobs`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/v1/applications`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/companies`;
