import { useEffect, useState } from "react";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface TwoMovieRowProps {
    twoMovieRowList: any
}

export default function TwoMovieRow({
    twoMovieRowList,
}: TwoMovieRowProps) {

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

    return (
        <div className=" ">
            <Swiper
                spaceBetween={10}
                slidesPerView={activeSlider}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper text-white"
            >
                {twoMovieRowList?.map((item: any, index: any) => {
                    return (
                        <SwiperSlide key={index} >
                            <div className="w-full h-42 hover:opacity-80">
                                <iframe
                                    key={item.key}
                                    src={`https://www.youtube.com/embed/${item.key}?controls=0&&autoplay=1`}
                                    width="100%"
                                    height={"100%"}
                                    title={item.name}
                                    style={{ border: 0 ,height:'160px'}}
                                    className="h-full w-full"
                                >
                                </iframe>
                                <p className="text-red w-full text-black">Watch {item?.name}</p>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    );
}
