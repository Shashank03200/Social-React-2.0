import axios from "axios";
import { setTokens } from "./store/auth-actions";

const routeInstance = axios.create({});

// routeInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = useSelector((state) => state.user.accessToken);
//     if (accessToken) {
//       config.headers["Authorization"] = accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

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
      refreshToken
    ) {
      console.log("Response Intercepted");

      axios
        .post(`api/auth/refreshToken`, { refreshToken })
        .then((res) => res.data)
        .then((data) => {
          console.log("Data after refresh: ", data);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          return axios(originalRequest);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

export default routeInstance;
