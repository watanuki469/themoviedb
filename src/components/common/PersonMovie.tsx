import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface PersonMovieProps {
    personMovieList: any
}

export default function PersonMovie({
    personMovieList,
}: PersonMovieProps) {

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
    let navigate=useNavigate()

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
                {personMovieList?.map((item: any, index: any) => {
                    return (
                        <SwiperSlide key={index} >
                            <div className="w-full" onClick={()=>navigate(`/video/${item?.id}`)}>
                                <div className='min-h-60 hover:opacity-90'
                                    style={{
                                        backgroundImage: `url('https://image.tmdb.org/t/p/w300/${item?.poster_path}')`,
                                        width: "100%",
                                        height: "100%",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor: 'black'
                                    }}
                                >
                                </div>
                                <div className="absolute bottom-0 left-0 flex justify-start items-center">
                                    <div className='flex gap-2 px-2 py-2'>
                                        <i className="fa-solid fa-circle-play text-white text-5xl"></i>
                                        <div>
                                            <div className='flex items-center text-center gap-2'>
                                                <div className='text-xl '>Play Clip</div>
                                                <div className='text-lg line-clamp-1'>
                                                    {item?.vote_count &&
                                                        <>
                                                            {item?.vote_count.toString().slice(0, 1)}:
                                                            {item?.vote_count.toString().slice(1, 3)}
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div className="line-clamp-1">{item?.title}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    );
}
