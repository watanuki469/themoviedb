import axios, { AxiosResponse } from "axios";

const axiosIMDB8Client = axios.create({
  // method: 'GET',
  baseURL: 'https://imdb8.p.rapidapi.com/',
  headers: {
    // 'X-RapidAPI-Key': 'a2a95be700msha63091279c27375p19ad20jsn429dfc2eaedb'
    'X-RapidAPI-Key': 'd013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6',
    // 'X-RapidAPI-Key': '933035ad5dmsh113f9ac961914cap159e1djsnf468265d512f',
    // 'X-RapidAPI-Key': '0fd5447a28msh42203914a5903d6p1fea35jsn3f7192f33dff',
    // 'X-RapidAPI-Key': '994d69b14amsha92971d9137b5fap10df27jsn63fc46abced3',
    // 'X-RapidAPI-Key': '6f2fe1757dmsh5e166be4bbf928fp16f27djsn4221c0b32636',
    // 'X-RapidAPI-Key': '6cee2532c3msh9f33de7c802f892p186271jsndd0948b5586b',
    // 'X-RapidAPI-Key': '612a23d3c4mshbb508e8aff4cfc3p1139c3jsn0e4fb9b0c203',
    // 'X-RapidAPI-Key': 'e1a6c5dc00msh6edef510fc58b16p1a9b74jsnb0fa182d337c',
    // 'X-RapidAPI-Key': '3f54ade6e2msh8586b8517539237p1a5e8ajsn6004e045f9eb',
    // 'X-RapidAPI-Key': '4cfbe31fd0mshd09922ecf7cbc12p1c5a32jsn31dcbd026dfe',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
    'Content-Type': 'application/json'
  },

});

axiosIMDB8Client.interceptors.request.use(
  function (response) {
    // Do something before request is sent
    return response;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


// Add a response interceptor
axiosIMDB8Client.interceptors.response.use(function (response: AxiosResponse) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axiosIMDB8Client;