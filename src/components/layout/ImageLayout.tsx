import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListMovieImage } from "../../redux/reducers/movieImage.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { setListPerson } from "../../redux/reducers/person.reducer";
import { setListSingleMovie } from "../../redux/reducers/singleMovie.reducer";
import { setListTv } from "../../redux/reducers/tv.reducer";
import { setListTvImage } from "../../redux/reducers/tvImage.reducer";
import { AppDispatch } from "../../redux/store";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';

export default function ImageLayout() {
    const { mediaType, id } = useParams();
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const personList = useAppSelector((state) => state.person.listPerson)
    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)
    const tvList = useAppSelector((state) => state.tv.listTv)
    const tvImageList = useAppSelector((state) => state.tvImages.listTvImage)
    const movieImageList = useAppSelector((state) => state.movieImage.listMovieImage)

    const fetchTv = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiTv.tv(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListTv(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const fetchTvImages = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiTvImages.tvImage(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListTvImage(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const fetchSingleMovies = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiSingleMovieRequests.singleMovie(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListSingleMovie(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const fetchMovieImage = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiMovieImage.movieImage(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListMovieImage(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const fetchPerson = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiPerson.person(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListPerson(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    useEffect(() => {
        dispatch(setGlobalLoading(true));
        if (mediaType === 'tv') {
            dispatch(fetchTv());
            dispatch(fetchTvImages());
        }
        else if (mediaType === 'person') {
            dispatch(fetchPerson())
        }
        else if (mediaType === 'movie') {
            dispatch(fetchSingleMovies())
            dispatch(fetchMovies());
            dispatch(fetchMovieImage());
        }
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, [id]);

    let mediaList = [];

    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') {
        mediaList = personList;
    } else if (mediaType === 'movie') {
        mediaList = singleMovieList;
    } else if (mediaType === 'tv') {
        mediaList = tvList;
    }
    console.log(mediaList);


    let mediaImageList = [];

    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') {
        mediaImageList = personList[0]?.images?.profiles;
    } else if (mediaType === 'movie') {
        mediaImageList = movieImageList;
    } else if (mediaType === 'tv') {
        mediaImageList = tvImageList;
    }
    console.log(mediaImageList);


    let mediaLength = 0;
    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') {
        mediaLength = personList[0]?.images?.profiles?.length;
    } else if (mediaType === 'movie') {
        mediaLength = movieImageList[0]?.posters?.length;
    } else if (mediaType === 'tv') {
        mediaLength = tvImageList[0]?.posters?.length;
    }

    const [currentView, setCurrentView] = useState('table'); // Default view is 'table'
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
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };
    const [isContentVisible, setContentVisible] = useState(true);

    const toggleContentVisibility = () => {
        setContentVisible(!isContentVisible);
    };

    return (
        <div className=" min-h-screen cursor-pointer bg-black  ">
            <div className="text-white text-xl">
                {currentView == 'table' ? (
                    <div className='flex absolute w-full '>
                        <div className='grow text-left' >
                            <IconButton
                                onClick={handleBack}
                                disabled={activeStep === 0 || mediaLength === 0}
                                size="medium"
                                sx={{
                                    top: '400%',
                                    left: "0px",
                                    background: "rgba(0, 0, 0, 0.35)",
                                    border: '1px solid white',
                                    "&:hover": {
                                        background: "rgba(0, 0, 0, 0.35)",
                                    },
                                    display: activeStep === 0 || mediaLength === 0 ? 'none' : 'inline-flex', // Ẩn khi disabled

                                }}
                            >
                                <KeyboardArrowLeftIcon sx={{ width: "50px", height: "50px", color: 'white', ':hover': { color: 'yellow' } }} />
                            </IconButton>
                        </div>
                        <div className='justify-end'>
                            <IconButton
                                onClick={handleNext}
                                disabled={activeStep === mediaLength - 1} // Disable khi activeStep = popularMovies.length hoặc popularMovies.length = 0
                                size="medium"
                                sx={{
                                    justifyContent: 'flex-end', alignItems: 'center', right: '0', top: '400%',
                                    background: "rgba(0, 0, 0, 0.35)",
                                    border: '1px solid white',
                                    "&:hover": {
                                        background: "rgba(0, 0, 0, 0.35)",
                                    },
                                    display: activeStep === mediaLength - 1 ? 'none' : 'inline-flex', // Ẩn khi disabled

                                }}
                            >
                                <KeyboardArrowRightIcon sx={{ width: "50px", height: "50px", color: 'white', ':hover': { color: 'yellow' } }} />
                            </IconButton>
                        </div>
                    </div>
                ) : (<div></div>)}
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center font-semibold  ">
                    <section className='relative overflow-hidden min-h-screen'>
                        <div className="w-full ">
                            <div className="items-center flex">
                                <div className="flex items-center gap-2 "
                                    onClick={() => navigate(`/${mediaType}/${id}`)}>
                                    <i className="fa-solid fa-xmark"></i>
                                    <p className="text-center">Close {mediaType}</p>
                                </div>
                                <div className="ml-auto flex items-center">
                                    {currentView == 'table' ? (
                                        <p className='mr-4 text-yellow-300  '>
                                            {activeStep + 1} of {mediaLength}
                                        </p>
                                    ) : (<div></div>)}
                                    {currentView === 'table' ? (
                                        <Tooltip title="Table View">
                                            <i className="fa-brands fa-docker text-xl" onClick={() => setCurrentView('galery')}></i>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Galery View">
                                            <i className="fa-solid fa-table-cells text-xl" onClick={() => setCurrentView('table')}></i>
                                        </Tooltip>
                                    )}

                                    <IconButton
                                        onClick={handleShareClick}
                                        size="small"
                                        aria-controls={openShare ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openShare ? 'true' : undefined}
                                    >
                                        <Avatar sx={{
                                            bgcolor: 'black', color: 'white', ":hover": {
                                                bgcolor: 'gray', opacity: '50%'
                                            }
                                        }}>
                                            <ShareIcon />
                                        </Avatar>
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
                            </div>
                            {currentView == 'table' ? (
                                <div>
                                    {mediaType != 'person' ?
                                        (
                                            <div className="w-full flex justify-center items-center ">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500/${mediaImageList && mediaImageList[0]?.posters && mediaImageList[0]?.posters[activeStep]?.file_path}`}
                                                    onError={handleImageError}
                                                    alt="movie-img"
                                                    className='max-h-96 object-cover bg-gray-200 '
                                                />
                                            </div>
                                        )
                                        : (
                                            <div className="w-full flex justify-center items-center ">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500/${mediaImageList && mediaImageList[activeStep]?.file_path}`}
                                                    onError={handleImageError}
                                                    alt="person-img"
                                                    className='max-h-96 object-cover bg-gray-200 '
                                                />
                                            </div>
                                        )}
                                    <button onClick={toggleContentVisibility} className={`absolute top-96 right-20 p-2 mt-6 border-2 border-white px-2 py-2 rounded-full h-12 w-12 text-white bg-black z-20 hover:text-yellow-300 ${isContentVisible ? 'hidden' : ''}`}>
                                        <i className="fa-solid fa-circle-info"></i>
                                    </button>
                                    <button onClick={toggleContentVisibility} className={`absolute top-96 right-20 mt-6 p-2 border-2 border-white px-2 py-2 rounded-full  h-12 w-12 bg-black hover:text-yellow-300  text-white z-20 ${isContentVisible ? '' : 'hidden'}`}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>


                                    {isContentVisible ? (
                                        <div className='w-full'>
                                            <div className='border-t-2 border-gray-200 md:grid grid-cols-12 gap-2 relative'>
                                                <div className="lg:col-span-8 md:col-span-12 text-lg">
                                                    <p className='text-yellow-300'>{mediaList[0]?.name ? mediaList[0]?.name : mediaList[0]?.title}</p>
                                                    <div className='text-blue-500 flex gap-2 flex-wrap'>
                                                        <p className=''>
                                                            {mediaType != 'person' ? (
                                                                <div >
                                                                    <span className='hover:underline' onClick={() => navigate(`/person/${mediaList[0]?.credits?.cast[activeStep]?.id}`)}> {mediaList[0]?.credits?.cast[activeStep]?.original_name} </span>
                                                                    < span className='text-white'>as</span>
                                                                    <span className=''>  {mediaList[0]?.credits?.cast[activeStep]?.character}</span>

                                                                </div>
                                                            ) : (
                                                                <div >
                                                                    <span className='hover:underline'>  {mediaList[0]?.name}</span>
                                                                    <span className='text-white p-2'>in</span>
                                                                    <span className='hover:underline' onClick={() => navigate(`/${mediaList[0]?.combined_credits?.cast[activeStep]?.media_type}/${mediaList[0]?.combined_credits?.cast[activeStep]?.id}`)}>
                                                                        {mediaList[0]?.combined_credits?.cast[activeStep]?.original_title}
                                                                    </span> ({mediaList[0]?.combined_credits?.cast[activeStep]?.release_date?.slice(0, 4)})
                                                                </div>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-4 md:col-span-12 text-lg w-full ">
                                                    <p className={`lg:flex hidden text-black `}>.</p>
                                                    <div className='border-l-2 border-gray-200 px-4 lg:block hidden'>
                                                        <div className='flex items-center gap-2 flex-wrap'>

                                                            {mediaType != 'person' ? (
                                                                <div className=''>
                                                                    <p>People
                                                                        <span className='text-blue-500 ml-3 hover:underline ' onClick={() => navigate(`/person/${mediaList[0]?.id}`)}> {mediaList[0]?.credits?.cast[activeStep]?.original_name}</span>
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <div className=''>
                                                                    <p>People
                                                                        <span className='text-blue-500 ml-3 hover:underline' onClick={() => navigate(`/person/${mediaList[0]?.id}`)}>{mediaList[0]?.combined_credits?.cast[activeStep]?.character}</span>
                                                                    </p>
                                                                </div>
                                                            )}

                                                        </div>
                                                        <div className={`flex items-center gap-2`}>
                                                            {mediaType != 'person' ? (
                                                                <div className=''>
                                                                    <p>Titles
                                                                        <span className='text-blue-500 hover:underline ml-3 ' onClick={() => navigate(`/${mediaType}/${mediaList[0]?.id}`)}> {mediaList[0]?.name ? mediaList[0]?.name : mediaList[0]?.title}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <div className=''>
                                                                    <p>Titles
                                                                        <span className='text-blue-500 hover:underline ml-3 ' onClick={() => navigate(`/${mediaType}/${mediaList[0]?.id}`)}>{mediaList[0]?.combined_credits?.cast[activeStep]?.original_title}</span>
                                                                    </p>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                    <div className='lg:hidden block  '>
                                                        <div >
                                                            <p>
                                                                {mediaType != 'person' ? (
                                                                    <div className=''>
                                                                        <div>People
                                                                            <span className='text-blue-500 ml-3 hover:underline' onClick={() => navigate(`/person/${mediaList[0]?.id}`)}>  {mediaList[0]?.credits?.cast[activeStep]?.original_name} </span>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className=''>
                                                                        <div>People
                                                                            <span className='text-blue-500 ml-3 hover:underline ' onClick={() => navigate(`/person/${mediaList[0]?.id}`)}>{mediaList[0]?.combined_credits?.cast[activeStep]?.character}</span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </p>


                                                        </div>
                                                        <div className={`flex items-center gap-2`}>
                                                            {mediaType != 'person' ? (
                                                                <div className=''>
                                                                    <p>Titles
                                                                        <span className='text-blue-500 hover:underline ml-3 ' onClick={() => navigate(`/${mediaType}/${mediaList[0]?.id}`)}> {mediaList[0]?.name ? mediaList[0]?.name : mediaList[0]?.title}</span>
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <div className=''>
                                                                    <p>Titles
                                                                        <span className='text-blue-500 hover:underline ml-3 ' onClick={() => navigate(`/${mediaList[0]?.combined_credits?.cast[activeStep]?.media_type}/${mediaList[0]?.combined_credits?.cast[activeStep]?.id}`)}>{mediaList[0]?.combined_credits?.cast[activeStep]?.original_title}</span>
                                                                    </p>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>



                                                </div>
                                            </div>
                                        </div>

                                    ) : (<div>

                                    </div>)
                                    }
                                </div>
                            ) : (<div>
                                {mediaType != 'person' ?
                                    (
                                        <div>
                                            <div className='items-center flex w-full'>
                                                <div className='flex gap-2 py-2 mb-2 w-full'>
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500/${mediaList && mediaList[0]?.backdrop_path}`}
                                                        onError={handleImageError}
                                                        alt="movie-img"
                                                        className='h-24 w-20 object-cover bg-gray-200 '
                                                    />
                                                    <div className='w-full px-2'>
                                                        <div className='flex items-center '
                                                            onClick={() => navigate(`/${mediaType}/${mediaList[0]?.id} `)}>
                                                            <p className='py-2 flex-grow hover:text-blue-500'>{mediaList[0]?.original_title ? mediaList[0]?.original_title : mediaList[0]?.original_name} ({mediaList[0]?.release_date ? mediaList[0]?.release_date?.slice(0, 4) : mediaList[0]?.first_air_date?.slice(0, 4)})</p>
                                                            <i className="fa-solid fa-chevron-right ml-auto text-gray-200 hover:text-yellow-300"></i>
                                                        </div>
                                                        <div className='border-t-2 border-gray py-2'>
                                                            <p>Photos ({mediaLength}) </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-wrap gap-4">
                                                {mediaImageList && mediaImageList[0]?.posters && mediaImageList[0]?.posters?.map((item: any, index: any) => (
                                                    <img
                                                        key={index}
                                                        src={`https://image.tmdb.org/t/p/w500/${item?.file_path}`}
                                                        onError={handleImageError}
                                                        alt="movie-img"
                                                        className='h-24 w-24 object-cover bg-gray-200 '
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <div>
                                            <div className='items-center flex w-full px-2 '>
                                                <div className='flex gap-2 py-2 mb-2 w-full'>
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500/${mediaList && mediaList[0]?.profile_path}`}
                                                        onError={handleImageError}
                                                        alt="movie-img"
                                                        className='h-24 w-20 object-cover bg-gray-200 '
                                                    />
                                                    <div className='w-full'>
                                                        <div className='flex items-center '
                                                            onClick={() => navigate(`/${mediaType}/${mediaList[0]?.id} `)}>
                                                            <p className='py-2 flex-grow hover:text-blue-500'>{mediaList[0]?.name} </p>
                                                            <i className="fa-solid fa-chevron-right ml-auto text-gray-200 hover:text-yellow-300"></i>
                                                        </div>
                                                        <div className='border-t-2 border-gray py-2'>
                                                            <p>Photos ({mediaLength}) </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex gap-4 flex-wrap ">
                                                {mediaImageList && mediaImageList?.map((item: any, index: any) => (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500/${item?.file_path}`}
                                                        onError={handleImageError}
                                                        alt="person-img"
                                                        className='h-24 w-24 object-cover bg-gray-200 '
                                                        key={index * 10}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                            </div>)}
                        </div>
                    </section>
                </div>
            </div >
        </div >
    )
}