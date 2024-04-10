import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TwoMovieRow from "../../modules/TwoMovieRow";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListMovieCredit } from "../../redux/reducers/movieCredit.reducer";
import { setListMovieImage } from "../../redux/reducers/movieImage.reducer";
import { setListMovieVideo } from "../../redux/reducers/movieVideo.reducer";
import { setListSingleMovie } from "../../redux/reducers/singleMovie.reducer";
import { AppDispatch } from "../../redux/store";
import SingleMovieDetail from "../common/SingleMovieDetail";
import SingleMoviePerson from "../common/SingleMoviePerson";
import TopBar from "../common/TopBar";
import SwiperRow from "../../modules/SwiperRow";
import Footer from "../common/Footer";
import { setListMovieSimilar } from "../../redux/reducers/movieSimilar.reducer";
import FourSwiperRow from "../../modules/FourSwiperRow";
import SingleMovieStoryLine from "../common/SingleMovieStoryLine";
import SingleMovieReview from "../common/SingleMovieReview";
import ListRow from "../../modules/ListRow";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import FourPhotos from "../../modules/FourPhotos";
import VideoDetail from "../common/VideoDetail";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";

export default function VideoLayout() {
    const { id } = useParams()
    const dispatch = useAppDispatch();
    let navigate = useNavigate()

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
                        <VideoDetail singleMovieList={singleMovieList} />
                    </div>
                    <Footer />
                </div>
            </div>

        </div>
    )
}