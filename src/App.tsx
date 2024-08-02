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
    const circles = document.querySelectorAll<CircleElement>("#circle");

    const colors = [
      "#a3d5ff", "#99cfff", "#8fc9ff", "#85c3ff", "#7bbdff", "#71b7ff", "#67b1ff", "#5dabff", "#53a5ff", "#499fff", "#3f99ff", "#3593ff", "#2b8dff", "#2187ff", "#1781ff", "#0d7bff", "#0375ff", "#006fff", "#0069e6", "#0063cc", "#005db3", "#005799", "#005180"
    ];

    circles.forEach(function (circle: any, index: any) {
      circle.x = 0;
      circle.y = 0;
      circle.style.color = colors[index % colors.length];
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
        x += (nextCircle.x - x) * 0.7;
        y += (nextCircle.y - y) * 0.7;
      });

      requestAnimationFrame(animateCircles);
    }

    animateCircles();

  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className=''>
      {[...Array(20)].map((_, i) => (
        <i key={i} id="circle" className="fa-brands fa-bluesky"></i>
      ))}
      <GlobalLoading />
      <button className="scroll-to-top" onClick={scrollToTop}>↑</button>

      <Routes>
        {/* <Route path="/login" element={<LoginLayout />}></Route> */}
        {/* <Route path="/register1" element={<RegisterLayoutTest />}></Route> */}
        <Route path="/register" element={<RegisterLayout />}></Route>
        <Route path="/login" element={<LoginLayoutTest />}></Route>
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
