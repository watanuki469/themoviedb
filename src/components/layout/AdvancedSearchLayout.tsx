import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { handleImageError, shortenNumber } from '../../modules/BaseModule';
import RatingModule from '../../modules/RatingModule';
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGenre } from '../../redux/reducers/genre.reducer';
import { clearListSearch, fetchSearch } from "../../redux/reducers/search.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import './earth.css';

export default function AdvancedSearchLayout() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const [mediatype, setMediaType] = useState('movie');
    const context = useContext(LanguageContext);
    if (!context) { return null; }
    const { language, translations, handleLanguageChange } = context;
    const topRatedMovies = useAppSelector((state) => state.search.listSearch)
    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre)
    const [searchParams, setSearchParams] = useSearchParams()
    const genreParam = searchParams.get("genres");
    const [votesFrom, setVotesFrom] = useState('');
    const [votesTo, setVotesTo] = useState('');
    const [query, setQuery] = useState('');
    const [loadingQuery, setLoadingQuery] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const mediaParam = searchParams.get("mediaType");
        if (mediaParam) { setMediaType(mediaParam) }
    }, []);

    useEffect(() => {
        dispatch(fetchGenre(mediatype));
    }, [dispatch, mediatype]);

    useEffect(() => {
        let timerId: ReturnType<typeof setTimeout>;
        if (query?.trim()?.length === 0) {
            setQuery('')
        }
        else {
            setLoadingQuery(true)
            timerId = setTimeout(() => {
                dispatch(fetchSearch(mediatype, query, page))
            }, 2000);
            setLoadingQuery(false)
        }

        return () => {
            clearTimeout(timerId); // Hủy timeout nếu component unmounts hoặc effect chạy lại trước khi timeout được kích hoạt
        };
    }, [query, mediatype, page, dispatch]);

    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const handleRankingClick   = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };

    const [currentView, setCurrentView] = useState('Detail');
    const switchView = (view: any) => {
        setCurrentView(view);
    };

    const genreMapping: Record<number, string> = listGenreFromApi?.reduce((acc: Record<number, string>, genre: { id: number, name: string }) => {
        acc[genre?.id] = genre?.name;
        return acc;
    }, {});

    type Genre = | ' ';

    const initialSelectedGenres: Genre[] = genreParam ? [genreParam as Genre] : [];
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>(initialSelectedGenres);

    const handleClickMedia = (media: any) => {
        setMediaType(media)
        setSearchParams('mediaType=' + media)
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
                    <section className="px-2 bg-white  w-full " key={movieIndex}>
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <a href={`/${mediatype}/${movie?.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path ? movie?.poster_path : movie?.profile_path}`} alt="product images"
                                                onError={handleImageError} className="w-20 h-28 hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl" />
                                        </a>
                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.name ? movie?.name : movie?.title}</p>
                                            <p>{movie?.first_air_date ? movie?.first_air_date?.slice(0, 4) : movie?.release_date?.slice(0, 4)}</p>
                                            {mediatype != 'person' ? (
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <i className="fa-solid fa-star text-yellow-300"></i>
                                                        <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                    </div>
                                                    <div className="flex items-center gap-2  px-2 hover:text-black text-blue-500">
                                                        <div className="grow ml-auto py-2">
                                                            <RatingModule mediaType={mediatype} ratingList={movie} userInfoList={userInfoList} starIndex={movieIndex} rateHidden={'false'}></RatingModule>

                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-16">
                                                    <p className="text-gray-500 "> {movie?.known_for_department}</p>
                                                    <a href={`/${mediatype}/${movie?.known_for?.[0]?.id}`} className="w-full " >
                                                        <div className="line-clamp-2 h-12 text-blue-500 hover:underline flex gap-2 flex-wrap">
                                                            <div>{movie?.known_for && movie?.known_for?.length > 0 ? movie?.known_for?.[0]?.title ? movie?.known_for?.[0]?.title : movie?.known_for?.[0]?.name : ''}</div>
                                                            <div> {movie?.known_for && movie?.known_for.length > 0 ? `(${movie?.known_for?.[0]?.release_date ? movie?.known_for?.[0]?.release_date?.slice(0, 4) : movie?.known_for?.[0]?.first_air_date?.slice(0, 4)})` : ''}</div>
                                                        </div>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-1 lg:line-clamp-none line-clamp-4">
                                        <p>{movie?.overview}</p>
                                    </div>
                                </div>
                                <div className="ml-auto" onClick={() => navigate(`/${mediatype}/${movie?.id}`)} >
                                    <i className="fa-solid fa-circle-info px-2 text-blue-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            case 'Grid':
                return (
                    <section className="w-1/2 md:w-1/4 px-2 sm:w-1/3 lg:1/4 py-2" key={movieIndex}>
                        <div className="text-black font-sans  shadow-sm shadow-black mt-2 rounded-br-xl rounded-bl-xl rounded-tr-xl" >
                            <div className="items-center gap-2">
                                <div className="relative w-full pb-[150%] hover:opacity-80  rounded-tr-xl ">
                                    <a href={`/${mediatype}/${movie?.id}`}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path ? movie?.poster_path : movie?.profile_path}`} alt="product images" onError={handleImageError}
                                            className="absolute top-0 left-0 w-full h-full object-cover  rounded-tr-xl" />
                                    </a>

                                </div>
                                <div className="px-2 py-2 ">
                                    {
                                        mediatype != 'person' ?
                                            (
                                                <div className="justify-start text-left">
                                                    <div className="flex items-center gap-2">
                                                        <i className="fa-solid fa-star text-yellow-300"></i>
                                                        <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 hover:bg-gray-300 hover:text-black text-blue-500 ">
                                                        <div className="grow ml-auto " >
                                                            <RatingModule mediaType={mediatype} ratingList={movie} userInfoList={userInfoList} starIndex={movieIndex} rateHidden={'false'}></RatingModule>
                                                        </div>
                                                    </div>
                                                    <div className="h-12 w-full ">
                                                        <p className="font-bold hover:opacity-50 line-clamp-2">{movieIndex}.{movie?.name ? movie?.name : movie?.title}</p>
                                                    </div>
                                                    <div className="flex flex-wrap">
                                                        {movie?.first_air_date ? movie?.first_air_day?.slice(0, 4) : movie?.release_date?.slice(0, 4)}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <div className="h-12 w-full "><p className="font-bold hover:opacity-50 line-clamp-2">{movieIndex}. {movie?.title ? movie?.title : movie?.name}</p></div>
                                                    <p className="text-gray-500 "> {movie?.known_for_department}</p>
                                                    <div className="w-full " ><p className="line-clamp-2 h-12">{movie?.known_for && movie?.known_for.length > 0 ? movie?.known_for[0]?.title : ''}</p></div>
                                                </div>
                                            )
                                    }
                                </div>

                                <div className="px-2 py-2" onClick={() => navigate(`/${mediatype}/${movie?.id}`)}   >
                                    <button className="px-2 py-1 bg-gray-300 hover:bg-blue-300 text-blue-500 w-full rounded-md font-medium text-center items-center">Details</button>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            case 'Compact':
                return (
                    <section className="px-2 w-full " key={movieIndex}>
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="flex items-center gap-2">
                                    <a href={`/${mediatype}/${movie?.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path ? movie?.poster_path : movie?.profile_path}`} alt="product images"
                                            onError={handleImageError} className="w-20 h-28 hover:opacity-80 rounded-tr-xl rounded-br-xl rounded-bl-xl" />
                                    </a>
                                    <div>
                                        <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.name ? movie?.name : movie?.title}</p>
                                        <p>{movie?.first_air_date ? movie?.first_air_date?.slice(0, 4) : movie?.release_date?.slice(0, 4)}</p>
                                        {mediatype != 'person' ? (
                                            <div className="flex flex-wrap items-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                </div>
                                                <div className="flex items-center gap-2 hover:bg-gray-300 hover:text-black text-blue-500 ">
                                                    <div className="grow ml-auto py-2" ><RatingModule mediaType={mediatype} ratingList={movie} userInfoList={userInfoList} starIndex={movieIndex} rateHidden={'false'}></RatingModule></div>
                                                </div>
                                            </div>)
                                            : (
                                                <div className="">
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
                                <div className="ml-auto">
                                    <a href={`/${mediatype}/${movie.id}`}>
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
    const [selectedOption, setSelectedOption] = useState<string | null>('none');

    const handleOptionClick = (option: any) => {
        setApplyFilter(option === 'none' ? (true) : (false));
        setSelectedOption(option === selectedOption ? null : option);
    };

    const [genderOption, setGenderOption] = useState<string | null>('none');
    const handleOptionGenderClick = (option: any) => {
        setGenderOption(option === genderOption ? null : option);
    };

    const handleRankingClose = () => {
        setAnchorRankingEl(null);
    };
    const [selectedRankingOption, setSelectedRankingOption] = useState(null);

    const [menuItemNum, setMenuItemNum] = useState(''); // Default view is 'detail'

    function compareReleaseDates(a: any, b: any) {
        const releaseDateA = new Date(a?.release_date || a?.first_air_date);
        const releaseDateB = new Date(b?.release_date || b?.first_air_date);
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
    const [expanded, setExpanded] = useState(false);
    const [changeExpand, setChangeExpanded] = useState(false);
    const [titleExpanded, setTitleExpanded] = useState(false);
    const [releaseExpanded, setRleaseExpanded] = useState(false);
    const [imdbExpanded, setImdbExpanded] = useState(false);
    const [votesExpanded, setVotesExpanded] = useState(false);
    const [genreExpanded, setGenreExpanded] = useState(false);
    const [theaterExpanded, setTheaterExpanded] = useState(false);
    const [genderExpanded, setGenderExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(true);
        setTitleExpanded(true)
        setRleaseExpanded(true)
        setImdbExpanded(true)
        setVotesExpanded(true)
        setGenreExpanded(true)
        setTheaterExpanded(true)
        setGenderExpanded(true)
    };
    const toggleSwapExpand = () => {
        setExpanded(false);
        setTitleExpanded(false)
        setRleaseExpanded(false)
        setImdbExpanded(false)
        setVotesExpanded(false)
        setGenreExpanded(false)
        setTheaterExpanded(false)
        setGenderExpanded(false)
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
    }
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleQueryChange = (event: any) => {
        dispatch(clearListSearch());
        setPage(1);
        setQuery(event.target.value);
    };

    const handleFromDateChange = (event: any) => {
        if (!query) { toast.error("Please enter the title field first."); return; }
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event: any) => {
        if (!query) { toast.error("Please enter the title field first."); return; }
        setToDate(event.target.value);
    };

    const [imdbImdbRatingFrom, setImdbRatingFrom] = useState('');
    const [imdbImdbRatingTo, setImdbRatingTo] = useState('');

    const handleFromImdbChange = (event: any) => {
        if (!query) { toast.error("Please enter the title field first."); return; }
        setImdbRatingFrom(event.target.value);
    };

    const handleToImdbChange = (event: any) => {
        if (!query) { toast.error("Please enter the title field first."); return; }
        setImdbRatingTo(event.target.value);
    };

    const handleFromVotesChange = (event: any) => {
        if (!query) { toast.error("Please enter the title field first."); return; }
        setVotesFrom(event.target.value);
    };
    const handleToVotesChange = (event: any) => {
        if (!query) { toast.error("Please enter the title field first."); return; }
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
        const titleParam = searchParams.get("title");
        if (titleParam) {
            setQuery(titleParam);
            setSearchParams('title=' + titleParam)
        }
    }, []);

    useEffect(() => {
        let params = [];
        params.push('mediaType=' + mediatype);
        if (query.trim().length > 0) { params.push('title=' + query.trim()) }
        if (selectedGenres.length > 0) { params.push('genres=' + selectedGenres.join(',')) }
        if (votesFrom && votesTo) { params.push('votes=' + votesFrom.trim() + '->' + votesTo.trim()) }
        if (fromDate && toDate) { params.push('releaseday=' + fromDate.trim() + '->' + toDate.trim()) }
        if (imdbImdbRatingFrom && imdbImdbRatingTo) { params.push('IMDBRating=' + imdbImdbRatingFrom.trim() + '->' + imdbImdbRatingTo.trim()); }
        setSearchParams(params.join('&'));
    }, [mediatype, query, selectedGenres, fromDate, toDate, votesFrom, votesTo, imdbImdbRatingFrom, imdbImdbRatingTo]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });

        const loadMoreElement = document.querySelector('#load-more');
        if (loadMoreElement) {
            observer.observe(loadMoreElement);
        }

        return () => {
            if (loadMoreElement) {
                observer.unobserve(loadMoreElement);
            }
        };
    }, []);
    const [loading4, setLoading4] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading4(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [page]);

    return (
        <div className=" min-h-screen cursor-pointer w-full">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <TopBar />
                </div>
            </div>
            <div className="bg-black w-full px-2">
                <div className="w-full lg:max-w-5xl mx-auto aligns-center bg-white  px-2 py-2 ">
                    <div className="lg:max-w-full w-screen ">
                        <h2 className="lg:text-5xl text-xl font-semibold text-black capitalize">{translations[language]?.advancedSearch}: {mediatype} </h2>
                        <h2 className="text-lg text-black ">{translations[language]?.imdbSearch}</h2>
                        <div className="mt-3">
                            <div className="flex items-center gap-2 flex-wrap" >
                                <button onClick={() => handleClickMedia('movie')} className={`flex items-center px-2 py-2 min-w-28 justify-center gap-1 hover:bg-gray-300 ${mediatype === 'movie' ? "border-b-4 border-blue-500" : "border-b-4 border-white"}`}>
                                    <i className="fa-brands fa-youtube text-lg font-bold"></i>
                                    <p className="font-bold">Movie</p>
                                </button>
                                <button onClick={() => handleClickMedia('tv')} className={`flex items-center px-2 py-2 min-w-28 justify-center gap-1 hover:bg-gray-300 ${mediatype === 'tv' ? "border-b-4 border-blue-500" : "border-b-4 border-white"}`}>
                                    <i className="fa-solid fa-photo-film text-lg font-bold"></i>
                                    <p className="font-bold">TV</p>
                                </button>
                                <button onClick={() => handleClickMedia('person')} className={`flex items-center px-2 py-2 min-w-28 justify-center gap-1 hover:bg-gray-300 ${mediatype === 'person' ? "border-b-4 border-blue-500" : "border-b-4 border-white"}`}>
                                    <i className="fa-solid fa-user-group text-lg font-bold"></i>
                                    <p className="font-bold">Person</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 py-2 mt-1">
                        {/* display X */}
                        {selectedGenres?.map((genre, index) => (
                            <div key={index} className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-3 py-1">
                                <p className="">  {genre}  </p>
                                <i className="fa-solid fa-xmark text-2xl" onClick={() => handleRemoveGenreFilter(genre)}></i>
                            </div>
                        ))}
                        {
                            query ? (
                                <div className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-3 py-1">
                                    <p className="">{translations[language]?.title}: {query}</p>
                                    <i className="fa-solid fa-xmark font-bold text-2xl" onClick={() => setQuery('')}></i>
                                </div>
                            ) : (<div></div>)
                        }
                        {
                            fromDate && toDate ? (
                                <div className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-3 py-1">
                                    <p className="">{translations[language]?.releaseDay}:{translations[language]?.from} {fromDate} {translations[language]?.to}{toDate}</p>
                                    <i className="fa-solid fa-xmark font-bold text-2xl" onClick={() => clearReleaseDay()}></i>
                                </div>
                            ) : (<div></div>)
                        }
                        {
                            selectedOption && selectedOption != 'none' ? (
                                <div className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-3 py-1">
                                    <p className="">{translations[language]?.inTheater}: {selectedOption}</p>
                                    <i className="fa-solid fa-xmark font-bold text-2xl" onClick={() => handleOptionClick('none')}></i>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                        {
                            votesFrom && votesTo ? (
                                <div className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-2 py-1">
                                    <p className="">{translations[language]?.votes} : {translations[language]?.from} {votesFrom}{translations[language]?.to}{votesTo}</p>
                                    <i className="fa-solid fa-xmark font-bold text-2xl" onClick={() => clearFromTo()}></i>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                        {
                            imdbImdbRatingFrom && imdbImdbRatingTo ? (
                                <div className="flex items-center gap-2 justify-center text-center border-2 border-gray-200 w-fit rounded-full px-3 py-1">
                                    <p className="">IMDb  {translations[language]?.rating}:{translations[language]?.from}  {imdbImdbRatingFrom} {translations[language]?.to} {imdbImdbRatingTo}</p>
                                    <i className="fa-solid fa-xmark font-bold text-2xl" onClick={() => clearImdbFromTo()}></i>
                                </div>
                            ) : (<div></div>)
                        }
                    </div>
                    <div className="grid grid-cols-12 gap-2 w-full ">
                        <div className="lg:col-span-4 col-span-12 w-full">
                            <div className="flex items-center gap-2  ">
                                <p className="font-bold"> {translations[language]?.searchFilter}</p>
                                <div className="flex items-center gap-2 text-blue-500 px-2 py-2 hover:bg-blue-200 ml-auto font-semibold" onClick={() => handleClickExpand()}>
                                    <p>{expanded ? `${translations[language]?.collapseAll}` : `${translations[language]?.expandAll}`}</p>
                                    <i className={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                </div>
                            </div>
                            <div className="border-2 border-gray-300 px-2 py-2 capitalize">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold"> {translations[language]?.title} {mediatype}</p>
                                    <i onClick={() => setTitleExpanded(!titleExpanded)} className={`fa-solid ${titleExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                </div>
                                <div className="border-b-2 px-1 py-1">
                                    {titleExpanded ? (
                                        <div className="relative mt-2 mb-1">
                                            <input type="text" name="price" id="price"
                                                value={query}
                                                onChange={handleQueryChange}
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
                                {mediatype !== 'person' ? (
                                    <div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="font-bold"> {translations[language]?.releaseDay} </p>
                                            <i onClick={() => setRleaseExpanded(!releaseExpanded)} className={`fa-solid ${releaseExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                        </div>
                                        <div className="border-b-2 px-1 py-1">
                                            {releaseExpanded ? (
                                                <div className="relative mt-2 mb-1">
                                                    <label htmlFor="startDate" className="block mb-1">{translations[language]?.from} :</label>
                                                    <input type="date" id="startDate" name="startDate"
                                                        className="border border-gray-300 px-2 py-1 mb-2 w-full"
                                                        value={fromDate}
                                                        onChange={handleFromDateChange}
                                                    />
                                                    <label htmlFor="endDate" className="block mb-2">{translations[language]?.to} :</label>
                                                    <input type="date" id="endDate" name="endDate"
                                                        className="border border-gray-300 px-2 py-1 mb-1 w-full"
                                                        value={toDate}
                                                        onChange={handleToDateChange}
                                                    />
                                                    <label htmlFor="endDate" className="block mb-2">{translations[language]?.orJustEnter}:</label>
                                                    <div className="flex items-center gap-2">
                                                        <input id="startDate" name="startDate"
                                                            className="border border-gray-300 px-2 py-1 w-full"
                                                            value={fromDate}
                                                            onChange={handleFromDateChange}
                                                        />
                                                        <p className="px-1">{translations[language]?.to}</p>
                                                        <input id="endDate" name="endDate"
                                                            className="border border-gray-300 px-2 py-1 w-full"
                                                            value={toDate}
                                                            onChange={handleToDateChange}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (<div></div>)}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="font-bold">IMDb  {translations[language]?.rating} </p>
                                            <i onClick={() => setImdbExpanded(!imdbExpanded)} className={`fa-solid ${imdbExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                        </div>
                                        <div className="border-b-2 px-1 py-1">
                                            {imdbExpanded ? (
                                                <div className="relative mt-2 mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <input className="border border-gray-300 px-2 py-1 w-full"
                                                            value={imdbImdbRatingFrom}
                                                            onChange={handleFromImdbChange}
                                                            placeholder="e.g. 0"
                                                        />
                                                        <p className="px-1">To</p>
                                                        <input className="border border-gray-300 px-2 py-1 w-full"
                                                            value={imdbImdbRatingTo}
                                                            onChange={handleToImdbChange}
                                                            placeholder="e.g. 10"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (<div></div>)}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="font-bold"> {translations[language]?.votes} </p>
                                            <i onClick={() => setVotesExpanded(!votesExpanded)} className={`fa-solid ${votesExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                        </div>
                                        <div className="border-b-2 px-1 py-1">
                                            {votesExpanded ? (
                                                <div className="relative mt-2 mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <input className="border border-gray-300 px-2 py-1 w-full"
                                                            value={votesFrom} // Đặt giá trị của "From" từ state
                                                            onChange={handleFromVotesChange} // Xử lý sự kiện thay đổi của "From"
                                                            placeholder="e.g. 0"
                                                        />
                                                        <p className="px-1">{translations[language]?.to}</p>
                                                        <input className="border border-gray-300 px-2 py-1 w-full"
                                                            value={votesTo} // Đặt giá trị của "To" từ state
                                                            onChange={handleToVotesChange} // Xử lý sự kiện thay đổi của "To"
                                                            placeholder="e.g. 10000"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (<div></div>)}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="font-bold"> {translations[language]?.genre} </p>
                                            <i onClick={() => setGenreExpanded(!genreExpanded)} className={`fa-solid ${genreExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                        </div>
                                        <div className="border-b-2 px-1 py-1">
                                            {genreExpanded ? (
                                                <div className="relative mt-2 mb-1 flex flex-wrap gap-2">
                                                    {
                                                        Object.values(genreMapping).map(genre => (
                                                            <div onClick={() => handleGenreClick(genre as Genre)}
                                                                className={`uppercase text-sm rounded-full px-2 py-2 border-2 border-gray-200 ${selectedGenres.includes(genre as Genre) ? 'bg-yellow-300 hover:bg-yellow-400' : 'hover:bg-gray-300 hover:opacity-90'}`}
                                                                key={genre}>{genre}</div>
                                                        ))
                                                    }
                                                </div>
                                            ) : (<div></div>)}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="font-bold"> {translations[language]?.inTheater} </p>
                                            <i onClick={() => setTheaterExpanded(!theaterExpanded)} className={`fa-solid ${theaterExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                        </div>
                                        <div className="border-b-2 px-1 py-1">
                                            {theaterExpanded ? (
                                                <div className="relative mt-2 mb-1 flex flex-wrap gap-2">
                                                    <div onClick={() => handleOptionClick('none')} className="flex gap-2 items-center">
                                                        <i className={`fa-regular ${selectedOption === 'none' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                                        <p> {translations[language]?.none}</p>
                                                    </div>
                                                    <div onClick={() => handleOptionClick(' In Theaters Near You')} className="flex gap-2 items-center">
                                                        <i className={`fa-regular ${selectedOption === ' In Theaters Near You' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                                        <p>  {translations[language]?.inTheaterNearYou}</p>
                                                    </div>
                                                    <div onClick={() => handleOptionClick('In Theaters With Online Ticketing')} className="flex gap-2 items-center">
                                                        <i className={`fa-regular ${selectedOption === 'In Theaters With Online Ticketing' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                                        <p> {translations[language]?.inTheaterWithOnlineTicked}</p>
                                                    </div>
                                                </div>
                                            ) : (<div></div>)}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="font-bold">Gender Identity </p>
                                            <i onClick={() => setGenderExpanded(!genderExpanded)} className={`fa-solid ${genderExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto`}></i>
                                        </div>
                                        <div className="border-b-2 px-1 py-1">
                                            {genderExpanded ? (
                                                <div className="relative mt-2 mb-1 flex flex-wrap gap-2">
                                                    <div onClick={() => handleOptionGenderClick('none')} className="flex gap-2 items-center">
                                                        <i className={`fa-regular ${genderOption === 'none' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                                        <p>None</p>
                                                    </div>
                                                    <div onClick={() => handleOptionGenderClick('Male')} className="flex gap-2 items-center">
                                                        <i className={`fa-regular ${genderOption === 'Male' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                                        <p> Male</p>
                                                    </div>
                                                    <div onClick={() => handleOptionGenderClick('Female')} className="flex gap-2 items-center">
                                                        <i className={`fa-regular ${genderOption === 'Female' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                                        <p>Female</p>
                                                    </div>
                                                    <div onClick={() => handleOptionGenderClick('Non-Binary')} className="flex gap-2 items-center">
                                                        <i className={`fa-regular ${genderOption === 'Non-Binary' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                                        <p>Non Binary</p>
                                                    </div>
                                                </div>
                                            ) : (<div></div>)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="lg:col-span-8 col-span-12 ">
                            <div className="flex items-center ">
                                <h2 className=" text-black ">
                                    1-20 / {topRatedMovies
                                        .filter((movie: any) => {
                                            if (selectedGenres?.length === 0) return true; // No genre filter
                                            // Check if every selected genre is present in the movie's genres
                                            const hasAllGenres = selectedGenres.every((genre) =>
                                                movie?.genre_ids?.some((mGenre: any) =>
                                                    genreMapping[mGenre] === genre)
                                            );
                                            return hasAllGenres;
                                        })
                                        .filter(() => {
                                            if (applyFilter === true) return true; // No filter
                                            return null
                                        })
                                        .filter((movie: any) => {
                                            if (genderOption === 'Female') return movie?.gender == '1';
                                            if (genderOption === 'Male') return movie?.gender == '2';
                                            if (genderOption === 'Non-Binary') return movie?.gender == '0';
                                            return true; // If 'none' or no filter is selected, include all gender
                                        })
                                        .filter(() => {
                                            if (query !== '') return true; // No filter
                                            return null
                                        })
                                        .filter((movie: any) => {
                                            // Check if both imdbImdbRatingFrom and imdbImdbRatingTo are defined and not empty strings
                                            if (imdbImdbRatingFrom !== '' && imdbImdbRatingTo !== '') {
                                                return movie?.vote_average >= imdbImdbRatingFrom && movie?.vote_average <= imdbImdbRatingTo;
                                            }
                                            // If no filter, include all movies
                                            return true;
                                        })
                                        .filter((movie: any) => {
                                            // Check if both imdbImdbRatingFrom and imdbImdbRatingTo are defined and not empty strings
                                            if (votesFrom !== '' && votesTo !== '') {
                                                return movie?.vote_count >= votesFrom && movie?.vote_count <= votesTo;
                                            }
                                            // If no filter, include all movies
                                            return true;
                                        })?.length}
                                </h2>
                                <div className="ml-auto flex gap-4">
                                    <div className="ml-auto flex items-center gap-2">
                                        <p className="text-gray-500">{translations[language]?.sortBy}</p>
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
                                    <div className="flex items-center gap-4 flex-wrap " >
                                        <Tooltip title="Detail View" className={`${currentView === "Detail" ? "text-blue-500" : ""}`}><i className="fa-solid fa-list-ul " onClick={() => switchView('Detail')}></i></Tooltip>
                                        <Tooltip title="Grid View" className={`${currentView === "Grid" ? "text-blue-500" : ""}`}><AppsIcon onClick={() => switchView('Grid')} /></Tooltip>
                                        <Tooltip title="Compact View" className={`${currentView === "Compact" ? "text-blue-500" : ""}`}><MenuIcon onClick={() => switchView('Compact')} /></Tooltip>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full  py-4 px-2 "
                                style={{
                                    position: "relative", backgroundSize: "cover", backgroundPosition: "center", display: 'flex', flexWrap: 'wrap',
                                }}>
                                {
                                    loadingQuery ? (
                                        <section className='w-full min-h-80'>
                                            <div className="earth absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cover bg-repeat-x rounded-full shadow-inner custom-shadow"></div>
                                            {/* <SolarSystem /> */}
                                        </section>
                                    )
                                        : (
                                            <div className={` lg:max-w-full w-full min-h-screen flex flex-wrap  ${currentView != 'Grid' ? 'divide-y divide-gray-500 px-2 border-2 border-gray-500' : ''} `}>
                                                {
                                                    topRatedMovies
                                                        .filter((movie: any) => {
                                                            if (selectedGenres?.length === 0) return true; // No genre filter
                                                            // Check if every selected genre is present in the movie's genres
                                                            const hasAllGenres = selectedGenres.every((genre) =>
                                                                movie?.genre_ids?.some((mGenre: any) =>
                                                                    genreMapping[mGenre] === genre)
                                                            );
                                                            return hasAllGenres;
                                                        })
                                                        .filter(() => {
                                                            if (applyFilter === true) return true; // No filter
                                                            return null
                                                        })
                                                        .filter((movie: any) => {
                                                            if (genderOption === 'Female') return movie?.gender == '1';
                                                            if (genderOption === 'Male') return movie?.gender == '2';
                                                            if (genderOption === 'Non-Binary') return movie?.gender == '0';
                                                            return true; // If 'none' or no filter is selected, include all gender
                                                        })
                                                        .filter(() => {
                                                            if (query !== '') return true; // No filter
                                                            return null
                                                        })
                                                        .filter((movie: any) => {
                                                            // Check if both imdbImdbRatingFrom and imdbImdbRatingTo are defined and not empty strings
                                                            if (imdbImdbRatingFrom !== '' && imdbImdbRatingTo !== '') {
                                                                return movie?.vote_average >= imdbImdbRatingFrom && movie?.vote_average <= imdbImdbRatingTo;
                                                            }
                                                            // If no filter, include all movies
                                                            return true;
                                                        })
                                                        .filter((movie: any) => {
                                                            const parsedFromDate = new Date(fromDate).getTime();
                                                            const parsedToDate = new Date(toDate).getTime();
                                                            if (parsedFromDate && parsedToDate) {
                                                                const releaseDate = new Date(movie?.release_date || movie?.first_air_date).getTime();
                                                                return releaseDate >= parsedFromDate && releaseDate <= parsedToDate;
                                                            }
                                                            return true;
                                                        })
                                                        .filter((movie: any) => {
                                                            if (votesFrom !== '' && votesTo !== '') {
                                                                return movie?.vote_count >= votesFrom && movie?.vote_count <= votesTo;
                                                            }
                                                            return true;
                                                        })
                                                        .sort((a: any, b: any) => {
                                                            if (menuItemNum === '5') {
                                                                // Sắp xếp theo thứ tự alphabet của title
                                                                const titleA = (a?.title || a?.name || '').toUpperCase();
                                                                const titleB = (b?.title || b?.name || '').toUpperCase();
                                                                if (titleA < titleB) { return -1; }
                                                                if (titleA > titleB) { return 1; }
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
                                                        ?.map((m: any, index: any) => renderMovieItem(m, index, currentView))
                                                }
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                    {
                        loading4 ? (
                            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                        ) : (
                            <div id="load-more">
                                <div className="bg-white text-black text-center py-2"><i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i></div></div>
                        )
                    }
                </div>

            </div>

            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <Footer />
                </div>
            </div>
        </div >
    )
}