import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { formatDate } from "../../modules/BaseModule";

export interface PersonMovieProps {
    personMovieList: any
}

export default function PersonMovie({
    personMovieList,
}: PersonMovieProps) {

    const [activeSlider, setActiveSlider] = useState(2);
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

    const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

    const handlePrev = () => {
        if (swiperInstance) {
            const newIndex = Math.max(swiperInstance.activeIndex - 2, 0);
            swiperInstance.slideTo(newIndex);
        }
    };

    const handleNext = () => {
        if (swiperInstance) {
            const newIndex = Math.min(swiperInstance.activeIndex + 2, swiperInstance.slides.length - 1);
            swiperInstance.slideTo(newIndex);
        }
    };

    return (
        <div className=" relative">
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
            <Swiper
                onSwiper={setSwiperInstance}
                spaceBetween={10}
                slidesPerView={activeSlider}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper text-white"
            >
                {personMovieList?.map((item: any, index: any) => {
                    return (
                        <SwiperSlide key={index} >
                            <a href={`/video/${item?.media_type}/${item?.id}`}>
                                <div className="w-full rounded-xl relative">
                                    <div className='min-h-60 hover:opacity-80 rounded-xl'
                                        style={{
                                            backgroundImage: `url('https://image.tmdb.org/t/p/w300/${item?.poster_path}')`,
                                            width: "100%",
                                            height: "100%",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundColor: 'black',
                                        }}
                                    >
                                    </div>
                                    <div className={`absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 blur-sm`}></div>

                                    <div className="absolute bottom-0 left-0 flex justify-start items-center">
                                        <div className='flex gap-2 px-2 py-2'>
                                            <i className="fa-solid fa-circle-play text-white text-5xl"></i>
                                            <div>
                                                <div className='flex items-center text-center gap-2'>
                                                    <div className='text-xl '>Play Clip</div>
                                                    <div className='text-lg line-clamp-1'>
                                                        {formatDate(item?.release_date)}
                                                    </div>
                                                </div>
                                                <div className="line-clamp-1">{item?.title}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    );
}
