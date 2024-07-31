import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import FourPhotos from "../../modules/FourPhotos";
import FourSwiperRow from "../../modules/FourSwiperRow";
import ListRow from "../../modules/ListRow";
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";
import TwoMovieRow from "../../modules/TwoMovieRow";
import { LanguageContext } from "../../pages/LanguageContext";
import { addRecentlyViewed } from "../../redux/client/api.LoginMongo";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchGetAllMovieReview } from "../../redux/reducers/login.reducer";
import { fetchMovieCredit } from "../../redux/reducers/movieCredit.reducer";
import { fetchMovieImage } from "../../redux/reducers/movieImage.reducer";
import { fetchMovieSimilar } from "../../redux/reducers/movieSimilar.reducer";
import { fetchMovieVideos } from "../../redux/reducers/movieVideo.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { fetchSingleMovies } from "../../redux/reducers/singleMovie.reducer";
import Footer from "../common/Footer";
import SingleMovieDetail from "../common/SingleMovieDetail";
import SingleMovieDiscuss from "../common/SingleMovieDiscuss";
import SingleMoviePerson from "../common/SingleMoviePerson";
import SingleMovieReview from "../common/SingleMovieReview";
import SingleMovieStoryLine from "../common/SingleMovieStoryLine";
import TopBar from "../common/TopBar";

export default function MovieLayout() {
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)
    const movieVideoList = useAppSelector((state) => state.movieVideo.listMovieVideo)
    const movieImageList = useAppSelector((state) => state.movieImage.listMovieImage)
    const movieCreditList = useAppSelector((state) => state.movieCredit.listMovieCredit)
    const movieSimilarList = useAppSelector((state) => state.movieSimilar.listMovieSimilar)
    const fullMovieReviewListFromApi = useAppSelector((state) => state.login.fullMovieReview);

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchSingleMovies(id));
        dispatch(fetchMovieVideos(id));
        dispatch(fetchMovieImage(id));
        dispatch(fetchMovieCredit(id));
        dispatch(fetchMovieSimilar(id));
        dispatch(fetchMovies());
        dispatch(fetchGetAllMovieReview('movie', id))
        dispatch(setGlobalLoading(false));
    }, [id]);

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
        // Convert to lowercase first to handle both uppercase and lowercase consistently
        let result = text?.toLowerCase();

        // Replace 'đ' with 'd'
        result = result?.replace(/đ/g, 'd');

        // Normalize to 'NFD' and remove diacritical marks
        result = result?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '');

        // Remove special characters except hyphens
        result = result?.replace(/[^a-z0-9\s-]/g, '');

        // Replace whitespace or multiple hyphens with a single hyphen
        result = result?.replace(/[\s-]+/g, '-');

        // Trim leading and trailing hyphens
        result = result?.trim();

        return result;
    };
    const languageString = localStorage.getItem('language');
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;
    console.log(movieImageList[0]?.backdrops);


    return (
        <div className="min-h-screen w-full">
            <div className="bg-black w-full">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                </div>
            </div>

            <div className="bg-black w-full">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <SingleMovieDetail singleMovieList={singleMovieList} movieImageList={movieImageList} />
                </div>
            </div>

            <div className="bg-white w-full cursor-pointer">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <div className="grid grid-cols-12 gap-2 w-full px-2 h-full">
                        <div className="lg:col-span-8 col-span-12 w-full">
                            <div className="">
                                {languageString === 'vi-VI' ? (
                                    <div className="text-white py-2 w-full cursor-pointer ">
                                        <a className="flex items-center" href={`/film/movie/${id}/${normalizeText(singleMovieList[0]?.title)}`}>
                                            <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                            <h2 className="text-2xl font-bold text-black capitalize ">{translations[language]?.episodes}</h2>
                                            <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                        </a>
                                        
                                        <div className="py-2 mt-4">
                                            <a href={`/film/movie/${id}/${normalizeText(singleMovieList[0]?.title)}`} className="px-4 py-2 bg-yellow-300 rounded-xl hover:opacity-90 w-fit mt-2">{translations[language]?.moreExplore}</a>
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <a href={`/video/${id}`}>
                                <div className="flex gap-2 items-center py-4 hover:text-yellow-300" >
                                    <div className="h-8 w-1 bg-yellow-300 rounded-full"></div>
                                    <h2 className="text-2xl text-black font-bold ">Videos</h2>
                                    <p className="text-lg font-bold text-gray-500">{movieVideoList?.length}</p>
                                    <i className="fa-solid fa-angle-right text-2xl"></i>
                                </div>
                            </a>
                            <a href={`/video/${id}`} className="lg:max-w-full w-full">
                                <TwoMovieRow twoMovieRowList={movieVideoList} />
                            </a>
                            <a href={`/image/movie/${id}`}>
                                <div className="flex gap-2 items-center py-4 hover:text-yellow-300 text-black">
                                    <div className="h-8 w-1 bg-yellow-300 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black">{translations[language]?.photos}</h2>
                                    <p className="text-lg font-bold text-gray-500">{singleMovieList[0]?.images?.backdrops?.length}</p>
                                    <i className="fa-solid fa-angle-right  text-2xl" ></i>
                                </div>
                            </a>
                            <a className="lg:max-w-full w-full">
                                <FourPhotos fourPhotosList={movieImageList[0]?.backdrops} />
                            </a>
                            <a href={`/fullcredits/movie/${id}`}>
                                <div className="flex items-center  py-4 w-full hover:text-yellow-300 text-black" >
                                    <div className="flex gap-2 items-center">
                                        <div className="h-8 w-1 bg-yellow-300 rounded-full"></div>
                                        <h2 className="text-2xl font-bold text-black capitalize" id="movieCast">Top {translations[language]?.star}</h2>
                                        <p className="text-lg font-bold text-gray-500">{movieCreditList?.length}</p>
                                        <i className="fa-solid fa-angle-right  text-2xl"></i>
                                    </div>
                                </div>
                            </a>
                            <div className="lg:max-w-full w-full">
                                <SingleMoviePerson singleMovieList={singleMovieList} movieCreditList={movieCreditList} />
                            </div>
                            <div className="text-white py-4 mt-4 w-full">
                                <div className="flex items-center">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full "></div>
                                    <h2 className="text-2xl font-bold text-black capitalize">{translations[language]?.moreExplore}</h2>
                                </div>
                            </div>
                            <div className="relative" >
                                <FourSwiperRow fourSwiperRowList={movieSimilarList} mediaType={'movie'} mediaMenuItem={1} />
                            </div>
                            <div className="text-white flex py-4 w-full">
                                <div className="flex items-center">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black capitalize" id="movieTrivia">{translations[language]?.storyLine}</h2>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <SingleMovieStoryLine singleMovieList={singleMovieList} />
                            </div>
                            <div className="text-white py-4 w-full">
                                <a href={`/fullReview/movie/${id}`}>
                                    <div className="flex gap-2 items-center hover:text-yellow-300 text-black" >
                                        <div className="h-8 w-1 bg-yellow-300  rounded-full"></div>
                                        <h2 className="text-2xl font-bold text-black capitalize" id="movieReview">{translations[language]?.reviews}</h2>
                                        <p className="text-lg font-bold text-gray-500 ">{singleMovieList[0]?.reviews?.results?.length}</p>
                                        <i className="fa-solid fa-angle-right  text-2xl "></i>
                                    </div>
                                </a>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <SingleMovieReview singleMovieList={singleMovieList} />
                            </div>
                            <div className="text-white py-4 w-full">
                                <a href={`/fullDiscuss/movie/${id}`}>
                                    <div className="flex gap-2 items-center hover:text-yellow-300 text-black" >
                                        <div className="h-8 w-1 bg-yellow-300 rounded-full"></div>
                                        <h2 className="text-2xl font-bold text-black capitalize" id="movieReview">{translations[language]?.discussion}</h2>
                                        <p className="text-lg font-bold text-gray-500 ">{fullMovieReviewListFromApi?.length}</p>
                                        <i className="fa-solid fa-angle-right text-2xl"></i>
                                    </div>
                                </a>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <SingleMovieDiscuss singleMovieList={fullMovieReviewListFromApi} userInfoList={userInfoList} id={id} mediaType={'movie'} />
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
                                    <h2 className="text-2xl font-bold text-black capitalize">{translations[language]?.moreExplore}</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <ListRow listRowList={topRatedMovies} />
                                </div>
                                <p className="text-red w-full text-black"> {translations[language]?.staffPick}</p>
                                <p className="text-red w-full text-blue-500"> {translations[language]?.seeOurPick}</p>
                            </div>
                            <div className="sticky top-0">
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black capitalize">{translations[language]?.moreExplore} {translations[language]?.genre}</h2>
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
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <Footer />
                </div>
            </div>
        </div>
    )
}