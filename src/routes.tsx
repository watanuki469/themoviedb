import AdvancedSearchLayout from "./components/layout/AdvancedSearchLayout";
import MainLayout from "./components/layout/MainLayout";
import MovieLayout from "./components/layout/MovieLayout";
import PersonLayout from "./components/layout/PersonLayout";
import Top250MovieLayout from "./components/layout/Top250MovieLayout";
import TopBoxOffice from "./components/layout/TopBoxOffice";
import TvLayout from "./components/layout/TvLayout";
import UpComingMovieLayout from "./components/layout/UpComingMovieLayout";
import VideoLayout from "./components/layout/VideoLayout";

export const routesGen = {
  home: "/",
  movie: (id: any) => `/${id}`,
  video: (id: any) => `/video/${id}`,
  upComing: "/upComing",
  mediaDetail: (type: any, id: any) => `/${type}/${id}`,
  search: (title: any, votes: any,rating:any,genre:any) => `/${title}&${votes}&`,
  person: (id: any) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update"
};

const routes = [
  {
    index: true,
    element: <MainLayout />,
    state: "home"
  },
  {
    path: "/movie/:id",
    element: <MovieLayout />,
    state: "movie"
  },
  {
    path: "/person/:id",
    element: <PersonLayout />,
    state: "person"
  },
  {
    path: "/video/:id",
    element: <VideoLayout/>,
    state: "video"
  },
  {
    path: "/tv/:id",
    element: <TvLayout/>,
    state: "video"
  },
  {
    path: "/upComing",
    element: <UpComingMovieLayout/>,
    state: "upComing"
  },
  {
    path: "/top250Movie",
    element: <Top250MovieLayout/>,
    state: "top250Movie"
  },
  {
    path: "/topBoxOffice",
    element: <TopBoxOffice/>,
    state: "topBoxOffice"
  },
  {
    path: "/search",
    element: <AdvancedSearchLayout/>,
    state: "search"
  },

  // {
  //   path: "/:mediaType/:mediaId",
  //   element: <MediaDetail />
  // }
];

export default routes;