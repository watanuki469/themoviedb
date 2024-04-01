// import PersonDetail from "../pages/PersonDetail";
// import FavoriteList from "../pages/FavoriteList";
// import MediaDetail from "../pages/MediaDetail";
// import MediaList from "../pages/MediaList";
// import MediaSearch from "../pages/MediaSearch";
// import PasswordUpdate from "../pages/PasswordUpdate";
// import ReviewList from "../pages/ReviewList";

import MainLayout from "./components/layout/MainLayout";
import MovieLayout from "./components/layout/MovieLayout";

export const routesGen = {
  home: "/",
  movie: (id:any) => `/${id}`,
  mediaDetail: (type:any, id:any) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id:any) => `/person/${id}`,
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
  // {
  //   path: "/search",
  //   element: <MediaSearch />,
  //   state: "search"
  // },
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