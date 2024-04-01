// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SwiperRow from "../../modules/SwiperRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Footer from "../common/Footer";
import Slider from "../common/Slider";
import TopBar from "../common/TopBar";
import { AppDispatch } from "../../redux/store";
import apiController from "../../redux/client/api.Controller.";
import { setListSingleMovie } from "../../redux/reducers/singleMovie.reducer";
import { useEffect } from "react";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";

export default function MovieLayout() {
    const { id } = useParams()
    const dispatch = useAppDispatch();

    const fetchcSingleMovies = () => (dispatch: AppDispatch) => {
        Promise.all([

            apiController.apiSingleMovieRequests.singleMovie(id),
        ])
            .then((data: any) => {
                console.log(data + 'meomeo');

                if (data[0]) {
                    dispatch(setListSingleMovie(data[0]));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })

            .catch((e) => {
                console.log(e);
            })
    }
    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchcSingleMovies());
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);

    }, []);

    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)

    return (
        <div className="">
            <div className="">


            </div>
        </div>

    )
}