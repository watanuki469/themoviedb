import axios from "axios";

const axiosBornToday = axios.create({
  method: 'GET',
  baseURL: 'https://imdb188.p.rapidapi.com/api/v1/getBornOn',
  
  headers: {
    // 'X-RapidAPI-Key': 'a2a95be700msha63091279c27375p19ad20jsn429dfc2eaedb',
    'X-RapidAPI-Key': 'bf4b921a74msh519a5157c18694bp13de96jsnfbc883463bfe',
    'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'

  }
});

axiosBornToday.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosBornToday.interceptors.response.use(function (response: any) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosBornToday;