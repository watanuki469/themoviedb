import axios from "axios";

const axiosTvNew = axios.create({
  method: 'GET',
  baseURL: 'https://imdb8.p.rapidapi.com/news/v2/get-by-category',
  params: {
    category: 'TV',
    first: '20'
  },
  headers: {
    // 'X-RapidAPI-Key': 'a2a95be700msha63091279c27375p19ad20jsn429dfc2eaedb',
    'X-RapidAPI-Key': '14ff73caa5msh0f564971b93e7f9p170b30jsn3c532fbc86cb',
    //  'X-RapidAPI-Key': 'd013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
});

axiosTvNew.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosTvNew.interceptors.response.use(function (response: any) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosTvNew;