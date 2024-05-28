import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../common/TopBar";
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import AppsIcon from '@mui/icons-material/Apps';
import { toast } from "react-toastify";
import Footer from "../common/Footer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import { getListRecentlyViewMongoApi, removeListRecentlyViewMongoApi } from "../../redux/client/api.LoginMongo";
import { setDeleteRecentlyView, setListRecentlyView } from "../../redux/reducers/login.reducer";


export function ActivityLayout() {
    const [watchList, setWatchList] = useState<any[]>([]);
    const [handleRefine, setHandleRefine] = useState(false);
    const [movieCheck, setMovieCheck] = useState(false);
    const [seriesCheck, setSeriesCheck] = useState(false);
    const [actorCheck, setActorCheck] = useState(false);

    const toggleFeature = (type: any) => {
        if (type === "Movie") {
            setMovieCheck(!movieCheck);
        } else if (type === "TV") {
            setSeriesCheck(!seriesCheck);
        }
        else if (type === "Person") {
            setActorCheck(!actorCheck);
        }
    };

    // useEffect(() => {
    //     // Lấy dữ liệu từ local storage
    //     const storedDataString = localStorage.getItem('activity');
    //     let storedData = [];

    //     if (storedDataString) {
    //         storedData = JSON.parse(storedDataString);
    //     }
    //     console.log('Stored data:', storedData);

    //     // Lưu dữ liệu vào state
    //     setWatchList(Object.values(storedData)); // Chuyển đổi dữ liệu từ đối tượng sang mảng
    // }, []);
    // const removeFromWatchList = (imdb_id: string) => {
    //     // Lấy dữ liệu từ local storage
    //     const storedDataString = localStorage.getItem('activity');
    //     let storedData: Record<string, any> = {};

    //     if (storedDataString) {
    //         storedData = JSON.parse(storedDataString);
    //     }

    //     // Xóa item với imdb_id tương ứng khỏi object
    //     delete storedData[imdb_id];

    //     // Cập nhật local storage
    //     localStorage.setItem('activity', JSON.stringify(storedData));

    //     // Cập nhật state để render lại
    //     setWatchList(Object.values(storedData));
    // };
    let navigate = useNavigate()
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

    const [currentView, setCurrentView] = useState('Grid'); // Default view is 'detail'

    const switchView = (view: any) => {
        setCurrentView(view);
    };

    const [currentSelection, setCurrentSelection] = useState('case1'); // Default view is 'detail'

    type GenreID = number;
    type GenreName = string;
    const genreMapping: Record<GenreID, GenreName> = {
        28: 'Action', 12: 'Adventure', 10768: 'War & Politics', 10765: 'Sci-Fi & Fantasy', 10759: 'Action & Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
    };

    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [checkLog, setCheckLog] = useState(false)
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const dispatch = useAppDispatch()
    const recentList = useAppSelector((state) => state.login.listRecentlyView);
    const fetchGetFavorites = () => async (dispatch: AppDispatch) => {
        try {
            const response = await getListRecentlyViewMongoApi(userInfoList[0]);
            if (response) {
                dispatch(setListRecentlyView(response));
            } else {
                throw new Error('Failed to fetch favorites');
            }
        } catch (e) {
            console.log("Fetching favorites failed: " + e);
        }
    }

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
    const fetchRemove = (
        movieId: string,
        movieType: string,
        removeALl: string
    ) => async (dispatch: AppDispatch) => {
        const email = userInfoList[0];
        try {
            const response = await removeListRecentlyViewMongoApi(
                email,
                movieId,
                movieType,
                removeALl
            );
            dispatch(setDeleteRecentlyView(response));
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
        movieType: any,
        removeAll: any
    ) => {
        setLoading((prevLoading) => ({ ...prevLoading, [index]: true }));
        await dispatch(fetchRemove(
            movieId,
            movieType,
            removeAll,
        ));
        setCheckLog(!checkLog);
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };

    const renderMovieItem = (movie: any, movieIndex: number, currentView: any) => {
        if (movieIndex >= 50) {
            return null;
        }

        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 border-t border-r border-l border-gray-500  w-full" key={movieIndex}
                    >
                    </section>

                )
            case 'Grid':
                return (
                    <section className=" w-1/2 lg:w-1/6 md:w-1/3 px-2 " key={movieIndex}
                    >
                        <div className="text-black font-sans  shadow-sm shadow-black  " >
                            <div className=" items-center ">
                                <div className="mt-2">
                                    <div className="items-center gap-2">
                                        <div className="px-2">{movieIndex}</div>

                                        <img onClick={() => navigate(`/${movie?.itemType}/${movie?.itemId}`)} 
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images"
                                            onError={handleImageError} className="w-full hover:opacity-80" />
                                        <div className="px-2 py-2 w-full">
                                            <div className="flex flex-wrap items-center gap-2 justify-start text-left">
                                                <div className="h-12 w-full ">
                                                    <p className="font-bold hover:opacity-50 line-clamp-2"> {movie?.itemName}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-2 py-2" onClick={() => handleWatchList(movieIndex, movie?.itemId, movie?.itemType, 'none')}   >
                                    <button className="px-2 py-1 bg-gray-300 hover:bg-blue-300 text-blue-500 w-full rounded-md font-medium text-center items-center">
                                        <Tooltip title="Click here to remove from activity list">
                                            {loading[movieIndex] ? (
                                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                            ) :
                                                (
                                                    <p>Remove</p>
                                                )}
                                        </Tooltip>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </section >
                )
        }
    }



    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black pb-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-white text-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <div className="lg:max-w-full md:w-screen ">
                        <div className="flex mt-3 border-b-2 border-gray py-4">
                            <div className="items-center ">
                                <h2 className="text-2xl font-bold ">Your History List</h2>
                                <p className="text-xl font-semibold text-gray-500">Private</p>
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
                        <div className="flex border-b-2 border-gray py-2 items-center ">
                            <div className="items-center ">
                                <h2 className="lg:text-2xl text-lg font-bold ">{recentList?.length} Title</h2>
                            </div>
                            <div className="ml-auto gap-2" >
                                <div>
                                    <button
                                        onClick={() => setHandleRefine(!handleRefine)}
                                        className="bg-gray-300 hover:opacity-80 px-2 py-1">
                                        Refine
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            {handleRefine ? (
                                <div className="flex border-b-2 border-gray py-2 items-center w-full">
                                    <div className="md:grid md:grid-cols-12 cursor-pointer  w-full ">
                                        <div className="lg:col-span-5 col-span-12 bg-gray-400">
                                            <div onClick={() => setCurrentSelection('case1')} className={`h-full px-4 py-8  hover:opacity-90  hover:bg-gray-200 ${currentSelection == 'case1' ? 'bg-gray-200' : ''} `}>
                                                <div className="font-bold">Type (Film, TV, etc.)</div>
                                                <div className="capitalize">
                                                    {movieCheck ? 'Movie' : ''}
                                                    {seriesCheck ? 'TV' : ''}
                                                    {actorCheck ? 'Person' : ''}
                                                    {!movieCheck && !seriesCheck && !actorCheck ? 'all' : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:col-span-7 col-span-12 bg-gray-200 w-full h-full">
                                            <button id='1' className="relative hover:opacity-90 w-full" >
                                                {currentSelection == 'case1' ? (
                                                    <div className="w-full py-4 px-2">
                                                        <div className="w-full py-4 px-2 text-xl">
                                                            <div className="items-center w-full">
                                                                {movieCheck && (
                                                                    <div className="flex items-center">
                                                                        <div className="flex gap-2 items-center">
                                                                            <i className="fa-regular fa-square-check" onClick={() => toggleFeature("Movie")}></i>
                                                                            <div>Feature Movie</div>
                                                                        </div>
                                                                        <div className="ml-auto">
                                                                            {recentList?.filter(movie => movie?.itemType === 'Movie').length}
                                                                        </div>

                                                                    </div>
                                                                )}
                                                                {seriesCheck && (
                                                                    <div className="flex items-center">
                                                                        <div className="flex gap-2 items-center">
                                                                            <i className="fa-regular fa-square-check" onClick={() => toggleFeature("TV")}></i>
                                                                            <div>Feature TV Mini-Series</div>
                                                                        </div>
                                                                        <div className="ml-auto">
                                                                            {recentList?.filter(movie => movie?.itemType === 'TV').length}                                                                             </div>

                                                                    </div>
                                                                )}
                                                                {actorCheck && (
                                                                    <div className="flex items-center">
                                                                        <div className="flex gap-2 items-center">
                                                                            <i className="fa-regular fa-square-check" onClick={() => toggleFeature("Person")}></i>
                                                                            <div>Feature Actor</div>
                                                                        </div>
                                                                        <div className="ml-auto">
                                                                            {recentList?.filter(movie => movie?.itemType === 'Person').length}                                                                             </div>

                                                                    </div>
                                                                )}
                                                                {!movieCheck && !seriesCheck && !actorCheck && (
                                                                    <>
                                                                        <div className="flex items-center">
                                                                            <div className="flex gap-2 items-center">
                                                                                <i className="fa-regular fa-square" onClick={() => toggleFeature("Movie")}></i>
                                                                                <div>Feature Movie</div>
                                                                            </div>
                                                                            <div className="ml-auto">
                                                                                {recentList?.filter(movie => movie?.itemType === 'Movie').length}
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center mt-4">
                                                                            <div className="flex gap-2 items-center">
                                                                                <i className="fa-regular fa-square" onClick={() => toggleFeature("TV")}></i>
                                                                                <div>Feature TV Mini-Series</div>
                                                                            </div>
                                                                            <div className="ml-auto">
                                                                                {recentList?.filter(movie => movie?.itemType === 'TV').length}                                                                                 </div>
                                                                        </div>
                                                                        <div className="flex items-center mt-4">
                                                                            <div className="flex gap-2 items-center">
                                                                                <i className="fa-regular fa-square" onClick={() => toggleFeature("Person")}></i>
                                                                                <div>Feature Actor</div>
                                                                            </div>
                                                                            <div className="ml-auto">
                                                                                {recentList?.filter(movie => movie?.itemType === 'Person').length}                                                                                 </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                    : (
                                                        <div></div>
                                                    )}


                                            </button>
                                        </div>
                                    </div>


                                </div>) : (<div>

                                </div>)}

                        </div>
                        <div>
                            <div className="lg:max-w-full md:w-screen py-4 px-2 ">
                                <div
                                    style={{
                                        position: "relative", backgroundSize: "cover", backgroundPosition: "center",
                                        display: 'flex', flexWrap: 'wrap'
                                    }}>
                                    {recentList?.slice()?.sort((a: any, b: any) => {
                                        const dateA = new Date(a?.createdTime)?.getTime();
                                        const dateB = new Date(b?.createdTime)?.getTime();
                                        return dateB - dateA;
                                    })
                                        .filter((movie: any) => {
                                            if (movieCheck) {
                                                return movie?.itemType === "Movie"; // Chỉ hiển thị phim có tiêu đề
                                            }
                                            else if (seriesCheck) {
                                                return movie?.itemType === "TV"
                                            }
                                            else if (actorCheck) {
                                                return movie?.itemType === "Person"
                                            }
                                            else {
                                                return true; // Không áp dụng bộ lọc
                                            }
                                        })
                                        .map((m, index) => renderMovieItem(m, index, currentView))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center mt-10 ">
                    <Footer />
                </div>
            </div>
        </div >





    );
}