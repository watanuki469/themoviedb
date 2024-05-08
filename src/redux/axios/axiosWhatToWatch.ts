import axios from "axios";

const languageString = localStorage.getItem('language');
const axiosWhatToWatch = axios.create({
  method: 'GET',
  baseURL: 'https://imdb188.p.rapidapi.com/api/v1',
  params: {country: `${languageString?.slice(3)}`},
  headers: {
    // 'X-RapidAPI-Key': 'a2a95be700msha63091279c27375p19ad20jsn429dfc2eaedb',
    // 'X-RapidAPI-Key': '6185a78aa2mshb04ae8991085691p1d093bjsnae8623070f4a',
    'X-RapidAPI-Key': 'bf4b921a74msh519a5157c18694bp13de96jsnfbc883463bfe',
    // 'X-RapidAPI-Key': '06dc09c8a2msh41995ece2c2c3dep16114fjsnb0d714cbc4fb',
    'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'

  },
});

axiosWhatToWatch.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosWhatToWatch.interceptors.response.use(function (response: any) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosWhatToWatch;