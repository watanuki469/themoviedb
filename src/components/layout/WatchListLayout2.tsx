import AppsIcon from '@mui/icons-material/Apps';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Avatar, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { formatDate, handleImageError, shortenNumber } from '../../modules/BaseModule';
import Charts from '../../modules/Charts';
import ListRow from '../../modules/ListRow';
import TopRatedMovieByGenre from '../../modules/TopRatedMovieByGenre';
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchFavorite, fetchGetFavorites } from '../../redux/reducers/login.reducer';
import { fetchMovies } from '../../redux/reducers/movies.reducer';
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";

export function WatchListLayout2() {
    const dispatch = useAppDispatch()
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const favoriteList = useAppSelector((state: any) => state.login.listFavorite);
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)

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
            dispatch(fetchMovies());
            dispatch(fetchGetFavorites(userInfoList[0]));
        }
    }, [userInfoList]);

    const removeFromWatchList = async (
        index: number, movieId: any, movieName: any, mediaType: any, movieImg: string, movieReleaseDay: Date, movieGenre: number[], movieReview: string, moviePopularity: string, movieVoteAverage: string, movieVoteCount: string
    ) => {
        setLoading((prevLoading) => ({ ...prevLoading, [index]: true }));
        await dispatch(fetchFavorite(
            userInfoList[0], movieId, mediaType, movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
        ));
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };

    const [handleRefine, setHandleRefine] = useState(false);
    const [movieCheck, setMovieCheck] = useState(false);
    const [seriesCheck, setSeriesCheck] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [fromRating, setFromRating] = useState('');
    const [toRating, setToRating] = useState('');
    const [fromVotes, setFromVotes] = useState('');
    const [toVotes, setToVotes] = useState('');

    const toggleFeature = (type: any) => {
        if (type == "Movie") {
            setMovieCheck(!movieCheck);
        } else if (type == "TV") {
            setSeriesCheck(!seriesCheck);
        }
    };

    const [applyFilter, setApplyFilter] = useState(true);

    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };

    const handleRankingClose = () => {
        setAnchorRankingEl(null);
    };
    const [selectedRankingOption, setSelectedRankingOption] = useState(null);
    const [menuItemNum, setMenuItemNum] = useState('');

    const handleMenuItemClick = (option: any) => {
        setSelectedRankingOption(option);
        let menuItemNum = '';
        switch (option) {
            case `${translations[language]?.ranking}`: menuItemNum = '1'; break;
            case `IMDb ${translations[language]?.rating}`: menuItemNum = '2'; break;
            case `${translations[language]?.releaseDay}`: menuItemNum = '3'; break;
            case `${translations[language]?.numberRating}`: menuItemNum = '4'; break;
            case `${translations[language]?.alphabet}`: menuItemNum = '5'; break;
            case `${translations[language]?.popularity}`: menuItemNum = '6'; break;
            case `${translations[language]?.runTime}`: menuItemNum = '7'; break;
            default: break;
        }
        setMenuItemNum(menuItemNum);
        handleRankingClose();
    };
    const [currentView, setCurrentView] = useState('Detail'); // Default view is 'detail'

    const switchView = (view: any) => {
        setCurrentView(view);
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
        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 w-full" key={movieIndex}>
                        <div className="text-black font-sans w-full">
                            <div className="flex w-full items-center py-2 px-2">
                                <div className="mt-2 flex items-center gap-2">
                                    <a className="hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl" href={`/${movie?.itemType}/${movie?.itemId}`}>
                                        <div className="w-28 h-40 overflow-hidden rounded-br-xl rounded-bl-xl rounded-tr-xl">
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images" className="rounded-br-xl rounded-bl-xl rounded-tr-xl w-full h-full object-cover" onError={handleImageError} />
                                        </div>
                                    </a>
                                    <div>
                                        <p className="font-bold hover:opacity-50 line-clamp-2">{movieIndex}. {movie?.itemName}</p>
                                        <div className="flex flex-wrap gap-2">{movie?.itemReleaseDay?.slice(0, 4)} ||
                                            {movie?.itemGenre?.map((genre: any, index: any) => (
                                                <div key={index}>  {genreMapping[genre]}  {index < (movie?.itemGenre?.length - 1) ? "," : ''} </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="fa-solid fa-star text-yellow-300"></i>
                                            <p>{movie?.itemVoteAverage?.slice(0, 3)} ({shortenNumber(movie?.itemVoteCount)})</p>
                                        </div>
                                        <div className="line-clamp-4">
                                            <p>{movie?.itemReview}</p>
                                        </div>
                                        <div className="lg:line-clamp-none line-clamp-4">
                                            <p>Added to watchlist at {formatDate(movie?.createdTime)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto px-2" onClick={() => removeFromWatchList(movieIndex, movie?.itemId, movie?.itemName, movie?.mediaType, movie?.itemImg, movie?.itemReleaseDay, movie?.itemGenre, movie?.itemReview, movie?.itemPopularity, movie?.itemVoteAverage, movie?.itemVoteCount)}>
                                    <Tooltip title="Click here to remove from watchlist">
                                        {loading[movieIndex] ? (
                                            <i className="fa-solid fa-video-slash fa-spin-pulse py-2 px-3 bg-red-500 text-xl text-white"></i>
                                        ) : (
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
                    <section className=" w-1/2 lg:w-1/4 md:w-1/4 sm:w-1/3 px-2 py-2 " key={movieIndex}
                    >
                        <div className="text-black font-sans  shadow-sm shadow-black rounded-br-xl rounded-bl-xl rounded-tr-xl " >
                            <div className=" items-center ">
                                <div className="mt-2">
                                    <div className="items-center gap-2">
                                        <div className="relative w-full pb-[150%] hover:opacity-80">
                                            <a href={`/${movie?.mediaType}/${movie?.movieId}`}>
                                                <div>
                                                    <img src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images"
                                                        onError={handleImageError} className="absolute top-0 left-0 w-full h-full object-cover rounded-tr-xl" />
                                                </div>
                                            </a>
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
                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>
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

    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                    <div className="w-full bg-black text-white ">
                        <div className="flex items-center  ">
                            <h2 className="lg:text-2xl text-lg font-bold  capitalize"> {userInfoList[1]} Watchlist </h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm" >
                            <div>by</div>
                            <a target='_blank' href='https://github.com/watanuki469?tab=repositories' className='text-blue-500 hover:underline'>
                                {userInfoList[1]}-Editor
                            </a>
                            <div>•</div>
                            <div> {translations[language]?.createdModified}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black text-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center bg-white ">
                    <div className="grid grid-cols-12 gap-2 w-full">
                        <div className="lg:col-span-8 col-span-12  w-full ">
                            <div className="flex border-b-2 border-gray py-2 items-center px-2 ">
                                <div className="items-center ">
                                    <h2 className=" font-bold ">
                                        {
                                            favoriteList
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
                                                    if (!fromDate || !toDate) return true;
                                                    const releaseDate = new Date(movie?.itemReleaseDay);
                                                    const from = new Date(fromDate);
                                                    const to = new Date(toDate);
                                                    return (releaseDate >= from && releaseDate <= to)
                                                })
                                                .filter((movie: any) => {
                                                    if (fromRating !== '' && toRating !== '') {
                                                        return movie?.itemVoteAverage >= fromRating && movie?.itemVoteAverage <= toRating;
                                                    }
                                                    return true;
                                                })
                                                .filter((movie: any) => {
                                                    if (fromVotes !== '' && toVotes !== '') {
                                                        const from = new Number(fromVotes)
                                                        const to = new Number(toVotes)
                                                        return movie?.itemVoteCount >= from && movie?.itemVoteCount <= to;
                                                    }
                                                    return true;
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
                                                })?.length} Title</h2>
                                </div>
                                <div className=" items-center ml-auto gap-2 flex" >
                                    <p className="items-center text-gray-400 hidden lg:flex ">Sort by </p>
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
                                                bgcolor: anchorRankingEl ? 'blue' : 'white', color: anchorRankingEl ? 'white' : 'blue',
                                                ":hover": {
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
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.ranking}`)} disableRipple>{translations[language]?.ranking}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`IMDb ${translations[language]?.rating}`)} disableRipple>IMDb {translations[language]?.rating}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.releaseDay}`)} disableRipple>{translations[language]?.releaseDay}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.numberRating}`)} disableRipple>{translations[language]?.numberRating}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.alphabet}`)} disableRipple>{translations[language]?.alphabet}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.popularity}`)} disableRipple>{translations[language]?.popularity}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.runTime}`)} disableRipple>{translations[language]?.runTime}</MenuItem>
                                    </Menu>
                                    <div className="flex items-center ml-auto gap-4 px-2 py-2" >
                                        <Avatar sx={{
                                            width: 32, height: 32, bgcolor: 'white', color: 'black', padding: '20px', ":hover": { opacity: '50%' }
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
                                    <div
                                        onClick={() => setHandleRefine(!handleRefine)}
                                        className="bg-blue-500 rounded-3xl min-w-12 hover:opacity-80 px-2 py-1 text-center">
                                        <FilterListIcon />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                {handleRefine ? (
                                    <div className="fixed top-0 left-0 overflow-auto right-0 w-screen h-full bg-black text-white bg-opacity-50 flex text-center justify-center items-center z-50">
                                        <div className="text-white overflow-auto">
                                            <div className="w-full lg:max-w-xl h-92 relative overflow-auto bg-black">
                                                <div className="absolute right-4 text-right px-2 py-2">
                                                    <button onClick={() => setHandleRefine(false)} className="text-white hover:text-yellow-300 px-2 py-2 border-2 border-white h-12 w-12 rounded-full"
                                                    >
                                                        <i className="fa-solid fa-times text-xl"></i>
                                                    </button>
                                                </div>
                                                <div className="divide-y divide-gray-500 px-4 py-2 overflow-auto" style={{ maxHeight: '80vh' }}>
                                                    <div className="w-full text-left py-2">
                                                        <div className="py-2 text-yellow-300 font-semibold">TITLE TYPE</div>
                                                        <div className="flex gap-2 items-center flex-wrap">
                                                            <div onClick={() => toggleFeature("Movie")} className={`border-2 border-yellow-300 px-2 py-2 rounded-full hover:bg-yellow-400 ${movieCheck ? 'bg-yellow-300' : ''}`}
                                                            >
                                                                Movie ({favoriteList?.filter((movie: any) => movie?.itemType === 'Movie')?.length})
                                                            </div>
                                                            <div onClick={() => toggleFeature("TV")} className={`border-2 border-yellow-300 px-2 py-2 rounded-full hover:bg-yellow-400 ${seriesCheck ? 'bg-yellow-300' : ''}`}
                                                            >
                                                                TV ({favoriteList?.filter((movie: any) => movie?.itemType === 'TV')?.length})
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full text-left py-2">
                                                        <div className="py-2 text-yellow-300 font-semibold">GENRES</div>
                                                        <div className="flex flex-wrap gap-2 items-center">
                                                            {Object.entries(genreCount)?.map(([genre, count], index) => (
                                                                <div key={`genre-${genre}-${index}`} className={`flex flex-wrap items-center px-2 py-2 border-2 border-yellow-300 hover:bg-yellow-400 rounded-full ${selectedGenres.includes(genre as Genre) ? 'bg-yellow-300' : ''}`}
                                                                    onClick={() => handleGenreClick(genre as Genre)}
                                                                >
                                                                    {`${genre}`} ({`${count}`})
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="w-full text-left py-2">
                                                        <div className="w-full items-center">
                                                            <div className="py-2 text-yellow-300 font-semibold">RELEASE YEAR</div>
                                                            <div className="flex items-center gap-2 text-black">
                                                                <input id="startDate" name="startDate" className="border border-gray-300 px-2 py-1 w-full" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                                                                <p className="px-1 text-white">To</p>
                                                                <input id="endDate" name="endDate" className="border border-gray-300 px-2 py-1 w-full" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full text-left py-2">
                                                        <div className="w-full items-center">
                                                            <div className="py-2 text-yellow-300 font-semibold uppercase">IMDb Rating</div>
                                                            <div>User Rating</div>
                                                            <div className="flex items-center gap-2 text-black">
                                                                <input id="fromRating" name="fromRating" className="border border-gray-300 px-2 py-1 w-full" value={fromRating} onChange={(e) => setFromRating(e.target.value)} />
                                                                <p className="px-1 text-white">To</p>
                                                                <input id="toRating" name="toRating" className="border border-gray-300 px-2 py-1 w-full" value={toRating} onChange={(e) => setToRating(e.target.value)} />
                                                            </div>
                                                            <div className="py-1">Number Of Votes</div>
                                                            <div className="flex items-center gap-2 text-black">
                                                                <input id="fromVotes" name="fromVotes" className="border border-gray-300 px-2 py-1 w-full" value={fromVotes} onChange={(e) => setFromVotes(e.target.value)} />
                                                                <p className="px-1 text-white">To</p>
                                                                <input id="toVotes" name="toVotes" className="border border-gray-300 px-2 py-1 w-full" value={toVotes} onChange={(e) => setToVotes(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
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
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.ranking}`)} disableRipple>{translations[language]?.ranking}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`IMDb ${translations[language]?.rating}`)} disableRipple>IMDb {translations[language]?.rating}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.releaseDay}`)} disableRipple>{translations[language]?.releaseDay}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.numberRating}`)} disableRipple>{translations[language]?.numberRating}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.alphabet}`)} disableRipple>{translations[language]?.alphabet}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.popularity}`)} disableRipple>{translations[language]?.popularity}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.runTime}`)} disableRipple>{translations[language]?.runTime}</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <div>
                                <div className="lg:max-w-full w-full py-4 px-2 ">
                                    <div className={` ${currentView === 'Detail' ? 'divide-y divide-gray-500 px-2 border-2 border-gray-500' : ''}`} style={{ position: "relative", backgroundSize: "cover", backgroundPosition: "center", display: 'flex', flexWrap: 'wrap' }}>
                                        {favoriteList
                                            .filter((movie: any) => {
                                                if (selectedGenres?.length === 0) return true
                                                const hasAllGenres = selectedGenres.every((genre) =>
                                                    movie?.itemGenre?.some((mGenre: any) => genreMapping[mGenre] === genre)
                                                );
                                                return hasAllGenres;
                                            })
                                            .filter(() => {
                                                if (applyFilter === true) return true;
                                                return null
                                            })
                                            .filter((movie: any) => {
                                                // Lọc theo khoảng ngày phát hành
                                                if (!fromDate || !toDate) return true;
                                                const releaseDate = new Date(movie?.itemReleaseDay);
                                                const from = new Date(fromDate);
                                                const to = new Date(toDate);
                                                return (releaseDate >= from && releaseDate <= to)
                                            })
                                            .filter((movie: any) => {
                                                if (fromRating !== '' && toRating !== '') {
                                                    return movie?.itemVoteAverage >= fromRating && movie?.itemVoteAverage <= toRating;
                                                }
                                                return true;
                                            })
                                            .filter((movie: any) => {
                                                if (fromVotes !== '' && toVotes !== '') {
                                                    const from = new Number(fromVotes)
                                                    const to = new Number(toVotes)
                                                    return movie?.itemVoteCount >= from && movie?.itemVoteCount <= to;
                                                }
                                                return true;
                                            })
                                            .filter((movie: any) => {
                                                if (movieCheck) { return movie?.itemType == 'Movie'; }
                                                else if (seriesCheck) { return movie?.itemType == 'TV' }
                                                else { return true; }
                                            })

                                            .sort((a: any, b: any) => {
                                                const dateA = new Date(a?.itemReleaseDay).getTime();
                                                const dateB = new Date(b?.itemReleaseDay).getTime();
                                                if (menuItemNum === '5') {
                                                    // Sắp xếp theo thứ tự alphabet của title
                                                    const titleA = a?.itemName?.toUpperCase();
                                                    const titleB = b?.itemName?.toUpperCase();
                                                    if (titleA < titleB) { return -1; }
                                                    if (titleA > titleB) { return 1; }
                                                    return 0;
                                                }
                                                else if (menuItemNum === '1') {
                                                    return b?.itemVoteAverage - a?.itemVoteAverage;
                                                }
                                                else if (menuItemNum === '2') {
                                                    return a?.itemId - b?.itemId;
                                                }
                                                else if (menuItemNum === '3') {
                                                    return dateA - dateB;
                                                }
                                                else if (menuItemNum === '4') {
                                                    return a?.itemVoteAverage - b?.itemVoteAverage;

                                                }
                                                else if (menuItemNum === '7') {
                                                    return dateB - dateA;
                                                }
                                                else if (menuItemNum === '6') {
                                                    return b?.itemPopularity - a?.itemPopularity;
                                                }
                                                else {
                                                    const titleA = a?.createdTime; const titleB = b?.createdTime;
                                                    if (titleA < titleB) { return -1; }
                                                    if (titleA > titleB) { return 1; }
                                                    return 0;
                                                }
                                            })
                                            .map((m: any, index: any) => renderMovieItem(m, index, currentView))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12  h-full px-2 py-2 ">
                            <div>
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">  {translations[language]?.featuredToday}</h2>
                                </div>
                                <a href={`/top250Movie`}>
                                    <div className="lg:max-w-full w-full">
                                        <ListRow listRowList={topRatedMovies} />
                                    </div>
                                </a>

                                <p className="text-red w-full text-black">   {translations[language]?.staffPick}</p>
                                <p className="text-red w-full text-blue-500 hover:underline">   {translations[language]?.checkStatus}</p>
                            </div>
                            <div>
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black ">  {translations[language]?.chart}</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <Charts />
                                </div>
                            </div>
                            <div className='sticky top-0 right-0 left-0'>
                                <div className="flex items-center py-3">
                                    <h2 className="text-xl font-bold text-black capitalize"> {translations[language]?.moreExplore} {translations[language]?.genre}</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <TopRatedMovieByGenre />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <Footer />
                </div>
            </div>
        </div >
    );
}