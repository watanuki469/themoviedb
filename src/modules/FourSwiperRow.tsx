import { useEffect, useState } from "react";
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

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex +activeSlider < fourSwiperRowList?.length) {
            setCurrentIndex(currentIndex + activeSlider);
        }
    };

    const handleBack = () => {
        if (currentIndex -activeSlider >= 0) {
            setCurrentIndex(currentIndex - activeSlider);
        }
    };

    return (
        <div className="relative">
            <button className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 px-4 py-4 bg-black bg-opacity-50 hover:bg-gray-800 text-white p-2 border border-white ${currentIndex === 0 ? 'hidden' : ''}`} onClick={handleBack}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 px-4 py-4 bg-black bg-opacity-50 hover:bg-gray-800 text-white border border-white ${currentIndex + activeSlider>= fourSwiperRowList?.length ? 'hidden' : ''}`}
                onClick={handleNext}
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
            <div className="flex py-2 w-full">
                {fourSwiperRowList?.slice(currentIndex, currentIndex + activeSlider).map((item: any, index: any) => {
                    const existingIndex = favoriteList?.findIndex(fav => fav?.itemId == item?.id);
                    return (
                        <div key={index} className={` h-full max-w-1/${activeSlider} w-full mx-2`}>
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
                                        <div className="grow ml-auto">
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
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
