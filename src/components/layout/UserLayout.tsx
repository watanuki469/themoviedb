import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListRow from "../../modules/ListRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem, Rating, Tooltip } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { ListMoviesPopular } from "../models/ListMoviesPopular";
import Charts from "../../modules/Charts";
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";
import ShareIcon from '@mui/icons-material/Share';
import { toast } from "react-toastify";
import { AppDispatch } from "../../redux/store";
import { getListRatingMongoApi, ratingMongoApi, removeRatingMongoApi } from "../../redux/client/api.LoginMongo";
import { setDeleteRating, setListRating, setRating } from "../../redux/reducers/login.reducer";


export default function UserLayout() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const topRatedTv = useAppSelector((state) => state.movies.listTopRatedTvReq)
    const discoverTv = useAppSelector((state) => state.movies.discoverTv)
    const discoverMovie = useAppSelector((state) => state.movies.discoverMovies)

    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        dispatch(fetchMovies());
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, []);
    const currentDate = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    // Lấy số tháng từ ngày hiện tại (chú ý rằng tháng trong JavaScript bắt đầu từ 0)
    const currentMonth = currentDate.getMonth();
    const currenDateToday = currentDate.getDate();
    const currentMonthName = monthNames[currentMonth];
    // Lấy ngày 5 ngày trước
    const currentDatePre = new Date(currentDate);
    currentDatePre.setDate(currentDatePre.getDate() - 5);
    const currenDatePre = currentDatePre.getDate();

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
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
                // Nếu thành công, hiển thị thông báo
                toast.success('Link copied');
            })
            .catch((error) => {
                // Nếu có lỗi, hiển thị thông báo lỗi
                toast.error('Failed to copy link');
                console.error('Error copying link:', error);
            });
    };

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black py-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-white">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <div className="lg:max-w-full md:w-screen ">
                        <div className="flex mt-3 px-2 py-2 items-center">
                            <div className="items-center ">
                                <h2 className="lg:text-5xl text-2xl font-bold text-black ">What on TV & Streaming</h2>
                            </div>
                            <div className="flex items-center ml-auto" >
                                <IconButton
                                    onClick={handleShareClick}
                                    size="small"
                                    aria-controls={openShare ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openShare ? 'true' : undefined}
                                >
                                    <Avatar sx={{
                                        width: 32, height: 32, bgcolor: 'white', color: 'black', ":hover": {
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
                                    <MenuItem onClick={() => toast.success('meow meow')}>
                                        <ListItemIcon>
                                            <i className="fa-brands fa-facebook text-2xl"></i>
                                        </ListItemIcon>
                                        Facebook
                                    </MenuItem>
                                    <MenuItem onClick={() => toast.success('meow meow')}>
                                        <ListItemIcon>
                                            <i className="fa-brands fa-twitter text-2xl"></i>
                                        </ListItemIcon>
                                        Twitter
                                    </MenuItem>

                                    <MenuItem onClick={() => toast.success('meow meow')}>
                                        <ListItemIcon>
                                            <i className="fa-regular fa-envelope text-2xl"></i>
                                        </ListItemIcon>
                                        Email Link
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
                    <div className="lg:grid grid-cols-12 gap-2 w-full">
                        <div className="lg:col-span-8 col-span-12  w-full ">
                            <div className="lg:max-w-full md:w-screen mt-6  ">
                                <div
                                    className="grid grid-cols-3 gap-2 ">
                                    <div onClick={() => navigate('/top250Tv')}>
                                        <div className="relative hover:opacity-90">
                                            <img src={`https://image.tmdb.org/t/p/w500/${discoverTv[10]?.poster_path}`} alt="product images" className="" />

                                        </div>
                                        <p className="mt-2 hover:underline">What's New to Stream on Netflix</p>
                                    </div>
                                    <div onClick={() => navigate('/top250Tv')}>
                                        <div className="relative hover:opacity-90">
                                            <img src={`https://image.tmdb.org/t/p/w500/${topRatedMovies[10]?.poster_path}`} alt="product images" className="" />
                                        </div>
                                        <p className="mt-2 hover:underline">What New To Stream On Prime Video</p>
                                    </div>
                                    <div onClick={() => navigate('/top250Tv')}>
                                        <div className="relative hover:opacity-90">
                                            <img src={`https://image.tmdb.org/t/p/w500/${discoverMovie[10]?.poster_path}`} alt="product images" className="" />
                                        </div>
                                        <p className="mt-2 hover:underline">What New To Stream On Max</p>
                                    </div>
                                </div>
                                <div className="flex items-center py-5 px-2">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">Staff Picks: What to Watch in {currentMonthName}</h2>
                                </div>
                                <div className="grid grid-cols-2 px-2 py-2 gap-4" >
                                    <div>
                                        <p>Take a look at the best movies and series coming in May, including Furiosa, The Fall Guy, and more.</p>
                                        <p className="w-full text-blue-500 hover:underline py-4" onClick={() => navigate(`/top250Movie`)}>See out pick</p>
                                    </div>
                                    <div className="max-w-full" onClick={() => navigate(`/top250Movie`)}>
                                        <ListRow listRowList={topRatedMovies?.slice(3)} />
                                    </div>
                                </div>
                                <div className="flex items-center py-5 px-2">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">{currentMonthName} 2024 TV and Streaming Premiere Dates</h2>
                                </div>
                                <div className="grid grid-cols-2 px-2 py-2 gap-4" >
                                    <div>
                                        <p>The final season of "Evil" is one of the biggest TV and streaming premieres this month. Check out our May calendar for more!</p>
                                        <p className="w-full text-blue-500 hover:underline py-4" onClick={() => navigate(`/top250Tv`)}>See out pick</p>
                                    </div>
                                    <div className="max-w-full" onClick={() => navigate(`/top250Tv`)}>
                                        <ListRow listRowList={topRatedTv?.slice(3)} />
                                    </div>
                                </div>
                                <div className="flex items-center py-5 px-2">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">Renewed, Canceled, or Ending?</h2>
                                </div>
                                <div className="grid grid-cols-2 px-2 py-2 gap-4" >
                                    <div>
                                        <p>Check out our list of renewals and cancellations to see if your favorite show made the cut.</p>
                                        <p className="w-full text-blue-500 hover:underline py-4" onClick={() => navigate(`/top250Tv`)}>See out pick</p>
                                    </div>
                                    <div className="max-w-full" onClick={() => navigate(`/top250Tv`)}>
                                        <ListRow listRowList={mostPopularTv?.slice(3)} />
                                    </div>
                                </div>
                                <div className="flex items-center py-5 px-2">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">Everything New on Disney+ in {currentMonthName}</h2>
                                </div>
                                <div className="grid grid-cols-2 px-2 py-2 gap-4" >
                                    <div>
                                        <p>Freshen up your Watchlist with the latest roster of streaming movies and TV shows coming to Disney+, featuring old favorites and top-notch newcomers.</p>
                                        <p className="w-full text-blue-500 hover:underline py-4" onClick={() => navigate(`/top250Movie`)}>See out pick</p>
                                    </div>
                                    <div className="max-w-full" onClick={() => navigate(`/top250Movie`)}>
                                        <ListRow listRowList={topRatedMovies?.slice(6)} />
                                    </div>
                                </div>
                                <div className="flex items-center py-5 px-2">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black "> Animated Kids' Shows That Adults Love</h2>
                                </div>
                                <div className="grid grid-cols-2 px-2 py-2 gap-4" >
                                    <div>
                                        <p>We rounded up the kids' animated shows that transcend all age targets thanks to their brilliant writing and amazing visuals, from "Avatar: The Last Airbender" to "Adventure Time."</p>
                                        <p className="w-full text-blue-500 hover:underline py-4" onClick={() => navigate(`/top250Movie`)}>See out pick</p>
                                    </div>
                                    <div className="max-w-full" onClick={() => navigate(`/tv/246`)}>
                                        <img src={`https://image.tmdb.org/t/p/w500//8RFAXPLs3qg5YVYbv5ME46syBKy.jpg`} alt="product images" className="w-full" />

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="lg:col-span-4 col-span-12  h-full px-2 py-2 text-xl">
                            <div>
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">More to explore</h2>
                                </div>
                                <div className="lg:max-w-full md:w-screen" onClick={() => navigate(`/top250Movie`)}>
                                    <ListRow listRowList={topRatedMovies} />
                                </div>
                                <p className=" w-full text-black"> Staff Picks: What to Watch in {currentMonthName}</p>
                                <p className=" w-full text-blue-500 hover:underline"> See our picks</p>
                            </div>
                            <div>
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black ">Charts</h2>
                                </div>
                                <div className="lg:max-w-full md:w-screen">
                                    <Charts />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black ">Top Rated Movies by Genre</h2>
                                </div>
                                <div className="lg:max-w-full md:w-screen">
                                    <TopRatedMovieByGenre />
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center mt-10 ">
                    <Footer />
                </div>
            </div>
        </div >
    )
}