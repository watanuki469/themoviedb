import AppsIcon from '@mui/icons-material/Apps';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { favoriteMongoApi, getFavoriteMongoApi } from '../../redux/client/api.LoginMongo';
import { AppDispatch } from '../../redux/store';
import { setFavorite, setListFavorite } from '../../redux/reducers/login.reducer';

export function WatchListLayout2() {
    const dispatch = useAppDispatch()
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const [checkLog, setCheckLog] = useState(false)

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);

    const favoriteList = useAppSelector((state: any) => state.login.listFavorite);
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
    useEffect(() => {
        if (userInfoList?.length > 0) {
            dispatch(fetchGetFavorites());
        }
    }, [userInfoList]);
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
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Updating watch list failed");
        }
    };

    const removeFromWatchList = async (
        index: number,
        movieId: any,
        movieName: any,
        mediaType: any,
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

    const [handleRefine, setHandleRefine] = useState(false);
    const [movieCheck, setMovieCheck] = useState(false);
    const [seriesCheck, setSeriesCheck] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const toggleFeature = (type: any) => {
        if (type == "Movie") {
            setMovieCheck(!movieCheck);
        } else if (type == "TV") {
            setSeriesCheck(!seriesCheck);
        }
    };
    let navigate = useNavigate()
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750'; // Set the fallback image source here
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
    const [selectedOption, setSelectedOption] = useState<string | null>('none');
    const [applyFilter, setApplyFilter] = useState(true);
    const [filterType, setFilterType] = useState('none');

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
    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };

    const handleOptionClick = (option: any) => {
        setApplyFilter(option === 'none' ? (true) : (false));
        setFilterType(option);
        setSelectedOption(option === selectedOption ? null : option);
    };
    const handleRankingClose = () => {
        setAnchorRankingEl(null);
    };
    const [selectedRankingOption, setSelectedRankingOption] = useState(null);

    const [menuItemNum, setMenuItemNum] = useState(''); // Default view is 'detail'

    function compareReleaseDates(a: any, b: any) {
        const releaseDateA = new Date(a.createdTime);
        const releaseDateB = new Date(b.createdTime);
        return releaseDateA.getTime() - releaseDateB.getTime();
    }
    const handleMenuItemClick = (option: any) => {
        setSelectedRankingOption(option);
        let menuItemNum = '';
        switch (option) {
            case 'Ranking':
                menuItemNum = '1';
                break;
            case 'IMDb Rating':
                menuItemNum = '2';
                break;
            case 'Release Day':
                menuItemNum = '3';
                break;
            case 'Number Of Rating':
                menuItemNum = '4';
                break;
            case 'Alphabetical':
                menuItemNum = '5';
                break;
            case 'Popularity':
                menuItemNum = '6';
                break;
            case 'Runtime':
                menuItemNum = '7';
                break;
            default:
                break;
        }
        setMenuItemNum(menuItemNum);
        handleRankingClose();
    };
    const [currentView, setCurrentView] = useState('Detail'); // Default view is 'detail'

    const switchView = (view: any) => {
        setCurrentView(view);
    };

    const [currentSelection, setCurrentSelection] = useState('case1'); // Default view is 'detail'

    const handleFromDateChange = (event: any) => {
        setFromDate(event.target.value);
    };

    // Hàm xử lý sự kiện khi người dùng thay đổi ngày "To"
    const handleToDateChange = (event: any) => {
        setToDate(event.target.value);
    };

    type GenreID = number;
    type GenreName = string;
    const genreMapping: Record<GenreID, GenreName> = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western', 10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics'
    };
    type Genre = | ' ';
    const [genreCount, setGenreCount] = useState<Record<string, number>>({});
    const [numberGen, setNumberGen] = useState(0);
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

    function countGenres(topRatedMovies: any): Record<GenreName, number> {
        const genreCounting: Record<GenreName, number> = {};
        topRatedMovies?.forEach((movie: any) => {
            movie?.itemGenre?.forEach((id: GenreID) => {
                // Lấy tên thể loại từ đối tượng ánh xạ
                const genreName: GenreName = genreMapping[id];
                // Nếu thể loại đã tồn tại, tăng giá trị đếm lên 1; ngược lại, tạo mới với giá trị 1.
                genreCounting[genreName] = (genreCounting[genreName] || 0) + 1;
            });
        });
        return genreCounting;
    }
    const handleGenreClick = (selectedGenre: Genre) => {
        if (selectedGenres.includes(selectedGenre)) {
            // If already selected, remove it
            setSelectedGenres(selectedGenres.filter((genre) => genre !== selectedGenre));

        } else {
            // If not selected, add it
            setSelectedGenres([...selectedGenres, selectedGenre]);
        }

    };
    useEffect(() => {
        const genreCount = countGenres(favoriteList);
        setGenreCount(genreCount);
        const totalGenreCount = Object.values(genreCount).reduce((acc, count) => acc + count, 0);
        setNumberGen(totalGenreCount);

    }, [favoriteList]);

    const renderMovieItem = (movie: any, movieIndex: number, currentView: any) => {
        const dateTimeString = movie?.createdTime
        const date = new Date(dateTimeString);
        const formattedTime = date.toTimeString().split(' ')[0];
        // Implement rendering logic based on the currentView (detail, grid, compact)
        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 border-t border-r border-l border-gray-500  w-full" key={movieIndex}
                    >
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <img onClick={() => navigate(`/${movie?.itemType}/${movie?.itemId}`)}
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images"
                                            onError={handleImageError} className="w-28 h-40 hover:opacity-80" />
                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.itemName}</p>
                                            <div className="flex flex-wrap gap-2">{movie?.itemReleaseDay?.slice(0, 4)} ||
                                                {movie?.itemGenre?.map((genre: any, index: any) => (
                                                    <div key={index}>
                                                        {genreMapping[genre]}
                                                        {index < (movie?.itemGenre?.length - 1) ? "," : ''} {/* Thêm dấu phẩy nếu không phải là phần tử cuối cùng */}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <i className="fa-solid fa-star text-yellow-300"></i>
                                                <p>{movie?.itemVoteAverage?.slice(0, 3)} ({shortenNumber(movie?.itemVoteCount)})</p>
                                            </div>
                                            <div className="mt-1 lg:line-clamp-none line-clamp-4">
                                                <p>{movie?.itemReview}</p>
                                            </div>
                                            <div className="mt-1 lg:line-clamp-none line-clamp-4">
                                                <p>Added to watchlist at {movie?.createdTime?.slice(0, 10)} :{formattedTime} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-auto px-2" onClick={() => removeFromWatchList(movieIndex, movie?.itemId, movie?.itemName, movie?.mediaType, movie?.itemImg, movie?.itemReleaseDay, movie?.itemGenre, movie?.itemReview, movie?.itemPopularity, movie?.itemVoteAverage, movie?.itemVoteCount)} >
                                    <Tooltip title="Click here to remove from watchlist">
                                        {loading[movieIndex] ? (
                                            <i className="fa-solid fa-video-slash fa-spin-pulse py-2 px-3 bg-red-500 text-xl text-white"></i>
                                        ) :
                                            (
                                                <i className="fa-solid fa-video-slash px-2 text-white text-xl bg-red-500 rounded-lg py-2"></i>

                                            )}
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            case 'Grid':
                return (
                    <section className=" w-1/2 lg:w-1/6 md:w-1/4 sm:w-1/3 px-2 " key={movieIndex}
                    >
                        <div className="text-black font-sans  shadow-sm shadow-black  " >
                            <div className=" items-center ">
                                <div className="mt-2">
                                    <div className="items-center gap-2">
                                        <div className="relative w-full pb-[150%] hover:opacity-80">
                                            <img onClick={() => navigate(`/${movie?.mediaType}/${movie?.movieId}`)}
                                                src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images"
                                                onError={handleImageError} className="absolute top-0 left-0 w-full h-full object-cover" />
                                        </div>
                                        <div className="px-2 py-2 w-full">
                                            <div className="flex flex-wrap items-center gap-2 justify-start text-left">
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p>{movie?.itemVoteAverage?.slice(0, 3)} ({shortenNumber(movie?.itemVoteCount)})</p>
                                                </div>

                                                <div className="h-12 w-full ">
                                                    <p className="font-bold hover:opacity-50 line-clamp-2">{movieIndex}. {movie?.itemName}</p>
                                                </div>
                                                <div className="flex flex-wrap">
                                                    {movie?.itemReleaseDay?.slice(0, 10)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-2 py-2" onClick={() => removeFromWatchList(movieIndex, movie?.itemId, movie?.itemName, movie?.mediaType, movie?.itemImg, movie?.itemReleaseDay, movie?.itemGenre, movie?.itemReview, movie?.itemPopularity, movie?.itemVoteAverage, movie?.itemVoteCount)} >
                                    <button className="px-2 py-1 bg-gray-300 hover:bg-blue-300 text-blue-500 w-full rounded-md font-medium text-center items-center">
                                        {loading[movieIndex] ? (
                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                        ) :
                                            (
                                                <div>
                                                    Remove
                                                </div>

                                            )}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </section>
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
                    <div className="lg:max-w-full w-full ">
                        <div className="flex mt-3 border-b-2 border-gray px-2 py-4">
                            <div className="items-center ">
                                <h2 className="lg:text-2xl text-lg font-bold ">Your WatchList</h2>
                                <p className="lg:text-xl text-lg font-semibold text-gray-500">Public</p>
                            </div>
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center lg:text-2xl text-lg font-bold text-black ">Share </p>
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
                        <div className="flex border-b-2 border-gray py-2 items-center px-2 ">
                            <div className="items-center ">
                                <h2 className="lg:text-2xl text-lg font-bold ">{favoriteList?.length} Title</h2>
                            </div>
                            <div className=" items-center ml-auto gap-2 flex" >
                                <p className="items-center text-lg text-gray-400 hidden lg:flex ">Sort by </p>
                                <div className='hidden lg:block'>
                                    <Button
                                        id="demo-customized-button"
                                        aria-controls={anchorRankingEl ? 'demo-customized-menu' : undefined}
                                        aria-haspopup="true"
                                        variant="contained"
                                        disableElevation
                                        onClick={handleRankingClick}
                                        endIcon={<i className="fa-solid fa-caret-down"></i>}
                                        sx={{
                                            bgcolor: anchorRankingEl ? 'blue' : 'white',
                                            color: anchorRankingEl ? 'white' : 'blue',
                                            border: anchorRankingEl ? '2px dashed' : '',
                                            ":hover": {
                                                // border: '2px dashed',
                                                backgroundColor: 'blue'
                                                , color: 'white'
                                            },
                                        }}
                                    >
                                        {selectedRankingOption ? selectedRankingOption : 'Options'}
                                    </Button>
                                </div>

                                <Menu
                                    id="demo-customized-menu"
                                    anchorEl={anchorRankingEl}
                                    open={Boolean(anchorRankingEl)}
                                    onClose={handleRankingClose}
                                >
                                    <MenuItem onClick={() => handleMenuItemClick('Ranking')} disableRipple>
                                        Ranking
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('IMDb Rating')} disableRipple>
                                        IMDb Rating
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('Release Day')} disableRipple>
                                        Release Day
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('Number Of Rating')} disableRipple>
                                        Number Of Rating
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('Alphabetical')} disableRipple>
                                        Alphabetical
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('Popularity')} disableRipple>
                                        Popularity
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('Runtime')} disableRipple>
                                        Runtime
                                    </MenuItem>
                                </Menu>
                                <div className="flex items-center ml-auto gap-4 px-2 py-2" >
                                    <Avatar sx={{
                                        width: 32, height: 32, bgcolor: 'white', color: 'black', padding: '20px', ":hover": {
                                            opacity: '50%'
                                        }
                                    }}>
                                        {currentView == "Detail" ?
                                            (
                                                <Tooltip title="Detail View" className={"text-blue-500"} onClick={() => switchView('Grid')}>
                                                    <i className="fa-solid fa-list-ul "></i>
                                                </Tooltip>
                                            ) :
                                            (
                                                <Tooltip title="Grid View" className={"text-blue-500"}>
                                                    <AppsIcon onClick={() => switchView('Detail')} />
                                                </Tooltip>
                                            )
                                        }
                                    </Avatar>
                                </div>
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
                                            <div onClick={() => setCurrentSelection('case1')} className={`h-24 py-2 border-b-2 border-gray-500 hover:opacity-90  hover:bg-gray-200 ${currentSelection == 'case1' ? 'bg-gray-200' : ''} `}>
                                                <div>Type (Film, TV, etc.)</div>
                                                <div className="capitalize">
                                                    {movieCheck ? 'movie' : ''}
                                                    {seriesCheck ? 'tv' : ''}
                                                    {!movieCheck && !seriesCheck ? 'all' : ''}
                                                </div>

                                            </div>
                                            <div onClick={() => setCurrentSelection('case2')} className={`h-24  py-2 border-b-2 border-gray-500 hover:opacity-90 hover:bg-gray-200 ${currentSelection == 'case2' ? 'bg-gray-200' : ''} `}>
                                                <div>Genres</div>
                                                <div>
                                                    {selectedGenres?.length > 0 ? (
                                                        selectedGenres?.map((genre: Genre, index: number) => (
                                                            <span key={index}>
                                                                {genre}{index !== selectedGenres?.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span>All</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div onClick={() => setCurrentSelection('case3')} className={`h-24 py-2  border-b-2 border-gray-500 hover:opacity-90 hover:bg-gray-200 ${currentSelection == 'case3' ? 'bg-gray-200' : ''} `}>Release Year</div>
                                        </div>
                                        <div className="lg:col-span-7 col-span-12 bg-gray-200 w-full h-72">
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
                                                                            {favoriteList?.filter((movie: any) => movie?.itemType == 'Movie').length}
                                                                        </div>

                                                                    </div>
                                                                )}
                                                                {seriesCheck && (
                                                                    <div className="flex items-center">
                                                                        <div className="flex gap-2 items-center">
                                                                            <i className="fa-regular fa-square-check" onClick={() => toggleFeature("TV")}></i>
                                                                            <div>Feature TV Mini-Series</div>
                                                                        </div>
                                                                        <div className="ml-auto">{favoriteList?.filter((movie: any) => movie?.itemType == 'TV').length}</div>

                                                                    </div>
                                                                )}
                                                                {!movieCheck && !seriesCheck && (
                                                                    <>
                                                                        <div className="flex items-center">
                                                                            <div className="flex gap-2 items-center">
                                                                                <i className="fa-regular fa-square" onClick={() => toggleFeature("Movie")}></i>
                                                                                <div>Feature Movie</div>
                                                                            </div>
                                                                            <div className="ml-auto">{favoriteList?.filter((movie: any) => movie?.itemType == 'Movie').length}</div>
                                                                        </div>
                                                                        <div className="flex items-center mt-4">
                                                                            <div className="flex gap-2 items-center">
                                                                                <i className="fa-regular fa-square" onClick={() => toggleFeature("TV")}></i>
                                                                                <div>Feature TV Mini-Series</div>
                                                                            </div>
                                                                            <div className="ml-auto"> {favoriteList?.filter((movie: any) => movie?.itemType == 'TV').length}</div>
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
                                                {currentSelection == 'case2' ? (
                                                    <div className="w-full py-4 px-2 text-xl  overflow-auto h-72">
                                                        <div className="w-full items-center">
                                                            {Object.entries(genreCount).map(([genre, count], index) => (
                                                                <div
                                                                    key={`genre-${genre}-${index}`}
                                                                    className={`w-full px-2 py-2 flex items-center`}
                                                                    onClick={() => handleGenreClick(genre as Genre)}
                                                                >
                                                                    <div className="flex gap-2 items-center">
                                                                        {selectedGenres.includes(genre as Genre) ?
                                                                            <i className="fa-regular fa-square-check"></i> :
                                                                            <i className="fa-regular fa-square"></i>}
                                                                        <div>{`${genre}`}</div>
                                                                    </div>
                                                                    <div className="ml-auto">{`${count}`}</div> {/* Đưa count ra ngoài cùng */}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                                    : (
                                                        <div></div>
                                                    )}
                                                {currentSelection == 'case3' ? (
                                                    <div className="w-full py-4 px-2 text-xl ">
                                                        <div className="w-full items-center">
                                                            <div>Release year or range</div>
                                                            {/* <label htmlFor="endDate" className="block mb-2">Or just enter:</label> */}
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    id="startDate"
                                                                    name="startDate"
                                                                    className="border border-gray-300 px-2 py-1 w-full"
                                                                    value={fromDate} // Đặt giá trị của "From" từ state
                                                                    onChange={handleFromDateChange} // Xử lý sự kiện thay đổi của "From"
                                                                />
                                                                <p className="px-1">To</p>
                                                                <input
                                                                    id="endDate"
                                                                    name="endDate"
                                                                    className="border border-gray-300 px-2 py-1 w-full"
                                                                    value={toDate} // Đặt giá trị của "To" từ state
                                                                    onChange={handleToDateChange} // Xử lý sự kiện thay đổi của "To"
                                                                />
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
                        <div className="flex border-b-2 border-gray py-2 items-center lg:hidden">
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center text-lg text-gray-400 ">Sort by </p>
                                <Button
                                    id="demo-customized-button"
                                    aria-controls={anchorRankingEl ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    variant="contained"
                                    disableElevation
                                    onClick={handleRankingClick}
                                    endIcon={<i className="fa-solid fa-caret-down"></i>}
                                    sx={{
                                        bgcolor: anchorRankingEl ? 'blue' : 'white',
                                        color: anchorRankingEl ? 'white' : 'blue',
                                        border: anchorRankingEl ? '2px dashed' : '',
                                        ":hover": {
                                            // border: '2px dashed',
                                            backgroundColor: 'blue'
                                            , color: 'white'
                                        },
                                    }}
                                >
                                    {selectedRankingOption ? selectedRankingOption : 'Options'}
                                </Button>
                                <Menu
                                    id="demo-customized-menu"
                                    anchorEl={anchorRankingEl}
                                    open={Boolean(anchorRankingEl)}
                                    onClose={handleRankingClose}
                                >
                                    <MenuItem onClick={() => handleMenuItemClick('Ranking')} disableRipple>
                                        Ranking
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('IMDb Rating')} disableRipple>
                                        IMDb Rating
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('Release Day')} disableRipple>
                                        Release Day
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('Number Of Rating')} disableRipple>
                                        Number Of Rating
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('Alphabetical')} disableRipple>
                                        Alphabetical
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('Popularity')} disableRipple>
                                        Popularity
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuItemClick('Runtime')} disableRipple>
                                        Runtime
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div>
                            <div className="lg:max-w-full w-full py-4 px-2 ">
                                <div
                                    style={{
                                        position: "relative", backgroundSize: "cover", backgroundPosition: "center",
                                        display: 'flex', flexWrap: 'wrap'
                                    }}>
                                    {favoriteList
                                        .filter((movie: any) => {
                                            if (selectedGenres?.length === 0) return true; // No genre filter
                                            // Check if every selected genre is present in the movie's genres
                                            const hasAllGenres = selectedGenres.every((genre) =>
                                                movie?.itemGenre?.some((mGenre: any) => genreMapping[mGenre] === genre)
                                            );
                                            return hasAllGenres;
                                        })
                                        .filter(() => {
                                            if (applyFilter === true) return true; // No filter
                                            return null
                                        })
                                        .filter((movie: any) => {
                                            // Lọc theo khoảng ngày phát hành
                                            if (!fromDate || !toDate) return true; // Nếu không có khoảng ngày được chọn

                                            const releaseDate = new Date(movie?.itemReleaseDay);

                                            const from = new Date(fromDate);
                                            const to = new Date(toDate);

                                            // Kiểm tra xem ngày phát hành hoặc ngày phát sóng có nằm trong khoảng fromDate và toDate không
                                            return (releaseDate >= from && releaseDate <= to)
                                        })
                                        .filter((movie: any) => {
                                            if (movieCheck) {
                                                return movie?.itemType == 'Movie';
                                            }
                                            else if (seriesCheck) {
                                                return movie?.itemType == 'TV'
                                            }
                                            else {
                                                return true;
                                            }
                                        })

                                        .sort((a: any, b: any) => {
                                            if (menuItemNum === '5') {
                                                // Sắp xếp theo thứ tự alphabet của title
                                                const titleA = a?.itemName?.toUpperCase();
                                                const titleB = b?.itemName?.toUpperCase();
                                                if (titleA < titleB) {
                                                    return -1;
                                                }
                                                if (titleA > titleB) {
                                                    return 1;
                                                }
                                                return 0;
                                            }
                                            else if (menuItemNum === '1') {
                                                return b?.itemVoteAverage - a?.itemVoteAverage;
                                            }
                                            else if (menuItemNum === '2') {
                                                return a?.itemId - b?.itemId;
                                            }
                                            else if (menuItemNum === '3') {
                                                return compareReleaseDates(a, b);

                                            }
                                            else if (menuItemNum === '4') {
                                                return a?.itemVoteAverage - b?.itemVoteAverage;

                                            }
                                            else if (menuItemNum === '7') {
                                                return compareReleaseDates(b, a);
                                            }
                                            else if (menuItemNum === '6') {
                                                return b?.itemPopularity - a?.itemPopularity;
                                            }
                                            else {
                                                const titleA = a?.createdTime;
                                                const titleB = b?.createdTime;
                                                if (titleA < titleB) {
                                                    return -1;
                                                }
                                                if (titleA > titleB) {
                                                    return 1;
                                                }
                                                return 0;
                                            }
                                        })
                                        .map((m: any, index: any) => renderMovieItem(m, index, currentView))}
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