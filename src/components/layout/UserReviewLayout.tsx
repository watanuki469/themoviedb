import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListMovieCredit } from '../../redux/reducers/movieCredit.reducer';
import { setListTv } from "../../redux/reducers/tv.reducer";
import { AppDispatch } from "../../redux/store";
import { setListSingleMovie } from "../../redux/reducers/singleMovie.reducer";
import { toast } from "react-toastify";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TopBar from "../common/TopBar";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";

export default function UserReviewLayout() {
    const { mediaType, id } = useParams();
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const tvList = useAppSelector((state) => state.tv.listTv)
    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)

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
    useEffect(() => {
        dispatch(setGlobalLoading(true));
        if (mediaType === 'tv') {
            dispatch(fetchTv());
        }
        else if (mediaType === 'person') {

        }
        else if (mediaType === 'movie') {
            dispatch(fetchSingleMovies())
        }
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, [id]);

    let mediaList = [];

    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') {

    } else if (mediaType === 'movie') {
        mediaList = singleMovieList;
    } else if (mediaType === 'tv') {
        mediaList = tvList;
    }

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };

    const [randomNumbers, setRandomNumbers] = useState<any[]>([]);
    const generateRandomNumbers = () => {
        const randomNumber1 = Math.floor(Math.random() * 1000);
        const randomNumber2 = Math.floor(Math.random() * 200); // Generates a number between 0 and 1
        return { randomNumber1, randomNumber2 };
    };
    useEffect(() => {
        if (mediaList[0]?.reviews?.results) {
            const generatedNumbers = mediaList[0].reviews?.results?.map(() => generateRandomNumbers());
            setRandomNumbers(generatedNumbers);
        }
    }, [mediaList]);
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

    return (
        <div className=" min-h-screen cursor-pointer bg-white text-black  ">
            <div className="text-xl">
                <div className="h-20 bg-black px-4">
                    <TopBar />
                </div>

                <div className="w-full lg:max-w-5xl mx-auto aligns-center  ">
                    <section className='relative overflow-hidden min-h-screen'>
                        <div className="w-full ">
                            <div>
                                <div>
                                    <div className='items-center flex w-full border-2 border-gray bg-gray-200'>
                                        <div className='flex gap-2 py-2 mb-2 w-full'>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${mediaList[0]?.backdrop_path}`}
                                                onError={handleImageError}
                                                alt="movie-img"
                                                className='h-24 w-20 object-cover bg-gray-200 '
                                            />
                                            <div className='w-full px-2'>
                                                <div className='flex items-center '
                                                    onClick={() => navigate(`/${mediaType}/${mediaList[0]?.id} `)}>
                                                    <p className='py-2 flex-grow font-bold hover:text-blue-500'>{mediaList[0]?.original_title ? mediaList[0]?.original_title : mediaList[0]?.original_name} ({mediaList[0]?.release_date ? mediaList[0]?.release_date?.slice(0, 4) : mediaList[0]?.first_air_date?.slice(0, 4)})</p>
                                                    <i className="fa-solid fa-chevron-right ml-auto hover:text-yellow-300"></i>
                                                </div>
                                                <div className='border-t-2 border-gray py-2 font-bold'>
                                                    <p>
                                                        User Reviews {
                                                            mediaList[0]?.reviews?.results?.length
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full border-t-2 border-gray-500  flex flex-wrap">
                                        <div className="items-center w-full flex text-black px-4 py-6 gap-4 border-b-2 border-gray-500">
                                            <i className="fa-solid fa-plus"></i>
                                            <p>Add a Review</p>
                                        </div>
                                    </div>
                                    {mediaList[0]?.reviews?.results?.map((item: any, index: any) => (
                                        <div className="w-full border-b-2 border-gray-500 py-2 px-2" key={index}>
                                            <div className="items-center w-full flex flex-wrap text-black px-2 py-2 gap-4">
                                                <div className="text-blue-500">{item?.author}</div>
                                                <div className="text-gray-500">{item?.created_at?.slice(0, 10)}</div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 items-end">
                                                <i className="fa-solid fa-star text-yellow-300 text-3xl"> </i>
                                                <div className="text-2xl"> {item?.author_details?.rating}</div>
                                                <div> /10</div>
                                            </div>
                                            <div>
                                                {item?.content}
                                            </div>
                                            <div className=' flex py-2 px-1 mt-1'>
                                                <div className='flex items-center gap-1 h-full'>
                                                    <i className="fa-solid fa-thumbs-up text-xl"></i>
                                                    <div>helpful</div>
                                                    <div>•</div>
                                                    <div>{randomNumbers[index]?.randomNumber1}</div>
                                                    <i className="fa-solid fa-thumbs-up fa-rotate-180 ml-2 text-xl"></i>
                                                    <div>{randomNumbers[index]?.randomNumber2}</div>
                                                </div>
                                                <div className='ml-auto'>

                                                    <IconButton
                                                        onClick={handleShareClick}
                                                        size="small"
                                                        aria-controls={openShare ? 'account-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={openShare ? 'true' : undefined}
                                                        sx={{ backgroundColor: 'white', }}
                                                    >
                                                        <Avatar sx={{
                                                            bgcolor: 'white', color: 'white', ":hover": {
                                                                bgcolor: 'gray', opacity: '50%'
                                                            }
                                                        }}>

                                                            <MoreVertIcon sx={{ color: 'black' }} />
                                                        </Avatar>
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorShareEl}
                                                        id="account-menu"
                                                        open={openShare}
                                                        onClose={handleShareClose} onClick={handleShareClose}
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
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div >
        </div >
    )
}