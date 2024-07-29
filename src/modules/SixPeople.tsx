import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

    const swiperRef = useRef<SwiperType | null>(null);
    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    return (
        <div>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={10}
                slidesPerView={activeSlider}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
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
                <button
                    onClick={handlePrev}
                    className="absolute hidden lg:block top-1/2 transform -translate-y-1/2 left-0 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 h-16 w-12 border-2 border-white"
                >
                    <ChevronLeftIcon className="text-white" />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute hidden lg:block top-1/2 transform -translate-y-1/2 right-0 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 h-16 w-12 border-2 border-white"
                >
                    <ChevronRightIcon className="text-white" />
                </button>
            </Swiper>
        </div>
    );
}
