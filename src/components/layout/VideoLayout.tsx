import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchSingleMovies } from "../../redux/reducers/singleMovie.reducer";
import { fetchTv } from "../../redux/reducers/tv.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import VideoDetail from "../common/VideoDetail";

export default function VideoLayout() {
    const { id } = useParams()
    const { mediaType } = useParams()
    const dispatch = useAppDispatch();

    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)
    const tvList = useAppSelector((state) => state.tv.listTv)

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        if (mediaType === 'movie') {
            dispatch(fetchSingleMovies(id))
        }
        else{
            dispatch(fetchTv(id));
        }

        dispatch(setGlobalLoading(false));
    }, [id,mediaType]);

    return (
        <div className=" min-h-screen bg-black">
            <div className="">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                    <div className="lg:max-w-full w-screen mt-2">
                        <VideoDetail singleMovieList={mediaType === 'movie' ? singleMovieList : tvList} />
                    </div>
                    <Footer />
                </div>
            </div>

        </div>
    )
}