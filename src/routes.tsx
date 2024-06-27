import { ActivityLayout } from "./components/layout/ActivityLayout";
import AdvancedSearchLayout from "./components/layout/AdvancedSearchLayout";
import BrowseGenreLayout from "./components/layout/BrowseGenreLayout";
import CastCrewLayout from "./components/layout/CastCrewLayout";
import CelebNewLayout from "./components/layout/CelebNewLayout";
import ChangeLayoutTest from "./components/layout/ChangePasswordLayout";
import { FavoriteListLayout } from "./components/layout/FavoriteListLayout";
import FilmLayout from "./components/layout/FilmLayout";
import ImageLayout from "./components/layout/ImageLayout";
import KeywordLayout from "./components/layout/KeywordLayout";
import LoginLayoutTest from "./components/layout/LoginLayoutTest";
import MainLayout from "./components/layout/MainLayout";
import MovieLayout from "./components/layout/MovieLayout";
import MovieNewLayout from "./components/layout/MovieNewLayout";
import OscarLayout from "./components/layout/OscarLayout";
import PersonLayout from "./components/layout/PersonLayout";
import PopularCelebLayout from "./components/layout/PopularCelebLayout";
import ProLayout from "./components/layout/ProLayout";
import { RatingLayout } from "./components/layout/RatingLayout";
import RegisterLayoutTest from "./components/layout/RegisterLayoutTest";
import Top250MovieLayout from "./components/layout/Top250MovieLayout";
import Top250TvLayout from "./components/layout/Top250TvLayout";
import TopBoxOffice from "./components/layout/TopBoxOffice";
import TopPopularTvLayout from "./components/layout/TopPopularTvLayout";
import TrendingLayout from "./components/layout/TrendingLayout";
import TvLayout from "./components/layout/TvLayout";
import TvNewLayout from "./components/layout/TvNewLayout";
import UpComingMovieLayout from "./components/layout/UpComingMovieLayout";
import UserReviewLayout from "./components/layout/UserReviewLayout";
import VideoLayout from "./components/layout/VideoLayout";
import VideoTvLayout from "./components/layout/VideoTvLayout";
import { WatchListLayout } from "./components/layout/WatchListLayout";
import { WatchListLayout2 } from "./components/layout/WatchListLayout2";
import WatchToWWatch from "./components/layout/WatchToWatchLayout";
import WhatOnTvStream from "./components/layout/WhatOnTvStream";

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
    element: <VideoLayout />,
    state: "video"
  },
  {
    path: "/videoTv/:id",
    element: <VideoTvLayout />,
    state: "videoTv"
  },
  {
    path: "/tv/:id",
    element: <TvLayout />,
    state: "video"
  },
  {
    path: "/upComing",
    element: <UpComingMovieLayout />,
    state: "upComing"
  },
  {
    path: "/top250Movie",
    element: <Top250MovieLayout />,
    state: "top250Movie"
  },
  {
    path: "/top250Tv",
    element: <Top250TvLayout />,
    state: "top250Tv"
  },
  {
    path: "/topPopularTv",
    element: <TopPopularTvLayout />,
    state: "topPopularTv"
  },
  {
    path: "/whatOnTv",
    element: <WhatOnTvStream />,
    state: "whatOnTv"
  },
  {
    path: "/topBoxOffice",
    element: <TopBoxOffice />,
    state: "topBoxOffice"
  },
  {
    path: "/search",
    element: <AdvancedSearchLayout />,
    state: "search"
  },
  {
    path: "/features/genre",
    element: <BrowseGenreLayout />,
    state: "genre"
  },
  {
    path: "/IMDbPro",
    element: <ProLayout />,
    state: "IMDbPro"
  },
  {
    path: "/image/:mediaType/:id",
    element: <ImageLayout />,
    state: "image"
  },
  {
    path: "/fullcredits/:mediaType/:id",
    element: <CastCrewLayout />,
    state: "fullcredits"
  },
  {
    path: "/fullReview/:mediaType/:id",
    element: <UserReviewLayout />,
    state: "fullReview"
  },
  {
    path: "/news/movie",
    element: <MovieNewLayout />,
    state: "movieNew"
  },

  {
    path: "/news/tv",
    element: <TvNewLayout />,
    state: "tvNew"
  },

  {
    path: "/news/celeb",
    element: <CelebNewLayout />,
    state: "celebNew"
  },
  {
    path: "/popularCeleb",
    element: <PopularCelebLayout />,
    state: "popularCeleb"
  },
  {
    path: "/trending/:type",
    element: <TrendingLayout />,
    state: "trending"
  },
  {
    path: "/keyword/:mediaType/:id/:keyword",
    element: <KeywordLayout />,
    state: "keyword"
  },
  {
    path: "/award/oscars",
    element: <OscarLayout />,
    state: "oscars"
  },
  

  // {
  //   path: "/watchList",
  //   element: <WatchListLayout />,
  //   state: "watchList"
  // },
  {
    path: "/watchList2",
    element: <WatchListLayout2 />,
    state: "watchList"
  },
  {
    path: "/favoriteList",
    element: <FavoriteListLayout />,
    state: "FavoriteList"
  },

  {
    path: "/activity",
    element: <ActivityLayout />,
    state: "activity"
  },
  {
    path: "/rating",
    element: <RatingLayout />,
    state: "rating"
  },
  {
    path: "/test",
    element: <LoginLayoutTest />,
    state: "test"
  },
  {
    path: "/changePassword",
    element: <ChangeLayoutTest />,
    state: "test"
  },
  {
    path: "/watchToWatch",
    element: <WatchToWWatch />,
    state: "watchToWatch"
  },
  {
    path: "/film/:mediaType/:id/:name",
    element: <FilmLayout />,
    state: "film"
  },

];

export default routes;