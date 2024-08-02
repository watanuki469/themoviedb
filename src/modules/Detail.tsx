import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from '../pages/LanguageContext';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchFavorite, fetchFavoriteActor, fetchGetFavorites, fetchGetFavoritesActor } from '../redux/reducers/login.reducer';
import { handleImageError } from './BaseModule';
import RatingModule from './RatingModule';

export interface TwoMovieRowProps {
    detailList: any
    detailImageList: any
    mediaType: any
}

export default function Detail({
    detailList,
    detailImageList,
    mediaType
}: TwoMovieRowProps) {
    let navigate = useNavigate()
    const totalImages = detailImageList[0]?.backdrops?.length + detailImageList[0]?.logos?.length + detailImageList[0]?.posters?.length;

    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

    const dispatch = useAppDispatch()
    const favoriteList = useAppSelector((state) => state.login.listFavorite);
    const favoriteListActor = useAppSelector((state) => state.login.listFavoriteActor);

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
            if (mediaType != 'person') {
                dispatch(fetchGetFavorites(userInfoList[0]));
            }
            else {
                dispatch(fetchGetFavoritesActor(userInfoList[0]));
            }
        }
    }, [userInfoList]);

    const existingIndex = favoriteList?.findIndex(fav => fav?.itemId == detailList?.id);
    const existingIndex2 = favoriteListActor?.findIndex(fav => fav?.itemId == detailList?.id);

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
        movieVoteCount: string,
        movieKnowFor: string,
    ) => {
        setLoading((prevLoading) => ({ ...prevLoading, [index]: true }))
        if (mediaType != 'person') {
            await dispatch(fetchFavorite(
                userInfoList[0], movieId, mediaType, movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
            ));
        }
        else {
            await dispatch(fetchFavoriteActor(
                userInfoList[0], movieId, movieName, movieImg, movieReleaseDay, movieReview, moviePopularity, movieKnowFor
            ));
        }
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
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
        <div style={{ position: "relative" }}>
            <div className="grid grid-cols-12 py-2 gap-y-4 h-full">
                <div className="hidden lg:block col-span-3 bg-gray-200  h-full hover:opacity-80 rounded-tr-xl rounded-br-xl rounded-bl-xl relative">
                    <a href={`/image/${mediaType}/${detailList?.id}`}>
                        <img onError={handleImageError} className='rounded-tr-xl rounded-br-xl rounded-bl-xl' src={`https://image.tmdb.org/t/p/w500${detailList?.poster_path ? detailList?.poster_path : detailList?.profile_path}`} alt="product  meomeo images" />
                    </a>
                    {mediaType != 'person' && (
                        <div className='absolute top-0 left-0'
                            onClick={() => handleWatchList(0, detailList?.id, detailList?.title ? detailList?.title : detailList?.name, detailList?.poster_path ? detailList?.poster_path : detailList?.profile_path, detailList?.first_air_date ? detailList?.first_air_date : detailList?.release_date ? detailList?.release_date : detailList?.birthday, detailList?.genres?.map((item: any) => item?.id), detailList?.overview ? detailList?.overview : detailList?.biography, detailList?.popularity, detailList?.vote_average, detailList?.vote_count, detailList?.known_for_department)}>
                            <div className='relative'>
                                {existingIndex !== -1 ? (
                                    loading[0] ? (
                                        <div className="">
                                            <i className="fa-solid fa-bookmark text-yellow-300 text-5xl"></i>
                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse absolute text-black" style={{ top: '25%', left: '25%', transform: 'translate(-50%, -50%)', zIndex: 1 }}></i>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <i className="fa-solid fa-bookmark text-yellow-300 text-5xl"></i>
                                            <i className="fa-solid fa-check absolute text-black" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}></i>
                                        </div>
                                    )
                                ) : (
                                    loading[0] ? (
                                        <div className="">
                                            <i className="fa-solid fa-bookmark text-yellow-300 text-5xl"></i>
                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse absolute text-black" style={{ top: '25%', left: '25%', transform: 'translate(-50%, -50%)', zIndex: 1 }}></i>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <i className="fa-solid fa-bookmark text-black opacity-50 text-5xl"></i>
                                            <i className="fa-solid fa-plus absolute text-white" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}></i>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                </div>
                <div className="lg:col-span-7 col-span-12 lg:ml-2 bg-black h-full min-h-56 relative hover:opacity-80 rounded-xl">
                    {mediaType != 'person' ? (
                        <iframe
                            key={detailList?.name}
                            src={`https://www.youtube.com/embed/${detailList?.videos?.results[0]?.key}?controls=1&&autoplay=1`}
                            width="100%"
                            height={"100%"}
                            title={detailList?.name}
                            style={{ border: 0, minHeight: '350px' }}
                            className='rounded-xl'
                        >
                        </iframe>
                    ) : (
                        <a href={`/video/${detailList?.combined_credits?.cast[0]?.media_type}/${detailList?.combined_credits?.cast[0]?.id}`} className='h-full'>
                            <div className='h-full'>
                                <div className='h-full rounded-xl'
                                    style={{
                                        backgroundImage: `url('https://image.tmdb.org/t/p/w300/${detailList?.combined_credits?.cast[0]?.backdrop_path ? detailList?.combined_credits?.cast[0]?.backdrop_path : detailList?.combined_credits?.cast[0]?.poster_path}')`,
                                        width: "100%", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: 'black', borderRadius: '12px', objectPosition: 'center'
                                    }}
                                >
                                </div>
                                <div className="absolute bottom-0 left-0 flex justify-start items-center">
                                    <div className='flex items-end gap-2 px-2 py-2'>
                                        <i className="fa-solid fa-circle-play text-white text-5xl"></i>
                                        <div>
                                            <div className='flex items-end text-center text-2xl' >
                                                {translations[language]?.play} Trailer
                                            </div>
                                            <div className='line-clamp-1'>{detailList?.combined_credits?.cast[0]?.title}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    )}

                </div>
                <div className="hidden lg:block col-span-2 h-full ml-2 overflow-hidden rounded-xl">
                    <a className="bg-gray-500 flex flex-col justify-center items-center h-1/2 mb-1 hover:opacity-80 rounded-xl" href={`${mediaType != 'person' ? `/video/${mediaType}/${detailList?.id}` : `/videoGallery/${detailList?.title ? detailList?.title : detailList?.name}/${detailList?.id}`}`}>
                        <div className="flex flex-col justify-center items-center ">
                            <div className="text-center">
                                <VideoLibraryIcon />
                            </div>
                            <div className="text-center">
                                {mediaType != 'person' ? (
                                    <div>
                                        {detailList?.videos?.results?.length > 99 ? "99+" : detailList?.videos?.results?.length} Trailers
                                    </div>
                                ) : (
                                    <div>
                                        {detailList?.combined_credits?.cast?.length > 99 ? "99+" : detailList?.combined_credits?.cast?.length} Trailers
                                    </div>
                                )}
                            </div>
                        </div>
                    </a>
                    <a href={`/image/${mediaType}/${detailList?.id}`} className="bg-gray-500 flex flex-col justify-center items-center h-1/2 mt-1 hover:opacity-80 rounded-xl"
                    >
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-center">
                                <PhotoLibraryIcon />
                            </div>
                            <div className="text-center">
                                {mediaType != 'person' ? (
                                    <div>
                                        {totalImages > 99 ? "99+" : totalImages} {translations[language]?.photos}
                                    </div>
                                ) : (
                                    <div>
                                        {detailList?.images?.profiles?.length > 99 ? "99+" : detailList?.images?.profiles?.length} {translations[language]?.photos}
                                    </div>
                                )}
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="relative px-2 py-2">
                <div className=" grid-cols-12 hidden lg:grid gap-6 h-full">
                    <div className=" col-span-8">
                        <div className="flex gap-2 mb-1">
                            {detailList?.genres?.map((item: any) => (
                                <a key={item?.id} href={`/search?mediaType=tv&genres=${item?.name}`}>
                                    <button className="bg-none text-white py-2 px-4 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                        {item?.name}
                                    </button>
                                </a>
                            ))}
                        </div>
                        <div className="text-white">
                            <div className="py-2 border-b border-gray-300">{detailList?.overview ? detailList?.overview : detailList?.biography}</div>
                            <div>
                                {mediaType === 'tv' && (
                                    <div>
                                        <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                            <div className="">{translations[language]?.star} </div>
                                            <div className="flex gap-2 flex-wrap justify-start text-center aligns-center items-center">
                                                {detailList?.aggregate_credits?.cast?.slice(0, 3).map((item: any, index: number) => (
                                                    <p key={index} className=" flex gap-2">
                                                        <a href={`/person/${item?.id}`}>
                                                            <span className="hover:underline text-blue-600">{item?.name}</span>
                                                        </a>
                                                        <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                            <div className="">IMDb<span className="text-blue-500">Pro</span></div>
                                            <div className="flex gap-3 items-center">
                                                <a href='/IMDbPro'>
                                                    <p onClick={() => navigate(`/IMDbPro`)} className="hover:underline flex gap-2">
                                                        <span className="text-blue-600">{translations[language]?.seePro} </span>
                                                    </p>
                                                </a>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {mediaType === 'movie' && (
                                    <div>
                                        <div className="py-2 flex-wrap flex gap-2 border-b border-gray-300 ">
                                            <div>{translations[language]?.director} </div>
                                            <div className='items-center flex flex-wrap gap-1 justify-start '>
                                                {detailList?.credits?.crew?.filter((item: any) => item?.job === 'Director')?.slice(0, 3)?.map((item: any, index: number) => (
                                                    <p key={index} className="flex gap-2">
                                                        <a href={`/person/${item?.id}`}>
                                                            <span className="text-blue-600 hover:underline ">{item?.name}</span>
                                                        </a>
                                                        <span>{index < Math.min(detailList.credits?.crew?.filter((item: any) => item?.job === 'Director')?.slice(0, 3)?.length) - 1 ? '•' : ''}</span>
                                                    </p>
                                                ))}

                                            </div>
                                        </div>
                                        <div className=" border-b flex flex-wrap  border-gray-300 gap-2 py-2 items-center aligns-center">
                                            <div className="">{translations[language]?.writer} </div>
                                            <div className="flex flex-wrap gap-1 justify-left text-center aligns-center items-center">
                                                {detailList?.credits?.crew?.filter((item: any) => item?.job === 'Novel'|| item?.job === 'Writer')?.slice(0, 3)?.map((item: any, index: number) => (
                                                    <p key={index} className="flex gap-2">
                                                        <a href={`/person/${item?.id}`}>
                                                            <span className="text-blue-600 hover:underline ">{item?.name}</span>
                                                        </a>
                                                        <span>{index < Math.min(detailList?.credits?.crew?.filter((item: any) =>  item?.job === 'Novel'|| item?.job === 'Writer')?.slice(0, 3)?.length) - 1 ? '•' : ''}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className=" border-b flex flex-wrap gap-2 border-gray-300 py-2 items-center aligns-center ">
                                            <div className="">{translations[language]?.star} </div>
                                            <div className="flex gap-1  items-center flex-wrap">
                                                {detailList?.credits?.cast?.slice(0, 3).map((item: any, index: number) => (
                                                    <p key={index} className="flex gap-2">
                                                        <a href={`/person/${item?.id}`}>
                                                            <span className="text-blue-600 hover:underline ">{item?.name}</span>
                                                        </a>
                                                        <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="w-full h-full items-center justify-center text-center">
                            <div className="flex flex-col justify-center items-center h-full ">
                                <div className="grid grid-cols-2 py-2 w-full">
                                    {mediaType === 'tv' ? (
                                        <div>
                                            {detailList?.networks && detailList?.networks?.length > 0 && detailList?.networks[0]?.logo_path != null ? (
                                                <div className="">
                                                    <p className='text-yellow-300 text-left'>Streaming </p>
                                                    <img
                                                        src={`https://media.themoviedb.org/t/p/h60${detailList?.networks[0]?.logo_path}`}
                                                        className='bg-white border-2 border-blue-500 rounded-lg px-2 py-2'
                                                    />
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    ) : <div></div>}
                                </div>
                                <div className='w-full'>
                                    {mediaType === 'person' && (
                                        <div className='flex flex-wrap gap-2 text-left  w-full'>
                                            <p className='font-bold'>{translations[language]?.born}</p>
                                            <p>{detailList?.birthday &&
                                                new Date(detailList?.birthday).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })
                                            }
                                            </p>
                                        </div>
                                    )}

                                    <button className="w-full  flex items-center rounded-3xl px-2 py-2  hover:bg-yellow-200 bg-yellow-300  border-2 border-black  " >
                                        <div onClick={() => handleWatchList(0, detailList?.id, detailList?.title ? detailList?.title : detailList?.name, detailList?.poster_path ? detailList?.poster_path : detailList?.profile_path, detailList?.first_air_date ? detailList?.first_air_date : detailList?.release_date ? detailList?.release_date : detailList?.birthday, detailList?.genres?.map((item: any) => item?.id), detailList?.overview ? detailList?.overview : detailList?.biography, detailList?.popularity, detailList?.vote_average, detailList?.vote_count, detailList?.known_for_department)}>
                                            {
                                                mediaType != 'person' ? (
                                                    <div>
                                                        {existingIndex !== -1 ? (
                                                            loading[0] ? (
                                                                <div>
                                                                    <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                </div>
                                                            ) : (
                                                                <div className="py-2 px-3  hover:opacity-80 flex items-center text-black gap-2 grow  text-center h-full">
                                                                    <i className="fas fa-check font-bold text-xl  mr-2"></i>
                                                                    <div className="text-left font-bold">
                                                                        <p>{translations[language]?.removeFrom}  watchList</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        ) : (
                                                            <div className="font-bold text-sm">
                                                                {loading[0] ? (
                                                                    <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                ) : (
                                                                    <div className="py-2 px-3  flex   items-center text-black gap-2 grow  text-center h-full">
                                                                        <i className="fas fa-plus font-bold text-xl  mr-2"></i>
                                                                        <div className="text-left font-bold">
                                                                            <p>{translations[language]?.add} watchList</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {existingIndex2 !== -1 ? (
                                                            loading[0] ? (
                                                                <div>
                                                                    <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                </div>
                                                            ) : (
                                                                <div className="py-2 px-3  hover:opacity-80 flex items-center text-black gap-2 grow  text-center h-full">
                                                                    <i className="fas fa-check font-bold text-xl  mr-2"></i>
                                                                    <div className="text-left font-bold">
                                                                        <p>{translations[language]?.removeFrom}  watchList</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        ) : (
                                                            <div className="font-bold text-sm">
                                                                {loading[0] ? (
                                                                    <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                ) : (
                                                                    <div className="py-2 px-3  flex   items-center text-black gap-2 grow  text-center h-full">
                                                                        <i className="fas fa-plus font-bold text-xl  mr-2"></i>
                                                                        <div className="text-left font-bold">
                                                                            <p>{translations[language]?.add} watchList</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <div className="py-2 px-2 ml-auto w-16 hover:opacity-80  flex items-center border-gray-500 border-l-2 justify-center h-full ">
                                            <a href={`${mediaType != 'person' ? '/watchList' : '/favoriteList'}`}>
                                                <i className="fa-solid fa-chevron-down"></i>
                                            </a>
                                        </div>
                                    </button>
                                </div>

                                <div className="w-full">
                                    {mediaType != 'person' ? (
                                        <div className='grid grid-cols-2 gap-2 w-full'>
                                            <div className="w-full">
                                                <button className="py-2 px-2 flex items-center gap-2 text-sm">
                                                    <p>{detailList?.reviews?.results?.length}</p>
                                                    <p>{translations[language]?.reviews}</p>
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="py-2 px-2 flex items-center gap-2 whitespace-nowrap">
                                                    <p>0</p>
                                                    <p>{translations[language]?.criticReview}</p>
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 ">
                                                    <p className="bg-yellow-300 h-6 w-6 items-center justify-center">
                                                        {isNaN(Math.floor(detailList?.vote_average * 10 + 2)) ? 'N/A' : Math.floor(detailList?.vote_average * 10 + 2)}
                                                    </p>
                                                    <p>Metascore</p>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                        : (
                                            <div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-black relative  lg:hidden px-2'>
                <div className='grid grid-cols-2 gap-1' >
                    <div className='col-span-1'>
                        <a href={`${mediaType != 'person' ? `/video/${mediaType}/${detailList?.id}` : `/videoGallery/${detailList?.title ? detailList?.title : detailList?.name}/${detailList?.id}`}`}>
                            <div className='h-full aligns-center item-center justify-center px-2 py-2 bg-gray-500 text-center flex hover:opacity-90' >
                                <div>   <VideoLibraryIcon />   </div>
                                <div className="text-center">
                                    {mediaType != 'person' ? (
                                        <div>
                                            {detailList?.videos?.results?.length > 99 ? "99+" : detailList?.videos?.results?.length} Trailers
                                        </div>
                                    ) : (
                                        <div>
                                            {detailList?.combined_credits?.cast?.length > 99 ? "99+" : detailList?.combined_credits?.cast?.length} Trailers
                                        </div>
                                    )}
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='col-span-1'>
                        <a href={`/image/${mediaType}/${detailList?.id}`}>
                            <div className='flex h-full aligns-center item-center justify-center px-2 py-2 bg-gray-500 text-center'>
                                <div>   <PhotoLibraryIcon /></div>
                                <div className="text-center">
                                    {mediaType != 'person' ? (
                                        <div>
                                            {totalImages > 99 ? "99+" : totalImages} {translations[language]?.photos}
                                        </div>
                                    ) : (
                                        <div>
                                            {detailList?.images?.profiles?.length > 99 ? "99+" : detailList?.images?.profiles?.length} {translations[language]?.photos}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className='grid grid-cols-3 px-2 py-2 gap-2' >
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500/${detailList?.poster_path ? detailList?.poster_path : detailList?.profile_path}`}
                            className='rounded-xl' onError={handleImageError} alt="produdđct images" />
                    </div>
                    <div className='col-span-2'>
                        <div className='gap-2'>
                            {detailList?.genres?.slice(0, 4)?.map((item: any) => (
                                <button
                                    onClick={() => navigate(`/search?mediaType=tv&genres=${item?.name}`)}
                                    key={item.id} className="bg-none text-white py-2 px-2 mr-2 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                    {item.name}
                                </button>
                            ))}
                        </div>
                        <div>
                            <p className="py-2 ">
                                {detailList?.overview ? detailList?.overview : detailList?.biography}
                            </p>
                        </div>
                    </div>
                </div>
                {mediaType != 'person' && (
                    <div className=''>
                        <div className=' flex items-center gap-2' >
                            <i className="fa-solid fa-star text-yellow-300"></i>
                            <span className=" text-xl">
                                {typeof detailList?.vote_average === 'number' ?
                                    (detailList?.vote_average % 1 === 0 ?
                                        detailList?.vote_average.toFixed(0) :
                                        detailList?.vote_average.toFixed(1)) : 'N/A'
                                }

                            </span>
                            <span className="text-stone-400">  /10</span>
                            <div className="text-stone-400">{detailList?.vote_count}</div>
                            <div className='px-2 py-2 hover:text-black hover:bg-white w-fit text-blue-500'>
                                <RatingModule mediaType={mediaType} ratingList={detailList} userInfoList={userInfoList} starIndex={0} rateHidden={'false'} />
                            </div>
                        </div>
                        <div className=''>
                            <div className="border-b border-gray-300 flex gap-1 py-2 items-center aligns-center" onClick={toggleContent}>
                                <div>
                                    {isOpen ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
                                </div>
                                <div>{translations[language]?.moreExplore} </div>
                            </div>
                            <div className='py-2'>
                                {isOpen && (
                                    <div className=''>
                                        {mediaType === 'tv' && (
                                            <div>
                                                <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                                    <div className="">{translations[language]?.star} </div>
                                                    <div className="flex gap-2 flex-wrap justify-start text-center aligns-center items-center">
                                                        {detailList?.aggregate_credits?.cast?.slice(0, 3).map((item: any, index: number) => (
                                                            <p key={index} className=" flex gap-2">
                                                                <a href={`/person/${item?.id}`}>
                                                                    <span className="hover:underline text-blue-600">{item?.name}</span>
                                                                </a>
                                                                <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                                    <div className="">IMDb<span className="text-blue-500">Pro</span></div>
                                                    <div className="flex gap-3 items-center">
                                                        <p onClick={() => navigate(`/IMDbPro`)} className="hover:underline flex gap-2">
                                                            <span className="text-blue-600">{translations[language]?.seePro} </span>
                                                        </p>
                                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {mediaType === 'movie' && (
                                            <div className=''>
                                                <div className="py-2 border-b border-gray-300 gap-1">
                                                    <div>{translations[language]?.director} </div>
                                                    <div className='items-center flex flex-wrap gap-1 justify-start '>
                                                        {detailList?.credits?.crew?.filter((item: any) => item?.job === 'Director')?.slice(0, 3)?.map((item: any, index: number) => (
                                                            <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                                                <span className="text-blue-600">{item?.name}</span>
                                                                <span>{index < Math.min(detailList.credits?.crew?.filter((item: any) => item?.job === 'Director')?.slice(0, 3)?.length) - 1 ? '•' : ''}</span>
                                                            </p>
                                                        ))}

                                                    </div>
                                                </div>
                                                
                                                <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                                    <div className="">{translations[language]?.writer} </div>
                                                    <div className="flex flex-wrap gap-1 justify-left text-center aligns-center items-center">
                                                        {detailList?.credits?.crew?.filter((item: any) => item?.job === 'Novel' || item?.job === 'Writer')?.slice(0, 3)?.map((item: any, index: number) => (
                                                            <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                                                <span className="text-blue-600">{item?.name}</span>
                                                                <span>{index < Math.min(detailList?.credits?.crew?.filter((item: any) => item?.job === 'Novel'|| item?.job === 'Writer')?.slice(0, 3)?.length) - 1 ? '•' : ''}</span>
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className=" border-b border-gray-300 gap-1 py-2 items-center aligns-center ">
                                                    <div className="">{translations[language]?.star} </div>
                                                    <div className="flex gap-1  items-center flex-wrap">
                                                        {detailList?.credits?.cast?.slice(0, 3)?.map((item: any, index: number) => (
                                                            <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                                                <span className="text-blue-600">{item?.name}</span>
                                                                <span>{index < Math.min(detailList?.credits?.cast?.slice(0, 3)?.length) - 1 ? '•' : ''}</span>
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                )}

                <button className="w-full rounded-3xl hover:opacity-90 flex items-center  border-2 border-black bg-yellow-300 " >
                    <div onClick={() => handleWatchList(0, detailList?.id, detailList?.title ? detailList?.title : detailList?.name, detailList?.poster_path ? detailList?.poster_path : detailList?.profile_path, detailList?.first_air_date ? detailList?.first_air_date : detailList?.release_date ? detailList?.release_date : detailList?.birthday, detailList?.genres?.map((item: any) => item?.id), detailList?.overview ? detailList?.overview : detailList?.biography, detailList?.popularity, detailList?.vote_average, detailList?.vote_count, detailList?.known_for_department)}>
                        {existingIndex !== -1 ? (
                            loading[0] ? (
                                <div>
                                    <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                </div>
                            ) : (
                                <div className="py-2 px-3 flex items-center text-black gap-2 grow  text-center h-full">
                                    <i className="fas fa-check font-bold text-xl  mr-2"></i>
                                    <div className="text-left font-bold">
                                        <p>{translations[language]?.removeFrom} watchList</p>
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
                                        <div className="text-left font-bold">
                                            <p>{translations[language]?.add}  watchList</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="py-3 px-3 ml-auto w-16  flex items-center border-gray-500 border-l-2 justify-center h-full ">
                        <a href={`${mediaType != 'person' ? '/watchList' : '/favoriteList'}`}>
                            <i className="fa-solid fa-chevron-down"></i>
                        </a>
                    </div>
                </button>

                <div className=" border-b border-gray-300 gap-3 py-2 items-center aligns-center px-2">
                    <div className="flex gap-3 items-center text-blue-500 px-3">
                        <i className="fa-solid fa-phone"></i>
                        <a href='/IMDbPro'>
                            <p className="hover:underline flex gap-2">
                                <span className="text-blue-500">{translations[language]?.seePro} </span>
                            </p>
                        </a>
                        <i className="fa-solid fa-arrow-up-right-from-square text-blue-500"></i>
                    </div>
                </div>

            </div>
        </div>
    )
}