import FilterIcon from '@mui/icons-material/Filter';
import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { LanguageContext } from '../pages/LanguageContext';

export interface FourSwiperRowProps {
    listRowList: any
}

export default function ListRow({
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
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;


    return (
        <div className="relative">
            <Swiper
                spaceBetween={2}
                slidesPerView={3}
                // direction="horizontal"
                className="mySwiper text-white w-full h-auto flex"
            >
                {listRowList?.slice(3).map((item: any, index: any) => (
                    <SwiperSlide key={index} className="w-full h-auto">
                        <div className="relative w-full pb-[150%] hover:opacity-80">
                            <img
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/500x750'; // Replace with your fallback image URL
                                    e.currentTarget.onerror = null; // Prevent infinite loop if the fallback image also fails to load
                                }}
                                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path ? item?.poster_path : item?.profile_path}`} alt="product images"
                                className="absolute top-0 left-0 w-full h-full object-cover hover:opacity-80" />
                            {index === 0 && (
                                <div className="absolute bottom-0 left-0 p-4 flex gap-2 text-white">
                                    <FilterIcon className="w-6 h-6" />
                                    <div>  {translations[language]?.photos}</div>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>



    );
}
