import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { favoriteMongoApi, getFavoriteMongoApi, getListRatingMongoApi, ratingMongoApi, removeRatingMongoApi } from "../redux/client/api.LoginMongo";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDeleteRating, setFavorite, setListFavorite, setListRating, setRating } from "../redux/reducers/login.reducer";
import { AppDispatch } from "../redux/store";
import { setGlobalLoading } from "../redux/reducers/globalLoading.reducer";

export interface SwiperRowProps {
    searchItemList: any
    mediaType: any
}

export default function SwiperRow({
    searchItemList,
    mediaType
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
    const fetchGetRating = () => async (dispatch: AppDispatch) => {
        try {
            const response = await getListRatingMongoApi(userInfoList[0]);
            if (response) {
                dispatch(setListRating(response));
            } else {
                throw new Error('Failed to fetch favorites');
            }
        } catch (e) {
            console.log("Fetching favorites failed: " + e);
        }
    }

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        if (userInfoList.length > 0) {
            dispatch(fetchGetFavorites());
            dispatch(fetchGetRating())
        }
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 3000);
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

    const [isRating, setIsRating] = useState(false);
    const [numberIndex, setNumberIndex] = useState(0);
    const handleClick = (index: number, value: any) => {
        setIsRating(true)
        setNumberIndex(index);
        setValue(value)
    };

    const [value, setValue] = useState<number | null>(0);
    const handleClose = () => {
        setIsRating(false)
        setNumberIndex(0);
        setValue(0)
    };

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
            console.log(response);

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

    const fetchRating = (
        itemId: string,
        itemType: string,
        itemRating: string,
        itemImg: string,
        itemName: string
    ) => async (dispatch: AppDispatch) => {
        const email = userInfoList[0];
        try {
            const response = await ratingMongoApi(
                email, itemId, itemType, itemRating, itemImg, itemName
            );
            dispatch(setRating(response));
            if (response) {
                await dispatch(fetchGetRating());
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Updating watch list failed");
        }
    };

    const handleRating = async (
        index: number,
        itemId: any,
        itemType: any,
        itemRating: any,
        itemImg: any,
        itemName: any
    ) => {
        setLoading2((prevLoading2) => ({ ...prevLoading2, [index]: true }));
        await dispatch(fetchRating(
            itemId, itemType, itemRating, itemImg, itemName
        ));
        setCheckLog(!checkLog);
        setIsRating(false)
        setLoading2((prevLoading2) => ({ ...prevLoading2, [index]: false }));
        toast.success('Rating success')
    };
    const fetchRemove = (
        movieId: string,
        movieType: string,
    ) => async (dispatch: AppDispatch) => {
        const email = userInfoList[0];
        try {
            const response = await removeRatingMongoApi(
                email, movieId, movieType,
            );
            dispatch(setDeleteRating(response));
            if (response) {
                await dispatch(fetchGetRating());
                toast.info('Remove rating success')
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Updating watch list failed");
        }
    };
    const handleRemoveRating = async (
        index: number, movieId: any, movieType: any,
    ) => {
        setLoading3((prevLoading3) => ({ ...prevLoading3, [index]: true }));
        await dispatch(fetchRemove(
            movieId, movieType,
        ));
        setCheckLog(!checkLog);
        setIsRating(false)
        setLoading3((prevLoading3) => ({ ...prevLoading3, [index]: false }));
    };


    return (
        <div className="h-full ">
            {isRating &&
                (
                    <div className="fixed top-0 left-0 w-full h-full bg-black text-white bg-opacity-50 flex justify-center items-center z-30">
                        <div className="p-5 rounded-lg max-w-2xl min-w-xl px-4 py-4 ">
                            <div className="flex items-center justify-end">
                                <div className="flex justify-end">
                                    <button onClick={() => setIsRating(false)} className="text-white hover:text-gray-700 px-2 py-2 rounded-full  ">
                                        <i className="fa-solid fa-times text-xl"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="bg-black px-4 py-4">
                                <div className="aligns-center justify-center items-center text-center gap-2">
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-52 flex flex-col items-center">
                                        <i className="fa-solid fa-star text-9xl text-blue-500"></i>
                                        <p className="-translate-y-20 text-4xl font-extrabold ">{value}</p>
                                    </div>
                                    <p className="text-yellow-300 font-bold">Rate this</p>
                                    <p className="text-2xl ">{searchItemList[numberIndex]?.original_title ? (searchItemList[numberIndex]?.original_title) : (searchItemList[numberIndex]?.title ? (searchItemList[numberIndex]?.title) : (searchItemList[numberIndex]?.name))}</p>
                                    <div className="gap-2 px-2 py-2">
                                        <Rating name="customized-10" value={value} size="large"
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            max={10} sx={{
                                                color: 'blue', mt: 1,
                                                '& .MuiRating-iconEmpty': {
                                                    borderColor: 'red',
                                                    color: 'gray'
                                                },
                                            }} />
                                        <br />
                                        <button className={`px-2 py-2 justify-center mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`}
                                            onClick={() => handleRating(numberIndex, searchItemList[numberIndex]?.id, mediaType, value, searchItemList[numberIndex]?.poster_path, searchItemList[numberIndex]?.name ? searchItemList[numberIndex]?.name : searchItemList[numberIndex]?.title)}>
                                            {loading2[numberIndex] ? (
                                                <div>
                                                    <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <div>Rate</div>
                                                </div>
                                            )
                                            }
                                        </button>
                                        <button className={`px-2 py-2 justify-center mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`}
                                            onClick={() => handleRemoveRating(numberIndex, searchItemList[numberIndex]?.id, mediaType)}>
                                            {loading3[numberIndex] ? (
                                                <div>
                                                    <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <div>Remove Rating</div>
                                                </div>
                                            )
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            <Swiper
                spaceBetween={10}
                slidesPerView={activeSlider}
                navigation={true}
                direction="horizontal"
                modules={[Pagination, Navigation]}
                className="mySwiper flex text-white"
            >
                {searchItemList?.map((item: any, index: any) => {
                    const existingIndex = favoriteList.findIndex(fav => fav?.itemId == item?.id);
                    // const existingRating = ratingList.findIndex(fav => fav?.itemId == item?.id);
                    const existingRating = ratingList.find(rating => rating?.itemId == item?.id); // Find the rating object for the item

                    return (
                        <SwiperSlide key={index} className="bg-gray-200">
                            <div className="w-full h-auto hover:opacity-80" onClick={() => navigate(`/${mediaType}/${item?.id}`)}>
                                <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images " className="h-60 w-full" />
                            </div>
                            <div className="bg-gray-900">
                                <div className="mx-3 ">
                                    <div className="flex gap-x-4 items-center ">
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-star text-yellow-300"></i>
                                            <p className="leading-relaxed text-gray-500">{item?.vote_average?.toFixed(1)}</p>
                                        </div>
                                        <div className="grow ml-auto py-2" onClick={() => handleClick(index, existingRating?.itemRating)}>
                                            {
                                                existingRating ? (
                                                    loading2[index] ? (
                                                        <div>
                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center  gap-2 hover:bg-gray-500 w-fit px-2 py-2 rounded-lg">
                                                            <i className="fa-solid fa-star text-blue-500"></i>
                                                            <div>{existingRating?.itemRating}</div>
                                                        </div>

                                                    )
                                                ) : (
                                                    <div className="font-bold text-sm">
                                                        {loading2[index] ? (
                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                        ) : (
                                                            <div className="hover:bg-gray-500  w-fit px-2 py-2 rounded-lg">
                                                                <i className="fa-regular fa-star text-blue-500"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="h-12 mt-2">
                                        <p className="line-clamp-2">{index}. {item.title ? item?.title : item?.name}</p>
                                    </div>
                                    <button
                                        onClick={() => handleWatchList(index, item?.id, item?.title || item?.name, item?.poster_path, item?.first_air_date ? item?.first_air_date : item?.release_date, item?.genre_ids, item?.overview, item?.popularity, item?.vote_average, item?.vote_count
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
                                        onClick={() => navigate(`/${mediaType === 'movie' ? 'video' : 'videoTv'}/${item?.id}`)}
                                        className="flex items-center px-4 py-2 border rounded-lg w-full hover:bg-gray-600 justify-center border-none text-white">
                                        <i className="fa-solid fa-play mr-2"></i>
                                        <p>Trailer</p>
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide >
                    )
                })}
            </Swiper >
        </div >
    );
}
