import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { favoriteMongoApi, getFavoriteMongoApi } from "../redux/client/api.LoginMongo";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setFavorite, setListFavorite } from "../redux/reducers/login.reducer";
import { AppDispatch } from "../redux/store";
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
            if (window.innerWidth < 500) {
                setActiveSlider(2);
            } else if (window.innerWidth < 600) {
                setActiveSlider(3);
            } else if (window.innerWidth < 768) {
                setActiveSlider(4);
            } else if (window.innerWidth < 1024) {
                setActiveSlider(5);
            } else {
                setActiveSlider(menuItems[mediaMenuItem]?.activeSlider);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750'; // Set the fallback image source here
    };
    const handleClickImg = (id: any) => {
        window.scrollTo(0, 0)
        navigate(`/${mediaType}/${id}`)
    };

    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [checkLog, setCheckLog] = useState(false)
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

    const fetchGetFavorites = () => async (dispatch: AppDispatch) => {
        try {
            const response = await getFavoriteMongoApi(userInfoList[0]);
            if (response) {
                dispatch(setListFavorite(response));
            } else {
                throw new Error('Failed to fetch favorites');
            }
        } catch (e) {
            console.log("Fetching favorites failed: " + e);
        }
    }


    useEffect(() => {
        if (userInfoList?.length > 0) {
            dispatch(fetchGetFavorites());
        }
    }, [userInfoList]);

    let navigate = useNavigate();

    const fetchFavorite = (
        movieId: string,
        movieName: string,
        movieImg: string,
        movieReleaseDay: Date,
        movieGenre: number[],
        movieReview: string,
        moviePopularity: string,
        movieVoteAverage: string,
        movieVoteCount: string
    ) => async (dispatch: AppDispatch) => {
        const email = userInfoList[0];
        try {
            const response = await favoriteMongoApi(
                email, movieId, mediaType, movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
            );
            dispatch(setFavorite(response));
            if (response) {
                await dispatch(fetchGetFavorites());
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Updating watch list failed");
        }
    };

    const handleWatchList = async (
        index: number,
        movieId: any,
        movieName: any,
        movieImg: string,
        movieReleaseDay: Date,
        movieGenre: number[],
        movieReview: string,
        moviePopularity: string,
        movieVoteAverage: string,
        movieVoteCount: string
    ) => {
        setLoading((prevLoading) => ({ ...prevLoading, [index]: true }));
        await dispatch(fetchFavorite(
            movieId, movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
        ));
        setCheckLog(!checkLog);
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };
    const renderRating = (mediaType: any, ratingList: any, userInfoList: any, starIndex: any, rateHidden: any) => {
        return <RatingModule mediaType={mediaType} ratingList={ratingList} userInfoList={userInfoList} starIndex={starIndex} rateHidden={rateHidden}></RatingModule>

    }

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex + menuItems[mediaMenuItem]?.activeSlider < fourSwiperRowList?.length) {
            setCurrentIndex(currentIndex + menuItems[mediaMenuItem]?.activeSlider);
        }
    };

    const handleBack = () => {
        if (currentIndex - menuItems[mediaMenuItem]?.activeSlider >= 0) {
            setCurrentIndex(currentIndex - menuItems[mediaMenuItem]?.activeSlider);
        }
    };

    return (
        <div className="relative">
            <button className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 px-4 py-4 bg-black bg-opacity-50 hover:bg-gray-800 text-white p-2 border border-white ${currentIndex === 0 ? 'hidden' : ''}`} onClick={handleBack}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 px-4 py-4 bg-black bg-opacity-50 hover:bg-gray-800 text-white border border-white ${currentIndex + menuItems[mediaMenuItem]?.activeSlider*2 >= fourSwiperRowList?.length ? 'hidden' : ''}`}
                onClick={handleNext}
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
            <div className="flex py-2 w-full">
                {fourSwiperRowList?.slice(currentIndex, currentIndex + activeSlider).map((item: any, index: any) => {
                    const existingIndex = favoriteList?.findIndex(fav => fav?.itemId == item?.id);
                    return (
                        <div key={index} className={` h-full max-w-1/${activeSlider} w-full mx-2`}>
                            <div className="object-cover shadow-sm shadow-current w-full h-auto rounded-tr-xl rounded-tl-xl">
                                <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images" className=" hover:opacity-80 h-60 rounded-tl-xl rounded-tr-xl"
                                    onError={handleImageError}
                                    onClick={() => handleClickImg(`${item?.id}`)} />
                            </div>
                            <div className={`${menuItems[mediaMenuItem]?.label} shadow-sm shadow-current  rounded-bl-xl rounded-br-xl mb-4 py-2 h-fit w-full`}>
                                <div className="mx-3">
                                    <div className="flex gap-x-4 items-center">
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-star text-yellow-300"></i>
                                            <p className="leading-relaxed text-gray-500">{item?.vote_average?.toFixed(1)}</p>
                                        </div>
                                        <div className="grow ml-auto">
                                            {renderRating(mediaType, item, userInfoList, index, 'true')}
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
                                    <button className="flex items-center px-2 py-2 hover:opacity-50 rounded-lg w-full justify-center border-none"
                                        onClick={() => {
                                            if (item?.media_type === 'person') {
                                                navigate(`/person/${item?.id}`);
                                            } else if (item?.media_type === "movie") {
                                                navigate(`/movie/${item?.id}`);
                                            }
                                            else {
                                                navigate(`/tv/${item?.id}`);
                                            }
                                        }}>
                                        <i className="fa-solid fa-play mr-2"></i>
                                        <p>Trailer</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
