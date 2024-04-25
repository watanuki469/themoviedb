import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Button, Menu, MenuItem, Rating, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListSearch } from "../../redux/reducers/search.reducer";
import { AppDispatch } from "../../redux/store";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { ListMoviesPopular } from "../models/ListMoviesPopular";

export default function AdvancedSearchLayout() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const [mediatype, setMediaType] = useState('movie');
    const topRatedMovies = useAppSelector((state) => state.search.listSearch)
    console.log(topRatedMovies);

    const [searchParams, setSearchParams] = useSearchParams()
    const genreParam = searchParams.get("genre");
    const [query, setQuery] = useState('');
    useEffect(() => {
        const titleParam = searchParams.get("title");
        if (titleParam) {
            setQuery(titleParam);
        }
    }, []);

    const fetchSearch = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiSearch.search(mediatype, query),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListSearch(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
        if (query.trim().length === 0) {
        }
        else {
            dispatch(fetchSearch());
        }
    }, [mediatype, query]);



    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };

    const [currentView, setCurrentView] = useState('Detail'); // Default view is 'detail'

    const switchView = (view: any) => {
        setCurrentView(view);
    };
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    type GenreID = number;
    type GenreName = string;
    const genreMapping: Record<GenreID, GenreName> = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
    };
    type Genre = | ' ';

    const initialSelectedGenres: Genre[] = genreParam ? [genreParam as Genre] : [];
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>(initialSelectedGenres);

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };

    const handleGenreClick = (selectedGenre: Genre) => {
        if (selectedGenres.includes(selectedGenre)) {
            // If already selected, remove it
            setSelectedGenres(selectedGenres.filter((genre) => genre !== selectedGenre));
            setSearchParams('')

        } else {
            // If not selected, add it
            setSelectedGenres([...selectedGenres, selectedGenre]);
            setSearchParams('genre=' + selectedGenre)
        }
    };

    const handleRemoveGenreFilter = (removedGenre: any) => {
        setSelectedGenres(selectedGenres.filter((genre) => genre !== removedGenre));
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
    const [isRating, setIsRating] = useState(false);

    const [selectedStudent, setSelectedStudent] = useState<ListMoviesPopular|any>();
    const handleClick = (index: any) => {
        setIsRating(true)
        setSelectedStudent(index);
    };
    const [value, setValue] = useState<number | null>(0);
    const handleClose = () => {
        setIsRating(false)
        setValue(0)
    };

    const renderMovieItem = (movie: any, movieIndex: number, currentView: any, sortOrder: any) => {
        // Implement rendering logic based on the currentView (detail, grid, compact)
        if (movieIndex >= 50) {
            return null;
        }

        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 border-t border-r border-l border-gray-500  w-full" key={movieIndex}
                    >
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
                                            <p className="text-2xl ">{selectedStudent?.title?selectedStudent?.title:selectedStudent?.name}</p>
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
                                                <button className={`px-2 py-2 justify-center mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`} onClick={() => handleClose()}>
                                                    Rate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <img onClick={() => navigate(`/${mediatype !== 'person' ? (mediatype === 'tv' ? 'tv' : 'movie') : 'person'}/${movie.id}`)}
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path ? movie?.poster_path : movie?.profile_path}`} alt="product images"
                                            onError={handleImageError} className="w-20 h-28 hover:opacity-80" />
                                        <div className="w-full ">
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.title ? movie?.title : movie?.name}</p>
                                            {
                                                mediatype != 'person' ? (
                                                    <div>
                                                        <p>{movie?.release_date?.slice(0, 4)}</p>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <i className="fa-solid fa-star text-yellow-300"></i>
                                                                <p>{movie?.vote_average} ({shortenNumber(movie?.vote_count)})</p>
                                                            </div>
                                                            <button className="flex items-center gap-2 hover:bg-gray-300 px-2 py-2 hover:text-black text-blue-500" onClick={() => handleClick(movie)}>
                                                                <i className="fa-regular fa-star "></i>
                                                                <p>Rate</p>
                                                            </button>

                                                        </div>
                                                    </div>

                                                ) : (
                                                    <div className="h-16">
                                                        <p className="text-gray-500 "> {movie?.known_for_department}</p>
                                                        <div className="w-full " >
                                                            <p className="line-clamp-2 h-12">
                                                                {movie?.known_for && movie?.known_for.length > 0 ? movie?.known_for[0]?.title : ''}
                                                            </p>                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>

                                    <div className="mt-1 lg:line-clamp-none line-clamp-4">
                                        <p>{movie?.overview}</p>
                                    </div>
                                </div>

                                <div className="ml-auto" onClick={() => navigate(`/${mediatype !== 'person' ? (mediatype === 'tv' ? 'tv' : 'movie') : 'person'}/${movie.id}`)} >
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
                                            <p className="text-2xl ">{selectedStudent?.title?selectedStudent?.title:selectedStudent?.name}</p>
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
                                                <button className={`px-2 py-2 justify-center mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`} onClick={() => handleClose()}>
                                                    Rate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="text-black font-sans  shadow-sm shadow-black  " >
                            <div className=" items-center ">
                                <div className="mt-2">
                                    <div className="items-center gap-2">
                                        <div className="px-2">{movieIndex}</div>
                                        <img onClick={() => navigate(`/${mediatype !== 'person' ? (mediatype === 'tv' ? 'tv' : 'movie') : 'person'}/${movie.id}`)}
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path ? movie?.poster_path : movie?.profile_path}`} alt="product images"
                                            onError={handleImageError} className="w-full h-52  hover:opacity-80" />
                                        <div className="px-2 py-2 w-full">
                                            {
                                                mediatype != 'person' ? (
                                                    <div>
                                                        <div className="items-center gap-2 justify-start text-left">
                                                            <div className="flex items-center gap-2">
                                                                <i className="fa-solid fa-star text-yellow-300"></i>
                                                                <p>{movie?.vote_average} ({shortenNumber(movie?.vote_count)})</p>
                                                            </div>
                                                            <button className="flex items-center gap-2 hover:bg-gray-300 hover:text-black text-blue-500 " onClick={() => handleClick(movie)}>
                                                                <i className="fa-regular fa-star "></i>
                                                                <p>Rate</p>
                                                            </button>
                                                            <div className="h-12 w-full ">
                                                                <p className="font-bold hover:opacity-50 line-clamp-2"> {movie?.title ? movie?.title : movie?.name}</p>
                                                            </div>
                                                            <div className="flex flex-wrap">
                                                                {movie?.release_date?.slice(0, 4)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="">
                                                        <div className="h-12 w-full ">
                                                            <p className="font-bold hover:opacity-50 line-clamp-2"> {movie?.title ? movie?.title : movie?.name}</p>
                                                        </div>
                                                        <p className="text-gray-500 "> {movie?.known_for_department}</p>
                                                        <div className="w-full " >
                                                            <p className="line-clamp-2 h-12">
                                                                {movie?.known_for && movie?.known_for.length > 0 ? movie?.known_for[0]?.title : ''}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="px-2 py-2" onClick={() => navigate(`/${mediatype !== 'person' ? (mediatype === 'tv' ? 'tv' : 'movie') : 'person'}/${movie?.id}`)}   >
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
                                            <p className="text-2xl ">{selectedStudent?.title?selectedStudent?.title:selectedStudent?.name}</p>
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
                                                <button className={`px-2 py-2 justify-center mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`} onClick={() => handleClose()}>
                                                    Rate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <img onClick={() => navigate(`/${mediatype !== 'person' ? (mediatype === 'tv' ? 'tv' : 'movie') : 'person'}/${movie.id}`)}
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path ? movie?.poster_path : movie?.profile_path}`} alt="product images"
                                            onError={handleImageError} className="w-20 h-28 hover:opacity-80" />
                                        <div className="w-full ">
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.title ? movie?.title : movie?.name}</p>
                                            {
                                                mediatype != 'person' ? (
                                                    <div>
                                                        <p>{movie?.release_date?.slice(0, 4)}</p>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <i className="fa-solid fa-star text-yellow-300"></i>
                                                                <p>{movie?.vote_average} ({shortenNumber(movie?.vote_count)})</p>
                                                            </div>
                                                            <button className="flex items-center gap-2 hover:bg-gray-300 px-2 py-2 hover:text-black text-blue-500" onClick={() => handleClick(movie)}>
                                                                <i className="fa-regular fa-star "></i>
                                                                <p>Rate</p>
                                                            </button>

                                                        </div>
                                                    </div>

                                                ) : (
                                                    <div className="h-16">
                                                        <p className="text-gray-500 "> {movie?.known_for_department}</p>
                                                        <div className="w-full " >
                                                            <p className="line-clamp-2 h-12">
                                                                {movie?.known_for && movie?.known_for.length > 0 ? movie?.known_for[0]?.title : ''}
                                                            </p>                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto" onClick={() => navigate(`/${mediatype !== 'person' ? (mediatype === 'tv' ? 'tv' : 'movie') : 'person'}/${movie?.id}`)}>
                                    <i className="fa-solid fa-circle-info px-2 text-blue-500 text-xl"></i>
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

    const [menuItemNum, setMenuItemNum] = useState(''); // Default view is 'detail'

    function compareReleaseDates(a: any, b: any) {
        const releaseDateA = new Date(a.release_date);
        const releaseDateB = new Date(b.release_date);
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

    const [expanded, setExpanded] = useState(false);
    const [changeExpand, setChangeExpanded] = useState(false);
    const [titleExpanded, setTitleExpanded] = useState(false);
    const [releaseExpanded, setRleaseExpanded] = useState(false);
    const [imdbExpanded, setImdbExpanded] = useState(false);
    const [votesExpanded, setVotesExpanded] = useState(false);
    const [genreExpanded, setGenreExpanded] = useState(false);
    const [theaterExpanded, setTheaterExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(true);
        setTitleExpanded(true)
        setRleaseExpanded(true)
        setImdbExpanded(true)
        setVotesExpanded(true)
        setGenreExpanded(true)
        setTheaterExpanded(true)
    };
    const toggleSwapExpand = () => {
        setExpanded(false);
        setTitleExpanded(false)
        setRleaseExpanded(false)
        setImdbExpanded(false)
        setVotesExpanded(false)
        setGenreExpanded(false)
        setTheaterExpanded(false)
    };
    const handleClickExpand = () => {
        if (changeExpand) {
            toggleExpand()
            setChangeExpanded(!changeExpand)
        }
        else {
            toggleSwapExpand()
            setChangeExpanded(!changeExpand)
        }
    };
    const toggleTitleExpand = () => {
        setTitleExpanded(!titleExpanded);
    };
    const toggleImdbExpand = () => {
        setImdbExpanded(!imdbExpanded);
    };
    const toggleRleaseExpand = () => {
        setRleaseExpanded(!releaseExpanded);
    };
    const toggleVotesExpand = () => {
        setVotesExpanded(!votesExpanded);
    };
    const toggleGenreExpand = () => {
        setGenreExpanded(!genreExpanded);
    };
    const toggleTheaterExpand = () => {
        setTheaterExpanded(!theaterExpanded);
    };

    const onQueryChange = (e: any) => {
        const newQuery = e.target.value;
        // setOpen(!!newQuery);
        setQuery(newQuery);
    };

    // Định nghĩa state cho fromDate và toDate
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    // Hàm xử lý sự kiện khi người dùng thay đổi ngày "From"
    const handleFromDateChange = (event: any) => {
        if (!query) {
            // Hiển thị thông báo yêu cầu nhập ô input trước
            // Ví dụ sử dụng thư viện toastify
            toast.error("Please enter the title field first.");
            return; // Dừng xử lý tiếp theo
        }
        setFromDate(event.target.value);
    };

    // Hàm xử lý sự kiện khi người dùng thay đổi ngày "To"
    const handleToDateChange = (event: any) => {
        if (!query) {
            // Hiển thị thông báo yêu cầu nhập ô input trước
            // Ví dụ sử dụng thư viện toastify
            toast.error("Please enter the title field first.");
            return; // Dừng xử lý tiếp theo
        }
        setToDate(event.target.value);
    };


    const [imdbImdbRatingFrom, setImdbRatingFrom] = useState('');
    const [imdbImdbRatingTo, setImdbRatingTo] = useState('');

    // Hàm xử lý sự kiện khi người dùng thay đổi ngày "From"
    const handleFromImdbChange = (event: any) => {
        if (!query) {
            // Hiển thị thông báo yêu cầu nhập ô input trước
            // Ví dụ sử dụng thư viện toastify
            toast.error("Please enter the title field first.");
            return; // Dừng xử lý tiếp theo
        }
        setImdbRatingFrom(event.target.value);
    };

    // Hàm xử lý sự kiện khi người dùng thay đổi ngày "To"
    const handleToImdbChange = (event: any) => {
        if (!query) {
            // Hiển thị thông báo yêu cầu nhập ô input trước
            // Ví dụ sử dụng thư viện toastify
            toast.error("Please enter the title field first.");
            return; // Dừng xử lý tiếp theo
        }
        setImdbRatingTo(event.target.value);
    };


    const [votesFrom, setVotesFrom] = useState('');
    const [votesTo, setVotesTo] = useState('');

    // Hàm xử lý sự kiện khi người dùng thay đổi ngày "From"
    const handleFromVotesChange = (event: any) => {
        if (!query) {
            // Hiển thị thông báo yêu cầu nhập ô input trước
            // Ví dụ sử dụng thư viện toastify
            toast.error("Please enter the title field first.");
            return; // Dừng xử lý tiếp theo
        }
        setVotesFrom(event.target.value);
    };

    // Hàm xử lý sự kiện khi người dùng thay đổi ngày "To"
    const handleToVotesChange = (event: any) => {
        if (!query) {
            // Hiển thị thông báo yêu cầu nhập ô input trước
            // Ví dụ sử dụng thư viện toastify
            toast.error("Please enter the title field first.");
            return; // Dừng xử lý tiếp theo
        }
        setVotesTo(event.target.value);
    };
    const clearFromTo = () => {
        setVotesFrom('')
        setVotesTo('')
    }
    const clearImdbFromTo = () => {
        setImdbRatingFrom('')
        setImdbRatingTo('')
    }
    const clearReleaseDay = () => {
        setFromDate('')
        setToDate('')
    }
    useEffect(() => {
        let params = [];
        if (query.trim().length > 0) {
            params.push('title=' + query.trim());
        }
        if (selectedGenres.length > 0) {
            params.push('genres=' + selectedGenres.join(','));
        }
        if (fromDate && toDate) {
            params.push('releaseday=' + fromDate.trim() + '->' + toDate.trim());
            // params.push('+'+toDate.trim());
        }
        if (imdbImdbRatingFrom && imdbImdbRatingTo) {
            params.push('IM=' + fromDate.trim() + '->' + toDate.trim());
            // params.push('+'+toDate.trim());
        }
        if (fromDate && toDate) {
            params.push('releaseday=' + fromDate.trim() + '->' + toDate.trim());
            // params.push('+'+toDate.trim());
        }

        setSearchParams(params.join('&'));
    }, [mediatype, query, selectedGenres, fromDate, toDate]);


    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-white">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <div className="lg:max-w-full md:w-screen ">
                        <div className="mt-3 ">
                            <div className="items-center ">
                                <h2 className="lg:text-5xl text-xl font-semibold text-black ">Advanced {mediatype} search</h2>
                            </div>
                        </div>

                        <div className="mt-3 ">
                            <div className="items-center ">
                                <h2 className="text-lg text-black ">
                                    Discover IMDb's robust title search. Mix and match info to refine your searches. Looking for 1970s Canadian horror films rated above 6 by at least 100 users? Find them here. All fields below are optional, but at least one is needed for a search. For ranges (release date, votes), use 'min' for larger/after and 'max' for smaller/before. You can also press 'Enter' after checking a box or focusing on a field. To learn more please visit our help site and FAQs.
                                </h2>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="flex items-center gap-2" >
                                <button onClick={() => setMediaType('movie')} className={`flex items-center px-2 py-2 min-w-28 justify-center gap-1 hover:bg-gray-300 ${mediatype === 'movie' ? "border-b-4 border-blue-500" : "border-b-4 border-white"}`}>
                                    <i className="fa-brands fa-youtube text-lg font-bold"></i>
                                    <p className="font-bold">Movie</p>
                                </button>
                                <button onClick={() => setMediaType('tv')} className={`flex items-center px-2 py-2 min-w-28 justify-center gap-1 hover:bg-gray-300 ${mediatype === 'tv' ? "border-b-4 border-blue-500" : "border-b-4 border-white"}`}>
                                    <i className="fa-solid fa-photo-film text-lg font-bold"></i>
                                    <p className="font-bold">TV</p>
                                </button>
                                <button onClick={() => setMediaType('person')} className={`flex items-center px-2 py-2 min-w-28 justify-center gap-1 hover:bg-gray-300 ${mediatype === 'person' ? "border-b-4 border-blue-500" : "border-b-4 border-white"}`}>
                                    <i className="fa-solid fa-user-group text-lg font-bold"></i>
                                    <p className="font-bold">Person</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 py-2 mt-1">
                        {/* display X */}
                        {selectedGenres.map((genre, index) => (
                            <div key={index} className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-3 py-1">
                                <p className="">
                                    Genre: {genre}
                                </p>
                                <i className="fa-solid fa-xmark font-bold text-2xl" onClick={() => handleRemoveGenreFilter(genre)}></i>
                            </div>
                        ))
                        }
                        {
                            query ? (
                                <div className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-3 py-1">
                                    <p className="">
                                        Title: {query}
                                    </p>
                                    <i className="fa-solid fa-xmark font-bold text-2xl" onClick={() => setQuery('')}></i>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                        {
                            fromDate && toDate ? (
                                <div className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-3 py-1">
                                    <p className="">
                                        From  {fromDate} To {toDate}
                                    </p>
                                    <i className="fa-solid fa-xmark font-bold text-2xl" onClick={() => clearReleaseDay()}></i>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }

                        {
                            selectedOption && selectedOption != 'none' ? (
                                <div className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-3 py-1">
                                    <p className="">
                                        Theater: {selectedOption}
                                    </p>
                                    <i className="fa-solid fa-xmark font-bold text-2xl" onClick={() => handleOptionClick('none')}></i>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                        {
                            votesFrom && votesTo ? (
                                <div className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-3 py-1">
                                    <p className="">
                                        Votes from  {votesFrom} To {votesTo}
                                    </p>
                                    <i className="fa-solid fa-xmark font-bold text-2xl" onClick={() => clearFromTo()}></i>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                        {
                            imdbImdbRatingFrom && imdbImdbRatingTo ? (
                                <div className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-3 py-1">
                                    <p className="">
                                        IMDb Rating from  {imdbImdbRatingFrom} To {imdbImdbRatingTo}
                                    </p>
                                    <i className="fa-solid fa-xmark font-bold text-2xl" onClick={() => clearImdbFromTo()}></i>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }


                    </div>

                    <div className="md:grid grid-cols-12 gap-2 w-full ">
                        <div className="col-span-4  h-full text-lg">
                            <div className="flex items-center gap-2  ">
                                <p className="font-bold">Search Filters</p>
                                <div className="flex items-center gap-2 text-blue-500 px-2 py-2 hover:bg-blue-200 ml-auto font-semibold" onClick={() => handleClickExpand()}>
                                    <p>{expanded ? 'Collapse all' : 'Expand all'}</p>
                                    <i className={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                </div>

                            </div>
                        </div>
                        <div className="lg:col-span-8 md-col-span-12  w-full h-full ">
                            <div className="flex items-center ">
                                <div className="items-center ">
                                    <h2 className=" text-black ">
                                        1-50 of {topRatedMovies[0]?.results?.length} </h2>
                                </div>
                                <div className="ml-auto flex gap-4">
                                    <div className="ml-auto flex items-center gap-2">
                                        <p className="text-gray-500">Sort by</p>
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
                                                    border: '2px dashed',
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
                                        <SwapVertIcon className="hover:text-blue-500" />
                                    </div>
                                    <div className="flex items-center gap-4 " >
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
                            </div>
                        </div>
                        <div className="col-span-4  h-full px-2 py-2 ">
                            <div className="border-2 border-gray-500 px-2 py-2">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold">Title Name</p>
                                    <i onClick={toggleTitleExpand} className={`fa-solid ${titleExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                </div>
                                <div className="border-b-2 px-1 py-1">
                                    {titleExpanded ? (
                                        <div className="relative mt-2 mb-1">
                                            <input type="text" name="price" id="price"
                                                value={query}
                                                onChange={onQueryChange}
                                                className="w-full h-full border-0 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="e.g. Harry..."
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center">
                                                <div className="flex items-center mr-3">
                                                    <i className="fa-solid fa-search text-gray-500" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (<div></div>)}
                                </div>
                                {mediatype != 'person' ? (
                                    <div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="font-bold">Release Day </p>
                                            <i onClick={toggleRleaseExpand} className={`fa-solid ${releaseExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                        </div>
                                        <div className="border-b-2 px-1 py-1">
                                            {releaseExpanded ? (
                                                <div className="relative mt-2 mb-1">
                                                    <label htmlFor="startDate" className="block mb-1">From:</label>
                                                    <input
                                                        type="date"
                                                        id="startDate"
                                                        name="startDate"
                                                        className="border border-gray-300 px-2 py-1 mb-2 w-full"
                                                        value={fromDate} // Đặt giá trị của "From" từ state
                                                        onChange={handleFromDateChange} // Xử lý sự kiện thay đổi của "From"
                                                    />

                                                    <label htmlFor="endDate" className="block mb-2">To:</label>
                                                    <input
                                                        type="date"
                                                        id="endDate"
                                                        name="endDate"
                                                        className="border border-gray-300 px-2 py-1 mb-1 w-full"
                                                        value={toDate} // Đặt giá trị của "To" từ state
                                                        onChange={handleToDateChange} // Xử lý sự kiện thay đổi của "To"
                                                    />
                                                    <label htmlFor="endDate" className="block mb-2">Or just enter:</label>
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
                                            ) : (<div></div>)}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="font-bold">IMDb Rating </p>
                                            <i onClick={toggleImdbExpand} className={`fa-solid ${imdbExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                        </div>
                                        <div className="border-b-2 px-1 py-1">
                                            {imdbExpanded ? (
                                                <div className="relative mt-2 mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            className="border border-gray-300 px-2 py-1 w-full"
                                                            value={imdbImdbRatingFrom} // Đặt giá trị của "From" từ state
                                                            onChange={handleFromImdbChange} // Xử lý sự kiện thay đổi của "From"
                                                            placeholder="e.g. 0"
                                                        />
                                                        <p className="px-1">To</p>
                                                        <input
                                                            className="border border-gray-300 px-2 py-1 w-full"
                                                            value={imdbImdbRatingTo} // Đặt giá trị của "To" từ state
                                                            onChange={handleToImdbChange} // Xử lý sự kiện thay đổi của "To"
                                                            placeholder="e.g. 10"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (<div></div>)}
                                        </div>

                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="font-bold">Number of votes </p>
                                            <i onClick={toggleVotesExpand} className={`fa-solid ${votesExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                        </div>
                                        <div className="border-b-2 px-1 py-1">
                                            {votesExpanded ? (
                                                <div className="relative mt-2 mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            className="border border-gray-300 px-2 py-1 w-full"
                                                            value={votesFrom} // Đặt giá trị của "From" từ state
                                                            onChange={handleFromVotesChange} // Xử lý sự kiện thay đổi của "From"
                                                            placeholder="e.g. 0"
                                                        />
                                                        <p className="px-1">to</p>
                                                        <input
                                                            className="border border-gray-300 px-2 py-1 w-full"
                                                            value={votesTo} // Đặt giá trị của "To" từ state
                                                            onChange={handleToVotesChange} // Xử lý sự kiện thay đổi của "To"
                                                            placeholder="e.g. 10000"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (<div></div>)}
                                        </div>

                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="font-bold">Genre </p>
                                            <i onClick={toggleGenreExpand} className={`fa-solid ${genreExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                        </div>
                                        <div className="border-b-2 px-1 py-1">
                                            {genreExpanded ? (
                                                <div className="relative mt-2 mb-1 flex flex-wrap gap-2">
                                                    {
                                                        Object.values(genreMapping).map(genre => (
                                                            <div onClick={() => handleGenreClick(genre as Genre)}
                                                                className={`uppercase text-sm rounded-full px-2 py-2 border-2 border-gray-200 ${selectedGenres.includes(genre as Genre) ? 'bg-yellow-300 hover:bg-yellow-400' : 'hover:bg-gray-500 hover:bg-opacity-90'}`}
                                                                key={genre}>{genre}</div>
                                                        ))
                                                    }
                                                </div>
                                            ) : (<div></div>)}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="font-bold">In Theaters </p>
                                            <i onClick={toggleTheaterExpand} className={`fa-solid ${theaterExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                        </div>
                                        <div className="border-b-2 px-1 py-1">
                                            {theaterExpanded ? (
                                                <div className="relative mt-2 mb-1 flex flex-wrap gap-2">
                                                    <div onClick={() => handleOptionClick('none')} className="flex gap-2 items-center">
                                                        <i className={`fa-regular ${selectedOption === 'none' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                                        <p>None</p>
                                                    </div>
                                                    <div onClick={() => handleOptionClick(' In Theaters Near You')} className="flex gap-2 items-center">
                                                        <i className={`fa-regular ${selectedOption === ' In Theaters Near You' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                                        <p> In Theaters Near You</p>
                                                    </div>
                                                    <div onClick={() => handleOptionClick('In Theaters With Online Ticketing')} className="flex gap-2 items-center">
                                                        <i className={`fa-regular ${selectedOption === 'In Theaters With Online Ticketing' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                                        <p>In Theaters With Online Ticketing</p>
                                                    </div>
                                                </div>
                                            ) : (<div></div>)}
                                        </div>
                                    </div>
                                ) : (
                                    <div>

                                    </div>
                                )}

                            </div>
                        </div>
                        <div className="lg:col-span-8 md-col-span-12  w-full ">
                            <div className="lg:max-w-full md:w-screen py-2 px-2 ">
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
                                    {topRatedMovies[0]?.results
                                        .filter((movie: any) => {
                                            if (selectedGenres?.length === 0) return true; // No genre filter
                                            // Check if every selected genre is present in the movie's genres
                                            const hasAllGenres = selectedGenres.every((genre) =>
                                                movie?.genre_ids?.some((mGenre: any) => genreMapping[mGenre] === genre)
                                            );

                                            return hasAllGenres;
                                        })
                                        .filter((movie: any) => {
                                            // Lọc theo khoảng ngày phát hành
                                            if (!fromDate || !toDate) return true; // Nếu không có khoảng ngày được chọn
                                            const releaseDate = new Date(movie?.release_date);
                                            const from = new Date(fromDate);
                                            const to = new Date(toDate);
                                            // Kiểm tra xem ngày phát hành có nằm trong khoảng fromDate và toDate không
                                            return releaseDate >= from && releaseDate <= to;
                                        })
                                        .filter((movie: any) => {
                                            if (!imdbImdbRatingFrom || !imdbImdbRatingTo) return true;
                                            const releaseDate = new Number(movie?.vote_average);
                                            const from = new Number(imdbImdbRatingFrom);
                                            const to = new Number(imdbImdbRatingTo);
                                            return releaseDate >= from && releaseDate <= to;
                                        })
                                        .filter((movie: any) => {
                                            if (!votesFrom || !votesTo) return true;
                                            const releaseDate = new Number(movie?.vote_count);
                                            const from = new Number(votesFrom);
                                            const to = new Number(votesTo);
                                            return releaseDate >= from && releaseDate <= to;
                                        })

                                        .filter(() => {
                                            if (applyFilter === true) return true; // No filter
                                            return null
                                        })
                                        .sort((a: any, b: any) => {
                                            if (menuItemNum === '5') {
                                                // Sắp xếp theo thứ tự alphabet của title
                                                const titleA = a?.original_title?.toUpperCase();
                                                const titleB = b?.original_title?.toUpperCase();
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
                                        ?.map((m: any, index: any) => renderMovieItem(m, index, currentView, sortOrder))}
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