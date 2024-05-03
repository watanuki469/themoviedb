import axios from "axios";

const axiosClient = axios.create({
  method: 'GET',
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmU1MjVmMWFkMjAxM2U1ZjJmN2M1MGY1Yjc1N2NiMyIsInN1YiI6IjY2MDBkMWQ4Mzc4MDYyMDE3YzNiNTBlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hu94QtYWw7d8x0o3IAw0UauS-Lad_MaAQZAxBfWhzdk',
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