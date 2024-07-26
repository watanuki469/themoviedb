import { useContext, useEffect } from "react";
import FourSwiperRow from "../../modules/FourSwiperRow";
import ListRow from "../../modules/ListRow";
import SixPeople from "../../modules/SixPeople";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { fetPopularCeleb } from "../../redux/reducers/peoplePopular.reducer";
import { fetchTrending } from "../../redux/reducers/trending.reducer";
import Footer from "../common/Footer";
import RecentlyViewed from "../common/RecentlyView";
import Slider from "../common/Slider";
import TopBar from "../common/TopBar";

export default function MainLayout() {
    const dispatch = useAppDispatch();
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const topRatedTv = useAppSelector((state) => state.movies.listTopRatedTvReq)
    const discoverTv = useAppSelector((state) => state.movies.discoverTv)
    const popularCeleb = useAppSelector((state) => state.peoplePopular.peoplePopular)

    const listNewNetflix = useAppSelector((state) => state.trending.listNewNetflix)
    const listNewMax = useAppSelector((state) => state.trending.listNewMax)
    const listNewPrime = useAppSelector((state) => state.trending.listNewPrime)

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetPopularCeleb())
        dispatch(fetchMovies())
        dispatch(fetchTrending());
        dispatch(setGlobalLoading(false));
    }, [dispatch]);
    const popularCeleb2 = [...popularCeleb]
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    return (
        <div className=" min-h-screen ">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />

                    <div className="mt-2">
                        <Slider />
                    </div>
                    <div className="text-white mt-10">
                        <p className="text-yellow-300 text-xl lg:text-3xl font-bold capitalize">
                            {translations[language]?.featuredToday}
                        </p>
                    </div>

                    <div className="lg:max-w-full w-full mt-2  ">
                        <div
                            className="lg:grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 grid gap-2 text-white ">
                            <a href="/top250Movie">
                                <ListRow listRowList={topRatedMovies} />
                                <p className="mt-2 hover:underline"> {translations[language].staffPick} </p>
                                <p className="mt-2 text-blue-500 hover:underline"> {translations[language]?.seeOurPick}</p>
                            </a>
                            <a href="/top250Tv">
                                <ListRow listRowList={mostPopularTv} />
                                <p className="mt-2 hover:underline"> {translations[language]?.tvTracker}</p>
                                <p className="mt-2 text-blue-500 hover:underline" > {translations[language]?.checkStatus}</p>
                            </a>
                        </div>
                    </div>

                    <div className="text-white flex mt-5">
                        <p className="text-yellow-300 text-xl lg:text-3xl font-bold capitalize">
                            {translations[language]?.whatToWatch}
                        </p>
                        <div className="flex items-center ml-auto flex-wrap" >
                            <a href={`/watchToWatch`}></a>
                            <p className="mr-2 text-blue-500 capitalize">{translations[language]?.moreRecommendation}</p>
                            <i className="fa-solid fa-angle-right text-blue-500"></i>
                        </div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white  capitalize">  {translations[language]?.topPick}</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="text-gray-300">
                        <h3 className="text-sm font-semibold capitalize">  {translations[language]?.topRatedMovie}   {translations[language]?.justForYou}</h3>
                    </div>

                    <div className="mt-5 overflow-hidden">
                        <FourSwiperRow fourSwiperRowList={discoverTv} mediaType={'tv'} mediaMenuItem={0}></FourSwiperRow>
                    </div>

                    <div className="flex items-center mt-5 capitalize">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">  {translations[language]?.mostPopularTv}</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="mt-8 overflow-hidden">
                        <FourSwiperRow fourSwiperRowList={mostPopularTv} mediaType={'tv'} mediaMenuItem={0}></FourSwiperRow>
                    </div>

                    <div className="flex items-center mt-8">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white capitalize">  {translations[language]?.topRatedTV}</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="text-gray-300 mt-5">
                        <h3 className="text-sm font-semibold capitalize">  {translations[language]?.topRatedTV}  {translations[language]?.justForYou}</h3>
                    </div>
                    <div className="mt-5 overflow-hidden " >
                        <FourSwiperRow fourSwiperRowList={topRatedTv} mediaType={'tv'} mediaMenuItem={0}></FourSwiperRow>
                    </div>
                    <a href={`/watchToWatch`}>
                        <div className="flex items-center mt-8 hover:text-yellow-300 text-white capitalize">
                            <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                            <h2 className="text-xl font-bold  ">  {translations[language]?.browseCollection}</h2>
                            <i className="fa-solid fa-angle-right text-xl ml-4"></i>
                        </div>
                    </a>

                    <div className="lg:max-w-full w-full mt-5 capitalize ">
                        <div
                            className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 text-white gap-4 px-2">
                            <a href={`/top250Movie`}>
                                <div className="border-2 border-white rounded-xl px-2 py-2 justify-center text-center hover:border-yellow-300 hover:text-yellow-300">
                                    {translations[language]?.watchGuide}
                                </div>
                            </a>
                            <a href={`/topPopularTv`}>
                                <div className="border-2 border-white rounded-xl px-2 py-2 justify-center text-center hover:border-yellow-300 hover:text-yellow-300">
                                    {translations[language]?.topPick}
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="text-white mt-5 capitalize">
                        <p className="text-yellow-300 text-xl lg:text-3xl font-bold">
                            {translations[language]?.moreExplore}
                        </p>
                    </div>

                    <div className="flex items-center mt-5 capitalize">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">  {translations[language]?.editorPick}</h2>
                    </div>

                    <div className="lg:max-w-full w-full mt-5  cursor-pointer capitalize">
                        <div
                            className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2 text-white ">
                            <a href={`/trending/disney`}>
                                <ListRow listRowList={listNewMax} />
                                <p className="mt-2 hover:underline"> {translations[language]?.staffPick} </p>
                                <p className="mt-2 text-blue-500 hover:underline"> {translations[language]?.seeOurPick} </p>
                            </a>
                            <a href={`/trending/hulu`}>
                                <ListRow listRowList={listNewPrime} />
                                <p className="mt-2 hover:underline"> {translations[language]?.streaming} </p>
                                <p className="mt-2 text-blue-500 hover:underline" > {translations[language]?.checkStatus} </p>
                            </a>
                            <a href={`/trending/netflix`}>
                                <ListRow listRowList={listNewNetflix} />
                                <p className="mt-2 hover:underline"> {translations[language]?.netFlix} </p>
                                <p className="mt-2 text-blue-500 hover:underline" > {translations[language]?.checkStatus} </p>
                            </a>
                        </div>
                    </div>

                    <a href={`/popularCeleb`}>
                        <div className="flex items-center mt-5 text-white hover:text-yellow-300">
                            <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                            <h2 className="text-xl font-bold capitalize ">  {translations[language]?.popularCeleb}</h2>
                            <i className="fa-solid fa-angle-right  text-xl ml-4"></i>
                        </div>
                    </a>
                    <div className="mt-5">
                     <SixPeople sixPeopleList={popularCeleb2}></SixPeople>
                    </div>

                    <div className="mt-5">
                        <RecentlyViewed />
                    </div>

                    <div className=" overflow-hidden">
                        <Footer />
                    </div>
                </div>
            </div>
        </div >

    )
}