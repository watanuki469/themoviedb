// import PersonDetail from "../pages/PersonDetail";
// import FavoriteList from "../pages/FavoriteList";
// import MediaDetail from "../pages/MediaDetail";
// import MediaList from "../pages/MediaList";
// import MediaSearch from "../pages/MediaSearch";
// import PasswordUpdate from "../pages/PasswordUpdate";
// import ReviewList from "../pages/ReviewList";

import MainLayout from "./components/layout/MainLayout";
import MovieLayout from "./components/layout/MovieLayout";
import PersonLayout from "./components/layout/PersonLayout";
import TvLayout from "./components/layout/TvLayout";
import VideoLayout from "./components/layout/VideoLayout";

export const routesGen = {
  home: "/",
  movie: (id: any) => `/${id}`,
  video: (id: any) => `/video/${id}`,
  mediaDetail: (type: any, id: any) => `/${type}/${id}`,
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

  // {
  //   path: "/password-update",
  //   element: (
  //     <ProtectedPage>
  //       <PasswordUpdate />
  //     </ProtectedPage>
  //   ),
  //   state: "password.update"
  // },
  // {
  //   path: "/favorites",
  //   element: (
  //     <ProtectedPage>
  //       <FavoriteList />
  //     </ProtectedPage>
  //   ),
  //   state: "favorites"
  // },
  // {
  //   path: "/reviews",
  //   element: (
  //     <ProtectedPage>
  //       <ReviewList />
  //     </ProtectedPage>
  //   ),
  //   state: "reviews"
  // },
  // {
  //   path: "/:mediaType",
  //   element: <MediaList />
  // },
  // {
  //   path: "/:mediaType/:mediaId",
  //   element: <MediaDetail />
  // }
];

export default routes;