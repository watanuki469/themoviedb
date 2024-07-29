import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { favoriteMongoApi, getFavoriteMongoApi, getListRatingMongoApi, ratingMongoApi, removeRatingMongoApi } from "../redux/client/api.LoginMongo";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchFavorite, fetchGetFavorites, setDeleteRating, setFavorite, setListFavorite, setListRating, setRating } from "../redux/reducers/login.reducer";
import { AppDispatch } from "../redux/store";
import { setGlobalLoading } from "../redux/reducers/globalLoading.reducer";
import RatingModule from "./RatingModule";

export interface SwiperRowProps {
    searchItemList: any
}

export default function Fullitem({
    searchItemList,
}: SwiperRowProps) {
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [checkLog, setCheckLog] = useState(false)
    const [loading2, setLoading2] = useState<{ [key: number]: boolean }>({});
    const [loading3, setLoading3] = useState<{ [key: number]: boolean }>({});
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const dispatch = useAppDispatch()
    const favoriteList = useAppSelector((state) => state.login.listFavorite);
    const ratingList = useAppSelector((state) => state.login.listRating);

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);

    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        if (userInfoList.length > 0) {
            dispatch(fetchGetFavorites(userInfoList[0]));
        }
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 3000);
    }, [userInfoList]);

    let navigate = useNavigate();
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
                setActiveSlider(6);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // const fetchFavorite = (
    //     movieId: string,
    //     movieType: string,
    //     movieName: string,
    //     movieImg: string,
    //     movieReleaseDay: Date,
    //     movieGenre: number[],
    //     movieReview: string,
    //     moviePopularity: string,
    //     movieVoteAverage: string,
    //     movieVoteCount: string
    // ) => async (dispatch: AppDispatch) => {
    //     const email = userInfoList[0];
    //     try {
    //         const response = await favoriteMongoApi(
    //             email, movieId, movieType === 'movie' ? "Movie" : 'TV', movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
    //         );
    //         dispatch(setFavorite(response));
    //         console.log(response);

    //         if (response) {
    //             await dispatch(fetchGetFavorites(userInfoList[0]));

    //         } else {
    //             toast.error('Something went wrong');
    //         }
    //     } catch (e) {
    //         console.log("Updating watch list failed: " + e);
    //         toast.error("Updating watch list failed");
    //     }
    // };

    const handleWatchList = async (
        index: number,
        movieId: any,
        movieType: any,
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
            userInfoList[0],movieId, movieType, movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
        ));
        setCheckLog(!checkLog);
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };

    return (
        <div className="lg:max-w-full w-full py-8 mt-2 px-2 ">
            <div className="h-full  flex flex-wrap relative  ">
                {searchItemList?.map((item: any, index: any) => {
                    const existingIndex = favoriteList.findIndex(fav => fav?.itemId == item?.id);
                    return (
                        <div key={index} className="w-1/2 md:w-1/5 px-2 sm:w-1/3 lg:w-1/5 py-2 ">
                            <div className="relative w-full pb-[150%] hover:opacity-80  " onClick={() => navigate(`/${item?.media_type}/${item?.id}`)}>
                                <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                                    alt="product images"
                                    className="absolute top-0 left-0 w-full h-full object-cover rounded-tr-2xl "
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/500x750'; // Replace with your fallback image URL
                                        e.currentTarget.onerror = null; // Prevent infinite loop if the fallback image also fails to load
                                    }}
                                />
                            </div>
                            <div className="bg-gray-900 rounded-br-2xl rounded-bl-2xl">
                                <div className="mx-3 ">
                                    <div className="flex gap-x-4 items-center ">
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-star text-yellow-300"></i>
                                            <p className="leading-relaxed text-gray-500">{item?.vote_average?.toFixed(1)}</p>
                                        </div>
                                        <div className="grow ml-auto py-2" >
                                            <RatingModule mediaType={item?.media_type} ratingList={item} userInfoList={userInfoList} starIndex={index} rateHidden={'true'}></RatingModule>
                                        </div>
                                    </div>
                                    <div className="h-12 mt-2">
                                        <p className="line-clamp-2">{index}. {item.title ? item?.title : item?.name}</p>
                                    </div>
                                    <button
                                        onClick={() => handleWatchList(index, item?.id, item?.media_type, item?.title || item?.name, item?.poster_path, item?.first_air_date ? item?.first_air_date : item?.release_date, item?.genre_ids, item?.overview, item?.popularity, item?.vote_average, item?.vote_count
                                        )}
                                        className="flex mt-1 items-center px-4 py-2 border rounded-lg w-full hover:bg-gray-500 justify-center bg-gray-800 text-blue-500 border-none"
                                    >
                                        <div>
                                            {
                                                existingIndex !== -1 ? (
                                                    loading[index] ? (
                                                        <div>
                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                        </div>
                                                    ) : (
                                                        <div className="py-2 px-3 flex justify-center items-center text-blue-500 text-center h-full">
                                                            <i className="fas fa-check font-bold text-lg mr-2"></i>
                                                            <div className="text-center">
                                                                <div className="font-bold text-sm">
                                                                    <p>Watchlist</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="font-bold text-sm">
                                                        {loading[index] ? (
                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                        ) : (
                                                            <div className="py-2 px-3 flex justify-center items-center text-blue-500 text-center h-full">
                                                                <i className="fas fa-plus font-bold text-lg mr-2"></i>
                                                                <div className="text-center">
                                                                    <p>Watchlist</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => navigate(`/${item?.media_type === 'movie' ? 'video' : 'videoTv'}/${item?.id}`)}
                                        className="flex items-center px-4 py-2 border rounded-lg w-full hover:bg-gray-600 justify-center border-none text-white">
                                        <i className="fa-solid fa-play mr-2"></i>
                                        <p>Trailer</p>
                                    </button>
                                </div>
                            </div>
                        </div >
                    )
                })}
            </div >
        </div >
    );
}
