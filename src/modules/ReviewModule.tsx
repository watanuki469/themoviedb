import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/store";
import { getUserReviewMongoMovieApi, reviewMongoMovieApi } from "../redux/client/api.LoginMongo";
import { toast } from "react-toastify";
import { setListSingleUserReview, setReview } from "../redux/reducers/login.reducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export interface FourSwiperRowProps {
    setShowModal: any,
    userInfoList: any,
    mediaList: any
}

export default function ReviewModule({
    setShowModal,
    userInfoList,
    mediaList
}: FourSwiperRowProps) {
    const [content, setContent] = useState<string>('');
    const dispatch = useAppDispatch();
       
   
    return (
      <div>
        
      </div>
    );
};
