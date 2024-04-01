import { Box } from "@mui/material";
import React from "react";
// import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../components/common/GlobalLoading";
import TopBar from "../components/common/TopBar";
import Footer from "../components/common/Footer";

const HomePage: React.FC = () => {
  // const dispatch = useDispatch();

  return (
    <>
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}

      <div className="bg-black min-h-screen">
        <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
          <TopBar />
          <Box
            component="main"
          // flexGrow={1}
          >
            <Outlet />
          </Box>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
