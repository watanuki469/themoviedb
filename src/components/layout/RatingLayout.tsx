import AppsIcon from '@mui/icons-material/Apps';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Avatar, Button, Menu, MenuItem, Rating, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { formatDate, handleImageError, shortenNumber } from "../../modules/BaseModule";
import Charts from "../../modules/Charts";
import ListRow from "../../modules/ListRow";
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGetRating, fetchRating, fetchRemoveRating } from "../../redux/reducers/login.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";

export function RatingLayout() {
    const [mediaType, setMediaType] = useState('movie');
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [isRating, setIsRating] = useState(false);
    const [value, setValue] = useState<number | null>(0);
    const [numberIndex, setNumberIndex] = useState(0);
    const [loading2, setLoading2] = useState<{ [key: number]: boolean }>({});
    const [loading3, setLoading3] = useState<{ [key: number]: boolean }>({});
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const dispatch = useAppDispatch();

    const ratingList = useAppSelector((state) => state.login.listRating);
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData))
    }, []);

    useEffect(() => {
        if (userInfoList[0]?.length > 0) {
            dispatch(fetchGetRating(mediaType, userInfoList[0]));
            dispatch(fetchMovies());
        }
    }, [dispatch, userInfoList, mediaType]);

    const handleClick = (index: number, value: any) => {
        setIsRating(true);
        setNumberIndex(index);
        setValue(value);
    };

    const handleRating = async (
        itemRating: any
    ) => {
        setLoading2((prevLoading2) => ({ ...prevLoading2, [numberIndex]: true }));
        await dispatch(fetchRating(
            mediaType,
            ratingList[numberIndex]?.itemId,
            ratingList[numberIndex]?.itemName,
            ratingList[numberIndex]?.itemIMDbRating,
            ratingList[numberIndex]?.itemIMDbRatingCount,
            ratingList[numberIndex]?.itemReleaseDay,
            ratingList[numberIndex]?.itemRuntime,
            ratingList[numberIndex]?.itemImg,
            userInfoList[0],
            userInfoList[1],
            itemRating
        ));
        setIsRating(false)
        setLoading2((prevLoading2) => ({ ...prevLoading2, [numberIndex]: false }));
    };

    const handleRemoveRating = async (numberIndex: any, itemId: any, ratingId: any) => {
        setLoading((prevLoading) => ({ ...prevLoading, [numberIndex]: true }));
        await dispatch(fetchRemoveRating(userInfoList[0], mediaType, itemId, ratingId));
        setIsRating(false);
        setLoading((prevLoading) => ({ ...prevLoading, [numberIndex]: false }));
    };

    const [handleRefine, setHandleRefine] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [fromRating, setFromRating] = useState('');
    const [toRating, setToRating] = useState('');
    const [fromVotes, setFromVotes] = useState('');
    const [toVotes, setToVotes] = useState('');

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
    const [currentView, setCurrentView] = useState('Detail');

    const switchView = (view: any) => {
        setCurrentView(view);
    };
    const renderMovieItem = (movie: any, movieIndex: number, currentView: any) => {
        const existingRating = ratingList?.find(rating => rating?.itemId == movie?.itemId);
        const existingRating2 = existingRating?.ratings?.find((item: any) => item?.itemEmail == userInfoList[0]);
        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 w-full" key={movieIndex}>
                        <div className="text-black font-sans w-full">
                            <div className="flex w-full items-center py-2 px-2">
                                <div className="mt-2 flex items-center gap-2">
                                    <a className="hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl" href={`/${mediaType}/${movie?.itemId}`}>
                                        <div className="w-28 h-40 overflow-hidden rounded-br-xl rounded-bl-xl rounded-tr-xl">
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images" className="rounded-br-xl rounded-bl-xl rounded-tr-xl w-full h-full object-cover" onError={handleImageError} />
                                        </div>
                                    </a>
                                    <div>
                                        <p className="font-bold hover:opacity-50 line-clamp-2">{movieIndex}. {movie?.itemName}</p>
                                        <div className="flex flex-wrap gap-2">{movie?.itemTMDbReleaseDay?.slice(0, 4)}
                                        </div>
                                        <div className="line-clamp-4">
                                            <p>{movie?.itemReview}</p>
                                        </div>
                                        <button className="flex items-center gap-2   hover:text-black text-blue-500">
                                            <div className="" onClick={() => handleClick(movieIndex, existingRating2?.itemRating)}>
                                                {
                                                    existingRating2 ? (
                                                        loading2[movieIndex] ? (
                                                            <div>
                                                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse "></i>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2 hover:bg-gray-300 w-fit px-1 py-1 rounded-lg">
                                                                <i className="fa-solid fa-star text-blue-500"></i>
                                                                <div>{existingRating2?.itemRating}</div>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div className="font-bold text-sm">
                                                            {loading2[movieIndex] ? (
                                                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>
                                                            ) : (
                                                                <div className="hover:bg-gray-200 w-fit rounded-lg">
                                                                    <i className="fa-regular fa-star text-blue-500"></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <i className="fa-solid fa-star text-yellow-300"></i>
                                                <p>{Number(movie?.itemTMDbRating).toFixed(1)} ({shortenNumber(movie?.itemTMDbRatingCount)})</p>
                                            </div>
                                        </button>
                                        <div className="lg:line-clamp-none line-clamp-4 capitalize">
                                            <p> {translations[language]?.rate} {translations[language]?.from} {formatDate(existingRating2?.createdTime)}</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="ml-auto px-2"
                                    onClick={() => handleRemoveRating(movieIndex, movie?.itemId, existingRating2?._id)}                                                                    >
                                    <Tooltip title="Click here to remove from ratingList">
                                        {loading[movieIndex] ? (
                                            <i className="fa-solid fa-virus-slash fa-spin-pulse py-2 px-3 bg-red-500 text-xl text-white"></i>
                                        ) : (
                                            <i className="fa-solid fa-virus-slash px-2 text-white text-xl bg-red-500 rounded-lg py-2"></i>
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
                                            <a href={`/${mediaType}/${movie?.movieId}`}>
                                                <div>
                                                    <img src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images"
                                                        onError={handleImageError} className="absolute top-0 left-0 w-full h-full object-cover rounded-tr-xl" />
                                                </div>
                                            </a>
                                        </div>
                                        <div className="px-2 py-2 w-full">
                                            <div className="text-left">
                                                <div className="h-12 w-full px-1 ">
                                                    <p className="font-bold hover:opacity-50 line-clamp-2">{movieIndex}. {movie?.itemName}</p>
                                                </div>

                                                <button className="text-left">
                                                    <div className="flex items-center gap-2 px-1 py-1   ">
                                                        <i className="fa-solid fa-star text-yellow-300"></i>
                                                        <p>{Number(movie?.itemTMDbRating).toFixed(1)} ({shortenNumber(movie?.itemTMDbRatingCount)})</p>
                                                    </div>
                                                    <div className="" onClick={() => handleClick(movieIndex, existingRating2?.itemRating)}>
                                                        {
                                                            existingRating2 ? (
                                                                loading2[movieIndex] ? (
                                                                    <div>
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse "></i>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-2 hover:bg-gray-300 w-fit hover:text-gray-200 px-1 py-1">
                                                                        <i className="fa-solid fa-star text-blue-500"></i>
                                                                        <div>{existingRating2?.itemRating}</div>
                                                                    </div>
                                                                )
                                                            ) : (
                                                                <div className="font-bold text-sm">
                                                                    {loading2[movieIndex] ? (
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>
                                                                    ) : (
                                                                        <div className="hover:bg-gray-200 w-fit rounded-lg">
                                                                            <i className="fa-regular fa-star text-blue-500"></i>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </button>
                                                <div className="flex flex-wrap px-1">
                                                    {movie?.itemTMDbReleaseDay?.slice(0, 10)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-2 py-2" onClick={() => handleRemoveRating(movieIndex, movie?.itemId, existingRating2?._id)}>
                                    <button className="px-2 py-1 bg-gray-300 hover:bg-blue-300 text-blue-500 w-full rounded-md font-medium text-center items-center">
                                        {loading[movieIndex] ? (
                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>
                                        ) :
                                            (
                                                <div>{translations[language]?.remove}</div>
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
            <div className="bg-black py-2">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                    <div className="w-full bg-black text-white ">
                        <div className="flex items-center  ">
                            <h2 className="lg:text-2xl text-lg font-bold  capitalize"> {userInfoList[1]} {translations[language]?.rating} </h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm" >
                            <a target='_blank' href='https://github.com/watanuki469?tab=repositories' className='text-blue-500 hover:underline'>
                                {userInfoList[1]}-{translations[language]?.editor}
                            </a>
                            <div>•</div>
                            <div> {translations[language]?.createdModified}</div>
                        </div>
                    </div>
                </div>
            </div>
            {isRating && (
                <div className="fixed top-0 left-0 right-0 w-screen h-full bg-black text-white bg-opacity-50 flex text-center justify-center items-center z-50">
                    <div>
                        <div className="rounded-lg w-full bg-black px-4 py-4 ">
                            <div className="flex items-center justify-end">
                                <div className="flex justify-end">
                                    <button onClick={() => setIsRating(false)} className="text-white hover:text-gray-700 px-2 py-2 rounded-full">
                                        <i className="fa-solid fa-times text-xl"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-52 ">
                                <div className=" flex flex-col items-center">
                                    <i className="fa-solid fa-star text-9xl text-blue-500"></i>
                                    <p className="-translate-y-20 text-4xl font-extrabold ">{value ? value : '?'}</p>
                                </div>
                                <p className="text-yellow-300 font-bold text-center capitalize"> {translations[language]?.rating}  {mediaType}</p>
                            </div>
                            <div className="flex flex-col flex-wrap items-center justify-center text-center gap-2 mt-2">
                                <p className="lg:text-2xl text-xl">{ratingList[numberIndex]?.itemName}</p>
                                <div className="px-2 py-2">
                                    <Rating
                                        name="customized-10"
                                        value={value}
                                        size="large"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        max={10}
                                        sx={{ color: 'blue', mt: 1, '& .MuiRating-iconEmpty': { color: 'gray', }, }}
                                    />
                                    <br />
                                    <button
                                        className={`px-2 py-2 justify-center mt-2 capitalize items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`}
                                        onClick={() => handleRating(value)}
                                    >
                                        {loading2[numberIndex] ? (
                                            <div>
                                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                            </div>
                                        ) : (
                                            <div>{translations[language]?.rate}</div>
                                        )}
                                    </button>
                                    <button
                                        className={`px-2 py-2 justify-center capitalize mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`}
                                        onClick={() => handleRemoveRating(numberIndex, ratingList[numberIndex]?.id, ratingList[numberIndex]?._id)}
                                    >
                                        {loading3[numberIndex] ? (
                                            <div>
                                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                            </div>
                                        ) : (
                                            <div className="">
                                                <div>{translations[language]?.remove} {translations[language]?.rate}</div>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-black text-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center bg-white ">
                    <div className="grid grid-cols-12 gap-2 w-full">
                        <div className="lg:col-span-8 col-span-12  w-full ">
                            <div className="flex border-b-2 border-gray py-2 items-center px-2 ">
                                <div className="items-center ">
                                    <h2 className=" font-bold ">
                                        {
                                            ratingList?.filter((movie: any) => {
                                                // Lọc theo khoảng ngày phát hành
                                                if (!fromDate || !toDate) return true;
                                                const releaseDate = (movie?.itemTMDbReleaseDay?.slice(0, 4));
                                                const from = (fromDate);
                                                const to = (toDate);
                                                return (releaseDate >= from && releaseDate <= to)
                                            })
                                                .filter((movie: any) => {
                                                    if (fromRating !== '' && toRating !== '') {
                                                        return movie?.itemTMDbRating >= fromRating && movie?.itemTMDbRating <= toRating;
                                                    }
                                                    return true;
                                                })
                                                .filter((movie: any) => {
                                                    if (fromVotes !== '' && toVotes !== '') {
                                                        const from = new Number(fromVotes)
                                                        const to = new Number(toVotes)
                                                        return movie?.itemTMDbRatingCount >= from && movie?.itemTMDbRatingCount <= to;
                                                    }
                                                    return true;
                                                })?.length} {mediaType}</h2>
                                </div>
                                <div className=" items-center ml-auto gap-2 flex" >
                                    <p className="items-center text-gray-400 hidden lg:flex ">{translations[language]?.sortBy} </p>
                                    <div className='hidden lg:block'>
                                        <Button
                                            id="demo-customized-button"
                                            aria-controls={anchorRankingEl ? 'demo-customized-menu' : undefined}
                                            aria-haspopup="true" variant="contained"
                                            disableElevation onClick={handleRankingClick}
                                            endIcon={<i className="fa-solid fa-caret-down"></i>}
                                            sx={{ bgcolor: anchorRankingEl ? 'blue' : 'white', color: anchorRankingEl ? 'white' : 'blue', ":hover": { backgroundColor: 'blue', color: 'white' }, }}
                                        >
                                            {selectedRankingOption ? selectedRankingOption : `{${translations[language]?.options}`}
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
                                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'white', color: 'black', padding: '20px', ":hover": { opacity: '50%' } }}>
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
                                                        <div className="py-2 text-yellow-300 font-semibold capitalize">{translations[language]?.options}</div>
                                                        <div className="flex gap-2 items-center flex-wrap">
                                                            <div onClick={() => setMediaType("movie")} className={`hover:bg-yellow-400 rounded-3xl justify-center text-center px-2 py-1 border-2 border-white  ${mediaType === "movie" ? "bg-yellow-300 text-black" : ""}`}>Movie</div>
                                                            <div onClick={() => setMediaType("tv")} className={`hover:bg-yellow-400 rounded-3xl justify-center text-center px-2 py-1  border-2 border-white ${mediaType === "tv" ? "bg-yellow-300 text-black" : ""}`}>TV</div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full text-left py-2">
                                                        <div className="w-full items-center">
                                                            <div className="py-2 text-yellow-300 font-semibold capitalize">{translations[language]?.releaseDay} </div>
                                                            <div className="flex items-center gap-2 text-black">
                                                                <input id="startDate" name="startDate" className="border border-gray-300 px-2 py-1 w-full" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                                                                <p className="px-1 text-white">{translations[language]?.to} </p>
                                                                <input id="endDate" name="endDate" className="border border-gray-300 px-2 py-1 w-full" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full text-left py-2">
                                                        <div className="w-full items-center">
                                                            <div className="py-2 text-yellow-300 font-semibold uppercase">IMDb {translations[language]?.rating} </div>
                                                            <div>{translations[language]?.user}  {translations[language]?.rating} </div>
                                                            <div className="flex items-center gap-2 text-black">
                                                                <input id="fromRating" name="fromRating" className="border border-gray-300 px-2 py-1 w-full" value={fromRating} onChange={(e) => setFromRating(e.target.value)} />
                                                                <p className="px-1 text-white">{translations[language]?.to} </p>
                                                                <input id="toRating" name="toRating" className="border border-gray-300 px-2 py-1 w-full" value={toRating} onChange={(e) => setToRating(e.target.value)} />
                                                            </div>
                                                            <div className="py-1">{translations[language]?.votes} </div>
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
                                    <p className="flex items-center text-lg text-gray-400 ">{translations[language]?.sortBy}  </p>
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
                                        {selectedRankingOption ? selectedRankingOption :`${translations[language]?.options}`}
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
                                        {ratingList
                                            .filter((movie: any) => {
                                                // Lọc theo khoảng ngày phát hành
                                                if (!fromDate || !toDate) return true;
                                                const releaseDate = (movie?.itemTMDbReleaseDay?.slice(0, 4));
                                                const from = (fromDate);
                                                const to = (toDate);
                                                return (releaseDate >= from && releaseDate <= to)
                                            })
                                            .filter((movie: any) => {
                                                if (fromRating !== '' && toRating !== '') {
                                                    return movie?.itemTMDbRating >= fromRating && movie?.itemTMDbRating <= toRating;
                                                }
                                                return true;
                                            })
                                            .filter((movie: any) => {
                                                if (fromVotes !== '' && toVotes !== '') {
                                                    const from = new Number(fromVotes)
                                                    const to = new Number(toVotes)
                                                    return movie?.itemTMDbRatingCount >= from && movie?.itemTMDbRatingCount <= to;
                                                }
                                                return true;
                                            })
                                            .sort((a: any, b: any) => {
                                                const dateA = new Date(a?.itemTMDbReleaseDay).getTime();
                                                const dateB = new Date(b?.itemTMDbReleaseDay).getTime();
                                                if (menuItemNum === '5') {
                                                    // Sắp xếp theo thứ tự alphabet của title
                                                    const titleA = a?.itemName?.toUpperCase();
                                                    const titleB = b?.itemName?.toUpperCase();
                                                    if (titleA < titleB) { return -1; }
                                                    if (titleA > titleB) { return 1; }
                                                    return 0;
                                                }
                                                else if (menuItemNum === '1') {
                                                    return b?.itemTMDbRating - a?.itemTMDbRating;
                                                }
                                                else if (menuItemNum === '2') {
                                                    return a?.itemId - b?.itemId;
                                                }
                                                else if (menuItemNum === '3') {
                                                    return dateA - dateB;
                                                }
                                                else if (menuItemNum === '4') {
                                                    return a?.itemTMDbRatingCount - b?.itemTMDbRatingCount;

                                                }
                                                else if (menuItemNum === '7') {
                                                    return dateB - dateA;
                                                }
                                                else if (menuItemNum === '6') {
                                                    return b?.itemId - a?.itemId;
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