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
        <div className="relative">
            <Swiper
                spaceBetween={2}
                slidesPerView={activeSlider}
                // autoplay={{
                //     delay: 3500,
                //     disableOnInteraction: false,
                // }}
                // navigation={true}
                // modules={[Pagination, Navigation]}
                className="mySwiper text-white"
            >
                {listRowList?.slice(3).map((item: any, index: any) => (
                    <SwiperSlide key={index}>
                        <div className="relative">
                            <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images" className="h-42" />
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
