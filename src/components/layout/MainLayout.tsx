import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListRow from "../../modules/ListRow";
import SwiperRow from "../../modules/SwiperRow";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Footer from "../common/Footer";
import Slider from "../common/Slider";
import TopBar from "../common/TopBar";
import RecentlyViewed from "../common/RecentlyView";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { AppDispatch } from "../../redux/store";
import apiController from "../../redux/client/api.Controller.";
import { setPeoplePopular } from "../../redux/reducers/peoplePopular.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";


export default function MainLayout() {
    let navigate = useNavigate()
    const dispatch = useAppDispatch();
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const topRatedTv = useAppSelector((state) => state.movies.listTopRatedTvReq)
    const discoverTv = useAppSelector((state) => state.movies.discoverTv)
    const discoverMovie = useAppSelector((state) => state.movies.discoverMovies)
    const popularCeleb = useAppSelector((state) => state.peoplePopular.peoplePopular)

    const [activeSlider, setActiveSlider] = useState(6);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) {
                setActiveSlider(2);
            } else if (window.innerWidth < 768) {
                setActiveSlider(4);
            } else {
                setActiveSlider(6);
            }
        };
        window.addEventListener('resize', handleResize);
        // Call handleResize at initial load
        handleResize();

        // Clean up event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const fetPopularCeleb = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiPeoplePopular.peoplePopular()
        ])
            .then((data: any) => {
                if (data[0] && data[0].results) {
                    dispatch(setPeoplePopular(data[0]?.results));
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
        dispatch(fetPopularCeleb())
        dispatch(fetchMovies())
        // setTimeout(() => {
        dispatch(setGlobalLoading(false));
        // }, 1000);
    }, [dispatch]);
    const popularCeleb2 = [...popularCeleb]
    console.log(popularCeleb2);

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
                        <p className="text-yellow-300 text-xl lg:text-3xl font-bold">
                            {translations[language]?.featuredToday}
                        </p>
                    </div>

                    <div className="lg:max-w-full w-full mt-2  ">
                        <div
                            className="lg:grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 grid gap-2 text-white ">
                            <div>
                                <a href="/top250Movie">
                                    <ListRow listRowList={topRatedMovies} />
                                </a>
                                <p className="mt-2 hover:underline"> {translations[language].staffPick} </p>
                                <p className="mt-2 text-blue-500 hover:underline"> {translations[language]?.seeOurPick}</p>
                            </div>
                            <div>
                                <a href="/top250Tv">
                                    <ListRow listRowList={mostPopularTv} />
                                </a>
                                <p className="mt-2 hover:underline"> {translations[language]?.tvTracker}</p>
                                <p className="mt-2 text-blue-500 hover:underline" > {translations[language]?.checkStatus}</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-white flex mt-5">
                        <p className="text-yellow-300 text-xl lg:text-3xl font-bold">
                            {translations[language]?.whatToWatch}
                        </p>
                        <div className="flex items-center ml-auto flex-wrap" >
                            <p className="mr-2 text-blue-500" onClick={() => navigate('/watchToWatch')}>
                                {translations[language]?.moreRecommendation}
                            </p>
                            <i className="fa-solid fa-angle-right text-blue-500"></i>
                        </div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">  {translations[language]?.topPick}</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="text-gray-300">
                        <h3 className="text-sm font-semibold">  {translations[language]?.topRatedMovie}   {translations[language]?.justForYou}</h3>
                    </div>

                    <div className="mt-5 overflow-hidden">
                        <SwiperRow searchItemList={topRatedMovies} mediaType={'Movie'} />
                    </div>

                    <div className="flex items-center mt-5">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">  {translations[language]?.mostPopularTv}</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="mt-8 overflow-hidden">
                        <SwiperRow searchItemList={mostPopularTv} mediaType={'TV'} />
                    </div>

                    <div className="flex items-center mt-8">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">  {translations[language]?.topRatedTV}</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="text-gray-300 mt-5">
                        <h3 className="text-sm font-semibold">  {translations[language]?.topRatedTV}  {translations[language]?.justForYou}</h3>
                    </div>
                    <div className="mt-5 overflow-hidden " >
                        <SwiperRow searchItemList={topRatedTv} mediaType={'TV'} />
                    </div>
                    <div className="flex items-center mt-8" onClick={() => navigate('/watchToWatch')}>
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">  {translations[language]?.browseCollection}</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="lg:max-w-full w-full mt-5  ">
                        <div
                            className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 text-white gap-4 px-2">
                            <div onClick={() => navigate('/top250Movie')} className="border-2 border-white rounded-xl px-2 py-2 justify-center text-center hover:opacity-80">
                                <p className="text-blue-500 hover:underline"> {translations[language]?.watchGuide}</p>
                            </div>
                            <div onClick={() => navigate('/topPopularTv')} className="border-2 border-white rounded-xl px-2 py-2 justify-center text-center hover:opacity-80">
                                <p className="text-blue-500 hover:underline"> {translations[language]?.topPick}</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-white mt-5">
                        <p className="text-yellow-300 text-xl lg:text-3xl font-bold">
                            {translations[language]?.moreExplore}
                        </p>
                    </div>

                    <div className="flex items-center mt-5">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">  {translations[language]?.editorPick}</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="lg:max-w-full w-full mt-5  ">
                        <div
                            className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2 text-white ">
                            <div onClick={() => navigate('/top250Movie')}>
                                <ListRow listRowList={topRatedMovies?.slice(3)} />
                                <p className="mt-2 hover:underline"> {translations[language]?.staffPick} </p>
                                <p className="mt-2 text-blue-500 hover:underline"> {translations[language]?.seeOurPick} </p>
                            </div>
                            <div onClick={() => navigate('/trending/hulu')}>
                                <a href="/top250Tv">
                                    <ListRow listRowList={discoverMovie} />
                                </a>
                                <p className="mt-2 hover:underline"> {translations[language]?.streaming} </p>
                                <p className="mt-2 text-blue-500 hover:underline" > {translations[language]?.checkStatus} </p>
                            </div>
                            <div onClick={() => navigate('/trending/netflix')}>
                                <a href="/top250Tv">
                                    <ListRow listRowList={discoverTv} />
                                </a>
                                <p className="mt-2 hover:underline"> {translations[language]?.netFlix} </p>
                                <p className="mt-2 text-blue-500 hover:underline" > {translations[language]?.checkStatus} </p>
                            </div>

                        </div>
                    </div>

                    <div className="flex items-center mt-5" onClick={() => navigate('/popularCeleb')}>
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">  {translations[language]?.popularCeleb}</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>
                    <div className="mt-5">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={activeSlider}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper text-white "
                        >
                            {popularCeleb2?.sort((a: any, b: any) => {
                                const dateA = a?.popularity
                                const dateB = b?.popularity
                                return dateB - dateA;
                            })?.map((item: any, index: any) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="w-full justify-center  text-center items-center grid h-full mt-auto mb-auto ">
                                            <div className="w-40 h-40 object-cover rounded-full mx-auto bg-cover bg-no-repeat bg-black bg-center  items-center justify-center hover:opacity-80"
                                                style={{
                                                    backgroundImage: `url(${item?.profile_path ? `https://image.tmdb.org/t/p/w200/${item?.profile_path}` : 'https://via.placeholder.com/500x750'})`
                                                }}
                                                onClick={() => navigate(`/person/${item?.id}`)}>
                                            </div>

                                            <div className="">
                                                <p className="font-bold">{item?.name}</p>
                                                <p className="text-gray-500">{index + 1}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
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