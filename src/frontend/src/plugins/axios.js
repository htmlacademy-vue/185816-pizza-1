import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/",
});

const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    axiosInstance.$notifier.error(
      error?.response?.data?.error?.message || defaultMessage
    );
    return Promise.reject(error);
  }
);

export default axiosInstance;
