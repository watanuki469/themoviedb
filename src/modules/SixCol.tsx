import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FilterIcon from '@mui/icons-material/Filter';

export interface FourSwiperRowProps {
    listRowList: any
}

export default function ListRow({
    listRowList,
}: FourSwiperRowProps) {

    const [activeSlider, setActiveSlider] = useState(3);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveSlider(2);
            } else {
                setActiveSlider(3);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative text-white">
            {listRowList.map((item: any, index: any) => (
                <div key={index}>
                    <div className="relative">
                        <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images" className="h-42" />
                        {index === 0 && (
                            <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white">
                                <FilterIcon className="w-6 h-6" />
                                <div>Photos</div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
