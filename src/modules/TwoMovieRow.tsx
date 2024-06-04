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

    const [activeSlider, setActiveSlider] = useState(2);
    let navigate=useNavigate()
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveSlider(1);
            } else {
                setActiveSlider(2);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className=" ">
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
                            <div className="w-full hover:opacity-80 " >
                                <img
                                    src={`https://movies-proxy.vercel.app/ipx/f_webp&s_800x1200/youtube/vi/${item?.key}/maxresdefault.jpg`}
                                    className="h-40 w-full object-cover "
                                    title={item?.name}
                                />
                                <div className="absolute inset-0 w-full h-full text-center top-14">
                                    <i className="fa-solid fa-circle-play text-white text-5xl "></i>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    );
}
