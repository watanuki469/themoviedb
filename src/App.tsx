import { Route, Routes } from 'react-router-dom';
import routes from "./routes";
import PageWrapper from "./components/common/PageWrapper";
import HomePage from "./pages/HomePage";
import LoginLayout from './components/layout/LoginLayout';
import { PrivateRoute } from './PrivateRoute';
import GlobalLoading from './components/common/GlobalLoading';
import { useEffect } from 'react';

function App() {
  // useEffect(() => {
  //   // Kiểm tra xem đã chạy lần đầu tiên hay không
  //   if (!localStorage.getItem('hasRunBefore')) {
  //     // Nếu là lần đầu tiên, xóa dữ liệu trong localStorage
  //     localStorage.clear();

  //     // Đặt biến flag để đánh dấu rằng đã chạy ít nhất một lần
  //     localStorage.setItem('hasRunBefore', 'true');
  //   }
  // }, []);
  return (
    <div>
      <GlobalLoading />
      <Routes>
        <Route path="/login" element={<LoginLayout />}></Route>
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
