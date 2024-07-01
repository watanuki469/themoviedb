import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Fullitem from "../../modules/FullItem";
import ListRow from "../../modules/ListRow";
import OneRow from "../../modules/OneRow";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { fetchTrending } from "../../redux/reducers/trending.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { fetchAward } from "../../redux/reducers/award.reducer";

export default function WatchToWWatch() {
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;
    const [currentView, setCurrentView] = useState('WatchGuide');
    const switchView = (view: any) => {
        setCurrentView(view);
        window.scrollTo(0, 0)
    };

    const [activeSlider, setActiveSlider] = useState(5);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveSlider(2);
            }
            else if (window.innerWidth < 900) {
                setActiveSlider(3);
            }
            else {
                setActiveSlider(5);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const listNewNetflix = useAppSelector((state) => state.trending.listNewNetflix)
    const listNewDisney = useAppSelector((state) => state.trending.listNewDisney)
    const listNewHulu = useAppSelector((state) => state.trending.listNewHulu)
    const listNewPrime = useAppSelector((state) => state.trending.listNewPrime)
    const listNewStream = useAppSelector((state) => state.trending.listNewStream)
    const listNewMax = useAppSelector((state) => state.trending.listNewMax)
    let navigate = useNavigate()
    const topRatedMovies = useAppSelector((state) => state.award.animeList)
    const popularMovie = useAppSelector((state) => state.award.oscarList)
    const mostPopularTv = useAppSelector((state) => state.award.marvelList)
    const topRatedTv = useAppSelector((state) => state.award.emnysComedyList)
    const discoverTv = useAppSelector((state) => state.award.goldenList)
    const discoverMovie = useAppSelector((state) => state.award.blackFilmList)
    const dispatch = useAppDispatch();
    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        dispatch(fetchTrending());
        dispatch(fetchAward())
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, []);
    const currentDate = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    // Lấy số tháng từ ngày hiện tại (chú ý rằng tháng trong JavaScript bắt đầu từ 0)
    const currentMonth = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonth];
    const buttons = [
        { name: 'WatchGuide', view: `${translations[language]?.watchGuide}` },
        { name: 'FanFavorite', view: `${translations[language]?.fanFavorite}` },
        { name: 'TopPick', view: `${translations[language]?.topPick}` },
        { name: 'FromYourWatchList', view: `${translations[language]?.fromWatchList}` },
        { name: 'MostPopular', view: `${translations[language]?.topRatedTV}` },
    ];
    const remainingButtons = buttons.filter(button => button.view !== currentView);

    const renderMovieItem = () => {
        switch (currentView) {
            case 'WatchGuide':
                return (
                    <div>
                    <div className="flex items-center py-3">
                        <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="lg:text-2xl text-lg font-bold"> {translations[language]?.streaming}</h2>
                    </div>
                    {/* <p className="text-gray-400">Everything coming to Prime Video, Netflix, Disney Plus, and more</p> */}
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2  py-2 text-white ">
                        <div onClick={() => navigate(`/trending/netflix`)}>
                            <ListRow listRowList={listNewNetflix} />
                            <p className="mt-2 hover:underline">Everything New On Netflix In {currentMonthName}</p>
                            <p className="mt-2 text-blue-500 hover:underline">See our picks</p>
                        </div>
                        <div onClick={() => navigate(`/trending/disney`)}>
                            <ListRow listRowList={listNewDisney} />
                            <p className="mt-2 hover:underline">Everything New On Disney In {currentMonthName}</p>
                            <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                        </div>
                        <div onClick={() => navigate(`/trending/hulu`)}>
                            <ListRow listRowList={listNewHulu} />
                            <p className="mt-2 hover:underline">Everything New On Hulu In {currentMonthName}</p>
                            <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                        </div>
                        <div onClick={() => navigate(`/trending/prime`)}>
                            <ListRow listRowList={listNewPrime} />
                            <p className="mt-2 hover:underline">Everything New On Prime Video In {currentMonthName}</p>
                            <p className="mt-2 text-blue-500 hover:underline">See our picks</p>
                        </div>
                        <div onClick={() => navigate(`/trending/stream`)}>
                            <ListRow listRowList={listNewStream} />
                            <p className="mt-2 hover:underline">Everything New On Stream Premiere In {currentMonthName}</p>
                            <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                        </div>
                        <div onClick={() => navigate(`/trending/hulu`)}>
    
                            <ListRow listRowList={listNewMax} />
                            <p className="mt-2 hover:underline">Everything New On Max In {currentMonthName}</p>
                            <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                        </div>
                    </div>
                    <div className="w-full py-4" >
                        {translations[language]?.browseCollection}
                        <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 ">
                            <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[0]?.name}`)}>{remainingButtons[0].view}</button>
                            <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[1]?.name}`)} >{remainingButtons[1].view}</button>
                            <button></button>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
                            <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[2]?.name}`)}>{remainingButtons[2].view}</button>
                            <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[3]?.name}`)}>{remainingButtons[3].view}</button>
                            <button></button>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2  py-2 text-white ">
                        <div onClick={() => navigate(`/award/spotlight`)}>
                            <OneRow listRowList={topRatedTv} />
                            <p className="mt-2 hover:underline">5 Top Rated Will Ferrell Movies</p>
                            <p className="mt-2 text-blue-500 hover:underline">See what made the list</p>
                        </div>
                        <div onClick={() => navigate(`/award/oscars`)}>
                            <OneRow listRowList={popularMovie} />
                            <p className="mt-2 hover:underline">5 Must-See Sequels and Prequels in {currentMonthName}</p>
                            <p className="mt-2 text-blue-500 hover:underline" >See out picks</p>
                        </div>
                        <div onClick={() => navigate(`/award/starmeter`)}>
                            <OneRow listRowList={mostPopularTv} />
                            <p className="mt-2 hover:underline">5 Award-Winning Sci-Fi Picks</p>
                            <p className="mt-2 text-blue-500 hover:underline" >Stream these now</p>
                        </div>
                        <div onClick={() => navigate(`/award/spotlight`)}>
                            <OneRow listRowList={topRatedMovies} />
                            <p className="mt-2 hover:underline">5 Anime Top Rated on Netflix</p>
                            <p className="mt-2 text-blue-500 hover:underline">Stream these now</p>
                        </div>
                        <div onClick={() => navigate(`/award/ABFF`)}>
                            <OneRow listRowList={discoverTv} />
                            <p className="mt-2 hover:underline">5 Top-Rated Pixar Movies to Watch</p>
                            <p className="mt-2 text-blue-500 hover:underline" >What the video</p>
                        </div>
                        <div onClick={() => navigate(`/popularCeleb`)}>
                            <OneRow listRowList={discoverMovie} />
                            <p className="mt-2 hover:underline">5 Most Unhinged Villains</p>
                            <p className="mt-2 text-blue-500 hover:underline" >Stream these now</p>
                        </div>
                    </div>
                </div>
                )
            case 'FanFavorite':
                return (
                    <div>
                        <Fullitem searchItemList={topRatedMovies.slice(0, 10)} />
                        <div className="w-full py-4" >
                            {translations[language]?.browseCollection}
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 ">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[0]?.name}`)}>{remainingButtons[0].view}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[1]?.name}`)} >{remainingButtons[1].view}</button>
                                <button></button>
                            </div>
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[2]?.name}`)}>{remainingButtons[2].view}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[3]?.name}`)}>{remainingButtons[3].view}</button>
                                <button></button>
                            </div>
                        </div>
                        <Fullitem searchItemList={topRatedMovies.slice(10, 21)} />
                    </div>
                )
            case 'TopPick':
                return (
                    <div>
                        <Fullitem searchItemList={topRatedTv.slice(0, 10)} />
                        <div className="w-full py-4" >
                            {translations[language]?.browseCollection}
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 ">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[0]?.name}`)}>{remainingButtons[0].view}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[1]?.name}`)} >{remainingButtons[1].view}</button>
                                <button></button>
                            </div>
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[2]?.name}`)}>{remainingButtons[2].view}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[3]?.name}`)}>{remainingButtons[3].view}</button>
                                <button></button>
                            </div>
                        </div>
                        <Fullitem searchItemList={topRatedTv.slice(10, 21)} />
                    </div>
                )
            case 'FromYourWatchList':
                return (
                    <div>
                        <Fullitem searchItemList={discoverTv.slice(0, 10)} />
                        <div className="w-full py-4" >
                            {translations[language]?.browseCollection}
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 ">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[0]?.name}`)}>{remainingButtons[0].view}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[1]?.name}`)} >{remainingButtons[1].view}</button>
                                <button></button>
                            </div>
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[2]?.name}`)}>{remainingButtons[2].view}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[3]?.name}`)}>{remainingButtons[3].view}</button>
                                <button></button>
                            </div>
                        </div>
                        <Fullitem searchItemList={discoverTv.slice(10, 21)}  />
                    </div>
                )
            case 'MostPopular':
                return (
                    <div>
                        <Fullitem searchItemList={mostPopularTv.slice(0, 10)}  />
                        <div className="w-full py-4" >
                            {translations[language]?.browseCollection}
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 ">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[0]?.name}`)}>{remainingButtons[0].view}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[1]?.name}`)} >{remainingButtons[1].view}</button>
                                <button></button>
                            </div>
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[2]?.name}`)}>{remainingButtons[2].view}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis" onClick={() => switchView(`${remainingButtons[3]?.name}`)}>{remainingButtons[3].view}</button>
                                <button></button>
                            </div>
                        </div>
                        <Fullitem searchItemList={mostPopularTv.slice(10, 21)}  />
                    </div>
                )
        }
    }


    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black text-white">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />

                    <div className="mt-8 ">
                        <p className="text-xl lg:text-5xl">{translations[language]?.whatToWatch} -IMDb</p>
                    </div>

                    <Swiper
                        spaceBetween={2}
                        slidesPerView={activeSlider}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper mt-10 w-full"
                    >
                        <SwiperSlide>
                            <button onClick={() => switchView('WatchGuide')} className={`${currentView === "WatchGuide" ? "lg-col-span-text-blue-500 border-b-2 border-blue-500 w-full px-2 py-2 " : " px-2 w-full py-2 text-white"}`}>{translations[language]?.watchGuide} </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button onClick={() => switchView('FanFavorite')} className={`${currentView === "FanFavorite" ? "text-blue-500 border-b-2 border-blue-500  px-2 py-2 w-full" : " px-2 py-2 w-full text-white"}`}>{translations[language]?.fanFavorite} </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button onClick={() => switchView('TopPick')} className={`${currentView === "TopPick" ? "text-blue-500 border-b-2 border-blue-500 px-2 py-2 w-full" : "px-2 py-2 text-white w-full"}`}>{translations[language]?.topPick} </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button onClick={() => switchView('FromYourWatchList')} className={`${currentView === "FromYourWatchList" ? "text-blue-500 border-b-2 border-blue-500 w-full  px-2 py-2 " : "w-full px-2 py-2 text-white"}`}>{translations[language]?.fromWatchList}</button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button onClick={() => switchView('MostPopular')} className={`${currentView === "MostPopular" ? "text-blue-500 border-b-2 border-blue-500  px-2 py-2 w-full" : "w-full px-2 py-2 text-white"}`}>{translations[language]?.mostPopularTv}</button>
                        </SwiperSlide>
                    </Swiper>
                    <div className="w-full px-2">{renderMovieItem()}</div>

                    <div className=" overflow-hidden">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}