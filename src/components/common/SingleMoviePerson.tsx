import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LanguageContext } from "../../pages/LanguageContext";

export interface TwoMovieRowProps {
    singleMovieList: any
    movieCreditList: any
}

export default function SingleMoviePerson({
    singleMovieList,
    movieCreditList
}: TwoMovieRowProps) {
    let navigate = useNavigate()
    const [director, setDirector] = useState<any[]>([])
    const [writer, setWriter] = useState<any[]>([])

    useEffect(() => {
        if (singleMovieList && singleMovieList.length > 0) {
            const movie = singleMovieList[0];
            if (movie.credits && movie.credits.crew) {
                const directors = movie.credits.crew.filter((item: any) => item.job === 'Director');
                setDirector(directors);
                const writers = movie.credits.crew.filter((item: any) => item.job === 'Story');
                setWriter(writers);
            }
        }
    }, [singleMovieList[0]]);

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750'; // Set the fallback image source here
    };
    const [activeSlider, setActiveSlider] = useState(6);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) {
                setActiveSlider(2);
            } else if (window.innerWidth < 768) {
                setActiveSlider(3);
            } else {
                setActiveSlider(4);
            }
        };

        window.addEventListener('resize', handleResize);
        // Call handleResize at initial load
        handleResize();

        // Clean up event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;
    return (
        <section className="px-2 py-2">
            <div className="hidden lg:grid relative">
                <div className="grid grid-cols-2 gap-4 ">
                    {movieCreditList?.slice(0, 10).map((item: any, index: any) => (
                        <div key={index} className="flex items-center">
                            <div className="h-24 w-24 rounded-full bg-cover mr-4 hover:opacity-80"
                                style={{
                                    backgroundImage: `url(${item?.profile_path ? `https://image.tmdb.org/t/p/w200/${item?.profile_path}` : 'https://via.placeholder.com/500x750'})`
                                }}
                                onClick={() => navigate(`/person/${item?.id}`)}>
                            </div>

                            <div className="">
                                <p className="text-black font-bold">{item?.name}</p>
                                <p className="text-gray-500">{item?.character}</p>
                            </div>
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
                    {movieCreditList?.map((item: any, index: any) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="w-full h-auto ">
                                    <div key={index} className="items-center justify-center text-center">
                                        <div className="w-36 h-36 mx-auto rounded-full bg-cover  items-center justify-center hover:opacity-80"
                                            style={{
                                                backgroundImage: `url(${item?.profile_path ? `https://image.tmdb.org/t/p/w200/${item?.profile_path}` : 'https://via.placeholder.com/500x750'})`
                                            }}
                                            onClick={() => navigate(`/person/${item?.id}`)}>
                                        </div>

                                        <div className="">
                                            <p className="text-black font-bold">{item?.name}</p>
                                            <p className="text-gray-500">{item?.character}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

            </div>

            <div className="text-black mt-5">
                <div className="py-2 border-b border-gray-300 flex gap-2">
                    <div className="font-bold">{translations[language]?.director}</div>
                    <div className='items-center flex flex-wrap gap-1 justify-start '>
                        {director?.slice(0, 3).map((item: any, index: number) => (
                            <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                <span className="text-blue-600">{item?.name}</span>
                                <span>{index < Math.min(director?.slice(0, 3).length) - 1 ? '•' : ''}</span>
                            </p>
                        ))}

                    </div>
                </div>
                <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                    <div className="font-bold">{translations[language]?.writer}</div>
                    <div className="flex flex-wrap gap-1 justify-left text-center aligns-center items-center">
                        {writer.slice(0, 3).map((item: any, index: number) => (
                            <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                <span className="text-blue-600">{item?.name}</span>
                                <span>{index < Math.min(writer?.slice(0, 3).length) - 1 ? '•' : ''}</span>
                            </p>
                        ))}
                    </div>
                </div>
                <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center ">
                    <div className="font-bold">{translations[language]?.star}</div>
                    <div className="flex gap-1  items-center flex-wrap">
                        {movieCreditList.slice(0, 3).map((item: any, index: number) => (
                            <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                <span className="text-blue-600">{item?.name}</span>
                                <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between border-b border-gray-300 gap-3 py-2 items-center hover:text-yellow-300"
                onClick={()=>navigate(`/fullcredits/movie/${movieCreditList[0]?.id}`)}>
                    <div className="font-bold capitalize">{translations[language]?.moreExplore} {translations[language]?.star}</div>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>

                </div>

                <div
                    onClick={() => navigate('/IMDbPro')}
                    className="flex justify-between border-b border-gray-300 gap-3 py-2 items-center hover:text-yellow-300">
                    <div className="font-bold">{translations[language]?.seePro}</div>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </div>
        </section>


    )
}