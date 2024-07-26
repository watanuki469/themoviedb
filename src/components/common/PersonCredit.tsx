import { useContext, useEffect, useState } from "react";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { handleImageError } from "../../modules/BaseModule";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchFavorite, fetchGetFavorites } from "../../redux/reducers/login.reducer";

export interface FourSwiperRowProps {
    personCreditList: any
}

export default function PersonCredit({
    personCreditList,
}: FourSwiperRowProps) {
    const [activeSlider, setActiveSlider] = useState(3);
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const dispatch = useAppDispatch()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 400) {
                setActiveSlider(1);
            } else if (window.innerWidth < 600) {
                setActiveSlider(2);
            } else if (window.innerWidth < 768) {
                setActiveSlider(2);
            } else if (window.innerWidth < 1024) {
                setActiveSlider(3);
            } else {
                setActiveSlider(2);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);
    const favoriteList = useAppSelector((state) => state.login.listFavorite);
    useEffect(() => {
        if (userInfoList?.length > 0) {
            dispatch(fetchGetFavorites(userInfoList[0]));
        }
    }, [userInfoList]);

    const handleWatchList = async (
        index: number,
        movieId: any,
        mediaType: any,
        movieName: any,
        movieImg: string,
        movieReleaseDay: Date,
        movieGenre: number[],
        movieReview: string,
        moviePopularity: string,
        movieVoteAverage: string,
        movieVoteCount: string
    ) => {
        setLoading((prevLoading) => ({ ...prevLoading, [index]: true }))
        await dispatch(fetchFavorite(
            userInfoList[0], movieId, mediaType, movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
        ));
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };


    const [isOpen, setIsOpen] = useState(false);
    const [numberIndex, setNumberIndex] = useState(0);
    const handleClick = (index: number) => {
        setIsOpen(true);
        setNumberIndex(index);
    };
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context

    return (
        <section className="relative w-full cursor-pointer">
            <div className="px-2  w-full">
                {isOpen && (() => {
                    const existingIndex = favoriteList?.findIndex(fav => fav?.itemId == personCreditList[numberIndex]?.id);
                    return (
                        <div className="fixed top-0 left-0 w-full text-white flex justify-center items-center z-20">
                            <div className="p-5 rounded-lg max-w-2xl">
                                <div className="flex justify-end py-2">
                                    <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-80 px-2 py-2 rounded-full border-2 border-blue-500 bg-black h-12 w-12">
                                        <i className="fa-solid fa-times text-xl"></i>
                                    </button>
                                </div>
                                <div className="bg-black px-4 py-4">
                                    <div className="flex gap-2">
                                        <img src={`https://image.tmdb.org/t/p/w500/${personCreditList[numberIndex]?.poster_path}`} alt="product images"
                                            className="w-20 h-28" onError={handleImageError} />
                                        <div className="gap-2">
                                            <a href={`/${personCreditList[numberIndex]?.media_type}/${personCreditList[numberIndex]?.id}`} className="flex items-center text-white gap-2">
                                                <p className="text-xl font-bold hover:text-yellow-300"> {personCreditList[numberIndex]?.title ? personCreditList[numberIndex]?.title : personCreditList[numberIndex]?.name}</p>
                                                <i className="fa-solid fa-chevron-right text-2xl text-white hover:text-yellow-300"></i>
                                            </a>

                                            <div className="flex gap-4 flex-wrap items-center mt-1">
                                                <div className="flex gap-2 flex-wrap items-center">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p> {personCreditList[numberIndex]?.vote_average?.toFixed(1)}/10</p>
                                                </div>
                                            </div>
                                            <p className="line-clamp-1"> {personCreditList[numberIndex]?.release_date}</p>

                                        </div>
                                    </div>
                                    <p className="line-clamp-4"> {personCreditList[numberIndex]?.overview}</p>
                                    <p className="line-clamp-1"><span className="text-yellow-300">Character:</span>  {personCreditList[numberIndex]?.character}</p>

                                    <div className="grid grid-cols-2 gap-4 px-2 py-2 text-center items-center">
                                        <button className="w-full text-center justify-center flex items-center text-blue-500 bg-gray-800 hover:bg-gray-700 border-2 border-black"
                                            onClick={() => handleWatchList(numberIndex, personCreditList[numberIndex]?.id, personCreditList[numberIndex]?.media_type, personCreditList[numberIndex]?.title || personCreditList[numberIndex]?.name, personCreditList[numberIndex]?.poster_path || personCreditList[numberIndex]?.profile_path, personCreditList[numberIndex]?.first_air_date || personCreditList[numberIndex]?.release_date || personCreditList[numberIndex]?.birthday, personCreditList[numberIndex]?.genres?.map((item: any) => item?.id), personCreditList[numberIndex]?.overview || personCreditList[numberIndex]?.biography, personCreditList[numberIndex]?.popularity, personCreditList[numberIndex]?.vote_average, personCreditList[numberIndex]?.vote_count)}>
                                            {existingIndex !== -1 ? (
                                                loading[0] ? (
                                                    <div>
                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>
                                                    </div>
                                                ) : (
                                                    <div className="px-2 py-2 capitalize font-bold hover:opacity-80 flex items-center text-blue-500 gap-2 justify-center text-center">
                                                        <i className="fas fa-check font-bold text-xl"></i>
                                                        <p>watchList</p>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="w-full text-center">
                                                    {loading[0] ? (
                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>
                                                    ) : (
                                                        <div className="px-2 py-2 capitalize ml-auto mr-auto flex items-center text-blue-500 justify-center font-bold gap-2 text-center">
                                                            <i className="fas fa-plus font-bold"></i>
                                                            <p>WatchList</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </button>
                                        <a href={`/video/${personCreditList[numberIndex]?.media_type}/${personCreditList[numberIndex]?.id}`}
                                            className="flex text-blue-500 justify-center font-bold items-center capitalize text-center bg-gray-800 hover:bg-gray-700 px-2 py-2 gap-2">
                                            <p><i className="fa-solid fa-plus"></i></p>
                                            <p>Trailer</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}


                <div className="lg:flex hidden flex-wrap w-full">
                    {personCreditList?.slice(0, 4)?.map((item: any, index: any) => {
                        return (
                            <div key={index} className={`w-1/2 px-2 py-2`}>
                                <div className="flex items-stretch gap-2 shadow-sm shadow-black rounded-br-xl rounded-bl-xl rounded-tr-xl w-full h-full">
                                    <a className="flex-1" style={{ maxWidth: "100px" }} href={`/${item?.media_type}/${item?.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images"
                                            className="object-cover w-full h-full bg-gray-500 rounded-bl-xl" onError={handleImageError} />
                                    </a>
                                    <div className="text-black flex-1 flex flex-col" >
                                        <div className="py-2">
                                            <div className="text-xl font-bold mb-1">
                                                <p className="line-clamp-1"> {item.title ? item.title : item.name}</p>
                                            </div>
                                            <div className="items-center mb-1">
                                                <div className="flex items-center gap-2">
                                                    <i className="fas fa-star text-yellow-300"></i>
                                                    <p className="leading-relaxed text-gray-500">{item?.vote_average?.toFixed(1)}</p>
                                                </div>
                                            </div>
                                            <div className="mb-1">
                                                <p className="line-clamp-1"> {item?.character}</p>
                                            </div>
                                            <div className="mb-1">
                                                <p className="line-clamp-1"> {item?.release_date?.slice(0, 4)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-auto mt-auto">
                                        <div className="px-2 py-2" onClick={() => handleClick(index)}>
                                            <i className="fa-solid fa-circle-info text-blue-500 text-xl"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>


                <div className="block lg:hidden">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={activeSlider}
                        grabCursor={true}
                        style={{ width: "100%", height: "max-content", maxWidth: '100%' }}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper text-white w-full h-full"
                    >
                        {personCreditList?.map((item: any, index: any) => {
                            return (
                                <SwiperSlide key={index} className="w-full">
                                    <div className="flex items-stretch gap-2 shadow-sm shadow-black rounded-br-xl rounded-bl-xl rounded-tr-xl h-full mt-3 mb-3 mr-2">
                                        <a className="flex-1" style={{ maxWidth: "100px" }}
                                            href={`/${item?.media_type}/${item?.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images" onError={handleImageError}
                                                className="object-cover h-full w-full bg-gray-500 rounded-bl-xl  " style={{ maxWidth: "100%", height: '100%' }} />
                                        </a>
                                        <a className=" text-black px-2  flex-1 flex-col "
                                            href={`/${item?.media_type}/${item?.id}`}>
                                            <div className="py-2 ">
                                                <div className="text-xl font-bold mb-1">
                                                    <p className="line-clamp-1"> {item.title ? item.title : item.name}</p>
                                                </div>
                                                <div className="items-center mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <i className="fas fa-star text-yellow-300"></i>
                                                        <p className="leading-relaxed text-gray-500">{item?.vote_average?.toFixed(1)}</p>
                                                    </div>
                                                </div>
                                                <div className="mb-1">
                                                    <p className="line-clamp-1"> {item?.character}</p>
                                                </div>
                                                <div className="mb-1">
                                                    <p className="line-clamp-1"> {item?.release_date?.slice(0, 4)}</p>
                                                </div>
                                            </div>
                                        </a>

                                        <div className="absolute bottom-0 right-0 flex justify-end items-center">
                                            <div className='flex gap-2 px-5 py-5' onClick={() => handleClick(index + 2)}>
                                                <i className="fa-solid fa-circle-info text-blue-500 text-xl cursor-pointer"></i>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </section >
    );
}
