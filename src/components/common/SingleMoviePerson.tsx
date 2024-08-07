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
        if (singleMovieList && singleMovieList?.length > 0) {
            const movie = singleMovieList[0];
            if (movie.credits && movie.credits.crew) {
                const directors = movie.credits.crew.filter((item: any) => item.job === 'Director');
                setDirector(directors);
                // const writers = movie?.credits?.crew?.filter((item: any) => item?.job === 'Story');
                // const screenplayWriters = movie?.credits?.crew?.filter((item: any) => item?.job === 'Screenplay');
                // const writerses = writers?.length > 0 ? writers : screenplayWriters;
                const writerses= movie?.credits?.crew?.filter((item: any) => item?.job === 'Novel'|| item?.job === 'Writer' ||item?.job==='Screenplay'||item?.job==='Story');
                setWriter(writerses);
            }
        }
    }, [singleMovieList[0]]);

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
                            <a href={`/person/${item?.id}`}>
                                <div className="h-24 w-24 rounded-full bg-cover mr-4 hover:opacity-80 bg-center object-center flex-shrink-0"
                                    style={{ backgroundImage: `url(${item?.profile_path ? `https://image.tmdb.org/t/p/w200/${item?.profile_path}` : 'https://via.placeholder.com/500x750'})` }}>
                                </div>
                            </a>
                            <div className="flex-grow">
                                <p className="text-black font-bold">{item?.name}</p>
                                <p className="text-gray-500">{item?.character}</p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            <div className="lg:hidden flex h-full">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={activeSlider}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper text-white "
                >
                    {movieCreditList?.map((item: any, index: any) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="w-full justify-center  text-center items-center grid h-full mt-auto mb-auto ">
                                    <a href={`/person/${item?.id}`}>
                                        <div className="w-40 h-40 object-cover rounded-full mx-auto bg-cover bg-no-repeat bg-black bg-center  items-center justify-center hover:opacity-80"
                                            style={{
                                                backgroundImage: `url(${item?.profile_path ? `https://image.tmdb.org/t/p/w200/${item?.profile_path}` : 'https://via.placeholder.com/500x750'})`
                                            }}>
                                        </div>
                                    </a>

                                    <div className="">
                                        <p className="text-black font-bold">{item?.name}</p>
                                        <p className="text-gray-500">{item?.character}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

            <div className="text-black">
                <div className="py-2 border-b border-gray-300 flex gap-2">
                    <div >
                        <span className="font-bold"> {translations[language]?.director}</span>
                        <div className='items-center flex flex-wrap gap-1 justify-start '>
                            {director?.slice(0, 3)?.map((item: any, index: number) => (
                                <a key={index} href={`/person/${item?.id}`}>
                                    <div className=" flex gap-2">
                                        <span className="text-blue-600 hover:underline">{item?.name}</span>
                                        <span>{index < Math.min(director?.slice(0, 3)?.length) - 1 ? '•' : ''}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                    <div className="font-bold">{translations[language]?.writer}</div>
                    <div className="flex flex-wrap gap-1 justify-left text-center aligns-center items-center">
                        {writer?.slice(0, 3)?.map((item: any, index: number) => (
                            <a key={index} href={`/person/${item?.id}`}>
                                <p className="flex gap-2">
                                    <span className="text-blue-600 hover:underline ">{item?.name}</span>
                                    <span>{index < Math.min(writer?.slice(0, 3)?.length) - 1 ? '•' : ''}</span>
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
                <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center ">
                    <div className="font-bold">{translations[language]?.star}</div>
                    <div className="flex gap-1  items-center flex-wrap">
                        {movieCreditList?.slice(0, 3)?.map((item: any, index: number) => (
                            <a key={index} href={`/person/${item?.id}`}>
                                <p className="flex gap-2">
                                    <span className="text-blue-600 hover:underline ">{item?.name}</span>
                                    <span>{index < Math.min(movieCreditList?.slice(0, 3)?.length) - 1 ? '•' : ''}</span>
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
                <a href={`/fullcredits/movie/${movieCreditList[0]?.id}`}>
                    <div className="flex justify-between border-b border-gray-300 gap-3 py-2 items-center hover:text-yellow-300">
                        <div className="font-bold capitalize ">{translations[language]?.moreExplore} {translations[language]?.star}</div>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </div>
                </a>
                <a href={`/IMDbPro`}>
                    <div onClick={() => navigate('/IMDbPro')}
                        className="flex justify-between border-b border-gray-300 gap-3 py-2 items-center hover:text-yellow-300">
                        <div className="font-bold">{translations[language]?.seePro}</div>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </a>
            </div>
        </section >


    )
}