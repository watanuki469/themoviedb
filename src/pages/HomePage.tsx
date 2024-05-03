import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../components/common/GlobalLoading";

const HomePage: React.FC = () => {
  return (
    <>
      <GlobalLoading />
      <Box
        component="main"
      >
        <Outlet />
      </Box>
    </>
  );
};

export default HomePage;
