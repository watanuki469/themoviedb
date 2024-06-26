import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface TwoMovieRowProps {
    twoMovieRowList: any
}

export default function TwoMovieRow({
    twoMovieRowList,
    
}: TwoMovieRowProps) {

    const [activeSlider, setActiveSlider] = useState(4);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) {
                setActiveSlider(2);
            } else if (window.innerWidth < 600) {
                setActiveSlider(3);
            } else if (window.innerWidth < 1024) {
                setActiveSlider(4);           
            } else {
                setActiveSlider(3);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className="sm:px-2">
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
                {twoMovieRowList?.map((item: any, index: any) => {
                    return (                       
                        <SwiperSlide key={index}>
                            <div className="w-full hover:opacity-90 hover:text-yellow text-white " >
                                <img 
                                    src={`https://img.youtube.com/vi/${item?.key}/hqdefault.jpg`}                                      
                                    className="h-40 w-full object-cover object-center border-2 border-gray-300  rounded-xl "
                                    title={item?.name}
                                />
                                <div className="absolute inset-0 w-full h-full text-center top-14">
                                    <i className="fa-solid fa-circle-play text-5xl "></i>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    );
}
