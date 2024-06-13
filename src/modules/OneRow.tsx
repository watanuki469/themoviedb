import FilterIcon from '@mui/icons-material/Filter';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

export interface FourSwiperRowProps {
    listRowList: any
}

export default function OneRow({
    listRowList,
}: FourSwiperRowProps) {

    // const [activeSlider, setActiveSlider] = useState(3);
    // useEffect(() => {
    //     const handleResize = () => {
    //         if (window.innerWidth < 400) {
    //             setActiveSlider(1);
    //         } else if (window.innerWidth < 600) {
    //             setActiveSlider(2);
    //         } else if (window.innerWidth < 768) {
    //             setActiveSlider(2);
    //         } else if (window.innerWidth < 1024) {
    //             setActiveSlider(3);
    //         } 
    //         else{
    //             setActiveSlider(3)
    //         }
    //     };
    //     window.addEventListener('resize', handleResize);
    //     handleResize();
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    return (
        <div className="relative">
            <Swiper
                spaceBetween={2}
                slidesPerView={1}
                // direction="horizontal"
                className="mySwiper text-white w-full h-auto flex"
            >
                {listRowList?.slice(3).map((item: any, index: any) => (
                    <SwiperSlide key={index} className="w-full">
                        <div className="relative hover:opacity-90">
                            <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path?item?.poster_path:item?.profile_path}`} alt="product images" 
                            className="h-40 w-full object-cover object-center" />
                            {index === 0 && (
                                <div className="absolute bottom-0 left-0 p-4 flex gap-2 text-white">
                                    <FilterIcon className="w-6 h-6" />
                                    <div>Photos</div>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
