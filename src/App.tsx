import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import GlobalLoading from './components/common/GlobalLoading';
import PageWrapper from "./components/common/PageWrapper";
import LoginLayout from './components/layout/LoginLayout';
import LoginLayoutTest from './components/layout/LoginLayoutTest';
import RegisterLayoutTest from './components/layout/RegisterLayoutTest';
import HomePage from "./pages/HomePage";
import routes from "./routes";
import RegisterLayout from './components/layout/RegisterLayout';
import { useEffect } from 'react';
import './components/layout/earth.css';

interface CircleElement extends HTMLElement {
  x: any;
  y: any;
}
function App() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor') as HTMLElement | null;
    if (!cursor) return;

    const handleMouseMove = (e: any) => {
      const x = e.pageX;
      const y = e.pageY;
      cursor.style.top = `${y}px`;
      cursor.style.left = `${x}px`;
    };

    const handleMouseOut = () => {
      cursor.style.display = 'none';
    };

    const handleMouseOver = () => {
      cursor.style.display = 'block';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);
  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll<CircleElement>(".circle");

    const colors = [
      "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
      "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
      "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060",
      "#680060", "#60005f", "#48005f", "#3d005e"
    ];

    circles.forEach(function (circle: any, index: any) {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", function (e) {
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach(function (circle: any, index: any) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    }

    animateCircles();

  }, [])

  return (
    <div>
      {/* <div className="cursor"></div> */}
      
        {[...Array(20)].map((_, i) => (
          <div key={i} className="circle"></div>
        ))}
      <GlobalLoading />
      <Routes>
        <Route path="/login" element={<LoginLayout />}></Route>
        {/* <Route path="/register1" element={<RegisterLayoutTest />}></Route> */}
        <Route path="/register" element={<RegisterLayout />}></Route>
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
