import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface FourSwiperRowProps {
    fourSwiperRowList: any
}

export default function FourSwiperRow({
    fourSwiperRowList,
}: FourSwiperRowProps) {

    const [activeSlider, setActiveSlider] = useState(6);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveSlider(2);
            } else if (window.innerWidth < 1024) {
                setActiveSlider(3);
            } else {
                setActiveSlider(4);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="px-2 pt-2">
            <Swiper
                spaceBetween={10}
                slidesPerView={activeSlider}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper text-white"
            >
                {fourSwiperRowList.map((item: any, index: any) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="w-full">
                                <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images" className="h-60" />
                            </div>
                            <div className="bg-white shadow-xl text-black">
                                <div className="mx-3 ">
                                    <div className="flex gap-x-4 items-center ">
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-star text-yellow-300"></i>
                                            <p className="leading-relaxed text-gray-500">{item?.vote_average.toFixed(1)}</p>
                                        </div>
                                        <div className="grow ml-auto">
                                            <i className="fa-regular fa-star text-blue-500"></i>
                                        </div>
                                    </div>
                                    <div className="h-12 mt-2">
                                        <p className="line-clamp-2"> {item.title ? item.title : item.name}</p>
                                    </div>
                                    <button className="flex mt-1 items-center px-4 py-2 border rounded-lg w-full justify-center bg-gray-800 text-blue-500 border-none">
                                        <i className="fas fa-plus mr-2"></i>
                                        <p>Watchlists</p>
                                    </button>
                                    <button className="flex items-center px-4 py-2 hover:bg-gray-300 rounded-lg w-full justify-center border-none ">
                                        <i className="fa-solid fa-play mr-2"></i>
                                        <p>Trailer</p>
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    );
}
