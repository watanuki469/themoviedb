import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AppDispatch } from '../../redux/store';
import { favoriteMongoApi, getFavoriteMongoApi } from '../../redux/client/api.LoginMongo';
import { setFavorite, setListFavorite } from '../../redux/reducers/login.reducer';

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
    const [anchorShareEl, setAnchorShareEl] = useState<null | HTMLElement>(null);
    const openShare = Boolean(anchorShareEl);
    const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorShareEl(event.currentTarget);
    };
    const handleShareClose = () => {
        setAnchorShareEl(null);
    };
    const handleCopyLink = () => {
        // Lấy địa chỉ URL hiện tại
        const currentUrl = window.location.href;
        // Thử copy địa chỉ URL vào clipboard
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                toast.success('Link copied');
            })
            .catch((error) => {
                toast.error('Failed to copy link');
                console.error('Error copying link:', error);
            });
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
    useEffect(() => {
        if (userInfoList.length > 0) {
            dispatch(fetchGetFavorites());
        }
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
                email,
                movieId,
                mediaType,
                movieName,
                movieImg,
                movieReleaseDay,
                movieGenre,
                movieReview,
                moviePopularity,
                movieVoteAverage,
                movieVoteCount
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
            toast.error("Updating watch list failed");
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
            movieId,
            mediaType,
            movieName,
            movieImg,
            movieReleaseDay,
            movieGenre,
            movieReview,
            moviePopularity,
            movieVoteAverage,
            movieVoteCount
        ));
        setCheckLog(!checkLog);

        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };
    // const [checkLog, setCheckLog] = useState(false)

    // const handleWatchList = (movie: any) => {
    //     const storedDataString = localStorage.getItem('watchList');
    //     let storedData: { [key: string]: any } = {};
    //     if (storedDataString !== null) {
    //         storedData = JSON.parse(storedDataString);
    //     }
    //     if (storedData[movie?.id]) {
    //         delete storedData[movie?.id];
    //         localStorage.setItem('watchList', JSON.stringify(storedData));
    //         setCheckLog(!checkLog)
    //         toast.success(`Removed ${movie?.title ? movie?.title : movie?.name} from watch list successfully`);

    //     } else {
    //         storedData[movie?.id] = movie;
    //         setCheckLog(!checkLog)
    //         localStorage.setItem('watchList', JSON.stringify(storedData));
    //         toast.success(`Added ${movie?.title ? movie?.title : movie?.name} to watch list successfully`);

    //     }
    // }
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
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };
    const [isOpen, setIsOpen] = useState(false);

    const toggleContent = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section className="" style={{
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <div className="text-white font-sans font-medium max-w-full " >
                <div style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w500${singleTvList[0]?.backdrop_path}')`,
                    position: "absolute", width: "100%", height: "100%", opacity: "0.5",
                    backgroundSize: "cover", backgroundPosition: "center",
                    backgroundColor: 'black'
                }}>

                </div>

                <div style={{ position: "relative", zIndex: "1" }}>
                    <div className="flex flex-row justify-end gap-2 items-center ">
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('tvCast')}>Cast & Crew</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('tvReview')}>User Reviews</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('tvVideo')}>Videos</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('tvTrvia')}>Trivia</div>
                        <button className="py-2 px-3 border-l  border-r  border-gray-400 hidden lg:block">IMDbPro</button>
                        {/* <button className="py-2 px-3 border-r border-gray-400 flex items-center gap-2">
                            <i className="fa-solid fa-icons"></i>
                            <p>All Topic</p>
                        </button> */}
                        <IconButton
                            onClick={handleShareClick}
                            size="small"
                            aria-controls={openShare ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openShare ? 'true' : undefined}
                        >
                            {/* <Avatar sx={{
                                bgcolor: 'none', color: 'white', ":hover": {
                                    bgcolor: 'gray', opacity: '50%'
                                }
                            }}> */}
                            <ShareIcon sx={{ color: 'white', mr: '10px' }} />
                            {/* </Avatar> */}
                        </IconButton>
                        <Menu
                            anchorEl={anchorShareEl}
                            id="account-menu"
                            open={openShare}
                            onClose={handleShareClose}
                            onClick={handleShareClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                <div className="fb-share-button" data-href="https://themoviedb-five.vercel.app/" data-layout="button_count" data-size="small">
                                    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://themoviedb-five.vercel.app/" className="fb-xfbml-parse-ignore">
                                        <ListItemIcon>
                                            <i className="fa-brands fa-facebook text-2xl"></i>
                                        </ListItemIcon>
                                        Facebook
                                    </a>
                                </div>
                            </MenuItem>

                            <MenuItem>
                                <blockquote className="twitter-tweet items-center">
                                    <ListItemIcon>
                                        <i className="fa-brands fa-twitter text-2xl"></i>
                                    </ListItemIcon>
                                    <a href="https://twitter.com/intent/tweet?url=https://themoviedb-five.vercel.app/" className="twitter-share-button">
                                        Twitter
                                    </a>
                                </blockquote>
                            </MenuItem>
                            <MenuItem>
                                <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://themoviedb-five.vercel.app."
                                    title="Share by Email">
                                    <ListItemIcon>
                                        <i className="fa-regular fa-envelope text-2xl"></i>
                                    </ListItemIcon>
                                    Email Link
                                </a>
                            </MenuItem>

                            <MenuItem onClick={handleCopyLink}>
                                <ListItemIcon>
                                    <i className="fa-solid fa-link text-2xl"></i>
                                </ListItemIcon>
                                Copy Link
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className="justify-between">
                        <div className="items-center">
                            <div className="mr-4 text-2xl">{singleTvList[0]?.name}</div>
                            <div className="flex space-x-4 text-stone-400">
                                {singleTvList[0]?.known_for_department}
                            </div>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-12 gap-y-4 h-full">
                        <div className="hidden lg:block col-span-3 bg-gray-200  h-full hover:opacity-80">
                            <img src={`https://image.tmdb.org/t/p/w500${singleTvList[0]?.poster_path}`} alt="product images" />
                        </div>
                        <div className="lg:col-span-7 md:col-span-12 lg:ml-2 bg-black relative hover:opacity-80">
                            <iframe
                                key={singleTvList[0]?.name}
                                src={`https://www.youtube.com/embed/${singleTvList[0]?.videos?.results[0]?.key}?controls=0&&autoplay=1`}
                                width="100%"
                                height={"100%"}
                                title={singleTvList[0]?.name}
                                style={{ border: 0, minHeight: '350px' }}
                            >

                            </iframe>

                        </div>

                        <div className="hidden lg:block col-span-2 h-full ml-2 overflow-hidden">
                            <div className="bg-gray-500 flex flex-col justify-center items-center h-1/2 mb-1 hover:bg-opacity-90">
                                <div className="flex flex-col justify-center items-center "
                                    onClick={() => navigate(`/videoTv/${singleTvList[0]?.id}`)}>
                                    <div className="text-center">
                                        <VideoLibraryIcon />
                                    </div>
                                    <div className="text-center">
                                        {singleTvList[0]?.videos?.results?.length > 99 ? "99+" : singleTvList[0]?.videos?.results?.length} Videos
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-500 flex flex-col justify-center items-center h-1/2 mt-1 hover:bg-opacity-90"
                                onClick={() => navigate(`/image/tv/${singleTvList[0]?.id}`)}>
                                <div className="flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <PhotoLibraryIcon />
                                    </div>
                                    <div className="text-center" >
                                        {totalImages > 99 ? "99+" : totalImages} Photos
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
                                            onClick={() => navigate(`/search?genre=${item?.name}`)}
                                            key={item.id} className="bg-none text-white py-2 px-4 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-white">
                                    <div className="py-2 border-b border-gray-300">{singleTvList[0]?.overview}</div>

                                    <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                        <div className="">Writers</div>
                                        <div className="flex gap-3 justify-center text-center aligns-center">
                                            {singleTvList[0]?.created_by?.slice(0, 3).map((item: any, index: number) => (
                                                <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                                    <span className="text-blue-600">{item?.name}</span>
                                                    <span>{index < Math.min(singleTvList[0]?.created_by?.length) - 1 ? '•' : ''}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                        <div className="">Star</div>
                                        <div className="flex gap-3">
                                            {singleTvList[0]?.aggregate_credits?.cast?.slice(0, 3).map((item: any, index: number) => (
                                                <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                                    <span className="text-blue-600">{item?.name}</span>
                                                    <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                        <div className="">IMDb<span className="text-blue-500">Pro</span></div>
                                        <div className="flex gap-3 items-center">
                                            <p onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                                <span className="text-blue-600">See production info at IMDbPro</span>
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
                                                    <button className="py-2 px-3 items-center gap-2 text-sm ">
                                                        <p className='text-yellow-300 text-left'>Streaming</p>
                                                        <img
                                                            src={`https://media.themoviedb.org/t/p/h60${singleTvList[0]?.networks[0]?.logo_path}`}
                                                            className='bg-gray-500'
                                                        />

                                                    </button>
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}

                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 whitespace-nowrap">

                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 ">
                                                </button>
                                            </div>
                                        </div>
                                        <button className="w-full hover:opacity-90 flex items-center  border-2 border-black bg-yellow-300 " >
                                            <div onClick={() => handleWatchList(0, singleTvList[0]?.id, 'TV', singleTvList[0]?.name, singleTvList[0]?.poster_path, singleTvList[0]?.release_date,singleTvList?.genres?.map((item:any)=>item?.id), singleTvList[0]?.overview, singleTvList[0]?.popularity, singleTvList[0]?.vote_average, singleTvList[0]?.vote_count)}>
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
                                                                    <p>Remove from watchList</p>
                                                                </div>
                                                                <p>Added by {formatNumber(singleTvList[0]?.popularity)} user</p>
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
                                                                        <p>Add to watchList</p>
                                                                    </div>
                                                                    <p>Added by {formatNumber(singleTvList[0]?.popularity)} user</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div
                                                onClick={() => navigate('/watchList')}
                                                className="py-3 px-3 ml-auto w-16  flex items-center border-gray-500 border-l-2 justify-center h-full ">
                                                <i className="fa-solid fa-chevron-down"></i>
                                            </div>
                                        </button>
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 text-sm">
                                                    <p>{singleTvList[0]?.reviews?.results?.length}</p>
                                                    <p>User Review</p>
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 whitespace-nowrap">
                                                    <p>0</p>
                                                    <p>Critic Review</p>
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
                                    {singleTvList[0]?.videos?.results?.length > 99 ? "99+" : singleTvList[0]?.videos?.results?.length} Videos
                                </div>
                            </div>
                            <div className='col-span-1'>
                                <div
                                    onClick={() => navigate(`/image/tv/${singleTvList[0]?.id}`)}
                                    className='flex h-full aligns-center item-center justify-center px-2 py-2 bg-gray-500 text-center'>
                                    <div>   <PhotoLibraryIcon /></div>
                                    {totalImages > 99 ? "99+" : totalImages} Photos
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-1 mt-2' >
                            <div>
                                <img src={`https://image.tmdb.org/t/p/w500/${singleTvList[0]?.poster_path}`}
                                    onError={handleImageError} alt="produdđct images" />
                            </div>
                            <div className='col-span-2'>
                                <div className='gap-2'>
                                    {singleTvList[0]?.genres.slice(0, 4).map((item: any) => (
                                        <button key={item.id} className="bg-none text-white py-2 px-2 mr-2 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
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
                        <div className='mt-2 flex'>
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
                                <div className="text-stone-400">{singleTvList[0]?.vote_count}k</div>
                                <div className="flex ">
                                    <button className="flex px-3 py-3 text-blue-500 items-center gap-2 text-xl">
                                        <i className="fa-regular fa-star "></i>
                                        <p>Rate</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='px-3 items-center'>
                            <div>
                                <div className="border-b border-gray-300 flex gap-1 py-2 items-center aligns-center" onClick={toggleContent}>
                                    <div>
                                        {isOpen ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
                                    </div>
                                    <div>Top Credit</div>
                                </div>
                                {isOpen && (
                                    <div>
                                        <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                            <div className="">Writers</div>
                                            <div className="flex gap-2 flex-wrap justify-start text-center aligns-center items-center">
                                                {singleTvList[0]?.created_by?.slice(0, 3).map((item: any, index: number) => (
                                                    <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                                        <span className="text-blue-600">{item?.name}</span>
                                                        <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                            <div className="">Star</div>
                                            <div className="flex gap-2 flex-wrap justify-start text-center aligns-center items-center">
                                                {singleTvList[0]?.aggregate_credits?.cast?.slice(0, 3).map((item: any, index: number) => (
                                                    <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                                        <span className="text-blue-600">{item?.name}</span>
                                                        <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                            <div className="">IMDb<span className="text-blue-500">Pro</span></div>
                                            <div className="flex gap-3 items-center">
                                                <p onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                                    <span className="text-blue-600">See production info at IMDbPro</span>
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
                                {/* {checkLog ? (
                                    <div onClick={() => handleWatchList(singleTvList[0])}>
                                        {localStorage.getItem('watchList') && JSON.parse(localStorage.getItem('watchList')!)[singleTvList[0]?.id] ? (
                                            <div className="py-2 px-3 flex items-center text-black gap-2 grow  text-center h-full">
                                                <i className="fas fa-check font-bold text-xl  mr-2"></i>
                                                <div className="text-left">
                                                    <div className='font-bold'  >
                                                        <p>Remove from watchList</p>
                                                    </div>
                                                    <p>Added by {formatNumber(singleTvList[0]?.vote_count)}user</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-2 px-3 flex items-center text-black gap-2 grow  text-center h-full">
                                                <i className="fas fa-plus font-bold text-xl  mr-2"></i>
                                                <div className="text-left">
                                                    <div className='font-bold'  >
                                                        <p>Add to Watchlist</p>
                                                    </div>
                                                    <p>Added by {formatNumber(singleTvList[0]?.vote_count)} user</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div onClick={() => handleWatchList(singleTvList[0])}>
                                        {localStorage.getItem('watchList') && JSON.parse(localStorage.getItem('watchList')!)[singleTvList[0]?.id] ? (
                                            <div className="py-2 px-3 flex items-center text-black gap-2 grow  text-center h-full">
                                                <i className="fas fa-check font-bold text-xl  mr-2"></i>
                                                <div className="text-left">
                                                    <div className='font-bold'  >
                                                        <p>Remove from watchList</p>
                                                    </div>
                                                    <p>Added by {formatNumber(singleTvList[0]?.vote_count)} user</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-2 px-3 flex items-center text-black gap-2 grow  text-center h-full">
                                                <i className="fas fa-plus font-bold text-xl  mr-2"></i>
                                                <div className="text-left">
                                                    <div className='font-bold'  >
                                                        <p>Add to Watchlist</p>
                                                    </div>
                                                    <p>Added by {formatNumber(singleTvList[0]?.vote_count)} user</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )} */}
                                <div onClick={() => handleWatchList(0, singleTvList[0]?.id, 'TV', singleTvList[0]?.title, singleTvList[0]?.poster_path, singleTvList[0]?.release_date, singleTvList?.genres?.map((item:any)=>item?.id), singleTvList[0]?.overview, singleTvList[0]?.popularity, singleTvList[0]?.vote_average, singleTvList[0]?.vote_count)}>
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
                                                        <p>Remove from watchList</p>
                                                    </div>
                                                    <p>Added by {formatNumber(singleTvList[0]?.popularity)} user</p>
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
                                                            <p>Add to watchList</p>
                                                        </div>
                                                        <p>Added by {formatNumber(singleTvList[0]?.popularity)} user</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div
                                    onClick={() => navigate('/watchList')}
                                    className="py-3 px-3 ml-auto w-16  flex items-center border-gray-500 border-l-2 justify-center h-full ">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </button>

                        </div>
                        <div className=" border-b border-gray-300 gap-3 py-2 items-center aligns-center px-2">
                            <div className="flex gap-3 items-center text-blue-500">
                                <i className="fa-solid fa-phone"></i>
                                <p onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                    <span className="text-blue-500">View contact info at IMDbPro</span>
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