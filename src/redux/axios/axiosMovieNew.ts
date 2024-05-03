import axios from "axios";

const axiosMovieNew = axios.create({
  method: 'GET',
  baseURL: 'https://imdb8.p.rapidapi.com/news/v2/',
  params: {
    category: 'MOVIE',
    first: '20'
  },
  headers: {
    // 'X-RapidAPI-Key': 'a2a95be700msha63091279c27375p19ad20jsn429dfc2eaedb',
    'X-RapidAPI-Key': '7dc4683476msh81675cd0e90bd2bp17842ejsn3357aee41f0a',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
});

axiosMovieNew.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosMovieNew.interceptors.response.use(function (response: any) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosMovieNew;