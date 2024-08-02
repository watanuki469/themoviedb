import axios from "axios";

const axiosClient = axios.create({
  method: 'GET',
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',  
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTNlMzg2NDFmMjEwMmI2MzE2YmY1MDdmYzEzMTEyNiIsIm5iZiI6MTcyMjU2MzIwNC42MDgwNzcsInN1YiI6IjY2YWMzOTIzYWEwZjBmM2FiNDQ0YzAzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0f7O2qBQ20TzYKrDI0bFAjNm5ED_1kPEZ1sK7lWa02o'
  },
});

axiosClient.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(function (response: any) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosClient;