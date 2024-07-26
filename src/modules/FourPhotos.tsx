import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface FourSwiperRowProps {
    fourPhotosList: any
}

export default function FourPhotos({
    fourPhotosList,
}: FourSwiperRowProps) {

    const [activeSlider, setActiveSlider] = useState(4);
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
    return (
        <div className="sm:px-2 w-full">
            <Box sx={{ "& .swiper-slide": { width: { xs: "50%", sm: "35%", md: "25%", lg: "25%" } } }}>
                <Swiper
                    spaceBetween={2}
                    slidesPerView={activeSlider}
                    grabCursor={true}
                    style={{ width: "100%", height: "max-content", maxWidth: '100%' }}
                    autoplay={{ delay: 3500, disableOnInteraction: false, }}
                    navigation={true}
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
