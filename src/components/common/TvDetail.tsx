import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Rating } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AppDispatch } from '../../redux/store';
import { favoriteMongoApi, getFavoriteMongoApi, getListRatingMongoApi, ratingMongoApi, removeRatingMongoApi } from '../../redux/client/api.LoginMongo';
import { setDeleteRating, setFavorite, setListFavorite, setListRating, setRating } from '../../redux/reducers/login.reducer';
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';
import { LanguageContext } from '../../pages/LanguageContext';
import Share from '../../modules/Share';
import RatingModule from '../../modules/RatingModule';

export interface TwoMovieRowProps {
    singleTvList: any
    singleTvImageList: any
}

export default function TvDetail({
    singleTvList,
    singleTvImageList
}: TwoMovieRowProps) {
    let navigate = useNavigate()
    const totalImages = singleTvImageList[0]?.backdrops?.length + singleTvImageList[0]?.logos?.length + singleTvImageList[0]?.posters?.length;
    const scrollToElement = (elementId: any) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start", // Cuộn trang để phần tử hiển thị ở đầu trang
                inline: "nearest" // Cuộn trang để phần tử hiển thị ở phía trên cửa sổ trình duyệt
            });
        }
    };

    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [isRating, setIsRating] = useState(false);
    const [checkLog, setCheckLog] = useState(false)
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const [value, setValue] = useState<number | null>(0);

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
        dispatch(setGlobalLoading(true));
        if (userInfoList.length > 0) {
            dispatch(fetchGetFavorites());
            dispatch(fetchGetRating())
        }
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, [userInfoList]);
    const existingIndex = favoriteList.findIndex(fav => fav.itemId == singleTvList[0]?.id);
 
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
    const fetchFavorite = (
        movieId: string,
        mediaType: string,
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
                if (existingIndex !== -1) {
                    toast.info(`${singleTvList[0]?.name} has been remove from watchlist`)
                }
                else {
                    toast.success(`${singleTvList[0]?.name} has been added to watchlist`)
                }
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Updating watch list failed"+e);
        }
    };

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
        setLoading((prevLoading) => ({ ...prevLoading, [index]: true }));
        await dispatch(fetchFavorite(
            movieId, mediaType, movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
        ));
        setCheckLog(!checkLog);

        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };

    const [loading2, setLoading2] = useState<{ [key: number]: boolean }>({});
    const [loading3, setLoading3] = useState<{ [key: number]: boolean }>({});

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

    const fetchRating = (
        itemId: string,
        itemType: string,
        itemRating: string,
        itemImg: any,
        itemName: any
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

    const handleRating = async (itemRating: any,
        itemImg: any,
        itemName: any
    ) => {
        setLoading2((prevLoading2) => ({ ...prevLoading2, [0]: true }));
        await dispatch(fetchRating(
            singleTvList[0]?.id,
            'TV',
            itemRating,
            itemImg,
            itemName
        ));
        setCheckLog(!checkLog);
        setIsRating(false)
        toast.success('Rating success')
        setLoading2((prevLoading2) => ({ ...prevLoading2, [0]: false }));
    };

    const fetchRemove = (
        movieId: string,
        movieType: string,
    ) => async (dispatch: AppDispatch) => {
        const email = userInfoList[0];
        try {
            const response = await removeRatingMongoApi(
                email,
                movieId,
                movieType,
            );
            dispatch(setDeleteRating(response));
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
    const handleRemoveRating = async (
        index: number,
        movieId: any,
        movieType: any,
    ) => {
        setLoading3((prevLoading3) => ({ ...prevLoading3, [index]: true }));
        await dispatch(fetchRemove(
            movieId,
            movieType,
        ));
        setCheckLog(!checkLog);
        toast.info('Remove rating success')
        setIsRating(false)
        setLoading3((prevLoading3) => ({ ...prevLoading3, [index]: false }));
    };

    function formatNumber(num: any) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'm';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num;
    }
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750'; // Set the fallback image source here
    };
    const [isOpen, setIsOpen] = useState(false);

    const toggleContent = () => {
        setIsOpen(!isOpen);
    };
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;

    return (
        <section className="" style={{
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: 'hidden'
        }}>
            {isRating && (
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
                                <p className="text-2xl ">{singleTvList[0]?.title ? singleTvList[0]?.title : singleTvList[0]?.name}</p>
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
                                        onClick={() => handleRating(value, singleTvList[0]?.poster_path, singleTvList[0]?.title ? singleTvList[0]?.title : singleTvList[0]?.name)}>
                                        {loading2[0] ? (
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
                                        onClick={() => handleRemoveRating(0, singleTvList[0]?.id, 'TV')}>
                                        {loading3[0] ? (
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
            <div className="text-white font-sans font-medium max-w-full " >
                <div style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w500${singleTvList[0]?.backdrop_path}')`,
                    position: "absolute", width: "100%", height: "100%", opacity: "0.5",
                    backgroundSize: "cover", backgroundPosition: "center",
                    backgroundColor: 'black',
                    filter: 'blur(100px)',
                }}>

                </div>

                <div style={{ position: "relative" }}>
                    <div className="flex flex-row justify-end gap-2 items-center ">
                        <div className=" py-2 hidden lg:block hover:underline capitalize" onClick={() => scrollToElement('tvCast')}>Top {translations[language]?.star}</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline capitalize" onClick={() => scrollToElement('tvReview')}>{translations[language]?.reviews}</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline capitalize" onClick={() => scrollToElement('tvVideo')}>Videos</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline capitalize" onClick={() => scrollToElement('tvTrvia')}>{translations[language]?.storyLine}</div>
                        <button className="py-2 px-3 border-l  border-r  border-gray-400 hidden lg:block">IMDbPro</button>

                        <Share bgColor={'white'}></Share>
                    </div>
                    <div className="flex justify-between py-2">
                        <div className="items-center">
                            <div className="mr-4 text-2xl">{singleTvList[0]?.name}</div>
                            <div className="flex space-x-4 text-stone-400">
                                <div>{singleTvList[0]?.first_air_date?.split("-")[0]}</div>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="flex">
                                <div className="items-center justify-center">
                                    <div className="mr-4 text-stone-400" >IMDb {translations[language]?.rating}</div>
                                    <div className="flex space-x-4 hover:opacity-80 hover:bg-gray-500">
                                        <div className="flex justify-center aligns-center items-center h-full gap-2">
                                            <i className="fa-solid fa-star h-full items-center text-2xl text-yellow-300"></i>
                                            <div className="">
                                                <div>
                                                    <span className=" text-xl">
                                                        {typeof singleTvList[0]?.vote_average === 'number' ?
                                                            (singleTvList[0]?.vote_average % 1 === 0 ?
                                                                singleTvList[0]?.vote_average.toFixed(0) :
                                                                singleTvList[0]?.vote_average.toFixed(1)
                                                            ) : 'N/A'
                                                        }
                                                    </span>
                                                    <span className="text-stone-400">  /10</span>
                                                </div>
                                                <div className="text-stone-400">{singleTvList[0]?.vote_count}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="items-center text-center justify-center m-auto mr-4 aligns-center">
                                    <div className="    text-stone-400">{translations[language]?.rating}</div>
                                    {/* <div className="hover:opacity-80 hover:bg-gray-500 text-center justify-center" onClick={() => handleClick(existingRating?.itemRating)}>
                                        <button className="flex px-3 py-3 text-blue-500 items-center gap-2 text-xl text-center justify-center w-full ">
                                            {
                                                existingRating ? (
                                                    loading2[0] ? (
                                                        <div>
                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 ">
                                                            <i className="fa-solid fa-star text-blue-500"></i>
                                                            <div>{existingRating?.itemRating}</div>
                                                        </div>

                                                    )
                                                ) : (
                                                    <div className="font-bold text-sm">
                                                        {loading2[0] ? (
                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                        ) : (
                                                            <div className="flex items-center text-xl text-center gap-2">
                                                                <div>Rate</div>
                                                                <i className="fa-regular fa-star text-blue-500"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }
                                        </button>

                                    </div> */}
                                      <RatingModule mediaType={'TV'} ratingList={singleTvList[0]} email={userInfoList[0]}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-12 py-2 gap-y-4 h-full">
                        <div className="hidden lg:block col-span-3 bg-gray-200  h-full hover:opacity-80 rounded-xl">
                            <img className='rounded-xl' src={`https://image.tmdb.org/t/p/w500${singleTvList[0]?.poster_path}`} alt="product images" />
                        </div>
                        <div className="lg:col-span-7 col-span-12 lg:ml-2 bg-black relative hover:opacity-80 rounded-xl">
                            <iframe
                                key={singleTvList[0]?.name}
                                src={`https://www.youtube.com/embed/${singleTvList[0]?.videos?.results[0]?.key}?controls=0&&autoplay=1`}
                                width="100%"
                                height={"100%"}
                                title={singleTvList[0]?.name}
                                style={{ border: 0, minHeight: '350px' }}
                                className='rounded-xl'
                            >
                            </iframe>
                        </div>
                        <div className="hidden lg:block col-span-2 h-full ml-2 overflow-hidden rounded-xl">
                            <div className="bg-gray-500 flex flex-col justify-center items-center h-1/2 mb-1 hover:opacity-80 rounded-xl">
                                <div className="flex flex-col justify-center items-center "
                                    onClick={() => navigate(`/videoTv/${singleTvList[0]?.id}`)}>
                                    <div className="text-center">
                                        <VideoLibraryIcon />
                                    </div>
                                    <div className="text-center">
                                        {singleTvList[0]?.videos?.results?.length > 99 ? "99+" : singleTvList[0]?.videos?.results?.length} Trailers
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-500 flex flex-col justify-center items-center h-1/2 mt-1 hover:opacity-80 rounded-xl"
                                onClick={() => navigate(`/image/tv/${singleTvList[0]?.id}`)}>
                                <div className="flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <PhotoLibraryIcon />
                                    </div>
                                    <div className="text-center" >
                                        {totalImages > 99 ? "99+" : totalImages} {translations[language]?.photos}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black relative px-2 py-2">
                        <div className=" grid-cols-12 hidden lg:grid gap-6 h-full">
                            <div className=" col-span-8  bg-black  ">
                                <div className="flex gap-2 mb-1">
                                    {singleTvList[0]?.genres?.map((item: any) => (
                                        <button
                                            onClick={() => navigate(`/search?mediaType=tv&genres=${item?.name}`)}
                                            key={item.id} className="bg-none text-white py-2 px-4 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-white">
                                    <div className="py-2 border-b border-gray-300">{singleTvList[0]?.overview}</div>
                                    <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                        <div className="">{translations[language]?.writer}</div>
                                        <div className="flex gap-3 justify-center text-center aligns-center">
                                            {singleTvList[0]?.created_by?.slice(0, 3).map((item: any, index: number) => (
                                                <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className=" flex gap-2">
                                                    <span className="hover:underline text-blue-600">{item?.name}</span>
                                                    <span>{index < Math.min(singleTvList[0]?.created_by?.length) - 1 ? '•' : ''}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                        <div className="">{translations[language]?.star}</div>
                                        <div className="flex gap-3">
                                            {singleTvList[0]?.aggregate_credits?.cast?.slice(0, 3).map((item: any, index: number) => (
                                                <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className=" flex gap-2">
                                                    <span className="hover:underline text-blue-600">{item?.name}</span>
                                                    <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                        <div className="">IMDb<span className="text-blue-500">Pro</span></div>
                                        <div className="flex gap-3 items-center">
                                            <p onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                                <span className="text-blue-600">{translations[language]?.seePro}</span>
                                            </p>
                                            <i className="fa-solid fa-arrow-up-right-from-square"></i>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="w-full h-full items-center justify-center text-center">
                                    <div className="flex flex-col justify-center items-center h-full ">
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            {singleTvList[0]?.networks[0]?.logo_path !== null ? (
                                                <div className="w-full">
                                                    <button className="py-2 px-2 items-center gap-2 text-sm ">
                                                        <p className='text-yellow-300 text-left'>Streaming</p>
                                                        <img
                                                            src={`https://media.themoviedb.org/t/p/h60${singleTvList[0]?.networks[0]?.logo_path}`}
                                                            className='bg-white border-2 border-blue-500 rounded-lg px-2 py-2'
                                                        />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                        <button className="w-full hover:opacity-90 flex items-center  border-2 border-black bg-yellow-300 " >
                                            <div onClick={() => handleWatchList(0, singleTvList[0]?.id, 'TV', singleTvList[0]?.name, singleTvList[0]?.poster_path, singleTvList[0]?.first_air_date, singleTvList[0]?.genres?.map((item: any) => item?.id), singleTvList[0]?.overview, singleTvList[0]?.popularity, singleTvList[0]?.vote_average, singleTvList[0]?.vote_count)}>
                                                {existingIndex !== -1 ? (
                                                    loading[0] ? (
                                                        <div>
                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                        </div>
                                                    ) : (
                                                        <div className="py-2 px-3 flex items-center text-black gap-2 grow  text-center h-full">
                                                            <i className="fas fa-check font-bold text-xl  mr-2"></i>
                                                            <div className="text-left">
                                                                <div className='font-bold'  >
                                                                    <p>{translations[language]?.removeFrom}  watchList</p>
                                                                </div>
                                                                {/* <p>Added by {formatNumber(singleTvList[0]?.popularity)} user</p> */}
                                                            </div>
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="font-bold text-sm">
                                                        {loading[0] ? (
                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                        ) : (
                                                            <div className="py-2 px-3 flex items-center text-black gap-2 grow  text-center h-full">
                                                                <i className="fas fa-plus font-bold text-xl  mr-2"></i>
                                                                <div className="text-left">
                                                                    <div className='font-bold'  >
                                                                        <p>{translations[language]?.add} watchList</p>
                                                                    </div>
                                                                    {/* <p>Added by {formatNumber(singleTvList[0]?.popularity)} user</p> */}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div
                                                onClick={() => navigate('/watchList2')}
                                                className="py-3 px-3 ml-auto w-16  flex items-center border-gray-500 border-l-2 justify-center h-full ">
                                                <i className="fa-solid fa-chevron-down"></i>
                                            </div>
                                        </button>
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 text-sm">
                                                    <p>{singleTvList[0]?.reviews?.results?.length}</p>
                                                    <p>{translations[language]?.reviews}</p>
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 whitespace-nowrap">
                                                    <p>0</p>
                                                    <p>{translations[language]?.criticReview}</p>
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 ">
                                                    <p className="bg-yellow-300 h-6 w-6 items-center justify-center">
                                                        {isNaN(Math.floor(singleTvList[0]?.vote_average * 10 + 2)) ? 'N/A' : Math.floor(singleTvList[0]?.vote_average * 10 + 2)}
                                                    </p>
                                                    <p>Metascore</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-black relative  lg:hidden'>
                        <div className='grid grid-cols-2 gap-1' >
                            <div className='col-span-1'>
                                <div className='h-full aligns-center item-center justify-center px-2 py-2 bg-gray-500 text-center flex hover:opacity-90' onClick={() => navigate(`/videoTv/${singleTvList[0]?.id}`)}>
                                    <div>   <VideoLibraryIcon />   </div>
                                    {singleTvList[0]?.videos?.results?.length > 99 ? "99+" : singleTvList[0]?.videos?.results?.length} Trailers
                                </div>
                            </div>
                            <div className='col-span-1'>
                                <div
                                    onClick={() => navigate(`/image/tv/${singleTvList[0]?.id}`)}
                                    className='flex h-full aligns-center item-center justify-center px-2 py-2 bg-gray-500 text-center'>
                                    <div>   <PhotoLibraryIcon /></div>
                                    {totalImages > 99 ? "99+" : totalImages} {translations[language]?.photos}
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-1 mt-2' >
                            <div>
                                <img src={`https://image.tmdb.org/t/p/w500/${singleTvList[0]?.poster_path}`}
                                    className='rounded-xl' onError={handleImageError} alt="produdđct images" />
                            </div>
                            <div className='col-span-2'>
                                <div className='gap-2'>
                                    {singleTvList[0]?.genres.slice(0, 4).map((item: any) => (
                                        <button
                                            onClick={() => navigate(`/search?mediaType=tv&genres=${item?.name}`)}
                                            key={item.id} className="bg-none text-white py-2 px-2 mr-2 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                                <div>
                                    <p className="py-2 ">
                                        {singleTvList[0]?.overview && singleTvList[0]?.overview.length > 120 ?
                                            singleTvList[0]?.overview.slice(0, 120) + "..." :
                                            singleTvList[0]?.overview}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-2 flex px-3'>
                            <div className=' flex items-center gap-2' >
                                <i className="fa-solid fa-star text-yellow-300"></i>
                                <span className=" text-xl">
                                    {typeof singleTvList[0]?.vote_average === 'number' ?
                                        (singleTvList[0]?.vote_average % 1 === 0 ?
                                            singleTvList[0]?.vote_average.toFixed(0) :
                                            singleTvList[0]?.vote_average.toFixed(1)) : 'N/A'
                                    }

                                </span>
                                <span className="text-stone-400">  /10</span>
                                <div className="text-stone-400">{singleTvList[0]?.vote_count}</div>
                                <RatingModule mediaType={'TV'} ratingList={singleTvList[0]} email={userInfoList[0]}/>
                                {/* <div className="hover:opacity-80 hover:bg-gray-500 text-center justify-center" onClick={() => handleClick(existingRating?.itemRating)}>
                                    <button className="flex px-3 py-3 text-blue-500 items-center gap-2 text-xl text-center justify-center w-full ">
                                        {
                                            existingRating ? (
                                                loading2[0] ? (
                                                    <div>
                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 ">
                                                        <i className="fa-solid fa-star text-blue-500"></i>
                                                        <div>{existingRating?.itemRating}</div>
                                                    </div>

                                                )
                                            ) : (
                                                <div className="font-bold text-sm">
                                                    {loading2[0] ? (
                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                    ) : (
                                                        <div className="flex items-center text-xl text-center gap-2">
                                                            <div>Rate</div>
                                                            <i className="fa-regular fa-star text-blue-500"></i>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        }
                                    </button>

                                </div> */}
                            </div>
                        </div>
                        <div className='px-3 items-center'>
                            <div>
                                <div className="border-b border-gray-300 flex gap-1 py-2 items-center aligns-center" onClick={toggleContent}>
                                    <div>
                                        {isOpen ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
                                    </div>
                                    <div>{translations[language]?.moreExplore} </div>
                                </div>
                                {isOpen && (
                                    <div>
                                        <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                            <div className="">{translations[language]?.writer} </div>
                                            <div className="flex gap-2 flex-wrap justify-start text-center aligns-center items-center">
                                                {singleTvList[0]?.created_by?.slice(0, 3).map((item: any, index: number) => (
                                                    <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className=" flex gap-2">
                                                        <span className="hover:underline text-blue-600">{item?.name}</span>
                                                        <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                            <div className="">{translations[language]?.star} </div>
                                            <div className="flex gap-2 flex-wrap justify-start text-center aligns-center items-center">
                                                {singleTvList[0]?.aggregate_credits?.cast?.slice(0, 3).map((item: any, index: number) => (
                                                    <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className=" flex gap-2">
                                                        <span className="hover:underline text-blue-600">{item?.name}</span>
                                                        <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                            <div className="">IMDb<span className="text-blue-500">Pro</span></div>
                                            <div className="flex gap-3 items-center">
                                                <p onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                                    <span className="text-blue-600">{translations[language]?.seePro} </span>
                                                </p>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>

                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>


                        <div className='px-3 py-2 border-b border-gray-300 '>
                            <button className="w-full hover:opacity-90 flex items-center  border-2 border-black bg-yellow-300 " >
                                <div onClick={() => handleWatchList(0, singleTvList[0]?.id, 'TV', singleTvList[0]?.title, singleTvList[0]?.poster_path, singleTvList[0]?.first_air_date, singleTvList?.genres?.map((item: any) => item?.id), singleTvList[0]?.overview, singleTvList[0]?.popularity, singleTvList[0]?.vote_average, singleTvList[0]?.vote_count)}>
                                    {existingIndex !== -1 ? (
                                        loading[0] ? (
                                            <div>
                                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                            </div>
                                        ) : (
                                            <div className="py-2 px-3 flex items-center text-black gap-2 grow  text-center h-full">
                                                <i className="fas fa-check font-bold text-xl  mr-2"></i>
                                                <div className="text-left">
                                                    <div className='font-bold'  >
                                                        <p>{translations[language]?.removeFrom} watchList</p>
                                                    </div>
                                                    {/* <p>Added by {formatNumber(singleTvList[0]?.popularity)} user</p> */}
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        <div className="font-bold text-sm">
                                            {loading[0] ? (
                                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                            ) : (
                                                <div className="py-2 px-3 flex items-center text-black gap-2 grow  text-center h-full">
                                                    <i className="fas fa-plus font-bold text-xl  mr-2"></i>
                                                    <div className="text-left">
                                                        <div className='font-bold'  >
                                                            <p>{translations[language]?.add}  watchList</p>
                                                        </div>
                                                        {/* <p>Added by {formatNumber(singleTvList[0]?.popularity)} user</p> */}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div
                                    onClick={() => navigate('/watchList2')}
                                    className="py-3 px-3 ml-auto w-16  flex items-center border-gray-500 border-l-2 justify-center h-full ">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </button>

                        </div>
                        <div className=" border-b border-gray-300 gap-3 py-2 items-center aligns-center px-2">
                            <div className="flex gap-3 items-center text-blue-500 px-3">
                                <i className="fa-solid fa-phone"></i>
                                <p onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                    <span className="text-blue-500">{translations[language]?.seePro} </span>
                                </p>
                                <i className="fa-solid fa-arrow-up-right-from-square text-blue-500"></i>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </section >
    )
}