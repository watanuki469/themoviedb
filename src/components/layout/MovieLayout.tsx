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
import { addRecentlyViewed, recentlyViewMongoApi } from "../../redux/client/api.LoginMongo";
import { setRecentlyView } from "../../redux/reducers/login.reducer";
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";

export default function MovieLayout() {
    const { id } = useParams()
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const mostDiscoverTv = useAppSelector((state) => state.movies.discoverTv)


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

    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));

    }, []);

    useEffect(() => {
        dispatch(addRecentlyViewed({
            email: userInfoList[0],
            movieId: singleMovieList[0]?.id,
            movieName: singleMovieList[0]?.title,
            movieImg: singleMovieList[0]?.poster_path,
            movieType: "Movie",
        }))
    }, [userInfoList, singleMovieList, dispatch])
    const normalizeText = (text: string) => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')  // Loại bỏ các ký tự đặc biệt ngoại trừ dấu gạch ngang
            .replace(/[\s-]+/g, '-')       // Thay thế khoảng trắng hoặc nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
            .trim();                       // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
    };


    return (
        <div className="min-h-screen w-full">
            <div className="bg-black w-full">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                    <SingleMovieDetail singleMovieList={singleMovieList} movieVideoList={movieVideoList}
                        movieCreditList={movieCreditList} movieImageList={movieImageList} />
                </div>
            </div>
            {/* <div className="bg-white w-full ">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <div className="grid grid-cols-12 gap-2 w-full px-2 h-full">
                        <div className="lg:col-span-8 col-span-12  w-full ">
                            <div className="flex items-center py-4" onClick={() => navigate(`/video/${id}`)}>
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">Videos</h2>
                                <p className="text-lg font-bold text-gray-500 ml-4 ">{movieVideoList?.length}</p>
                                <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                            </div>
                            <div className="lg:max-w-full w-full" onClick={() => navigate(`/video/${id}`)}>
                                <TwoMovieRow twoMovieRowList={movieVideoList} />
                            </div>
                            <div className="flex items-center py-4">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">Photos</h2>
                                <p className="text-lg font-bold text-gray-500 ml-4 ">{singleMovieList[0]?.images?.backdrops?.length}</p>
                                <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"
                                    onClick={() => navigate(`/image/movie/${id}`)}></i>
                            </div>
                            <div className="lg:max-w-full w-full" onClick={() => navigate(`/image/movie/${id}`)}>
                                <FourPhotos fourPhotosList={movieImageList} />
                            </div>
                            <div className="items-center text-white flex py-4 w-screen " onClick={() => navigate(`/fullcredits/movie/${id}`)}>
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black" id="movieCast">Top Cast</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4 ">{movieCreditList?.length}</p>
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <SingleMoviePerson singleMovieList={singleMovieList} movieCreditList={movieCreditList} />
                            </div>
                            <div className="text-white py-4 mt-4 w-screen items-center"  >
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">More Like This</h2>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <FourSwiperRow fourSwiperRowList={movieSimilarList} mediaType={'Movie'} />
                            </div>
                            <div className="text-white flex py-4 w-screen ">
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black" id="movieTrivia">Story Line</h2>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <SingleMovieStoryLine singleMovieList={singleMovieList} />
                            </div>
                            <div className="text-white py-4 w-screen ">
                                <div className="flex items-center hover:text-yellow-300" onClick={() => navigate(`/fullReview/movie/${id}`)}>
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black" id="movieReview">User Reviews</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4 ">{singleMovieList[0]?.reviews?.results?.length}</p>
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2"></i>
                                </div>
                            </div>
                            <div className="lg:max-w-full  w-full ">
                                <SingleMovieReview singleMovieList={singleMovieList} />
                            </div>

                        </div>
                        <div className="hidden lg:block h-full col-span-4">
                            <div
                                ref={moreToExploreRef}
                                style={{ height: moreToExploreHeight, overflow: 'auto' }}
                                className="bg-white flex flex-col"
                            >
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black">More to explore</h2>
                                </div>
                                <div className="lg:max-w-ful w-full">
                                    <ListRow listRowList={topRatedMovies} />
                                </div>
                                <p className="text-red w-full text-black"> Staff Picks: What to Watch in {currentMonthName}</p>
                                <p className="text-red w-full text-blue-500"> See our picks</p>
                            </div>
                            <div className="sticky top-0">
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black">Top Rated Movies by Genre</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <TopRatedMovieByGenre />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="bg-white w-full">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <div className="grid grid-cols-12 gap-2 w-full px-2 h-full">
                        <div className="lg:col-span-8 col-span-12 w-full">
                            <div className="text-white py-2 w-full ">
                                <div className="flex items-center"
                                    onClick={() => navigate(`/film/movie/${id}/${normalizeText(singleMovieList[0]?.title)}`)} >
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">Episodes</h2>
                                    {/* <p className="text-lg font-bold text-gray-500 ml-4 ">{typeof totalEpisodes === 'number' ? totalEpisodes : 'Loading...'}</p> */}
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                </div>
                                <div  onClick={() => navigate(`/film/movie/${id}/${normalizeText(singleMovieList[0]?.title)}`)}  className="px-4 py-2 bg-yellow-300 rounded-md hover:opacity-90 w-fit mt-2">Watch Episodes</div>
                            </div>
                            <div className="flex items-center py-4" onClick={() => navigate(`/video/${id}`)}>
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black">Videos</h2>
                                <p className="text-lg font-bold text-gray-500 ml-4">{movieVideoList?.length}</p>
                                <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                            </div>
                            <div className="lg:max-w-full w-full" onClick={() => navigate(`/video/${id}`)}>
                                <TwoMovieRow twoMovieRowList={movieVideoList} />
                            </div>
                            <div className="flex items-center py-4">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black">Photos</h2>
                                <p className="text-lg font-bold text-gray-500 ml-4">{singleMovieList[0]?.images?.backdrops?.length}</p>
                                <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300" onClick={() => navigate(`/image/movie/${id}`)}></i>
                            </div>
                            <div className="lg:max-w-full w-full" onClick={() => navigate(`/image/movie/${id}`)}>
                                <FourPhotos fourPhotosList={movieImageList} />
                            </div>
                            <div className="flex items-center text-white py-4 w-full" onClick={() => navigate(`/fullcredits/movie/${id}`)}>
                                <div className="flex items-center">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black" id="movieCast">Top Cast</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4">{movieCreditList?.length}</p>
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <SingleMoviePerson singleMovieList={singleMovieList} movieCreditList={movieCreditList} />
                            </div>
                            <div className="text-white py-4 mt-4 w-full">
                                <div className="flex items-center">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black">More Like This</h2>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <FourSwiperRow fourSwiperRowList={movieSimilarList} mediaType={'Movie'} />
                            </div>
                            <div className="text-white flex py-4 w-full">
                                <div className="flex items-center">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black" id="movieTrivia">Story Line</h2>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <SingleMovieStoryLine singleMovieList={singleMovieList} />
                            </div>
                            <div className="text-white py-4 w-full">
                                <div className="flex items-center hover:text-yellow-300" onClick={() => navigate(`/fullReview/movie/${id}`)}>
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black" id="movieReview">User Reviews</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4">{singleMovieList[0]?.reviews?.results?.length}</p>
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2"></i>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <SingleMovieReview singleMovieList={singleMovieList} />
                            </div>
                        </div>
                        <div className="hidden lg:block col-span-4">
                            <div
                                ref={moreToExploreRef}
                                style={{ height: moreToExploreHeight, overflow: 'auto' }}
                                className="bg-white flex flex-col"
                            >
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black">More to explore</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <ListRow listRowList={topRatedMovies} />
                                </div>
                                <p className="text-red w-full text-black"> Staff Picks: What to Watch in {currentMonthName}</p>
                                <p className="text-red w-full text-blue-500"> See our picks</p>
                            </div>
                            <div className="sticky top-0">
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black">Top Rated Movies by Genre</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <TopRatedMovieByGenre />
                                </div>
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