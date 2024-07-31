import { useContext, useEffect, useState } from "react";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LanguageContext } from "../../pages/LanguageContext";

export interface TwoMovieRowProps {
    singleMovieList: any
}

export default function TvPerson({
    singleMovieList,
}: TwoMovieRowProps) {
    const [activeSlider, setActiveSlider] = useState(5);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) {
                setActiveSlider(2);
            } else if (window.innerWidth < 600) {
                setActiveSlider(3);
            } else if (window.innerWidth < 768) {
                setActiveSlider(4);
            } else if (window.innerWidth < 1024) {
                setActiveSlider(5);
            } else {
                setActiveSlider(6);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const seasonLength = singleMovieList[0]?.seasons?.length
    const firstYear = singleMovieList[0]?.seasons[0]?.air_date?.slice(0, 4)
    const lastYear = singleMovieList[0]?.seasons[seasonLength - 1]?.air_date?.slice(0, 4)

    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;

    return (
        <section className="px-2 py-2">
            <div className="hidden lg:grid relative">
                <div className="grid grid-cols-2 gap-4 ">
                    {singleMovieList[0]?.aggregate_credits?.cast?.slice(0, 10).map((item: any, index: any) => (
                        <div key={index} className="flex items-center">
                            <a href={`/person/${item?.id}`} id="bgHover" className="h-24 w-24 rounded-full bg-cover bg-center mr-4 bg-gray-500 hover:opacity-90 flex-shrink-0"
                                style={{ backgroundImage: `url(${item?.profile_path ? `https://image.tmdb.org/t/p/w200/${item?.profile_path}` : 'https://via.placeholder.com/500x750'})` }}>
                            </a>

                            <a href={`/person/${item?.id}`}>
                                <p className="text-black font-bold hover:opacity-50">{item?.name}</p>
                                <p className="text-gray-500 hover:underline">{item?.roles[0]?.character}</p>
                                <p className="text-gray-500 hover:bg-gray-200 py-1">
                                    {item?.roles[0]?.episode_count} {translations[language]?.episodes} •
                                    {firstYear ? (lastYear && firstYear !== lastYear ? `${firstYear}-${lastYear}` : firstYear) : ''}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:hidden flex">
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
                                        <a href={`/person/${item?.id}`} className="w-36 h-36 mx-auto rounded-full bg-cover bg-center items-center justify-center hover:opacity-80"
                                            style={{ backgroundImage: `url(${item?.profile_path ? `https://image.tmdb.org/t/p/w200/${item?.profile_path}` : 'https://via.placeholder.com/500x750'})` }}>
                                        </a>

                                        <a href={`/person/${item?.id}`}>
                                            <p className="text-black font-bold">{item?.name}</p>
                                            <p className="text-gray-500">{item?.roles[0]?.character}</p>
                                            <p className="text-gray-500">{item?.roles[0]?.episode_count} {translations[language]?.episodes} • {firstYear}-{lastYear}</p>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

            <div className="text-black mt-5">
                <a href={`/fullcredits/tv/${singleMovieList[0]?.id}`} className="flex justify-between border-b border-gray-300 gap-3 py-2 items-center hover:text-yellow-300">
                    <div className="font-bold capitalize">{translations[language]?.moreExplore} {translations[language]?.star}</div>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>

                <a href="/IMDbPro" className="flex justify-between border-b border-gray-300 gap-3 py-2 items-center hover:text-yellow-300">
                    <div className="font-bold capitalize">{translations[language]?.seePro}</div>
                    <i className="fa-solid fa-chevron-right"></i>
                </a>
            </div>
        </section>


    )
}