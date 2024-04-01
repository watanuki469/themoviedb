import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../redux/store";
import GlobalLoading from "../components/common/GlobalLoading";
import TopBar from "../components/common/TopBar";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

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
        </div>
      </div>
    </>
  );
};

export default HomePage;
