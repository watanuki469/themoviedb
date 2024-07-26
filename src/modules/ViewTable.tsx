import AppsIcon from '@mui/icons-material/Apps';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Dialog, DialogContent, DialogTitle, Divider, Menu, MenuItem, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from '../pages/LanguageContext';
import { genreMapping } from '../redux/reducers/genre.reducer';
import { handleImageError, shortenNumber } from './BaseModule';
import Charts from './Charts';
import ListRow from './ListRow';
import RatingModule from './RatingModule';
import TopRatedMovieByGenre from './TopRatedMovieByGenre';

export interface ViewsProps {
    viewList: any,
    moreToExploreList: any,
    genreList: any,
    mediaType: any
}

export default function ViewTable({
    viewList,
    moreToExploreList,
    genreList,
    mediaType
}: ViewsProps) {
    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };

    const [currentView, setCurrentView] = useState('Detail'); // Default view is 'detail'

    const switchView = (view: any) => {
        setCurrentView(view);
    };

    type GenreID = number;
    type GenreName = string;

    type Genre = | ' ';
    const [genreCount, setGenreCount] = useState<Record<string, number>>({});
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

    function countGenres(viewList: any): Record<GenreName, number> {
        const genreCounting: Record<GenreName, number> = {};
        viewList?.forEach((movie: any) => {
            movie?.genre_ids?.forEach((id: GenreID) => {
                // Lấy tên thể loại từ đối tượng ánh xạ
                const genreName: GenreName = genreMapping(genreList)[id];
                // Nếu thể loại đã tồn tại, tăng giá trị đếm lên 1; ngược lại, tạo mới với giá trị 1.
                genreCounting[genreName] = (genreCounting[genreName] || 0) + 1;
            });
        });
        return genreCounting;
    }
    useEffect(() => {
        const genreCount = countGenres(viewList);
        setGenreCount(genreCount);
    }, [viewList, genreList]);

    const [openGenDialog, setOpenGenDialog] = useState(false);
    const handleDiaGenlogOpen = () => {
        setOpenGenDialog(true);
    };

    const handleDiaGenlogClose = () => {
        setOpenGenDialog(false);
    };
    const handleGenreClick = (selectedGenre: Genre) => {
        if (selectedGenres.includes(selectedGenre)) {
            // If already selected, remove it
            setSelectedGenres(selectedGenres.filter((genre) => genre !== selectedGenre));
        } else {
            // If not selected, add it
            setSelectedGenres([...selectedGenres, selectedGenre]);
        }
    };

    const handleRemoveGenreFilter = (removedGenre: any) => {
        setSelectedGenres(selectedGenres.filter((genre) => genre !== removedGenre));
    };
    const [userInfoList, setUserInfoList] = useState<any[]>([]);

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);

    const renderMovieItem = (movie: any, movieIndex: number, currentView: any) => {
        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 w-full" key={movieIndex}>
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <a href={`/${mediaType}/${movie?.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path ? movie?.poster_path : movie?.profile_path}`} alt="product images"
                                                onError={handleImageError} className="w-20 h-28 hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl" />
                                        </a>
                                        <div>
                                            {mediaType != 'person' ?
                                                (
                                                    <div>
                                                        <p className="font-bold hover:opacity-50 line-clamp-2 text-xl ">{movieIndex}. {movie?.title ? movie?.title : movie?.name}</p>
                                                        <p>{movie?.release_date ? movie?.release_date?.slice(0, 4) : movie?.first_air_date?.slice(0, 4)}</p>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <i className="fa-solid fa-star text-yellow-300"></i>
                                                                <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                            </div>
                                                            <div className="flex items-center gap-2  px-2 hover:text-black text-blue-500">
                                                                <div className="grow ml-auto py-2">
                                                                    <RatingModule mediaType={mediaType} ratingList={movie} userInfoList={userInfoList} starIndex={movieIndex} rateHidden={'false'}></RatingModule>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.name ? movie?.name : movie?.title}</p>
                                                        <div >
                                                            {movie?.known_for_department}
                                                        </div>
                                                        <a href={`/${movie?.known_for?.[0]?.media_type}/${movie?.known_for?.[0]?.id}`}>
                                                            <div className='flex items-center flex-wrap gap-2 text-blue-500 hover:underline'>
                                                                <p> {movie?.known_for?.[0]?.name ? movie?.known_for?.[0]?.name : movie?.known_for?.[0]?.title} ({movie?.known_for?.[0]?.first_air_date ? movie?.known_for?.[0]?.first_air_date : movie?.known_for?.[0]?.release_date})</p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-1 lg:line-clamp-none line-clamp-4">
                                        <p>{movie?.overview}</p>
                                    </div>
                                </div>

                                <div className="ml-auto" >
                                    <a href={`/${mediaType}/${movie?.id}`}>
                                        <i className="fa-solid fa-circle-info px-2 text-blue-500 text-xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div >
                    </section >
                )
            case 'Grid':
                return (
                    <section className="w-1/2 md:w-1/4 px-2 sm:w-1/3 lg:1/4 py-2" key={movieIndex}>
                        <div className="text-black font-sans  shadow-sm shadow-black rounded-br-xl rounded-bl-xl rounded-tr-xl" >
                            <div className=" items-center ">
                                <div className="mt-2">
                                    <div className="items-center gap-2 ">
                                        <div className="px-2"></div>
                                        <div className="relative w-full pb-[150%] hover:opacity-80">
                                            <a href={`/${mediaType}/${movie?.id}`}>
                                                <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path ? movie?.poster_path : movie?.profile_path}`} alt="product images"
                                                    onError={handleImageError} className="absolute top-0 left-0 w-full h-full object-cover rounded-tr-xl" />
                                            </a>
                                        </div>
                                        <div className="">
                                            {mediaType != 'person' ? (
                                                <div>
                                                    <div className="justify-start text-left px-2 py-2">
                                                        <div className="flex items-center gap-2">
                                                            <i className="fa-solid fa-star text-yellow-300"></i>
                                                            <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                        </div>
                                                        <div className="flex items-center gap-2 hover:bg-gray-300 hover:text-black text-blue-500 ">
                                                            <div className="grow ml-auto py-2" >
                                                                <RatingModule mediaType={mediaType} ratingList={movie} userInfoList={userInfoList} starIndex={movieIndex} rateHidden={'false'}></RatingModule>
                                                            </div>
                                                        </div>
                                                        <div className="h-12 w-full ">
                                                            <p className="font-bold hover:opacity-50 line-clamp-2">{movieIndex}.{movie?.title ? movie?.title : movie?.name}</p>
                                                        </div>
                                                        <div className="flex flex-wrap">
                                                            {movie?.release_date ? movie?.release_date?.slice(0, 4) : movie?.first_air_date?.slice(0, 4)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>

                                                    <div className="px-2 py-2 w-full">
                                                        <div className="flex flex-wrap items-center gap-2 justify-start text-left">
                                                            <div className="h-12 w-full"
                                                            >
                                                                <p className="hover:opacity-50 line-clamp-2">{movieIndex}.  {movie?.name ? movie?.name : movie?.title}</p>
                                                            </div>
                                                            <a className='text-blue-500' href={`/${movie?.known_for?.[0]?.media_type}/${movie?.known_for?.[0]?.id}`}>
                                                                <p className='h-12 hover:underline line-clamp-2'> {movie?.known_for?.[0]?.name ? movie?.known_for?.[0]?.name : movie?.known_for?.[0]?.title} ({movie?.known_for?.[0]?.first_air_date ? movie?.known_for?.[0]?.first_air_date : movie?.known_for?.[0]?.release_date})</p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div >
                                </div >

                                <div className="px-2 py-2">
                                    <a href={`/${mediaType}/${movie?.id}`}>
                                        <button className="px-2 py-1 bg-gray-200 hover:bg-blue-300 text-blue-500 w-full rounded-xl font-medium text-center items-center">
                                            {translations[language]?.details}
                                        </button>
                                    </a>
                                </div>
                            </div >

                        </div >
                    </section >

                )
            case 'Compact':
                return (
                    <section className="px-2  w-full " key={movieIndex}
                    >
                        <div className="text-black font-sans w-full" >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <a href={`/${mediaType}/${movie?.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path ? movie?.poster_path : movie?.profile_path}`} alt="product images"
                                                onError={handleImageError} className="w-20 h-28 hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl" />
                                        </a>

                                        <div>
                                            {mediaType != 'person' ?
                                                (
                                                    <div>
                                                        <p className="font-bold hover:opacity-50 line-clamp-2 text-xl ">{movieIndex}. {movie?.title ? movie?.title : movie?.name}</p>
                                                        <p>{movie?.release_date ? movie?.release_date?.slice(0, 4) : movie?.first_air_date?.slice(0, 4)}</p>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <i className="fa-solid fa-star text-yellow-300"></i>
                                                                <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                            </div>
                                                            <div className="flex items-center gap-2  px-2 hover:text-black text-blue-500">
                                                                <div className="grow ml-auto py-2">
                                                                    <RatingModule mediaType={mediaType} ratingList={movie} userInfoList={userInfoList} starIndex={movieIndex} rateHidden={'false'}></RatingModule>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.name ? movie?.name : movie?.title}</p>
                                                        <div >
                                                            {movie?.known_for_department}
                                                        </div>
                                                        <a href={`/${movie?.known_for?.[0]?.media_type}/${movie?.known_for?.[0]?.id}`}>
                                                            <div className='flex items-center flex-wrap gap-2 text-blue-500 hover:underline'>
                                                                <p> {movie?.known_for?.[0]?.name ? movie?.known_for?.[0]?.name : movie?.known_for?.[0]?.title} ({movie?.known_for?.[0]?.first_air_date ? movie?.known_for?.[0]?.first_air_date : movie?.known_for?.[0]?.release_date})</p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-auto">
                                    <a href={`/${mediaType}/${movie?.id}`}>
                                        <i className="fa-solid fa-circle-info px-2 text-blue-500 text-xl"></i>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </section>
                )
        }
    }
    const [applyFilter, setApplyFilter] = useState(true);
    const [filterType, setFilterType] = useState('none');

    const [selectedOption, setSelectedOption] = useState<string | null>('none');

    const handleOptionClick = (option: any) => {
        setApplyFilter(option === 'none' ? (true) : (false));
        setFilterType(option);
        setSelectedOption(option === selectedOption ? null : option);
    };
    const handleRankingClose = () => {
        setAnchorRankingEl(null);
    };
    const [selectedRankingOption, setSelectedRankingOption] = useState(null);

    const [menuItemNum, setMenuItemNum] = useState('');

    function compareReleaseDates(a: any, b: any) {
        const releaseDateA = new Date(a?.release_date ? a?.release_date : a?.first_air_date);
        const releaseDateB = new Date(b?.release_date ? b?.release_date : b?.first_air_date);
        return releaseDateA.getTime() - releaseDateB.getTime();
    }
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

    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    return (
        <div className='cursor-pointer'>
            <Dialog open={openGenDialog} onClose={handleDiaGenlogClose} maxWidth={'sm'}
                keepMounted={true}
                PaperProps={{ style: { background: 'black', color: 'white' }, }}
            >
                <DialogTitle sx={{ color: 'yellow', textTransform: 'uppercase', fontWeight: 'bold' }}>{translations[language]?.genre} && {translations[language]?.count}</DialogTitle>
                <DialogContent>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(genreCount).map(([genre, count], index) => (
                            <button key={`genre-${genre}-${index}`}
                                className={`uppercase text-sm rounded-full px-2 py-2 border-2 border-white ${selectedGenres.includes(genre as Genre) ? 'bg-yellow-300 hover:bg-yellow-400' : 'hover:bg-gray-500 hover:opacity-90'}`}
                                onClick={() => handleGenreClick(genre as Genre)}
                            >
                                <p>{`${genre}: (${count})`}</p>
                            </button>
                        ))}

                    </div>
                    <Divider sx={{ marginTop: '20px', width: '100%', maxWidth: '1100px', borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper', }} />
                </DialogContent>
                <DialogTitle sx={{ color: 'yellow', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '-20px' }}>{translations[language]?.inTheater}</DialogTitle>
                <DialogContent>
                    <div className="flex gap-4 flex-wrap items-center ">
                        <div onClick={() => handleOptionClick('none')} className="flex gap-2 items-center">
                            <i className={`fa-regular ${selectedOption === 'none' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                            <p>{translations[language]?.none}</p>
                        </div>
                        <div onClick={() => handleOptionClick('near')} className="flex gap-2 items-center">
                            <i className={`fa-regular ${selectedOption === 'near' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                            <p>{translations[language]?.inTheaterNearYou}</p>
                        </div>
                        <div onClick={() => handleOptionClick('online')} className="flex gap-2 items-center">
                            <i className={`fa-regular ${selectedOption === 'online' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                            <p>{translations[language]?.inTheaterWithOnlineTicked}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="grid grid-cols-12 gap-2 w-full">
                <div className="lg:col-span-8 col-span-12  w-full ">
                    <div className="flex ">
                        <h2 className="lg:text-2xl text-lg text-black capitalize ">
                            {viewList
                                .filter((movie: any) => {
                                    if (selectedGenres?.length === 0) return true; // No genre filter
                                    const hasAllGenres = selectedGenres.every((genre: any) =>
                                        movie?.genre_ids?.some((mGenre: any) => genreMapping(genreList)[mGenre] === genre)
                                    );
                                    return hasAllGenres;
                                })
                                .filter((movie: any) => {
                                    if (!applyFilter) return true; // No filter
                                    if (filterType === 'none') return true; // No filter
                                    if (filterType === 'inTheaters') { return null; }
                                    if (filterType === 'In theaters with online ticketing') { return null; }
                                    return true;
                                })
                                .map((m: any, index: any) => renderMovieItem(m, index, currentView))?.length}
                            /{viewList?.length} {mediaType}</h2>

                        <div className="flex items-center ml-auto gap-4 " >
                            <Tooltip title="Detail View" className={`${currentView === "Detail" ? "text-blue-500" : ""}`}><i className="fa-solid fa-list-ul " onClick={() => switchView('Detail')}></i></Tooltip>
                            <Tooltip title="Grid View" className={`${currentView === "Grid" ? "text-blue-500" : ""}`}><AppsIcon onClick={() => switchView('Grid')} /></Tooltip>
                            <Tooltip title="Compact View" className={`${currentView === "Compact" ? "text-blue-500" : ""}`}><MenuIcon onClick={() => switchView('Compact')} /></Tooltip>
                        </div>
                    </div>
                    {/* filter icon */}
                    <div className=" flex w-full items-center gap-2">
                        <div>
                            {mediaType != 'person' ? (
                                <div className=" flex flex-wrap items-center gap-2">
                                    <button className="hover:opacity-80 bg-blue-500 px-2 py-1 rounded-full min-w-14"
                                        onClick={handleDiaGenlogOpen}>
                                        <FilterListIcon />
                                    </button>

                                    {selectedGenres?.map((genre, index) => (
                                        <div key={index} className="flex items-center gap-2 border-2 border-black px-2 py-2 rounded-xl hover:bg-gray-300">
                                            <p className="">
                                                {genre}
                                            </p>
                                            <i className="fa-solid fa-xmark text-xl" onClick={() => handleRemoveGenreFilter(genre)}></i>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>

                        <div className="mr-auto flex items-center gap-2 py-2 w-full justify-end">
                            <p className="text-gray-500 capitalize">{translations[language]?.sortBy}</p>
                            <Button
                                id="demo-customized-button"
                                aria-controls={anchorRankingEl ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                variant="contained"
                                disableElevation
                                onClick={handleRankingClick}
                                endIcon={<i className="fa-solid fa-caret-down"></i>}
                                sx={{
                                    bgcolor: anchorRankingEl ? 'blue' : 'white', color: anchorRankingEl ? 'white' : 'blue', ":hover": { backgroundColor: 'blue', color: 'white' },
                                }}
                            >
                                {selectedRankingOption ? selectedRankingOption : `${translations[language]?.options}`}
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
                    <div className="lg:max-w-full w-full">
                        <div className={`${currentView === 'Detail' || currentView === 'Compact' ? 'border-2 border-gray-500 divide-y divide-gray-500' : ''}  px-2`}
                            style={{
                                position: "relative", backgroundSize: "cover", backgroundPosition: "center", display: 'flex', flexWrap: 'wrap'
                            }}>
                            {viewList
                                .filter((movie: any) => {
                                    if (selectedGenres?.length === 0) return true; // No genre filter
                                    // Check if every selected genre is present in the movie's genres
                                    const hasAllGenres = selectedGenres?.every((genre: any) =>
                                        movie?.genre_ids?.some((mGenre: any) => genreMapping(genreList)[mGenre] === genre)
                                    );
                                    return hasAllGenres;
                                })
                                .filter(() => {
                                    if (applyFilter === true) return true; // No filter
                                    return null
                                })
                                .sort((a: any, b: any) => {
                                    if (menuItemNum === '5') {
                                        // Sắp xếp theo thứ tự alphabet của title
                                        const titleA = a?.title ? a?.title : a?.name?.toUpperCase();
                                        const titleB = b?.title ? b?.title : b?.name.toUpperCase();
                                        if (titleA < titleB) {
                                            return -1;
                                        }
                                        if (titleA > titleB) {
                                            return 1;
                                        }
                                        return 0;
                                    }
                                    else if (menuItemNum === '1') {
                                        return b?.vote_average - a?.vote_average;
                                    }
                                    else if (menuItemNum === '2') {
                                        return a?.id - b?.id;
                                    }
                                    else if (menuItemNum === '3') {
                                        return compareReleaseDates(a, b);

                                    }
                                    else if (menuItemNum === '4') {
                                        return b?.vote_count - a?.vote_count;

                                    }
                                    else if (menuItemNum === '7') {
                                        return compareReleaseDates(b, a);
                                    }
                                    else if (menuItemNum === '6') {
                                        return b?.popularity - a?.popularity;
                                    }
                                    else {
                                        return 0
                                    }
                                })
                                .map((m: any, index: any) => renderMovieItem(m, index, currentView))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 col-span-12  h-full px-2 py-2 ">
                    <div className=''>
                        <div className="flex items-center">
                            <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                            <h2 className="text-2xl font-bold text-black ">  {translations[language]?.featuredToday}</h2>
                        </div>
                        <a href={`/top250Movie`}>
                            <div className="lg:max-w-full w-full py-2">
                                <ListRow listRowList={moreToExploreList} />
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
        </div >

    );
}
