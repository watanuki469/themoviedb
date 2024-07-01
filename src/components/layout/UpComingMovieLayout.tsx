import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { AppDispatch } from "../../redux/store";
import apiController from "../../redux/client/api.Controller.";
import { setListUpComing } from "../../redux/reducers/upComing.reducer";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { setListGenre } from "../../redux/reducers/genre.reducer";
import { LanguageContext } from "../../pages/LanguageContext";
import { favoriteMongoApi, getFavoriteMongoApi } from "../../redux/client/api.LoginMongo";
import { setFavorite, setListFavorite } from "../../redux/reducers/login.reducer";
import { toast } from "react-toastify";

export default function UpComingMovieLayout() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const [mediatype, setMediaType] = useState('movie');
    const upComingList = useAppSelector((state) => state.upComing.listUpComing)
    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre)
    const favoriteList = useAppSelector((state) => state.login.listFavorite);
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [checkLog, setCheckLog] = useState(false)
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);

    const fetchUpComing = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiUpComing.upComing(mediatype),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListUpComing(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const fetchGenre = () => (dispatch: AppDispatch) => {
        apiController.apiGenre.genre(mediatype)
            .then((data: any) => {
                if (data && data?.genres) {
                    dispatch(setListGenre(data?.genres)); // Adjust the dispatch based on actual response structure
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const fetchGetFavorites = () => async (dispatch: AppDispatch) => {
        try {
            const response = await getFavoriteMongoApi(userInfoList[0]);
            if (response) {
                dispatch(setListFavorite(response));
            } else {
                throw new Error('Failed to fetch favorites');
            }
        } catch (e) {
            console.log("Fetching favorites failed: " + e);
        }
    }
    const fetchFavorite = (
        movieId: string,
        movieName: string,
        movieImg: string,
        movieReleaseDay: Date,
        movieGenre: number[],
        movieReview: string,
        moviePopularity: string,
        movieVoteAverage: string,
        movieVoteCount: string
    ) => async (dispatch: AppDispatch) => {
        const email = userInfoList[0];
        try {
            const response = await favoriteMongoApi(
                email, movieId, mediatype === 'movie' ? 'Movie' : 'TV', movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
            );
            dispatch(setFavorite(response));

            if (response) {
                await dispatch(fetchGetFavorites());

            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Updating watch list failed");
        }
    };

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
            movieId, movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
        ));
        setCheckLog(!checkLog);
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };


    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchUpComing())
        dispatch(fetchGenre());
        dispatch(setGlobalLoading(false));
    }, [mediatype, dispatch]);

    useEffect(() => {
        if (userInfoList.length > 0) {
            dispatch(fetchGetFavorites());
        }
    }, [userInfoList]);
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750';
    };

    type GenreID = number;
    type GenreName = string;
    // const genreMapping: Record<GenreID, GenreName> = {
    //     28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western', 10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics'
    // };
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
            const date = new Date(item.release_date ? item.release_date : item.first_air_date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
            return acc;
        }, {});
    };

    const groupedItems = groupByReleaseDate(upComingList[0]?.results || []);


    return (
        <div className=" min-h-screen cursor-pointer px-2 py-2">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center py-1 ">
                    <TopBar />
                </div>
            </div>

            <div className="bg-white">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <div className="lg:text-5xl text-xl py-2 px-2">
                        <p className="font-bold">{translations[language]?.releaseCalendar}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 font-bold justify-start">
                        <div onClick={() => setMediaType('movie')} className={`px-4 py-2 text-center ${mediatype === 'movie' ? 'border-b-2 border-blue-500' : ''} bg-white hover:bg-gray-300 text-black`}>Movie</div>
                        <div onClick={() => setMediaType('tv')} className={`px-4 py-2 min-w-20 text-center ${mediatype === 'tv' ? 'border-b-2 border-blue-500' : ''} bg-white hover:bg-gray-300 text-black`}>TV</div>
                        {/* <div onClick={() => setMediaType('tvEspisode')} className={`px-4 py-2 text-center ${mediatype === 'tvEspisode' ? 'border-b-2 border-blue-500' : ''} bg-white hover:bg-gray-300 text-black`}>Tv Episode</div> */}
                    </div>

                    <div>
                        {Object.entries(groupedItems).map(([date, items]: any, index: any) => (
                            <div key={index} className="">
                                <p className="text-2xl font-bold py-2">{date}</p>
                                <div className="border-gray-300 border-2 divide-y divide-gray-300 px-2">
                                    {items.map((item: any, itemIndex: any) => {
                                        const existingIndex = favoriteList.findIndex(fav => fav?.itemId == item?.id);
                                        return (
                                            <div className="mt-2 flex items-center">
                                                <div key={itemIndex} className="flex px-2 py-2 gap-2 mt-2 ">
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                                                        alt="product images"
                                                        className="w-20 h-28 hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl"
                                                        onError={handleImageError}
                                                        onClick={() => navigate(`/${mediatype}/${item?.id}`)}
                                                    />
                                                    <div className="items-center">
                                                        <p className="font-bold">{item?.title ? item?.title : item?.name} ({item?.release_date ? item?.release_date?.slice(0, 4) : item?.first_air_date?.slice(0, 4)})</p>
                                                        <p>{translations[language]?.originals}: {item?.original_language}</p>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            {translations[language]?.genre}: {item?.genre_ids?.map((genreId: any, genreIndex: any, array: any) => (
                                                                <div key={genreIndex + genreId} className="flex items-center flex-wrap gap-2">
                                                                    <div className="flex flex-wrap items-center gap-2 hover:underline hover:text-blue-500" onClick={() => navigate(`/search?genres=${genreMapping[genreId]}`)} key={genreIndex}>
                                                                        {genreMapping[genreId]}
                                                                    </div>
                                                                    {genreIndex < array.length - 1 && <span> • </span>}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ml-auto px-2">
                                                    <button
                                                        onClick={() => handleWatchList(itemIndex, item?.id, item?.title || item?.name, item?.poster_path, item?.first_air_date ? item?.first_air_date : item?.release_date, item?.genre_ids, item?.overview, item?.popularity, item?.vote_average, item?.vote_count
                                                        )}
                                                        className="flex items-center px-4 py-2 w-full hover:opacity-80 justify-center border-none"
                                                    >
                                                        <div>
                                                            {
                                                                existingIndex !== -1 ? (
                                                                    loading[itemIndex] ? (
                                                                        <div>
                                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="relative inline-block">
                                                                            <i className="fa-solid fa-bookmark text-yellow-300 lg:text-4xl text-3xl"></i>
                                                                            <i className="fa-solid fa-check text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm"></i>
                                                                        </div>

                                                                    )
                                                                ) : (
                                                                    <div className="font-bold text-sm">
                                                                        {loading[itemIndex] ? (
                                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                        ) : (
                                                                            <div className="relative inline-block">
                                                                                <i className="fa-solid fa-bookmark text-gray-300 lg:text-4xl text-3xl"></i>
                                                                                <i className="fa-solid fa-plus text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm"></i>
                                                                            </div>

                                                                        )}
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center mt-10 ">
                    <Footer />
                </div>
            </div>
        </div>
    )
}