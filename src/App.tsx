import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import GlobalLoading from './components/common/GlobalLoading';
import PageWrapper from "./components/common/PageWrapper";
import LoginLayout from './components/layout/LoginLayout';
import LoginLayoutTest from './components/layout/LoginLayoutTest';
import RegisterLayoutTest from './components/layout/RegisterLayoutTest';
import HomePage from "./pages/HomePage";
import routes from "./routes";

function App() {

  return (
    <div>
      <GlobalLoading />
      <Routes>
        <Route path="/login" element={<LoginLayout />}></Route>
        <Route path="/register" element={<RegisterLayoutTest />}></Route>
        <Route path="/login2" element={<LoginLayoutTest />}></Route>
        <Route path="/" element={<PrivateRoute />} >
          <Route path="/" element={<HomePage />} />
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
