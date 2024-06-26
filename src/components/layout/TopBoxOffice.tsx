import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Rating, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Charts from "../../modules/Charts";
import ListRow from "../../modules/ListRow";
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";
import { getListRatingMongoApi, ratingMongoApi, removeRatingMongoApi } from "../../redux/client/api.LoginMongo";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { setDeleteRating, setListRating, setRating } from "../../redux/reducers/login.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { AppDispatch } from "../../redux/store";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { LanguageContext } from '../../pages/LanguageContext';
import Share from '../../modules/Share';

export default function TopBoxOffice() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const topRatedMovies = useAppSelector((state) => state.movies.discoverMovies)
    const topRatedTV = useAppSelector((state) => state.movies.discoverTv)

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
    const preMonth = (currentMonth === 0) ? 11 : currentMonth - 1; // Xác định tháng trước đó
    const currenDateToday = currentDate.getDate();
    const currentMonthName = monthNames[currentMonth];
    const preMonthName = monthNames[preMonth];
    // Lấy ngày 5 ngày trước
    const currentDatePre = new Date(currentDate);
    currentDatePre.setDate(currentDatePre.getDate() - 5);
    const currenDatePre = currentDatePre.getDate();

    const [currentView, setCurrentView] = useState('Detail'); // Default view is 'detail'

    const switchView = (view: any) => {
        setCurrentView(view);
    };
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750'; // Set the fallback image source here
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
        }, 1000);
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
                                            onError={handleImageError}
                                            className="w-20 h-28 hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl"
                                        />
                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.title}</p>
                                            <p>{translations[language]?.weekend}: <span className="font-semibold">${(movie?.vote_average * 2.9).toFixed(1)}M </span></p>
                                            <p>{translations[language]?.total}: <span className="font-semibold">${movie?.popularity?.toFixed(0.2)}M</span> </p>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                </div>
                                                <button className="flex items-center gap-2  px-2 hover:text-black text-blue-500">
                                                    <div className="grow ml-auto" onClick={() => handleClick(movie, existingRating?.itemRating)}>
                                                        {
                                                            existingRating ? (
                                                                loading2[movieIndex] ? (
                                                                    <div>
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center  gap-2 hover:bg-gray-200 w-fit px-2 py-2 rounded-lg">
                                                                        <i className="fa-solid fa-star text-blue-500"></i>
                                                                        <div>{existingRating?.itemRating}</div>
                                                                    </div>

                                                                )
                                                            ) : (
                                                                <div className="font-bold text-sm">
                                                                    {loading2[movieIndex] ? (
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                    ) : (
                                                                        <div className="hover:bg-gray-200  flex gap-2 flex-wrap w-fit items-center px-2 py-2 rounded-lg">
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
                    <section className=" w-1/2 md:w-1/4 px-2 sm:w-1/3 lg:1/4" key={movieIndex}
                    >
                        <div className="text-black font-sans  shadow-sm shadow-black rounded-tr-xl " >
                            <div className=" items-center ">
                                <div className="mt-2">
                                    <div className="items-center gap-2 ">
                                        <div className="relative w-full pb-[150%] hover:opacity-80">
                                            <img onClick={() => navigate(`/movie/${movie?.id}`)}
                                                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="product images"
                                                onError={handleImageError} className="absolute top-0 left-0 w-full h-full object-cover rounded-tr-xl" />
                                        </div>
                                        <div className="">
                                            <div className="justify-start text-left px-2 py-2">
                                                <div className="h-12 w-full ">
                                                    <p className="font-bold hover:opacity-50 line-clamp-2">{movieIndex}. {movie?.name ? movie?.name : movie?.title}</p>
                                                </div>
                                                <p>{translations[language]?.weekend}: <span className="font-semibold">${(movie?.vote_average * 2.9).toFixed(1)}M </span></p>
                                                <p>{translations[language]?.total} : <span className="font-semibold">${movie?.popularity?.toFixed(0.2)}M</span> </p>
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
                                                                            <i className="fa-regular fa-star text-blue-500"></i>  Rate
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
                                        {translations[language]?.details}
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
                                            onError={handleImageError} className="w-20 h-28 hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl" />
                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.title}</p>
                                            <div>
                                                <p>{translations[language]?.weekend} : <span className="font-semibold">${(movie?.vote_average * 2.9).toFixed(1)}M </span></p>
                                                <p>{translations[language]?.total} : <span className="font-semibold">${movie?.popularity?.toFixed(0.2)}M</span> </p>

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

    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;
    return (
        <div className=" min-h-screen cursor-pointer px-2">
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
                    <div className="lg:max-w-full w-full ">
                        <div className="flex items-center  ">
                            <h2 className="lg:text-2xl text-lg font-bold text-black ">IMDb {translations[language]?.chart}</h2>
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center lg:text-2xl  text-lg text-black ">{translations[language]?.share} </p>
                            </div>
                            <Share />
                        </div>
                        <div className="">
                            <div className="flex items-center ">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="lg:text-2xl text-lg font-bold text-black ">IMDb {translations[language]?.topBoxOffice}</h2>
                            </div>
                            <p className="text-gray-500 py-2">{translations[language]?.weekend} {currenDatePre > 28 ? preMonthName : currentMonthName} {currenDatePre} {`->`} {currentMonthName} {currenDateToday}</p>
                        </div>

                    </div>
                    <div className="grid grid-cols-12 gap-2 w-full items-center">
                        <div className="lg:col-span-8 col-span-12  w-full ">
                            <div className="flex items-center">
                                <h2 className="lg:text-2xl text-lg text-black ">
                                    {topRatedMovies
                                        .slice(0, 10)
                                        .map((m, index) => renderMovieItem(m, index, currentView, sortOrder))?.length}
                                    /10 Office</h2>
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
                            <div className="lg:max-w-full w-full lg:px-2 lg:py-2 ">
                                <div
                                    style={{
                                        position: "relative", backgroundSize: "cover", backgroundPosition: "center",
                                        display: 'flex', flexWrap: 'wrap'
                                    }}>
                                    {topRatedMovies?.length === 0 && (
                                        <div style={{
                                            backgroundImage: `url(https://filmfair.in/website/images/error_screens/no-result.png')`,
                                            position: "absolute", width: "100%", height: "100%", opacity: "0.5",
                                            backgroundSize: "cover", backgroundPosition: "center", backgroundColor: 'black'
                                        }}>
                                        </div>
                                    )}
                                    {topRatedMovies
                                        .slice(0, 10)
                                        .map((m, index) => renderMovieItem(m, index, currentView, sortOrder))}
                                </div>
                            </div>

                        </div>
                        <div className="hidden lg:block col-span-4  h-full px-2 text-xl">
                            <div>
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-3xl font-bold text-black capitalize ">{translations[language]?.moreExplore}</h2>
                                </div>
                                <div className="lg:max-w-full w-full" onClick={() => navigate(`/top250TV`)}>
                                    <ListRow listRowList={topRatedTV} />
                                </div>
                                <p className="text-red w-full text-black"> {translations[language]?.staffPick}</p>
                                <p className="text-red w-full text-blue-500 hover:underline"> {translations[language]?.seeOurPick}</p>
                            </div>
                            <div>
                                <div className="flex items-center py-2">
                                    <h2 className="text-xl font-bold text-black capitalize ">{translations[language]?.chart}</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <Charts />
                                </div>
                            </div>
                            <div className='sticky top-0 right-0 left-0'>
                                <div className="flex items-center py-2">
                                    <h2 className="text-xl font-bold text-black capitalize">{translations[language]?.moreExplore} {translations[language]?.genre}</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
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