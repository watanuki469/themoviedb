import { useContext, useEffect } from "react";
import Charts from "../../modules/Charts";
import ListRow from "../../modules/ListRow";
import Share from '../../modules/Share';
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { monthNames } from "../../modules/BaseModule";

export default function WhatOnTvStream() {
    const dispatch = useAppDispatch();
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const topRatedTv = useAppSelector((state) => state.movies.listTopRatedTvReq)
    const discoverTv = useAppSelector((state) => state.movies.discoverTv)
    const discoverMovie = useAppSelector((state) => state.movies.discoverMovies)

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchMovies());
        dispatch(setGlobalLoading(false))
    }, []);
    const currentDate = new Date();
    // Lấy số tháng từ ngày hiện tại (chú ý rằng tháng trong JavaScript bắt đầu từ 0)
    const currentMonth = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonth];
    // Lấy ngày 5 ngày trước
    const currentDatePre = new Date(currentDate);
    currentDatePre.setDate(currentDatePre.getDate() - 5);

    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center bg-white px-2 ">
                    <div className="lg:max-w-full w-full ">
                        <div className="flex px-2 py-2 items-center">
                            <div className="items-center py-2 ">
                                <h2 className="lg:text-5xl text-2xl font-bold text-black ">{translations[language]?.whatOnTvStream}</h2>
                            </div>
                            <div className="flex items-center ml-auto" >
                                <Share bgColor={'black'}></Share>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 w-full">
                        <div className="lg:col-span-8 col-span-12  w-full ">
                            <div className="lg:max-w-full w-full">
                                <div
                                    className="grid grid-cols-3 gap-2 ">
                                    <a href={`/trending/netflix`}>
                                        <div className="relative hover:opacity-80">
                                            <img src={`https://image.tmdb.org/t/p/w500/${discoverTv[10]?.poster_path}`} alt="product images" className="" />
                                        </div>
                                        <p className="mt-2 hover:underline">{translations[language]?.whatNewToStreamOn} Netflix</p>
                                    </a>

                                    <a href={`/trending/prime`}>
                                        <div className="relative hover:opacity-80">
                                            <img src={`https://image.tmdb.org/t/p/w500/${topRatedMovies[10]?.poster_path}`} alt="product images" className="" />
                                        </div>
                                        <p className="mt-2 hover:underline">{translations[language]?.whatNewToStreamOn}  Prime Video</p>
                                    </a>

                                    <a href={`/trending/max`}>
                                        <div className="relative hover:opacity-80">
                                            <img src={`https://image.tmdb.org/t/p/w500/${discoverMovie[10]?.poster_path}`} alt="product images" className="" />
                                        </div>
                                        <p className="mt-2 hover:underline">{translations[language]?.whatNewToStreamOn}  Max</p>
                                    </a>
                                </div>
                                <div className="flex items-center py-5 px-2">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">{translations[language]?.staffPick} </h2>
                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 px-2 py-2 gap-4" >
                                    <div>
                                        <p>{translations[language]?.takeALookAtTheBest} </p>
                                        <a href={`/top250Movie`}>
                                            <p className="w-fit text-blue-500 hover:underline py-4" >{translations[language]?.seeOurPick} </p>
                                        </a>
                                    </div>
                                    <a href={`/top250Movie`}>
                                        <div className="max-w-full">
                                            <ListRow listRowList={topRatedMovies?.slice(3)} />
                                        </div>
                                    </a>

                                </div>
                                <div className="flex items-center py-5 px-2">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">{currentMonthName} 2024 TV + Streaming Premiere Dates</h2>
                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 px-2 py-2 gap-4" >
                                    <div>
                                        <p>{translations[language].theFinalSeasonOfEvil}</p>
                                        <a href={`/top250Tv`}>
                                            <p className="w-fit text-blue-500 hover:underline py-4" >{translations[language].seeOurPick}</p>
                                        </a>
                                    </div>
                                    <a href={`/top250Tv`}>
                                        <div className="max-w-full">
                                            <ListRow listRowList={topRatedTv?.slice(3)} />
                                        </div>
                                    </a>
                                </div>
                                <div className="flex items-center py-5 px-2">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">{translations[language].renewCancelEnding}</h2>
                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 px-2 py-2 gap-4" >
                                    <div>
                                        <p>{translations[language].checkOutOurList}</p>
                                        <a href={`/top250Tv`}>
                                            <p className="w-fit text-blue-500 hover:underline py-4" >{translations[language].seeOurPick}</p>
                                        </a>
                                    </div>
                                    <a href={`/top250Tv`}>
                                        <div className="max-w-full" >
                                            <ListRow listRowList={mostPopularTv?.slice(3)} />
                                        </div>
                                    </a>
                                </div>
                                <div className="flex items-center py-5 px-2">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">{translations[language].whatNewToStreamOn} Disney+</h2>
                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 px-2 py-2 gap-4" >
                                    <div>
                                        <p>{translations[language].freshenUpYour}</p>
                                        <a href={`/top250Movie`}>
                                            <p className="w-fit text-blue-500 hover:underline py-4">{translations[language].seeOurPick}</p>
                                        </a>
                                    </div>
                                    <a href={`/top250Movie`}>
                                        <div className="max-w-full" >
                                            <ListRow listRowList={topRatedMovies?.slice(6)} />
                                        </div>
                                    </a>
                                </div>
                                <div className="flex items-center py-5 px-2">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">{translations[language].animedKidShow} </h2>
                                </div>
                                <div className="grid grid-cols-2 px-2 py-2 gap-4" >
                                    <div>
                                        <p>{translations[language].weRoundedUpTheKid}</p>
                                        <a href={`/tv/246`}>
                                            <p className="w-full text-blue-500 hover:underline py-4">{translations[language].seeOurPick}</p>
                                        </a>
                                    </div>
                                    <a href={`/tv/246`}>
                                        <div className="max-w-full" >
                                            <img src={`https://image.tmdb.org/t/p/w500//8RFAXPLs3qg5YVYbv5ME46syBKy.jpg`} alt="product images" className="w-full" />
                                        </div>
                                    </a>
                                </div>
                            </div>

                        </div>
                        <div className="lg:col-span-4 col-span-12  h-full px-2 py-2 text-xl capitalize">
                            <div>
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">{translations[language]?.moreExplore}</h2>
                                </div>
                                <a href={`/top250Movie`}>
                                    <div className="lg:max-w-full w-full">
                                        <ListRow listRowList={topRatedMovies} />
                                    </div>
                                </a>

                                <p className=" w-full text-black">{translations[language]?.staffPick}</p>
                                <p className=" w-full text-blue-500 hover:underline">{translations[language]?.seeOurPick}</p>
                            </div>
                            <div>
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black ">{translations[language]?.chart}</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <Charts />
                                </div>
                            </div>
                            <div className="sticky top-0 right-0 left-0">
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black capitalize">{translations[language]?.moreExplore}{translations[language]?.genre}</h2>
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
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <Footer />
                </div>
            </div>
        </div >
    )
}