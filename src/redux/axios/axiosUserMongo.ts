import axios from "axios";

const axiosUserMongo = axios.create({
    baseURL: "https://the-movie-db-api-2.vercel.app"
});

// Add a response interceptor
axiosUserMongo.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosUserMongo.interceptors.response.use(function (response: any) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosUserMongo;

