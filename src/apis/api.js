import axios from "axios";

const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000, // max wait period for api response
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const loginApi = async ({ email, password }) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerApi = async ({ email, password, organizationName }) => {
  const res = await api.post("/auth/register", {
    email,
    password,
    organizationName,
  });
  return res.data;
};

export const fetchProfileApi = async () => {
  const res = await api.get("/auth/profile");
  return res.data.data;
};

export const fetchProjectApi = async () => {
  const res = await api.get("/projects");
  return res.data;
};

export const fetchTasksApi = async ({ projectId, page = 1, limit = 10 }) => {
  const res = await api.get("/tasks", {
    params: {
      projectId,
      page,
      limit,
    },
  });
  return res.data;
};

export const updateTasksApi = async ({ id, status }) => {
  const res = await api.patch(`/tasks/${id}`, { status });
  return res.data.data;
};

export default api;
