import FilterIcon from '@mui/icons-material/Filter';
import { useContext } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { LanguageContext } from '../pages/LanguageContext';
import { handleImageError } from './BaseModule';

export interface FourSwiperRowProps {
    listRowList: any
}

export default function ListRow({
    listRowList,
}: FourSwiperRowProps) {
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
                className="mySwiper text-white w-full h-auto flex rounded-br-xl rounded-bl-xl rounded-tr-xl"
            >
                {listRowList?.slice(3).map((item: any, index: any) => (
                    <SwiperSlide key={index} className="w-full h-auto">
                        <div className="relative w-full pb-[150%] hover:opacity-80">
                            <img
                                onError={(e) => {handleImageError}}
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
