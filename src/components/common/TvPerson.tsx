import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface TwoMovieRowProps {
    singleMovieList: any
}

export default function TvPerson({
    singleMovieList,
}: TwoMovieRowProps) {
    let navigate = useNavigate()

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };
    const [activeSlider, setActiveSlider] = useState(5);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveSlider(2);
            } else {
                setActiveSlider(4);
            }
        };
        window.addEventListener('resize', handleResize);
        window.scrollTo(0, 0);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
   
    const seasonLength = singleMovieList[0]?.seasons?.length
    const firstYear = singleMovieList[0]?.seasons[0]?.air_date?.slice(0, 4)
    const lastYear = singleMovieList[0]?.seasons[seasonLength - 1]?.air_date?.slice(0, 4)
    console.log(firstYear + lastYear);


    return (
        <section className="px-2 py-2">
            <div className="hidden md:grid relative">
                <div className="grid grid-cols-2 gap-4 ">
                    {singleMovieList[0]?.aggregate_credits?.cast?.slice(0, 10).map((item: any, index: any) => (
                        <div key={index} className="flex items-center">
                            <div className="h-24 w-24 rounded-full bg-cover mr-4 bg-gray-500"
                                style={{
                                    backgroundImage: `url(${item?.profile_path ? `https://image.tmdb.org/t/p/w200/${item.profile_path}` : 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'})`
                                }}
                                onClick={() => navigate(`/person/${item?.id}`)}>
                            </div>

                            <div className="">
                                <p className="text-black font-bold">{item?.name}</p>
                                <p className="text-gray-500">{item?.roles[0]?.character}</p>
                                <p className="text-gray-500">{item?.roles[0]?.episode_count} episodes • {firstYear}-{lastYear}</p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            <div className="lg:hidden">
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
                    {singleMovieList[0]?.aggregate_credits?.cast?.slice(0, 10).map((item: any, index: any) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="w-full h-auto ">
                                    <div key={index} className="items-center justify-center text-center">
                                        <div className="w-36 h-36 mx-auto rounded-full bg-cover  items-center justify-center"
                                            style={{
                                                backgroundImage: `url(${item?.profile_path ? `https://image.tmdb.org/t/p/w200/${item?.profile_path}` : 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'})`
                                            }}
                                            onClick={() => navigate(`/person/${item?.id}`)}>
                                        </div>

                                        <div className="">
                                            <p className="text-black font-bold">{item?.name}</p>
                                            <p className="text-gray-500">{item?.roles[0]?.character}</p>
                                            <p className="text-gray-500">{item?.roles[0]?.episode_count} episodes • {firstYear}-{lastYear}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

            </div>

            <div className="text-black mt-5">

                <div className="flex justify-between border-b border-gray-300 gap-3 py-2 items-center">
                    <div className="font-bold">All Cast & Crew</div>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>

                </div>

                <div className="flex justify-between border-b border-gray-300 gap-3 py-2 items-center">
                    <div className="font-bold">Production, box office & more at IMDbPro</div>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </div>
        </section>


    )
}