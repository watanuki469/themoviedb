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
            <Box sx={{
                "& .swiper-slide": {
                    width: {
                        // xs: "20.5%",
                        // sm: "25%",
                        // md: "35%",
                        // lg: "50%",
                        xs: "50%",
                        sm: "35%",
                        md: "25%",
                        lg: "25%"
                    }
                }
            }}>
                <Swiper
                    spaceBetween={10}
                    slidesPerView="auto"
                    grabCursor={true}
                    style={{ width: "100%", height: "max-content",maxWidth:'100%' }}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper text-white"
                >
                    {fourPhotosList && Array.isArray(fourPhotosList) && fourPhotosList.map((item: any, index: any) => (
                        <SwiperSlide key={index}>
                            <div className="w-40 h-40 mx-auto bg-cover items-center justify-center hover:opacity-80"
                                style={{
                                    backgroundImage: `url(${item.file_path ? `https://image.tmdb.org/t/p/w200/${item.file_path}` : 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'})`
                                }}>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>

        </div >
    );
}
