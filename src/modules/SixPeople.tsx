import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface FourSwiperRowProps {
    sixPeopleList: any
}

export default function SixPeople({
    sixPeopleList,
}: FourSwiperRowProps) {

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
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
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
                {sixPeopleList?.sort((a: any, b: any) => {
                    const dateA = a?.popularity
                    const dateB = b?.popularity
                    return dateB - dateA;
                })?.map((item: any, index: any) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="w-full justify-center  text-center items-center grid h-full mt-auto mb-auto cursor-pointer">
                                <a href={`/person/${item?.id}`}
                                    className="w-40 h-40 object-cover rounded-full mx-auto bg-cover bg-no-repeat bg-black bg-center  items-center justify-center hover:opacity-80"
                                    style={{ backgroundImage: `url(${item?.profile_path ? `https://image.tmdb.org/t/p/w200/${item?.profile_path}` : 'https://via.placeholder.com/500x750'})` }}>
                                </a>

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
    );
}
