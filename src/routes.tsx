import AdvancedSearchLayout from "./components/layout/AdvancedSearchLayout";
import BrowseGenreLayout from "./components/layout/BrowseGenreLayout";
import ImageLayout from "./components/layout/ImageLayout";
import MainLayout from "./components/layout/MainLayout";
import MovieLayout from "./components/layout/MovieLayout";
import PersonLayout from "./components/layout/PersonLayout";
import ProLayout from "./components/layout/ProLayout";
import Top250MovieLayout from "./components/layout/Top250MovieLayout";
import TopBoxOffice from "./components/layout/TopBoxOffice";
import TvLayout from "./components/layout/TvLayout";
import UpComingMovieLayout from "./components/layout/UpComingMovieLayout";
import VideoLayout from "./components/layout/VideoLayout";
import VideoTvLayout from "./components/layout/VideoTvLayout";

export const routesGen = {
  home: "/",
  movie: (id: any) => `/${id}`,
  video: (id: any) => `/video/${id}`,
  upComing: "/upComing",
  pro: "/pro",
  genre: "/features/genre",
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
    path: "/videoTv/:id",
    element: <VideoTvLayout/>,
    state: "videoTv"
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
  {
    path: "/features/genre",
    element: <BrowseGenreLayout/>,
    state: "genre"
  },
  {
    path: "/IMDbPro",
    element: <ProLayout/>,
    state: "IMDbPro"
  },
  {
    path: "/image/:mediaType/:id",
    element: <ImageLayout/>,
    state: "image"
  },

  // {
  //   path: "/:mediaType/:mediaId",
  //   element: <MediaDetail />
  // }
];

export default routes;