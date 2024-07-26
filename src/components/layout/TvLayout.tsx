import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FourPhotos from "../../modules/FourPhotos";
import FourSwiperRow from "../../modules/FourSwiperRow";
import ListRow from "../../modules/ListRow";
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";
import TwoMovieRow from "../../modules/TwoMovieRow";
import apiController from "../../redux/client/api.Controller.";
import { addRecentlyViewed, getFullReviewMongoMovieApi } from "../../redux/client/api.LoginMongo";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { fetchTv, setListTv } from "../../redux/reducers/tv.reducer";
import { fetchTvImages, setListTvImage } from "../../redux/reducers/tvImage.reducer";
import { AppDispatch } from "../../redux/store";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import TvDetail from "../common/TvDetail";
import TvDetailExternal from "../common/TvDetailExternal";
import TvEpisode from "../common/TvEpisode";
import TvPerson from "../common/TvPerson";
import TvReview from "../common/TvReview";
import TvStoryLine from "../common/TvStoryLine";
import { LanguageContext } from "../../pages/LanguageContext";
import { fetchGetAllMovieReview, setListFullMovieReview } from "../../redux/reducers/login.reducer";
import SingleMovieDiscuss from "../common/SingleMovieDiscuss";

export default function TvLayout() {
    const { id } = useParams()
    const dispatch = useAppDispatch();
    let navigate = useNavigate()

    const tvList = useAppSelector((state) => state.tv.listTv)
    const tvImageList = useAppSelector((state) => state.tvImages.listTvImage)
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const fullMovieReviewListFromApi = useAppSelector((state) => state.login.fullMovieReview);

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchMovies());
        dispatch(fetchTv(id));
        dispatch(fetchTvImages(id));
        dispatch(fetchGetAllMovieReview('tv', id))
        dispatch(setGlobalLoading(false));
    }, [id]);

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
            movieId: tvList[0]?.id,
            movieName: tvList[0]?.name,
            movieImg: tvList[0]?.poster_path,
            movieType: "TV",
        }))
    }, [userInfoList, tvList, dispatch])

    const normalizeText = (text: string) => {
        // Convert to lowercase first to handle both uppercase and lowercase consistently
        let result = text?.toLowerCase();

        // Replace 'đ' with 'd'
        result = result?.replace(/đ/g, 'd');

        // Normalize to 'NFD' and remove diacritical marks
        result = result?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

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
    console.log(tvImageList);


    return (
        <div className=" min-h-screen cursor-pointer max-w-full ">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center relative">
                    <TopBar />
                    <TvDetail singleTvList={tvList} singleTvImageList={tvImageList} />
                </div>
            </div>
            <div className="bg-white max-w-full ">
                <div className="w-full lg:max-w-5xl xl:max-w-6xl mx-auto aligns-center  ">
                    <div className="grid grid-cols-12 gap-2 ">
                        <div className="lg:col-span-8 col-span-12  max-w-full ">
                            {languageString === 'vi-VI' ? (
                                <div className="lg:max-w-full w-full cursor-pointer">
                                    <div className="text-white px-2 w-full ">
                                        <a href={`/film/tv/${id}/${normalizeText(tvList[0]?.name)}`}>
                                            <div className="flex items-center" >
                                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                                <h2 className="text-2xl font-bold text-black py-2">{translations[language]?.episodes}</h2>
                                                <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                            </div>
                                        </a>
                                    </div>
                                    <TvEpisode singleTvList={tvList} />
                                </div>) : (
                                <div>
                                </div>
                            )}
                            <div className="lg:max-w-full w-full px-2">
                                <a href={`/videoTv/${id}`}>
                                    <div className="text-black py-4 flex items-center hover:text-yellow-300">
                                        <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                        <h2 id="tvVideo" className="text-2xl font-bold text-black ">Videos</h2>
                                        <p className="text-lg font-bold text-gray-500 ml-4 ">{tvList[0]?.videos?.results?.length}</p>
                                        <i className="fa-solid fa-angle-right text-2xl ml-2 "></i>
                                    </div>
                                </a>
                                <div onClick={() => navigate(`/videoTv/${id}`)}>
                                    <TwoMovieRow twoMovieRowList={tvList[0]?.videos?.results} />
                                </div>
                            </div>
                            <a href={`/image/tv/${id}`}>
                                <div className="text-black hover:text-yellow-300 flex gap-2 items-center py-4 px-2 w-full">
                                    <div className="h-8 w-1 bg-yellow-300  rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">{translations[language]?.photos}</h2>
                                    <p className="text-lg font-bold text-gray-500  ">{tvImageList[0]?.backdrops?.length}</p>
                                    <i className="fa-solid fa-angle-right text-2xl "></i>
                                </div>
                            </a>

                            <div className="lg:max-w-full w-full" onClick={() => navigate(`/image/tv/${id}`)}>
                                <FourPhotos fourPhotosList={tvImageList[0]?.backdrops}></FourPhotos>
                            </div>
                            <a href={`/fullcredits/tv/${id}`}>
                                <div className="text-white flex py-4 w-full px-2 ">
                                    <div className="text-black hover:text-yellow-300 flex gap-2 items-center w-full ">
                                        <div className="h-8 w-1 bg-yellow-300 rounded-full"></div>
                                        <h2 id="tvCast" className="text-2xl font-bold text-black capitalize ">Top {translations[language]?.star}</h2>
                                        <p className="text-lg font-bold text-gray-500  ">{tvList[0]?.aggregate_credits?.cast?.length}</p>
                                        <i className="fa-solid fa-angle-right text-2xl "></i>
                                    </div>
                                </div>
                            </a>

                            <div className="lg:max-w-full w-full">
                                <TvPerson singleMovieList={tvList} />
                            </div>
                            <div className="text-white flex py-4 mt-4 px-2 w-full">
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black capitalize">{translations[language]?.moreRecommendation}</h2>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <FourSwiperRow fourSwiperRowList={tvList[0]?.similar?.results} mediaType={'tv'} mediaMenuItem={1} />
                            </div>
                            <div id="tvTrvia" className="text-white flex py-2 w-full px-2">
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black capitalize">{translations[language]?.storyLine}</h2>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <TvStoryLine tvList={tvList} />
                            </div>
                            <a href={`/fullReview/tv/${id}`}>
                                <div className="text-white flex py-4 px-2 w-full">
                                    <div className="flex gap-2 items-center hover:text-yellow-300  text-black">
                                        <div className="h-8 w-1 bg-yellow-300 rounded-full"></div>
                                        <h2 id="tvReview" className="text-2xl font-bold text-black  capitalize">{translations[language]?.reviews}</h2>
                                        <p className="text-lg font-bold text-gray-500">{tvList[0]?.reviews?.results?.length}</p>
                                        <i className="fa-solid fa-angle-right  text-2xl "></i>
                                    </div>
                                </div>
                            </a>

                            <div className="lg:max-w-full w-full">
                                <TvReview singleTvList={tvList} />
                            </div>
                            <div className="text-white flex py-4  px-2 w-full">
                                <div className="flex gap-2 items-center text-black hover:text-yellow-300 ">
                                    <div className="h-8 w-1 bg-yellow-300 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black  capitalize">{translations[language]?.moreExplore}</h2>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <TvDetailExternal tvDetailExList={tvList} />
                            </div>
                            <div className="text-white py-4 w-full">
                                <div className="flex items-center hover:text-yellow-300" onClick={() => navigate(`/fullDiscuss/tv/${id}`)}>
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black capitalize" id="movieReview">{translations[language]?.discussion}</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4">{fullMovieReviewListFromApi?.length}</p>
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2"></i>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full">
                                <SingleMovieDiscuss singleMovieList={fullMovieReviewListFromApi} userInfoList={userInfoList} id={id} mediaType={'tv'} />
                            </div>

                        </div>
                        <div className="hidden lg:block col-span-4  h-full px-2 py-2 "  >
                            <div className="flex items-center py-3" onClick={() => navigate('/top250Movie')}>
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black capitalize">{translations[language]?.moreExplore}</h2>
                            </div>
                            <div onClick={() => navigate(`/top250Movie`)}>
                                <ListRow listRowList={topRatedMovies} />
                            </div>
                            <p className="text-red w-full text-black capitalize"> {translations[language]?.staffPick}</p>
                            <p className="text-red w-full text-blue-500">{translations[language]?.seeOurPick}</p>
                            <div className="sticky top-0 right-0 left-0">
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black  capitalize">{translations[language]?.moreExplore} {translations[language]?.genre}</h2>
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
        </div >
    )
}