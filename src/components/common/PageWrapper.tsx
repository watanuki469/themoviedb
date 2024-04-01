import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/reducers/appStateSlice";

interface PageWrapperProps {
  state: string; // Kiểu của state có thể thay đổi tùy thuộc vào yêu cầu của ứng dụng
  children: ReactNode; // Sử dụng kiểu ReactNode cho thuộc tính children
}

const PageWrapper: React.FC<PageWrapperProps> = ({ state, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return (
    <>
      {children}
    </>
  );
};

export default PageWrapper;
