import axios from "axios";

const axiosBornToday = axios.create({
  method: 'GET',
  baseURL: 'https://imdb188.p.rapidapi.com/api/v1/getBornOn',
  
  headers: {
    // 'X-RapidAPI-Key': 'a2a95be700msha63091279c27375p19ad20jsn429dfc2eaedb',
    // 'X-RapidAPI-Key': 'bf4b921a74msh519a5157c18694bp13de96jsnfbc883463bfe',
    // 'X-RapidAPI-Key': '06dc09c8a2msh41995ece2c2c3dep16114fjsnb0d714cbc4fb',
    // 'X-RapidAPI-Key': '78900685bdmsh2766c3b1a467c7ap16d250jsn1c0b4d88ed95',
    // 'X-RapidAPI-Key': '486abaa088msh3e163fec6b2d7f5p104d18jsn35204f2ab3cb',
    // 'X-RapidAPI-Key': '6185a78aa2mshb04ae8991085691p1d093bjsnae8623070f4a',
    'X-RapidAPI-Key': '17a65cb54dmshca80a66dfb2a456p12de5djsne82fc68f903b',
    // 'X-RapidAPI-Key': '2b5f974b6cmsha001208ca38d067p1f2e72jsn0f34c37a9899',

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