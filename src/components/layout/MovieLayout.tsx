import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FourPhotos from "../../modules/FourPhotos";
import FourSwiperRow from "../../modules/FourSwiperRow";
import ListRow from "../../modules/ListRow";
import TwoMovieRow from "../../modules/TwoMovieRow";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { setListMovieCredit } from "../../redux/reducers/movieCredit.reducer";
import { setListMovieImage } from "../../redux/reducers/movieImage.reducer";
import { setListMovieSimilar } from "../../redux/reducers/movieSimilar.reducer";
import { setListMovieVideo } from "../../redux/reducers/movieVideo.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { setListSingleMovie } from "../../redux/reducers/singleMovie.reducer";
import { AppDispatch } from "../../redux/store";
import Footer from "../common/Footer";
import SingleMovieDetail from "../common/SingleMovieDetail";
import SingleMoviePerson from "../common/SingleMoviePerson";
import SingleMovieReview from "../common/SingleMovieReview";
import SingleMovieStoryLine from "../common/SingleMovieStoryLine";
import TopBar from "../common/TopBar";
import { toast } from "react-toastify";

export default function MovieLayout() {
    const { id } = useParams()
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)

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
    const fetchMovieVideos = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiMovieVideo.movieVideo(id),
        ])
            .then((data: any) => {
                if (data[0] && data[0]?.results) {
                    dispatch(setListMovieVideo(data[0].results));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const fetchMovieImage = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiMovieImage.movieImage(id),
        ])
            .then((data: any) => {
                if (data[0] && data[0]?.backdrops) {
                    dispatch(setListMovieImage(data[0]?.backdrops));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const fetchMovieCredit = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiMovieCredits.movieCredit(id),
        ])
            .then((data: any) => {
                if (data[0] && data[0]?.cast) {
                    dispatch(setListMovieCredit(data[0]?.cast));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const fetchMovieSimilar = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiMovieSimilar.movieSimilar(id),
        ])
            .then((data: any) => {
                if (data[0] && data[0]?.results) {
                    dispatch(setListMovieSimilar(data[0]?.results));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)
    const movieVideoList = useAppSelector((state) => state.movieVideo.listMovieVideo)
    const movieImageList = useAppSelector((state) => state.movieImage.listMovieImage)
    const movieCreditList = useAppSelector((state) => state.movieCredit.listMovieCredit)
    const movieSimilarList = useAppSelector((state) => state.movieSimilar.listMovieSimilar)

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchSingleMovies());
        dispatch(fetchMovieVideos());
        dispatch(fetchMovieImage());
        dispatch(fetchMovieCredit());
        dispatch(fetchMovieSimilar());
        dispatch(fetchMovies());
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, [id]);
    const currentDate = new Date();

    // Mảng các tên tháng
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Lấy số tháng từ ngày hiện tại (chú ý rằng tháng trong JavaScript bắt đầu từ 0)
    const currentMonth = currentDate.getMonth();

    // Lấy tên của tháng hiện tại từ mảng monthNames
    const currentMonthName = monthNames[currentMonth];

    const moreToExploreRef = useRef<HTMLDivElement>(null); // Định rõ kiểu của ref là HTMLDivElement
    const [moreToExploreHeight, setMoreToExploreHeight] = useState(0);
    useEffect(() => {
        const updateMoreToExploreHeight = () => {
            const windowHeight = window.innerHeight;
            const moreToExploreElement = moreToExploreRef.current;
            if (moreToExploreElement) { // Kiểm tra xem moreToExploreElement có tồn tại không trước khi sử dụng nó
                const moreToExploreRect = moreToExploreElement.getBoundingClientRect();
                const newHeight = Math.max(windowHeight / 2, moreToExploreRect.height);
                setMoreToExploreHeight(newHeight);
            }
        };

        // Update height initially and when window resizes
        updateMoreToExploreHeight();
        window.addEventListener('resize', updateMoreToExploreHeight);

        return () => {
            window.removeEventListener('resize', updateMoreToExploreHeight);
        };
    }, []);

    useEffect(() => {
        const storedDataString = localStorage.getItem('activity');
        let storedData: { [key: string]: any } = {};
        if (storedDataString !== null) {
            storedData = JSON.parse(storedDataString);
        }
        if (storedData[singleMovieList[0]?.id]) {
        } else {
            storedData[singleMovieList[0]?.id] = singleMovieList[0];
            localStorage.setItem('activity', JSON.stringify(storedData));
        }
    })

    return (
        <div className=" min-h-screen cursor-pointer w-full">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                    <SingleMovieDetail singleMovieList={singleMovieList} movieVideoList={movieVideoList}
                        movieCreditList={movieCreditList} movieImageList={movieImageList} />
                </div>
            </div>
            <div className="bg-white">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <div className="md:grid grid-cols-12 gap-2 w-full px-2">
                        <div className="lg:col-span-8 md-col-span-12  w-full ">
                            <div className="flex items-center py-4" onClick={() => navigate(`/video/${id}`)}>
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">Videos</h2>
                                <p className="text-lg font-bold text-gray-500 ml-4 ">{movieVideoList.length}</p>
                                <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <TwoMovieRow twoMovieRowList={movieVideoList} />
                            </div>
                            <div className="flex items-center py-4">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">Photos</h2>
                                <p className="text-lg font-bold text-gray-500 ml-4 ">{singleMovieList[0]?.images?.backdrops?.length}</p>
                                <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"
                                    onClick={() => navigate(`/image/movie/${id}`)}></i>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <FourPhotos fourPhotosList={movieImageList} />
                            </div>
                            <div className="text-white flex py-4 " onClick={() => navigate(`/fullcredits/movie/${id}`)}>
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black" id="movieCast">Top Cast</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4 ">{movieCreditList.length}</p>
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                </div>
                                <div className="flex items-center ml-auto gap-2 hover:bg-opacity-80 hover:bg-gray-500 px-2 py-2" >
                                    <i className="fa-solid fa-pencil text-black text-xl ml-2"></i>
                                    <p className="flex items-center text-xl font-bold text-black ">
                                        Edit
                                    </p>
                                </div>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <SingleMoviePerson singleMovieList={singleMovieList} movieCreditList={movieCreditList} />
                            </div>
                            <div className="text-white flex py-4 mt-4">
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">More Like This</h2>
                                </div>
                                <div className="flex items-center ml-auto gap-2" >
                                    <i className="fa-regular fa-circle-question text-black text-2xl ml-2"></i>
                                </div>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <FourSwiperRow fourSwiperRowList={movieSimilarList} mediaType={'movie'} />
                            </div>
                            <div className="text-white flex py-4 ">
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black" id="movieTrivia">Story Line</h2>
                                </div>
                                <div className="flex items-center ml-auto gap-2" >
                                    <i className="fa-solid fa-pencil text-black text-2xl ml-2"></i>
                                    <p className="flex items-center text-2xl font-bold text-black ">
                                        Edit
                                    </p>
                                </div>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <SingleMovieStoryLine singleMovieList={singleMovieList} />
                            </div>
                            <div className="text-white flex py-4 ">
                                <div className="flex items-center hover:text-yellow-300" onClick={()=>navigate(`/fullReview/movie/${id}`)}>
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black" id="movieReview">User Reviews</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4 ">{singleMovieList[0]?.reviews?.results?.length}</p>
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2"></i>
                                </div>
                                <div className="flex items-center ml-auto gap-2" >
                                    <i className="fa-solid fa-plus text-blue-500 text-sm ml-2"></i>
                                    <p className="flex items-center text-sm text-blue-500 ">
                                        Review
                                    </p>
                                </div>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <SingleMovieReview singleMovieList={singleMovieList} />
                            </div>
                        </div>
                        {/* <div className="hidden lg:block col-span-4  h-full px-2 py-2 object-none object-right-bottom">
                            <div className="flex items-center py-3">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">More tof explore</h2>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <ListRow listRowList={topRatedMovies} />
                            </div>
                            <p className="text-red w-full text-black"> Staff Picks: What to Watch in {currentMonthName}</p>
                            <p className="text-red w-full text-blue-500"> See our picks</p>
                        </div> */}
                        <div className="hidden lg:block col-span-4 h-full px-2 py-2 ">
                            <div
                                ref={moreToExploreRef}
                                style={{ height: moreToExploreHeight, overflow: 'auto' }}
                                className="bg-white flex flex-col"
                            >
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black">More to explore</h2>
                                </div>
                                <div className="lg:max-w-full md:w-screen overflow-y-auto">
                                    <ListRow listRowList={topRatedMovies} />
                                </div>
                                <p className="text-red w-full text-black"> Staff Picks: What to Watch in {currentMonthName}</p>
                                <p className="text-red w-full text-blue-500"> See our picks</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center mt-10 ">
                    <Footer />
                </div>
            </div>
        </div>
    )
}