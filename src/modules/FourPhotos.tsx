import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Swiper as SwiperClass } from 'swiper/types';
export interface FourSwiperRowProps {
    fourPhotosList: any
}

export default function FourPhotos({
    fourPhotosList,
}: FourSwiperRowProps) {

    const [activeSlider, setActiveSlider] = useState(4);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 400) {
                setActiveSlider(2);
            } else if (window.innerWidth < 600) {
                setActiveSlider(3);
            } else if (window.innerWidth < 768) {
                setActiveSlider(4);
            } else if (window.innerWidth < 900) {
                setActiveSlider(5);
            } else if (window.innerWidth < 1024) {
                setActiveSlider(6);
            } else {
                setActiveSlider(4);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getImageUrl = (item: any) => {
        if (item?.file_path) {
            return `https://image.tmdb.org/t/p/w200/${item.file_path}`;
        } else if (item?.poster_path) {
            return `https://image.tmdb.org/t/p/w200/${item.poster_path}`;
        } else if (item?.profile_path) {
            return `https://image.tmdb.org/t/p/w200/${item.profile_path}`;
        } else {
            return 'https://via.placeholder.com/500x750';
        }
    }

    const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

    const handlePrev = () => {
        if (swiperInstance) {
            const newIndex = Math.max(swiperInstance.activeIndex - activeSlider, 0);
            swiperInstance.slideTo(newIndex);
        }
    };

    const handleNext = () => {
        if (swiperInstance) {
            const newIndex = Math.min(swiperInstance.activeIndex + activeSlider, swiperInstance.slides.length - 1);
            swiperInstance.slideTo(newIndex);
        }
    };

    const handleSlideChange = () => {
        if (swiperInstance) {
            setIsPrevDisabled(swiperInstance.isBeginning);
            setIsNextDisabled(swiperInstance.isEnd);
        }
    };
    return (
        <div className="sm:px-2 w-full relative min-h-20">
            <Box sx={{ "& .swiper-slide": { width: { xs: "50%", sm: "35%", md: "25%", lg: "25%" } } }}>
                <button
                    onClick={handlePrev}
                    disabled={isPrevDisabled}
                    className={`absolute hidden lg:block top-1/2 transform -translate-y-1/2 left-0 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 h-16 w-12 border-2 border-white ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <ChevronLeftIcon className="text-white" />
                </button>
                <button
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className={`absolute hidden lg:block top-1/2 transform -translate-y-1/2 right-0 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 h-16 w-12 border-2 border-white ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <ChevronRightIcon className="text-white" />
                </button>
                <Swiper
                    onSlideChange={handleSlideChange}
                    onSwiper={setSwiperInstance}
                    spaceBetween={2}
                    slidesPerView={activeSlider}
                    grabCursor={true}
                    style={{ width: "100%", height: "max-content", maxWidth: '100%' }}
                    autoplay={{ delay: 3500, disableOnInteraction: false, }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {fourPhotosList && Array.isArray(fourPhotosList) && fourPhotosList?.map((item: any, index: any) => (
                        <SwiperSlide key={index}>
                            <div className="w-36 h-36 rounded-xl border-2 border-gray-300 object-cover bg-cover bg-no-repeat bg-black bg-center  items-center justify-center hover:opacity-80"
                                style={{
                                    backgroundImage: `url(${getImageUrl(item)})`
                                }}>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>

        </div >
    );
}
