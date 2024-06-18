import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { IconButton, ListItemIcon, Menu, MenuItem, Rating } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import ShareIcon from '@mui/icons-material/Share';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AppDispatch } from '../../redux/store';
import { favoriteMongoApi, getFavoriteMongoApi, getListRatingMongoApi, ratingMongoApi, removeRatingMongoApi } from '../../redux/client/api.LoginMongo';
import { setDeleteRating, setFavorite, setListFavorite, setListRating, setRating } from '../../redux/reducers/login.reducer';
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';

export interface TwoMovieRowProps {
    singleMovieList: any
    movieVideoList: any
    movieImageList: any
    movieCreditList: any
}

export default function SingleMovieDetail({
    singleMovieList,
    movieVideoList,
    movieImageList,
    movieCreditList
}: TwoMovieRowProps) {
    let navigate = useNavigate()
    const [director, setDirector] = useState<any[]>([])
    const [writer, setWriter] = useState<any[]>([])
    const [isRating, setIsRating] = useState(false);
    const [value, setValue] = useState<number | null>(0);
    const [loading3, setLoading3] = useState<{ [key: number]: boolean }>({});

    const handleClick = (value: any) => {
        setIsRating(true);
        setValue(value)
    };

    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [checkLog, setCheckLog] = useState(false)
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
        dispatch(setGlobalLoading(true));
        if (userInfoList.length > 0) {
            dispatch(fetchGetFavorites());
            dispatch(fetchGetRating())
        }
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 3000);
    }, [userInfoList]);
    const existingIndex = favoriteList?.findIndex((fav: any) => fav?.itemId == singleMovieList[0]?.id);
    const existingRating = ratingList?.find((rating: any) => rating?.itemId == singleMovieList[0]?.id); // Find the rating object for the item

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
                    toast.info(`${singleMovieList[0]?.title} has been remove from watchlist`)
                }
                else {
                    toast.success(`${singleMovieList[0]?.title} has been added to watchlist`)
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
            movieId, mediaType, movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
        ));
        setCheckLog(!checkLog);
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };

    const [loading2, setLoading2] = useState<{ [key: number]: boolean }>({});

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

    const handleRating = async (itemRating: any, itemImg: any,
        itemName: any
    ) => {
        setLoading2((prevLoading2) => ({ ...prevLoading2, [0]: true }));
        await dispatch(fetchRating(
            singleMovieList[0]?.id,
            'Movie',
            itemRating,
            itemImg,
            itemName
        ));
        setCheckLog(!checkLog);
        setIsRating(false)
        setLoading2((prevLoading2) => ({ ...prevLoading2, [0]: false }));
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
        setIsRating(false)
        setLoading3((prevLoading3) => ({ ...prevLoading3, [index]: false }));
        toast.info('Remove rating success')
    };

    useEffect(() => {
        if (singleMovieList && singleMovieList.length > 0) {
            const movie = singleMovieList[0];
            if (movie.credits && movie.credits.crew) {
                const directors = movie.credits.crew.filter((item: any) => item.job === 'Director');
                setDirector(directors);
                const writers = movie.credits.crew.filter((item: any) => item.job === 'Story');
                const screenplayWriters = movie.credits.crew.filter((item: any) => item.job === 'Screenplay');
                const writerses = writers.length > 0 ? writers : screenplayWriters;
                setWriter(writerses);
            }
        }
    }, [singleMovieList[0]]);
    const usRelease = singleMovieList[0]?.release_dates?.results?.find((release: any) => release?.iso_3166_1 === "US");
    const certification = usRelease?.release_dates?.find((release: any) => release.type === 3)?.certification || usRelease?.release_dates?.find((release: any) => release?.type !== 3)?.certification;

    const [isOpen, setIsOpen] = useState(false);

    const toggleContent = () => {
        setIsOpen(!isOpen);
    };
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
    return (
        <section className="" style={{
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
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
                                <p className="text-2xl ">{singleMovieList[0]?.title ? singleMovieList[0]?.title : singleMovieList[0]?.name}</p>
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
                                        onClick={() => handleRating(value, singleMovieList[0]?.poster_path, singleMovieList[0]?.title ? singleMovieList[0]?.title : singleMovieList[0]?.name)}>
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
                                        onClick={() => handleRemoveRating(0, singleMovieList[0]?.id, 'Movie')}>
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
            <div className="text-white font-sans font-medium hue-rotate-15" >
                <div style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w500${singleMovieList[0]?.backdrop_path}')`,
                    position: "absolute", width: "100%", height: "100%", opacity: "0.5",
                    backgroundSize: "cover", backgroundPosition: "center",
                    backgroundColor: 'black'
                }}>

                </div>

                <div style={{ position: "relative", zIndex: "1" }}>
                    <div className="flex flex-row justify-end gap-2 items-center ">
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('movieCast')}>Cast & Crew</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('movieReview')}>User Reviews</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('movieTrivia')}>Trivia</div>
                        <button className="py-2 px-3 border-l  border-r  border-gray-400 hidden lg:block hover:underline" onClick={() => navigate('/IMDbPro')}>IMDbPro</button>

                        <IconButton
                            onClick={handleShareClick}
                            size="small"
                            aria-controls={openShare ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openShare ? 'true' : undefined}
                        >
                            <ShareIcon sx={{ color: 'white', mr: '10px' }} />
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
                                        width: 32, height: 32, ml: -0.5, mr: 1,
                                    },
                                    '&::before': {
                                        content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
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
                    <div className="flex justify-between">
                        <div className="items-center">
                            <div className="mr-4 text-2xl">{singleMovieList[0]?.title}</div>
                            <div className="flex space-x-4 text-stone-400">
                                <div>{singleMovieList[0]?.release_date?.split("-")[0]}</div>
                                <div>{certification ? certification : "NR"}</div>
                                <div>
                                    {Math.floor(singleMovieList[0]?.runtime / 60)} h {singleMovieList[0]?.runtime % 60} min
                                </div>

                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="flex">
                                <div className="items-center justify-center">
                                    <div className="mr-4 text-stone-400" >IMDb Rating</div>
                                    <div className="flex space-x-4 hover:opacity-80 hover:bg-gray-500">
                                        <div className="flex justify-center aligns-center items-center h-full gap-2">
                                            <i className="fa-solid fa-star h-full items-center text-2xl text-yellow-300"></i>
                                            <div className="">
                                                <div>
                                                    <span className=" text-xl">
                                                        {typeof singleMovieList[0]?.vote_average === 'number' ?
                                                            (singleMovieList[0]?.vote_average % 1 === 0 ?
                                                                singleMovieList[0]?.vote_average.toFixed(0) :
                                                                singleMovieList[0]?.vote_average.toFixed(1)
                                                            )
                                                            :
                                                            'N/A'
                                                        }

                                                    </span>
                                                    <span className="text-stone-400">  /10</span>
                                                </div>
                                                <div className="text-stone-400">{singleMovieList[0]?.vote_count}</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="items-center text-center justify-center m-auto mr-4 aligns-center ">
                                    <div className="    text-stone-400">Your Rating</div>
                                    <div className="flex hover:opacity-80 hover:bg-gray-500" onClick={() => handleClick(existingRating?.itemRating)}>
                                        <button className="flex px-3 py-3 text-blue-500 items-center gap-2 text-xl">
                                            {
                                                existingRating ? (
                                                    loading2[0] ? (
                                                        <div>
                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center ">
                                                            <i className="fa-solid fa-star text-blue-500"></i>
                                                            <div>{existingRating?.itemRating}</div>
                                                        </div>

                                                    )
                                                ) : (
                                                    <div className="font-bold text-sm">
                                                        {loading2[0] ? (
                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                        ) : (
                                                            <div className="flex items-center text-xl">
                                                                <div>Rate</div>
                                                                <i className="fa-regular fa-star text-blue-500"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-12 gap-y-4 h-full py-2">
                        <div className="hidden lg:block col-span-3 bg-gray-200  h-full hover:opacity-90 ">
                            <img
                                onError={handleImageError}
                                src={`https://image.tmdb.org/t/p/w500/${singleMovieList[0]?.poster_path}`} alt="product images" />
                        </div>
                        <div className=" lg:col-span-7 col-span-12   lg:ml-2 bg-black hover:opacity-90">
                            <iframe
                                key={movieVideoList[0]?.name}
                                src={`https://www.youtube.com/embed/${movieVideoList[0]?.key}?controls=0&&autoplay=1`}
                                width="100%"
                                height={"100%"}
                                title={movieVideoList[0]?.name}
                                style={{ border: 0, minHeight: '350px' }}
                            >

                            </iframe>

                        </div>

                        <div className="hidden lg:block col-span-2 h-full ml-2 overflow-hidden ">
                            <div onClick={() => navigate(`/video/${singleMovieList[0]?.id}`)}
                                className="bg-gray-500 flex flex-col justify-center items-center h-1/2 mb-1 hover:opacity-90 ">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <VideoLibraryIcon />
                                    </div>
                                    <div className="text-center">
                                        {movieVideoList?.length} Videos
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => navigate(`/image/movie/${singleMovieList[0]?.id}`)}
                                className="bg-gray-500 flex flex-col justify-center items-center h-1/2 mt-1 hover:opacity-90">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <PhotoLibraryIcon />
                                    </div>
                                    <div className="text-center">
                                        {movieImageList?.length} Photos
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bg-black relative">
                        <div className=" grid-cols-12 hidden md:grid gap-6 h-full">
                            <div className=" col-span-8  bg-black  ">
                                <div className="flex gap-2 mb-1">
                                    {singleMovieList[0]?.genres?.map((item: any) => (
                                        <button
                                            onClick={() => navigate(`/search?mediaType=movie&genres=${item?.name}`)}
                                            key={item?.id} className="bg-none text-white py-2 px-4 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                            {item?.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-white">
                                    <div className="py-2 border-b border-gray-300">{singleMovieList[0]?.overview}</div>
                                    <div className="py-2 border-b border-gray-300 flex gap-3">
                                        <div>Director</div>
                                        <div className='flex flex-wrap gap-2'>
                                            {director.slice(0, 3).map((item: any, index: number) => (
                                                <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className=" flex gap-2">
                                                    <span className="text-blue-600 hover:underline ">{item?.name}</span>
                                                    <span>{index < Math.min(director?.slice(0, 3).length) - 1 ? '•' : ''}</span>
                                                </p>
                                            ))}

                                        </div>
                                    </div>
                                    <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                        <div className="">Writers</div>
                                        <div className="flex flex-wrap gap-2 justify-center text-center aligns-center">
                                            {writer.slice(0, 3).map((item: any, index: number) => (
                                                <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="flex gap-2">
                                                    <span className="text-blue-600 hover:underline ">{item?.name}</span>
                                                    <span>{index < Math.min(writer?.slice(0, 3).length) - 1 ? '•' : ''}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                        <div className="">Star</div>
                                        <div className="flex flex-wrap gap-2">
                                            {movieCreditList.slice(0, 3).map((item: any, index: number) => (
                                                <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="flex gap-2">
                                                    <span className="hover:underline  text-blue-600">{item?.name}</span>
                                                    <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                        <div className="">IMDb<span className="text-blue-500">Pro</span></div>
                                        <div className="flex gap-3 items-center">
                                            <p onClick={() => navigate(`/`)} className="flex gap-2">
                                                <span className="text-blue-600">See production info at IMDbPro</span>
                                            </p>
                                            <i className="fa-solid fa-arrow-up-right-from-square"></i>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-span-4">
                                <div className="w-full h-full items-center justify-center text-center">
                                    <div className="flex flex-col justify-center items-center h-full ">
                                        <button className="w-full flex items-center  border-2 border-black bg-yellow-300 " >

                                            <div onClick={() => handleWatchList(0, singleMovieList[0]?.id, 'Movie', singleMovieList[0]?.title, singleMovieList[0]?.poster_path, singleMovieList[0]?.release_date, singleMovieList[0]?.genres?.map((item: any) => item?.id), singleMovieList[0]?.overview, singleMovieList[0]?.popularity, singleMovieList[0]?.vote_average, singleMovieList[0]?.vote_count)}>
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
                                                                <p>Added by {formatNumber(singleMovieList[0]?.runtime)} user</p>
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
                                                                    <p>Added by {formatNumber(singleMovieList[0]?.runtime)} user</p>
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
                                                    <p>{formatNumber(singleMovieList[0]?.reviews?.results?.length)}</p>
                                                    <p>User Review</p>
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 whitespace-nowrap">
                                                    {isNaN(singleMovieList[0]?.reviews?.results?.length) ? 'N/A' : Math.floor(singleMovieList[0]?.reviews?.results?.length / 20) * 2}
                                                    <p>Critic Review</p>
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 ">
                                                    <p className="bg-yellow-300 h-6 w-6 items-center justify-center">
                                                        {isNaN(Math.floor(singleMovieList[0]?.vote_average * 10 + 2)) ? 'N/A' : Math.floor(singleMovieList[0]?.vote_average * 10 + 2)}

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
                                <div onClick={() => navigate(`/video/${singleMovieList[0]?.id}`)} className='h-full aligns-center item-center justify-center px-2 py-2 bg-gray-500 text-center flex'>
                                    <div>   <VideoLibraryIcon />   </div>
                                    <div>  {movieVideoList?.length} Videos </div>
                                </div>
                            </div>
                            <div className='col-span-1' >
                                <div onClick={() => navigate(`/image/movie/${singleMovieList[0]?.id}`)} className='flex h-full aligns-center item-center justify-center px-2 py-2 bg-gray-500 text-center'>
                                    <div>   <PhotoLibraryIcon /></div>
                                    <div> {movieImageList?.length} Photos</div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-1 mt-2' >
                            <div>
                                <img src={`https://image.tmdb.org/t/p/w500/${singleMovieList[0]?.poster_path}`}
                                    onError={handleImageError} alt="produdđct images" />
                            </div>
                            <div className='col-span-2'>
                                <div className='gap-2'>
                                    {singleMovieList[0]?.genres.slice(0, 4).map((item: any) => (
                                        <button key={item.id} className="bg-none text-white py-2 px-2 mr-2 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                                <div>
                                    <p className="py-2 ">
                                        {/* {singleMovieList[0]?.overview && singleMovieList[0]?.overview.length > 120 ?
                                            singleMovieList[0]?.overview.slice(0, 120) + "..." :
                                            singleMovieList[0]?.overview} */}
                                        {singleMovieList[0]?.overview}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-2 flex'>
                            <div className=' flex items-center gap-2' >
                                <i className="fa-solid fa-star text-yellow-300"></i>
                                <span className=" text-xl">
                                    {typeof singleMovieList[0]?.vote_average === 'number' ?
                                        (singleMovieList[0]?.vote_average % 1 === 0 ?
                                            singleMovieList[0]?.vote_average.toFixed(0) :
                                            singleMovieList[0]?.vote_average.toFixed(1)) : 'N/A'
                                    }

                                </span>
                                <span className="text-stone-400">  /10</span>
                                <div className="text-stone-400">{singleMovieList[0]?.vote_count}</div>
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
                                        <div className="py-2 border-b border-gray-300 gap-1">
                                            <div>Director</div>
                                            <div className='items-center flex flex-wrap gap-1 justify-start '>
                                                {director.slice(0, 3).map((item: any, index: number) => (
                                                    <p key={index} onClick={() => navigate(`/actor/${item?.id}`)} className="hover:underline flex gap-2">
                                                        <span className="text-blue-600">{item?.name}</span>
                                                        <span>{index < Math.min(director?.slice(0, 3).length) - 1 ? '•' : ''}</span>
                                                    </p>
                                                ))}

                                            </div>
                                        </div>
                                        <div className=" border-b border-gray-300 gap-2 py-2 items-center aligns-center">
                                            <div className="">Writers</div>
                                            <div className="flex flex-wrap gap-1 justify-left text-center aligns-center items-center">
                                                {writer.slice(0, 3).map((item: any, index: number) => (
                                                    <p key={index} onClick={() => navigate(`/actor/${item?.id}`)} className="hover:underline flex gap-2">
                                                        <span className="text-blue-600">{item?.name}</span>
                                                        <span>{index < Math.min(writer?.slice(0, 3).length) - 1 ? '•' : ''}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className=" border-b border-gray-300 gap-1 py-2 items-center aligns-center ">
                                            <div className="">Star</div>
                                            <div className="flex gap-1  items-center flex-wrap">
                                                {movieCreditList.slice(0, 3).map((item: any, index: number) => (
                                                    <p key={index} onClick={() => navigate(`/actor/${item?.id}`)} className="hover:underline flex gap-2">
                                                        <span className="text-blue-600">{item?.name}</span>
                                                        <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='px-3 py-2 border-b border-gray-300 '>
                            <button className="flex items-center w-full  border-2 border-black bg-yellow-300 " >
                                <div onClick={() => handleWatchList(0, singleMovieList[0]?.id, 'Movie', singleMovieList[0]?.title, singleMovieList[0]?.poster_path, singleMovieList[0]?.release_date, singleMovieList[0]?.genres.map((genre: any) => genre.id), singleMovieList[0]?.overview, singleMovieList[0]?.popularity, singleMovieList[0]?.vote_average, singleMovieList[0]?.vote_count)}>
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
                                                    <p>Added by {formatNumber(singleMovieList[0]?.runtime)} user</p>
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
                                                        <p>Added by {formatNumber(singleMovieList[0]?.runtime)} user</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div onClick={() => navigate('/watchList')} className="py-3 px-3 ml-auto w-16  flex items-center border-gray-500 border-l-2 justify-center h-full ">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </button>
                            <div className='w-full'>
                                <div className=" -mx-2 flex flex-wrap gap-2 w-full justify-left">
                                    <button className="py-2 px-3 flex  items-center gap-2 text-sm">
                                        <p>{formatNumber(singleMovieList[0]?.reviews?.results?.length)}</p>
                                        <p>User Review</p>
                                    </button>
                                    <button className="py-2 px-3 flex  items-center gap-2 text-sm">
                                        {isNaN(singleMovieList[0]?.reviews?.results?.length) ? 'N/A' : Math.floor(singleMovieList[0]?.reviews?.results?.length / 20) * 2}
                                        <p>Critic Review</p>
                                    </button>
                                    <button className="py-2 px-3 flex  items-center gap-2 text-sm">
                                        <span className="bg-yellow-300 h-6 w-6 items-center justify-center text-center">{isNaN(Math.floor(singleMovieList[0]?.vote_average * 10 + 2)) ? 'N/A' : Math.floor(singleMovieList[0]?.vote_average * 10 + 2)}</span>
                                        <p>Metascore</p>
                                    </button>


                                </div>
                            </div>
                        </div>
                        <div className=" border-b border-gray-300 gap-3 py-2 items-center aligns-center">
                            <div className="flex gap-3 items-center">
                                <p onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                    <span className="text-blue-500">See production info at IMDbPro</span>
                                </p>
                                <i className="fa-solid fa-arrow-up-right-from-square text-blue-500"></i>
                            </div>
                        </div>

                    </div>


                </div>
            </div >
        </section >
    )
}