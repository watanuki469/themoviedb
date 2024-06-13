import { useEffect, useState } from "react";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FanFavorite from "../common/FanFavorite";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { fetchTrending } from "../../redux/reducers/trending.reducer";
import ListRow from "../../modules/ListRow";
import WatchGuide from "../../modules/WatchGuide";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import SwiperRow from "../../modules/SwiperRow";
import OneRow from "../../modules/OneRow";
import Fullitem from "../../modules/FullItem";

export default function WatchToWWatch() {
    const [currentView, setCurrentView] = useState('FanFavorite');
    const switchView = (view: any) => {
        setCurrentView(view);
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
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const popularMovie = useAppSelector((state) => state.movies.listMoviesPopular)
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const topRatedTv = useAppSelector((state) => state.movies.listTopRatedTvReq)
    const discoverTv = useAppSelector((state) => state.movies.discoverTv)
    const discoverMovie = useAppSelector((state) => state.movies.discoverMovies)
    const dispatch = useAppDispatch();
    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        dispatch(fetchTrending());
        dispatch(fetchMovies())
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
        { name: 'Watch Guide', view: 'WatchGuide' },
        { name: 'Fan Favorite', view: 'FanFavorite' },
        { name: 'Top Pick', view: 'TopPick' },
        { name: 'From Your WatchList', view: 'FromYourWatchList' },
        { name: 'Most Popular', view: 'MostPopular' },
    ];
    const remainingButtons = buttons.filter(button => button.view !== currentView);

    const renderMovieItem = () => {
        switch (currentView) {
            case 'WatchGuide':
                return (
                    <WatchGuide
                        listNewDisney={listNewDisney}
                        listNewHulu={listNewHulu}
                        listNewMax={listNewMax}
                        listNewNetflix={listNewNetflix}
                        listNewPrime={listNewPrime}
                        listNewStream={listNewStream}
                        topRatedMovies={topRatedMovies}
                        popularMovie={popularMovie}
                        mostPopularTv={mostPopularTv}
                        topRatedTv={topRatedTv}
                        discoverTv={discoverTv}
                        discoverMovie={discoverMovie}
                    />
                )
            case 'FanFavorite':
                return (
                    <div>
                        <Fullitem searchItemList={topRatedMovies.slice(0, 10)} mediaType={'movie'} />
                        <div className="w-full py-4" >
                            Browse these IMDb collections to find the perfect next movie or TV show to watch
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 ">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[0].name}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[1].name}</button>
                                <button></button>
                            </div>
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[2].name}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[3].name}</button>
                                <button></button>
                            </div>
                        </div>
                        <Fullitem searchItemList={topRatedMovies.slice(11, 21)} mediaType={'movie'} />
                    </div>
                )
            case 'TopPick':
                return (
                    <div>
                        <Fullitem searchItemList={topRatedTv.slice(0, 10)} mediaType={'tv'} />
                        <div className="w-full py-4" >
                            Browse these IMDb collections to find the perfect next movie or TV show to watch
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 ">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[0].name}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[1].name}</button>
                                <button></button>
                            </div>
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[2].name}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[3].name}</button>
                                <button></button>
                            </div>
                        </div>
                        <Fullitem searchItemList={topRatedTv.slice(11, 21)} mediaType={'tv'} />
                    </div>
                )
            case 'FromYourWatchList':
                return (
                    <div>
                        <Fullitem searchItemList={discoverTv.slice(0, 10)} mediaType={'tv'} />
                        <div className="w-full py-4" >
                            Browse these IMDb collections to find the perfect next movie or TV show to watch
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 ">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[0].name}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[1].name}</button>
                                <button></button>
                            </div>
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[2].name}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[3].name}</button>
                                <button></button>
                            </div>
                        </div>
                        <Fullitem searchItemList={discoverTv.slice(11, 21)} mediaType={'tv'} />
                    </div>
                )
            case 'MostPopular':
                return (
                    <div>
                        <Fullitem searchItemList={mostPopularTv.slice(0, 10)} mediaType={'tv'} />
                        <div className="w-full py-4" >
                            Browse these IMDb collections to find the perfect next movie or TV show to watch
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 ">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[0].name}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[1].name}</button>
                                <button></button>
                            </div>
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[2].name}</button>
                                <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[3].name}</button>
                                <button></button>
                            </div>
                        </div>
                        <Fullitem searchItemList={mostPopularTv.slice(11, 21)} mediaType={'tv'} />
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
                        <p className="text-xl lg:text-5xl">Watch to watch -IMDb</p>
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
                            <button onClick={() => switchView('WatchGuide')} className={`${currentView === "WatchGuide" ? "lg-col-span-text-blue-500 border-b-2 border-blue-500 w-full px-2 py-2 " : " px-2 w-full py-2 text-white"}`}>Watch Guide</button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button onClick={() => switchView('FanFavorite')} className={`${currentView === "FanFavorite" ? "text-blue-500 border-b-2 border-blue-500  px-2 py-2 w-full" : " px-2 py-2 w-full text-white"}`}>Fan Favorite</button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button onClick={() => switchView('TopPick')} className={`${currentView === "TopPick" ? "text-blue-500 border-b-2 border-blue-500 px-2 py-2 w-full" : "px-2 py-2 text-white w-full"}`}>Top Pick</button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button onClick={() => switchView('FromYourWatchList')} className={`${currentView === "FromYourWatchList" ? "text-blue-500 border-b-2 border-blue-500 w-full  px-2 py-2 " : "w-full px-2 py-2 text-white"}`}>From Your WatchList</button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button onClick={() => switchView('MostPopular')} className={`${currentView === "MostPopular" ? "text-blue-500 border-b-2 border-blue-500  px-2 py-2 w-full" : "w-full px-2 py-2 text-white"}`}>Most Popular</button>
                        </SwiperSlide>
                    </Swiper>
                    <div className="w-full">{renderMovieItem()}</div>

                    <div className=" overflow-hidden">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}