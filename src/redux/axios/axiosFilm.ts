import axios from "axios";

const axiosFilm = axios.create({
    baseURL: "https://ophim1.com/"
});

// Add a response interceptor
axiosFilm.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosFilm.interceptors.response.use(function (response: any) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosFilm;

