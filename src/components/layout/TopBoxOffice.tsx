import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Charts from "../../modules/Charts";
import ListRow from "../../modules/ListRow";
import RatingModule from '../../modules/RatingModule';
import Share from '../../modules/Share';
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { handleImageError, monthNames, shortenNumber } from '../../modules/BaseModule';

export default function TopBoxOffice() {
    const dispatch = useAppDispatch()
    const topRatedMovies = useAppSelector((state) => state.movies.discoverMovies)
    const topRatedTV = useAppSelector((state) => state.movies.discoverTv)

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchMovies());
        dispatch(setGlobalLoading(false))
    }, [])

    const currentDate = new Date();

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
                    <section className="px-2 w-full" key={movieIndex}
                    >
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <a href={`/movie/${movie?.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="product images"
                                                onError={handleImageError}
                                                className="w-20 h-28 hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl"
                                            />
                                        </a>

                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.title}</p>
                                            <p>{translations[language]?.weekend}: <span className="font-semibold">${(movie?.vote_average * 2.9).toFixed(1)}M </span></p>
                                            <p>{translations[language]?.total}: <span className="font-semibold">${movie?.popularity?.toFixed(0.2)}M</span> </p>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                </div>
                                                <div className="flex items-center gap-2  px-2 hover:bg-gray-300 hover:text-black text-blue-500">
                                                    <RatingModule mediaType={'movie'} ratingList={movie} userInfoList={userInfoList} starIndex={movieIndex} rateHidden={'false'}></RatingModule>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-1 line-clamp-2">
                                        <p>{movie?.overview}</p>
                                    </div>
                                </div>

                                <div className="ml-auto">
                                    <a href={`/movie/${movie?.id}`}>
                                        <i className="fa-solid fa-circle-info px-2 text-blue-500 text-xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            case 'Grid':
                return (
                    <section className="w-1/2 md:w-1/4 px-2 sm:w-1/3 lg:1/4" key={movieIndex}>
                        <div className="text-black font-sans  shadow-sm shadow-black rounded-tr-xl rounded-bl-xl rounded-br-xl " >
                            <div className=" items-center ">
                                <div className="mt-4">
                                    <div className="items-center gap-2 ">
                                        <div className="relative w-full pb-[150%] hover:opacity-80">
                                            <a href={`/movie/${movie?.id}`}>
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="product images"
                                                    onError={handleImageError} className="absolute top-0 left-0 w-full h-full object-cover rounded-tr-xl" />
                                            </a>
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
                                                <div className="flex items-center gap-2 w-fit hover:bg-gray-300 hover:text-black text-blue-500 ">
                                                    <RatingModule mediaType={'movie'} ratingList={movie} userInfoList={userInfoList} starIndex={movieIndex} rateHidden={'false'}></RatingModule>
                                                </div>
                                                <div className="flex flex-wrap">
                                                    {movie?.release_date?.slice(0, 4)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href={`/movie/${movie?.id}`}>
                                    <div className="px-2 py-2">
                                        <button className="px-2 py-1 bg-gray-300 hover:bg-blue-300 text-blue-500 w-full rounded-md font-medium text-center items-center">
                                            {translations[language]?.details}
                                        </button>
                                    </div>
                                </a>
                            </div>

                        </div>
                    </section>

                )
            case 'Compact':
                return (
                    <section className="px-2  w-full " key={movieIndex}
                    >
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <a href={`/movie/${movie?.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="product images"
                                                onError={handleImageError} className="w-20 h-28 hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl" />
                                        </a>
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
                                                <div className=" hover:text-black text-blue-500 hover:bg-gray-300 " >
                                                    <RatingModule mediaType={'movie'} ratingList={movie} userInfoList={userInfoList} starIndex={movieIndex} rateHidden={'false'}></RatingModule>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-auto">
                                    <a href={`/movie/${movie?.id}`}>
                                        <i className="fa-solid fa-circle-info px-2 text-blue-500 text-xl"></i>
                                    </a>

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
            <div className="bg-black py-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center px-2 bg-white py-2">
                    <div className="lg:max-w-full w-full ">
                        <div className="flex items-center  ">
                            <h2 className="lg:text-2xl text-lg font-bold text-black  capitalize">IMDb {translations[language]?.chart}</h2>
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center lg:text-2xl  text-lg text-black capitalize">{translations[language]?.share} </p>
                            </div>
                            <Share bgColor={'black'} />
                        </div>
                        <div className="">
                            <div className="flex items-center ">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="lg:text-2xl text-lg font-bold text-black capitalize">IMDb {translations[language]?.topBoxOffice}</h2>
                            </div>
                            <p className="text-gray-500 py-2">{translations[language]?.weekend} {currenDatePre > 28 ? preMonthName : currentMonthName} {currenDatePre} {`->`} {currentMonthName} {currenDateToday}</p>
                        </div>

                    </div>
                    <div className="grid grid-cols-12 gap-2 w-full items-center">
                        <div className="lg:col-span-8 col-span-12  w-full ">
                            <div className="flex items-center">
                                <h2 className="lg:text-2xl text-lg text-black ">{topRatedMovies?.slice(0, 10)?.map((m, index) => renderMovieItem(m, index, currentView))?.length}/10 {translations[language]?.count}</h2>
                                <div className="flex items-center ml-auto gap-4 px-2 py-2" >
                                    <Tooltip title="Detail View" className={`${currentView === "Detail" ? "text-blue-500" : ""}`}><i className="fa-solid fa-list-ul " onClick={() => switchView('Detail')}></i></Tooltip>
                                    <Tooltip title="Grid View" className={`${currentView === "Grid" ? "text-blue-500" : ""}`}><AppsIcon onClick={() => switchView('Grid')} /></Tooltip>
                                    <Tooltip title="Compact View" className={`${currentView === "Compact" ? "text-blue-500" : ""}`}><MenuIcon onClick={() => switchView('Compact')} /></Tooltip>
                                </div>
                            </div>
                            <div className="lg:max-w-full w-full px-2 py-2">
                                <div className={`${currentView === 'Detail' || currentView === 'Compact' ? 'divide-y divide-gray-500 border border-gray-500' : ''}`}
                                    style={{ position: "relative", backgroundSize: "cover", backgroundPosition: "center", display: 'flex', flexWrap: 'wrap' }}>
                                    {topRatedMovies?.length === 0 && (
                                        <div style={{ backgroundImage: `url(https://filmfair.in/website/images/error_screens/no-result.png')`, position: "absolute", width: "100%", height: "100%", opacity: "0.5", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: 'black' }}></div>
                                    )}
                                    {topRatedMovies?.slice(0, 10)?.map((m, index) => renderMovieItem(m, index, currentView))}
                                </div>
                            </div>

                        </div>
                        <div className="lg:col-span-4  col-span-12  h-full px-2 text-xl">
                            <div>
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-3xl font-bold text-black capitalize ">{translations[language]?.moreExplore}</h2>
                                </div>
                                <a href={`/top250TV`}>
                                    <div className="lg:max-w-full w-full">
                                        <ListRow listRowList={topRatedTV} />
                                    </div>
                                </a>
                                <p className="text-red w-full text-black"> {translations[language]?.staffPick}</p>
                                <a href={`/top250TV`}>
                                    <p className="text-red w-full text-blue-500 hover:underline"> {translations[language]?.seeOurPick}</p>
                                </a>
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
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <Footer />
                </div>
            </div>
        </div >
    )
}