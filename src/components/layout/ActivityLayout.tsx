import AppsIcon from '@mui/icons-material/Apps';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Avatar, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { formatDate, handleImageError } from "../../modules/BaseModule";
import Charts from "../../modules/Charts";
import ListRow from "../../modules/ListRow";
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGetRecentlyView, fetchRemoveRecentlyView } from "../../redux/reducers/login.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";

export function ActivityLayout() {
    const [handleRefine, setHandleRefine] = useState(false);
    const [currentView, setCurrentView] = useState('Grid');
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const dispatch = useAppDispatch()
    const recentList = useAppSelector((state) => state.login.listRecentlyView);
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];
        if (storedDataString) { storedData = JSON.parse(storedDataString) }
        setUserInfoList(Object.values(storedData));
    }, []);
    useEffect(() => {
        if (userInfoList?.length > 0) {
            dispatch(fetchGetRecentlyView(userInfoList[0]))
            dispatch(fetchMovies());
        }
    }, [userInfoList]);

    const handleRecentlyViewList = async (index: number, movieId: any, movieType: any, removeAll: any) => {
        setLoading((prevLoading) => ({ ...prevLoading, [index]: true }));
        await dispatch(fetchRemoveRecentlyView(userInfoList[0], movieId, movieType, removeAll));
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };

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
            case `${translations[language]?.releaseDay}`: menuItemNum = '1'; break;
            case `${translations[language]?.alphabet}`: menuItemNum = '2'; break;
            case `${translations[language]?.runTime}`: menuItemNum = '3'; break;
            default: break;
        }
        setMenuItemNum(menuItemNum);
        handleRankingClose();
    };

    const switchView = (view: any) => {
        setCurrentView(view);
    };
    const [selectedGenres, setSelectedGenres] = useState<any[]>([]);

    const characterCount = recentList?.reduce((acc: any, movie: any) => {
        if (movie?.itemType) {
            acc[movie?.itemType] = (acc[movie?.itemType] || 0) + 1;
        }
        return acc;
    }, {});
    const handleGenreClick = (selectedGenre: any) => {
        if (selectedGenres?.includes(selectedGenre)) {
            // If already selected, remove it
            setSelectedGenres(selectedGenres?.filter((genre) => genre !== selectedGenre));
        } else {
            // If not selected, add it
            setSelectedGenres([...selectedGenres, selectedGenre]);
        }
    };

    const renderMovieItem = (movie: any, movieIndex: number, currentView: any) => {
        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 w-full" key={movieIndex}>
                        <div className="text-black font-sans w-full">
                            <div className="flex w-full items-center py-2 px-2">
                                <div className="mt-2 flex items-center gap-2">
                                    <a className="hover:opacity-80" href={`/${movie?.itemType}/${movie?.itemId}`}>
                                        <div className="w-28 h-40 overflow-hidden rounded-br-xl rounded-bl-xl rounded-tr-xl">
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images" className="rounded-br-xl rounded-bl-xl rounded-tr-xl w-full h-full object-cover" onError={handleImageError} />
                                        </div>
                                    </a>
                                    <div>
                                        <p className="font-bold hover:opacity-50 line-clamp-2">{movieIndex}. {movie?.itemName}</p>
                                        <div className="flex flex-wrap gap-2">{movie?.itemReleaseDay?.slice(0, 4)}
                                        </div>
                                        <div>{movie?.itemKnowFor}</div>
                                        <div className="line-clamp-4">
                                            <p>{movie?.itemReview}</p>
                                        </div>
                                        <div className="lg:line-clamp-none line-clamp-4">
                                            <p>Added to list at {formatDate(movie?.createdTime)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto px-2"
                                    onClick={() => handleRecentlyViewList(movieIndex, movie?.itemId, movie?.itemType, 'none')}
                                >
                                    <Tooltip title="Click here to remove from list">
                                        {loading[movieIndex] ? (
                                            <i className="fa-solid fa-bell-slash fa-spin-pulse py-2 px-3 bg-red-500 text-xl text-white"></i>
                                        ) : (
                                            <i className="fa-solid fa-bell-slash px-2 text-white text-xl bg-red-500 rounded-lg py-2"></i>
                                        )}
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            case 'Grid':
                return (
                    <section className=" w-1/2 lg:w-1/4 md:w-1/4 sm:w-1/3 px-2 py-2 " key={movieIndex}>
                        <div className="text-black font-sans  shadow-sm shadow-black rounded-br-xl rounded-bl-xl rounded-tr-xl " >
                            <div className=" items-center ">
                                <div className="mt-2">
                                    <div className="items-center gap-2">
                                        <div className="relative w-full pb-[150%] hover:opacity-80">
                                            <a className="hover:opacity-80" href={`/${movie?.itemType}/${movie?.itemId}`}>
                                                <img src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`}
                                                    onError={handleImageError} className="absolute top-0 left-0 w-full h-full object-cover rounded-tr-xl" />
                                            </a>
                                        </div>
                                        <div className="px-2 py-2 w-full">
                                            <div className="flex flex-wrap items-center gap-2 justify-start text-left">
                                                <div>
                                                    {movie?.itemKnowFor}
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

                                <div className="px-2 py-2"
                                    onClick={() => handleRecentlyViewList(movieIndex, movie?.itemId, movie?.itemType, 'none')}
                                >
                                    <button className="px-2 py-1 bg-gray-300 hover:bg-blue-300 text-blue-500 w-full rounded-md font-medium text-center items-center">
                                        {loading[movieIndex] ? (
                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>
                                        ) :
                                            (<div>   Remove</div>)}
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
                            <h2 className="lg:text-2xl text-lg font-bold  capitalize"> {userInfoList[1]} Activity List </h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm py-2" >
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
                                            recentList?.filter((movie: any) => {
                                                if (selectedGenres?.length === 0) return true;
                                                const hasAllGenres = selectedGenres?.every((genre: any) =>
                                                    movie?.itemType === genre
                                                );
                                                return hasAllGenres
                                            })?.length} Title</h2>
                                </div>
                                <div className=" items-center ml-auto gap-2 flex" >
                                    <p className="items-center text-gray-400 hidden lg:flex ">Sort by </p>
                                    <div className='hidden lg:block'>
                                        <Button
                                            id="demo-customized-button"
                                            aria-controls={anchorRankingEl ? 'demo-customized-menu' : undefined}
                                            aria-haspopup="true" variant="contained"
                                            disableElevation onClick={handleRankingClick}
                                            endIcon={<i className="fa-solid fa-caret-down"></i>}
                                            sx={{ bgcolor: anchorRankingEl ? 'blue' : 'white', color: anchorRankingEl ? 'white' : 'blue', ":hover": { backgroundColor: 'blue', color: 'white' }, }}
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
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.releaseDay}`)} disableRipple>{translations[language]?.releaseDay}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.alphabet}`)} disableRipple>{translations[language]?.alphabet}</MenuItem>
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
                                    <div onClick={() => setHandleRefine(!handleRefine)} className="bg-blue-500 rounded-3xl min-w-12 hover:opacity-80 px-2 py-1 text-center">
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
                                                    <button onClick={() => setHandleRefine(false)} className="text-white hover:text-yellow-300 px-2 py-2 border-2 border-white h-12 w-12 rounded-full">
                                                        <i className="fa-solid fa-times text-xl"></i>
                                                    </button>
                                                </div>
                                                <div className="divide-y divide-gray-500 px-4 py-2 overflow-auto" style={{ maxHeight: '80vh' }}>
                                                    <div className="w-full text-left py-2">
                                                        <div className="py-2 text-yellow-300 font-semibold mt-2">TITLE TYPE</div>
                                                        <div className="flex gap-2 items-center flex-wrap">
                                                            {Object.entries(characterCount)?.map(([genre, count], index) => (
                                                                <button key={`genre-${genre}-${index}`} className={`uppercase text-sm rounded-full px-2 py-1 border-2 border-white ${selectedGenres?.includes(genre) ? 'bg-yellow-300 hover:bg-yellow-400' : 'hover:bg-gray-500 hover:opacity-90'}`} onClick={() => handleGenreClick(genre)}>
                                                                    <p>{`${genre}: (${count})`}</p>
                                                                </button>
                                                            ))}
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
                                            bgcolor: anchorRankingEl ? 'blue' : 'white', color: anchorRankingEl ? 'white' : 'blue', border: anchorRankingEl ? '2px dashed' : '',
                                            ":hover": { backgroundColor: 'blue', color: 'white' },
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
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.releaseDay}`)} disableRipple>{translations[language]?.releaseDay}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.alphabet}`)} disableRipple>{translations[language]?.alphabet}</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.runTime}`)} disableRipple>{translations[language]?.runTime}</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <div>
                                <div className="lg:max-w-full w-full py-4 px-2 ">
                                    <div className={` ${currentView === 'Detail' ? 'divide-y divide-gray-500 px-2 border-2 border-gray-500' : ''}`} style={{ position: "relative", backgroundSize: "cover", backgroundPosition: "center", display: 'flex', flexWrap: 'wrap' }}>
                                        {recentList?.filter((movie: any) => {
                                            if (selectedGenres?.length === 0) return true;
                                            const hasAllGenres = selectedGenres?.every((genre: any) =>
                                                movie?.itemType === genre
                                            );
                                            return hasAllGenres
                                        })
                                            ?.sort((a: any, b: any) => {
                                                const dateA = new Date(a?.createdTime).getTime();
                                                const dateB = new Date(b?.createdTime).getTime();
                                                if (menuItemNum === '2') {
                                                    // Sắp xếp theo thứ tự alphabet của title
                                                    const titleA = a?.itemName?.toUpperCase();
                                                    const titleB = b?.itemName?.toUpperCase();
                                                    if (titleA < titleB) { return -1; }
                                                    if (titleA > titleB) { return 1; }
                                                    return 0;
                                                }
                                                else if (menuItemNum === '1') {
                                                    return dateA - dateB;
                                                }
                                                else if (menuItemNum === '3') {
                                                    return dateB - dateA;
                                                }
                                                else {
                                                    const titleA = a?.createdTime; const titleB = b?.createdTime;
                                                    if (titleA < titleB) { return -1; }
                                                    if (titleA > titleB) { return 1; }
                                                    return 0;
                                                }
                                            })
                                            ?.map((m: any, index: any) => renderMovieItem(m, index, currentView))}
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