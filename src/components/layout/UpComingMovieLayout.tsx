import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleImageError } from "../../modules/BaseModule";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGenre } from "../../redux/reducers/genre.reducer";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchFavorite, fetchGetFavorites } from "../../redux/reducers/login.reducer";
import { clearListUpComing, fetchUpComing } from "../../redux/reducers/upComing.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";

export default function UpComingMovieLayout() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const [mediatype, setMediaType] = useState('movie');
    const upComingList = useAppSelector((state) => state.upComing.listUpComing)
    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre)
    const favoriteList = useAppSelector((state) => state.login.listFavorite);
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];
        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);

    const handleWatchList = async (
        index: number,
        movieId: any,
        movieName: any,
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
            userInfoList[0], movieId, mediatype, movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
        ));
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchUpComing(mediatype, page))
        dispatch(fetchGenre(mediatype))
        dispatch(setGlobalLoading(false));
    }, [dispatch, page, mediatype]);

    useEffect(() => {
        if (userInfoList?.length > 0) {
            dispatch(fetchGetFavorites(userInfoList[0]));
        }
    }, [userInfoList]);

    const genreMapping: Record<number, string> = listGenreFromApi?.reduce((acc: Record<number, string>, genre: { id: number, name: string }) => {
        acc[genre?.id] = genre?.name;
        return acc;
    }, {});
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;
    const groupByReleaseDate = (list: any) => {
        return list.reduce((acc: any, item: any) => {
            const date = new Date(item?.release_date ? item?.release_date : item?.first_air_date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
            return acc;
        }, {});
    };

    const groupedItems = groupByReleaseDate(upComingList || []);
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
    const handleMediaChange = (mediaType: any) => {
        dispatch(clearListUpComing())
        setMediaType(mediaType)
        setPage(1);
    };

    return (
        <div className=" min-h-screen cursor-pointer w-full">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center py-1 ">
                    <TopBar />
                </div>
            </div>

            <div className="bg-black w-full">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center bg-white py-2 px-2 ">
                    <div className="lg:text-5xl text-xl">
                        <p className="font-bold">{translations[language]?.releaseCalendar}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 font-bold justify-start">
                        <div onClick={() => handleMediaChange('movie')} className={`px-4 py-2 text-center ${mediatype === 'movie' ? 'border-b-2 border-blue-500' : ''} bg-white hover:bg-gray-300 text-black`}>Movie</div>
                        <div onClick={() => handleMediaChange('tv')} className={`px-4 py-2 min-w-20 text-center ${mediatype === 'tv' ? 'border-b-2 border-blue-500' : ''} bg-white hover:bg-gray-300 text-black`}>TV</div>
                    </div>

                    <div className="w-full">
                        {Object.entries(groupedItems)?.map(([date, items]: any, index: any) => (
                            <div key={`${date}-123-${index}`} className="w-full">
                                <p className="text-2xl font-bold py-2">{date}</p>
                                <div className="border-gray-300 border-2 divide-y divide-gray-300 px-2 w-full">
                                    {items?.map((item: any, itemIndex: any) => {
                                        const existingIndex = favoriteList?.findIndex(fav => fav?.itemId == item?.id);
                                        return (
                                            <div key={itemIndex} className="w-full flex items-center">
                                                <div className="flex items-center px-2 py-2 gap-2 mt-2 flex-grow">
                                                    <a href={`/${mediatype}/${item?.id}`} className="min-w-16 h-fit ">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images"
                                                            className="w-16 h-fit hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl" onError={handleImageError}
                                                        />
                                                    </a>
                                                    <div className="flex flex-col justify-center flex-grow">
                                                        <p className="font-bold line-clamp-1">{item?.title ? item?.title : item?.name} ({item?.release_date ? item?.release_date?.slice(0, 4) : item?.first_air_date?.slice(0, 4)})</p>
                                                        <p className="truncate">{translations[language]?.originals}: {item?.original_language}</p>
                                                        <p>
                                                            {translations[language]?.genre}: {item?.genre_ids?.map((genreId: any, genreIndex: any, array: any) => (
                                                                <a href={`/search?genres=${genreMapping[genreId]}`}>
                                                                    <span key={`${item?.id}-${genreId}`} className="hover:underline hover:text-blue-500"></span>
                                                                    {genreMapping[genreId]} {genreIndex < array?.length - 1 && <span> • </span>}
                                                                </a>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="ml-auto px-2 flex items-center">
                                                    <button onClick={() => handleWatchList(itemIndex, item?.id, item?.title || item?.name, item?.poster_path, item?.first_air_date ? item?.first_air_date : item?.release_date, item?.genre_ids, item?.overview, item?.popularity, item?.vote_average, item?.vote_count)}
                                                        className="flex items-center px-4 py-2 w-full hover:opacity-80 justify-end border-none">
                                                        <div>
                                                            {existingIndex !== -1 ? (
                                                                loading[itemIndex] ? (
                                                                    <div><i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i></div>
                                                                ) : (
                                                                    <div className="relative inline-block">
                                                                        <i className="fa-solid fa-bookmark text-yellow-300 lg:text-4xl text-3xl"></i>
                                                                        <i className="fa-solid fa-check text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm"></i>
                                                                    </div>
                                                                )
                                                            ) : (
                                                                <div className="font-bold text-sm">
                                                                    {loading[itemIndex] ? (
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>
                                                                    ) : (
                                                                        <div className="relative inline-block">
                                                                            <i className="fa-solid fa-bookmark text-gray-300 lg:text-4xl text-3xl"></i>
                                                                            <i className="fa-solid fa-plus text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm"></i>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="load-more"><div className="bg-white text-black text-center py-2"><i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i></div></div>
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <Footer />
                </div>
            </div>
        </div>
    )
}