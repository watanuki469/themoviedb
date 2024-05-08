import { useEffect, useState } from "react";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FanFavorite from "../common/FanFavorite";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";

export default function WatchToWWatch() {
    // not have api suitable for this content
    const [currentView, setCurrentView] = useState('WatchGuide'); // Default view is 'detail'

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
    return (
        <div className=" min-h-screen cursor-pointer">
            {/* <div className="bg-black text-white">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
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

                    <div className="lg:max-w-full md:w-screen mt-2  text-white">
                        {currentView == 'FanFavorite' ? (<div>
                            <FanFavorite />
                               
                        </div>) : (<div>

                        </div>)}
                    </div>

                    <div className=" overflow-hidden">
                        <Footer />
                    </div>
                </div>
            </div> */}
        </div>

    )
}