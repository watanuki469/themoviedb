import { useEffect } from "react";
import { useParams } from "react-router-dom";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { setListSingleMovie } from "../../redux/reducers/singleMovie.reducer";
import { AppDispatch } from "../../redux/store";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import VideoDetail from "../common/VideoDetail";
import { setListTv } from "../../redux/reducers/tv.reducer";
import { setListTvImage } from "../../redux/reducers/tvImage.reducer";

export default function VideoTvLayout() {
    const { id } = useParams()
    const dispatch = useAppDispatch();

    const fetchTv = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiTv.tv(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListTv(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const fetchTvImages = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiTvImages.tvImage(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListTvImage(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const tvList = useAppSelector((state) => state.tv.listTv)
    const tvImageList = useAppSelector((state) => state.tvImages.listTvImage)
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchTv());
        dispatch(fetchTvImages());
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, [id]);

    const fetchSingleMovies = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiSingleMovieRequests.singleMovie(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListSingleMovie(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchSingleMovies());
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, [id]);

    return (
        <div className=" min-h-screen bg-black">
            <div className="">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                    <div className="lg:max-w-full md:w-screen mt-2">
                        <VideoDetail singleMovieList={tvList} />
                    </div>
                    <Footer />
                </div>
            </div>

        </div>
    )
}