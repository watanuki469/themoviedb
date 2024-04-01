import { Route, Routes } from 'react-router-dom';
import routes from "./routes";
import PageWrapper from "./components/common/PageWrapper";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} >
          {routes.map((route, index) => (
            route.index ? (
              <Route
                index
                key={index}
                element={route.state ? (
                  <PageWrapper state={route.state}>{route.element}</PageWrapper>
                ) : route.element}
              />
            ) : (
              <Route
                path={route.path}
                key={index}
                element={route.state ? (
                  <PageWrapper state={route.state}>{route.element}</PageWrapper>
                ) : route.element}
              />
            )
          ))}
        </Route>
      </Routes>
    </div>

  )
}

export default App
