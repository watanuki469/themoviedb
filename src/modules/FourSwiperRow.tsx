import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from 'swiper/types';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchFavorite, fetchGetFavorites } from "../redux/reducers/login.reducer";
import { handleImageError } from "./BaseModule";
import RatingModule from "./RatingModule";


export interface FourSwiperRowProps {
    fourSwiperRowList: any
    mediaType: any
    mediaMenuItem: any
}

export default function FourSwiperRow({
    fourSwiperRowList,
    mediaType,
    mediaMenuItem
}: FourSwiperRowProps) {
    const menuItems = [
        // main layout
        { activeSlider: 6, label: 'bg-gray-900 text-white', watchList: 'text-blue-500 bg-gray-800' },
        // movie layout
        { activeSlider: 4, label: 'bg-white text-black', watchList: 'text-black bg-gray-200' },
    ]

    const [activeSlider, setActiveSlider] = useState(6);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) { setActiveSlider(2) }
            else if (window.innerWidth < 600) { setActiveSlider(3) }
            else if (window.innerWidth < 768) { setActiveSlider(4) }
            else if (window.innerWidth < 1024) { setActiveSlider(5) }
            else { setActiveSlider(menuItems[mediaMenuItem]?.activeSlider) }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleClickImg = () => {
        window.scrollTo(0, 0)
    };

    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const dispatch = useAppDispatch()
    const favoriteList = useAppSelector((state) => state.login.listFavorite);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);

    useEffect(() => {
        if (userInfoList?.length > 0) {
            dispatch(fetchGetFavorites(userInfoList[0]));
        }
    }, [userInfoList]);

    const handleWatchList = async (index: number, movieId: any, movieName: any, movieImg: string, movieReleaseDay: Date, movieGenre: number[], movieReview: string, moviePopularity: string, movieVoteAverage: string, movieVoteCount: string) => {
        setLoading((prevLoading) => ({ ...prevLoading, [index]: true }));
        await dispatch(fetchFavorite(userInfoList[0], movieId, mediaType, movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount));
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };
  
    const handlePrev = () => {
        if (swiperInstance) {
            const newIndex = Math.max(swiperInstance.activeIndex - activeSlider, 0);
            swiperInstance.slideTo(newIndex);
        }
    };

    const handleNext = () => {
        if (swiperInstance) {
            const newIndex = Math.min(swiperInstance.activeIndex + activeSlider, swiperInstance.slides.length - 1);
            swiperInstance.slideTo(newIndex);
        }
    };

    const handleSlideChange = () => {
        if (swiperInstance) {
            setIsPrevDisabled(swiperInstance.isBeginning);
            setIsNextDisabled(swiperInstance.isEnd);
        }
    };

    return (
        <div className="relative">
            <Swiper
                spaceBetween={15}
                onSlideChange={handleSlideChange}
                onSwiper={setSwiperInstance}
                slidesPerView={activeSlider}
                grabCursor={true}
                style={{ width: "100%", height: "max-content", maxWidth: '100%' }}
                autoplay={{
                    delay: 5000, disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper text-white w-full h-full "
            >
                {fourSwiperRowList?.map((item: any, index: any) => {
                    const existingIndex = favoriteList?.findIndex(fav => fav?.itemId == item?.id);
                    return (
                        <SwiperSlide key={index} className={` h-full w-full`}>
                            <div className="object-cover  w-full rounded-tr-xl rounded-tl-xl">
                                <a href={`/${mediaType}/${item?.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images" className=" hover:opacity-80 object-cover h-60 w-full rounded-tl-xl rounded-tr-xl"
                                        onError={handleImageError}
                                        onClick={() => handleClickImg()} />
                                </a>
                            </div>
                            <div className={`${menuItems[mediaMenuItem]?.label} shadow-sm shadow-black  rounded-bl-xl rounded-br-xl mb-4 py-2 h-fit w-full`}>
                                <div className="mx-3">
                                    <div className="flex gap-x-4 items-center">
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-star text-yellow-300"></i>
                                            <p className="leading-relaxed text-gray-500">{item?.vote_average?.toFixed(1)}</p>
                                        </div>
                                        <div className="px-2 py-2 text-blue-500 hover:text-black hover:bg-gray-300 max-w-fit ">
                                            <RatingModule mediaType={mediaType} ratingList={item} userInfoList={userInfoList} starIndex={index} rateHidden={'true'}></RatingModule>
                                        </div>
                                    </div>
                                    <div className="h-12 mt-2">
                                        <p className="line-clamp-2">{item?.title ? item?.title : item?.name}</p>
                                    </div>
                                    <div className={`mt-2 font-semibold hover:opacity-80 rounded-lg text-center ${menuItems[mediaMenuItem]?.watchList} justify-center`}
                                        onClick={() => handleWatchList(index, item?.id, item?.title || item?.name, item?.poster_path, item?.first_air_date ? item?.first_air_date : item?.release_date, item?.genre_ids, item?.overview, item?.popularity, item?.vote_average, item?.vote_count)}>
                                        {existingIndex !== -1 ? (
                                            loading[index] ? (
                                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                            ) : (
                                                <div className={`  py-2 px-3 flex justify-center items-center  gap-2 grow text-center h-full`}>
                                                    <i className="fas fa-check font-bold"></i>
                                                    <div className="text-left">
                                                        <p>WatchList</p>
                                                    </div>
                                                </div>
                                            )
                                        ) :
                                            <div>
                                                {loading[index] ? (
                                                    <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                ) : (
                                                    <div className={` py-2 px-3 flex justify-center  items-center gap-2 grow text-center h-full`}>
                                                        <i className="fas fa-plus font-bold"></i>
                                                        <div className="text-left">
                                                            <p>WatchList</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        }
                                    </div>
                                    <a href={`${mediaType}/${item?.id}`}>
                                        <button className="flex items-center px-2 py-2 hover:opacity-50 rounded-lg w-full justify-center border-none">
                                            <i className="fa-solid fa-play mr-2"></i>
                                            <p>Trailer</p>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}

            </Swiper>
            <button
                onClick={handlePrev}
                disabled={isPrevDisabled}
                className={`absolute hidden lg:block top-1/2 transform -translate-y-1/2 left-0 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 h-16 w-12 border-2 border-white ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <ChevronLeftIcon className="text-white" />
            </button>
            <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className={`absolute hidden lg:block top-1/2 transform -translate-y-1/2 right-0 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 h-16 w-12 border-2 border-white ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <ChevronRightIcon className="text-white" />
            </button>
        </div >
    );
}