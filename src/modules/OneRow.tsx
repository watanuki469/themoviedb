import FilterIcon from '@mui/icons-material/Filter';
import { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LanguageContext } from '../pages/LanguageContext';

export interface FourSwiperRowProps {
    listRowList: any
}

export default function OneRow({
    listRowList,
}: FourSwiperRowProps) {
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;

    return (
        <div className="relative rounded-br-xl rounded-bl-xl rounded-tr-xl">
            <Swiper
                spaceBetween={2}
                slidesPerView={1}
                // direction="horizontal"
                className="mySwiper text-white w-full h-auto flex rounded-br-xl rounded-bl-xl rounded-tr-xl"
            >
                {listRowList?.slice(3).map((item: any, index: any) => (
                    <SwiperSlide key={index} className="w-full">
                        <div className="relative hover:opacity-90">
                            <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path ? item?.poster_path : item?.profile_path}`} alt="product images"
                                className="h-40 w-full object-cover object-center" />
                            {index === 0 && (
                                <div className="absolute bottom-0 left-0 p-4 flex gap-2 text-white">
                                    <FilterIcon className="w-6 h-6" />
                                    {translations[language]?.photos}
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
