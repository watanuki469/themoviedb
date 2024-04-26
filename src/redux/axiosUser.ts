import axios from "axios";

const axiosUser = axios.create({
    baseURL: "https://reqres.in"
});

// Add a response interceptor
axiosUser.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosUser.interceptors.response.use(function (response: any) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosUser;

