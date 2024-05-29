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


export default function TopBoxOffice() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const topRatedMovies = useAppSelector((state) => state.movies.discoverMovies)
    console.log(topRatedMovies);

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchMovies());
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
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

    const [isChecked, setIsChecked] = useState(false);
    const handleChecked = () => {
        setIsChecked(!isChecked);
    }

    const [currentView, setCurrentView] = useState('Detail'); // Default view is 'detail'

    const switchView = (view: any) => {
        setCurrentView(view);
    };
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };


    function shortenNumber(number: any) {
        if (number >= 1000000000) {
            return (number / 1000000000).toFixed(1) + 'b';
        }
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'm';
        }
        if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'k';
        }
        return number;
    }

    const [selectedStudent, setSelectedStudent] = useState<any>();
    const [value, setValue] = useState<number | null>(0);
    const [isRating, setIsRating] = useState(false);
    const [numberIndex, setNumberIndex] = useState(0);
    const [checkLog, setCheckLog] = useState(false)
    const handleClick = (index: any, value: any) => {
        setIsRating(true)
        setSelectedStudent(index);
        setValue(value)
    };

    const ratingList = useAppSelector((state) => state.login.listRating);
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [loading2, setLoading2] = useState<{ [key: number]: boolean }>({});
    const [loading3, setLoading3] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);
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
            dispatch(fetchGetRating())
        }
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 3000);
    }, [userInfoList]);
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

    const renderMovieItem = (movie: any, movieIndex: number, currentView: any, sortOrder: any) => {
        const existingRating = ratingList.find(rating => rating?.itemId == movie?.id); // Find the rating object for the item

        // Implement rendering logic based on the currentView (detail, grid, compact)
        if (movieIndex >= 50) {
            return null;
        }

        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 border-t border-r border-l border-gray-500  w-full" key={movieIndex}
                    >                        
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <img onClick={() => navigate(`/movie/${movie?.id}`)}
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="product images"
                                            onError={handleImageError} className="w-20 h-28 hover:opacity-80" />
                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.title}</p>
                                            <p>Weaken Gross: <span className="font-semibold">${(movie?.vote_average * 2.9).toFixed(1)}M </span></p>
                                            <p>Total Gross: <span className="font-semibold">${movie?.popularity?.toFixed(1)}M</span> </p>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                </div>
                                                <button className="flex items-center gap-2  px-2 hover:text-black text-blue-500">
                                                    <div className="grow ml-auto py-2" onClick={() => handleClick(movie, existingRating?.itemRating)}>
                                                        {
                                                            existingRating ? (
                                                                loading2[movieIndex] ? (
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
                                                                    {loading2[movieIndex] ? (
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                    ) : (
                                                                        <div className="hover:bg-gray-500  flex gap-2 flex-wrap w-fit items-center px-2 py-2 rounded-lg">
                                                                            <i className="fa-regular fa-star text-blue-500"></i>
                                                                            <div>Rate</div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-1 line-clamp-2">
                                        <p>{movie?.overview}</p>
                                    </div>
                                </div>

                                <div className="ml-auto" onClick={() => navigate(`/movie/${movie.id}`)} >
                                    <i className="fa-solid fa-circle-info px-2 text-blue-500 text-xl"></i>
                                </div>
                            </div>

                        </div>
                    </section>

                )
            case 'Grid':
                return (
                    <section className=" w-1/2 lg:w-1/4 px-2 " key={movieIndex}
                    >
                        <div className="text-black font-sans  shadow-sm shadow-black  " >
                            <div className=" items-center ">
                                <div className="mt-2">
                                    <div className="items-center gap-2 ">
                                        <div className="px-2">{movieIndex}</div>
                                        <img onClick={() => navigate(`/movie/${movie?.id}`)}
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="product images"
                                            onError={handleImageError} className="w-full  hover:opacity-80" />
                                        <div className="">
                                            <div className="justify-start text-left px-2 py-2">
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                </div>
                                                <button className="flex items-center gap-2 hover:bg-gray-300 hover:text-black text-blue-500 ">
                                                    <div className="grow ml-auto py-2" onClick={() => handleClick(movie, existingRating?.itemRating)}>
                                                        {
                                                            existingRating ? (
                                                                loading2[movieIndex] ? (
                                                                    <div>
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center  gap-2">
                                                                        <i className="fa-solid fa-star text-blue-500"></i>
                                                                        <div>{existingRating?.itemRating}</div>
                                                                    </div>

                                                                )
                                                            ) : (
                                                                <div className="text-black">
                                                                    {loading2[movieIndex] ? (
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse "></i>
                                                                    ) : (
                                                                        <div className="">
                                                                            <i className="fa-regular fa-star text-blue-500"></i>
                                                                            Rate
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </button>
                                                <div className="h-12 w-full ">
                                                    <p className="font-bold hover:opacity-50 line-clamp-2"> {movie?.title}</p>
                                                </div>
                                                <div className="flex flex-wrap">
                                                    {movie?.release_date?.slice(0, 4)}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-2 py-2" onClick={() => navigate(`/movie/${movie?.id}`)}   >
                                    <button className="px-2 py-1 bg-gray-300 hover:bg-blue-300 text-blue-500 w-full rounded-md font-medium text-center items-center">
                                        Details
                                    </button>

                                </div>
                            </div>

                        </div>
                    </section>

                )
            case 'Compact':
                return (
                    <section className="px-2 border-t border-r border-l border-gray-500 w-full " key={movieIndex}
                    >                       
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <img onClick={() => navigate(`/movie/${movie?.id}`)}
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="product images"
                                            onError={handleImageError} className="w-20 h-28 hover:opacity-80" />
                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.title}</p>
                                            <div>
                                                <p>Weaken : <span className="font-semibold">${(movie?.vote_average * 2.9).toFixed(1)}M </span></p>
                                                <p>Total : <span className="font-semibold">${movie?.popularity?.toFixed(1)}M</span> </p>

                                            </div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p>{movie?.vote_average} ({shortenNumber(movie?.vote_count)})</p>
                                                </div>
                                                <button className=" hover:text-black text-blue-500" >
                                                    <div className="" onClick={() => handleClick(movieIndex, existingRating?.itemRating)}>
                                                        {
                                                            existingRating ? (
                                                                loading2[movieIndex] ? (
                                                                    <div>
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse "></i>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center  gap-2 ">
                                                                        <i className="fa-solid fa-star text-blue-500"></i>
                                                                        <div>{existingRating?.itemRating}</div>
                                                                    </div>

                                                                )
                                                            ) : (
                                                                <div className="font-bold text-sm">
                                                                    {loading2[movieIndex] ? (
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                    ) : (
                                                                        <div className="">
                                                                            <i className="fa-regular fa-star text-blue-500"></i>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-auto" onClick={() => navigate(`/movie/${movie.id}`)} >
                                    <i className="fa-solid fa-circle-info px-2 text-blue-500 text-xl"></i>
                                </div>
                            </div>

                        </div>
                    </section>
                )
        }
    }

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
                                    <p className="text-2xl ">{selectedStudent?.title ? selectedStudent.title : selectedStudent?.name}</p>
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
                                            onClick={() => handleRating(numberIndex, selectedStudent?.id, 'Movie', value, selectedStudent?.poster_path, selectedStudent?.name ? selectedStudent?.name : selectedStudent?.title)}>
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
                                            onClick={() => handleRemoveRating(numberIndex, selectedStudent?.id, 'Movie')}>
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

            <div className="bg-black py-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-white">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <div className="lg:max-w-full md:w-screen ">
                        <div className="flex mt-3 ">
                            <div className="items-center ">
                                <h2 className="text-2xl font-bold text-black ">IMDb Charts</h2>
                            </div>
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center text-2xl font-bold text-black ">Share </p>
                                <IconButton
                                    onClick={handleShareClick}
                                    size="small"
                                    aria-controls={openShare ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openShare ? 'true' : undefined}
                                >
                                    <Avatar sx={{
                                        width: 32, height: 32, bgcolor: 'white', color: 'black', padding: '20px', ":hover": {
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
                        <div className="">
                            <div className="flex items-center ">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">IMDb Top Box Office</h2>
                            </div>
                            <p className="text-gray-500 py-2">Weekend of {currentMonthName} {currenDatePre}-{currenDateToday}</p>
                        </div>

                    </div>
                    <div className="md:grid grid-cols-12 gap-2 w-full">
                        <div className="lg:col-span-8 md-col-span-12  w-full ">
                            <div className="flex ">
                                <div className="items-center ">
                                    <h2 className="text-2xl text-black ">
                                        {topRatedMovies
                                            .slice(0, 10)
                                            .map((m, index) => renderMovieItem(m, index, currentView, sortOrder))?.length}
                                        /10 Titles</h2>

                                </div>

                                <div className="flex items-center ml-auto gap-4 px-2 py-2" >
                                    <Tooltip title="Detail View" className={`${currentView === "Detail" ? "text-blue-500" : ""}`}>
                                        <i className="fa-solid fa-list-ul " onClick={() => switchView('Detail')}></i>
                                    </Tooltip>
                                    <Tooltip title="Grid View" className={`${currentView === "Grid" ? "text-blue-500" : ""}`}>
                                        <AppsIcon onClick={() => switchView('Grid')} />
                                    </Tooltip>
                                    <Tooltip title="Compact View" className={`${currentView === "Compact" ? "text-blue-500" : ""}`}>
                                        <MenuIcon onClick={() => switchView('Compact')} />
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="lg:max-w-full md:w-screen lg:px-2 lg:py-2 ">
                                <div
                                    style={{
                                        position: "relative", backgroundSize: "cover", backgroundPosition: "center",
                                        display: 'flex', flexWrap: 'wrap'
                                    }}>
                                    {topRatedMovies.length === 0 && (
                                        <div style={{
                                            backgroundImage: `url(https://filmfair.in/website/images/error_screens/no-result.png')`,
                                            position: "absolute", width: "100%", height: "100%", opacity: "0.5",
                                            backgroundSize: "cover", backgroundPosition: "center", backgroundColor: 'black'
                                        }}>
                                        </div>
                                    )}
                                    {topRatedMovies
                                        .slice(0, 10) // Tạo một bản sao của mảng topRatedMovies
                                        // .sort((a, b) => b?.popularity - a?.popularity) // Sắp xếp các đối tượng trong bản sao mảng
                                        .map((m, index) => renderMovieItem(m, index, currentView, sortOrder))}
                                </div>
                            </div>

                        </div>
                        <div className="hidden lg:block col-span-4  h-full px-2 py-2 text-xl">
                            {/* <p className="text-2xl font-bold" >You have rated</p>
                            <p className="mt-3"><span className="text-green-500">0</span>/250 (0%)</p>
                            <div className="flex items-center gap-3 mt-3 ">
                                {isChecked ? (
                                    <i className={`fa-regular fa-square-check ${isChecked ? '' : 'hidden'}`} onClick={handleChecked}></i>
                                ) : (
                                    <i className={`fa-regular fa-square }`} onClick={handleChecked}></i>
                                )}
                                <p>Hide titles you have rated</p>

                            </div> */}
                            <div>
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">More to explore</h2>
                                </div>
                                <div className="lg:max-w-full md:w-screen" onClick={() => navigate(`/top250Movie`)}>
                                    <ListRow listRowList={topRatedMovies} />
                                </div>
                                <p className="text-red w-full text-black"> Staff Picks: What to Watch in {currentMonthName}</p>
                                <p className="text-red w-full text-blue-500 hover:underline"> See our picks</p>
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