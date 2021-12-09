import axios from "axios";

const routeInstance = axios.create({});

routeInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = "Bearer " + accessToken;
    }
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

routeInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("Error", error.response.status);
    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      refreshToken &&
      !originalRequest._retry
    ) {
      console.log("Response Intercepted");
      originalRequest._retry = true;
      axios
        .post(`api/auth/refresh-token`, { refreshToken })
        .then((res) => res.data)
        .then((data) => {
          error.config.headers["Authorization"] = "Bearer " + data.accessToken;
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          console.log("New data after refresh : ", data);
          return axios.request(error.config);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

export default routeInstance;
