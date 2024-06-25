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

export default function UpComingMovieLayout() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const [mediatype, setMediaType] = useState('movie');
    const upComingList = useAppSelector((state) => state.upComing.listUpComing)

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

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchUpComing())
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, [mediatype]);


    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750';
    };
    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre)
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
    useEffect(() => {
        dispatch(fetchGenre());
    }, [dispatch]);

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
                        <div onClick={() => setMediaType('tvEspisode')} className={`px-4 py-2 text-center ${mediatype === 'tvEspisode' ? 'border-b-2 border-blue-500' : ''} bg-white hover:bg-gray-300 text-black`}>Tv Episode</div>
                    </div>

                    <div className="mt-2">
                        {mediatype === 'movie' && upComingList[0]?.results
                            .filter((item: any) => {
                                const releaseDate = new Date(item?.release_date);
                                return releaseDate >= new Date();
                            })
                            .sort((a: any, b: any) => new Date(a?.release_date).getTime() - new Date(b?.release_date).getTime())
                            .map((item: any, index: any) => (
                                <div key={index}>
                                    <p className="text-2xl font-bold">
                                        {item?.release_date &&
                                            new Date(item?.release_date).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })
                                        }
                                    </p>
                                    <div className="border-gray-300 border-2">
                                        <div className="flex mt-2">
                                            <div className="flex px-2 py-2 gap-2">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                                                    alt="product images"
                                                    className="w-20 h-28 hover:opacity-80"
                                                    onError={handleImageError}
                                                    onClick={() => navigate(`/${item?.title ? 'movie' : 'tv'}/${item?.id}`)}
                                                />
                                                <div className="items-center">
                                                    <p className="font-bold">{item?.title} ({item?.release_date?.slice(0, 4)})</p>
                                                    <p>{translations[language]?.originals}: {item?.original_language}</p>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        {translations[language]?.genre}: {item?.genre_ids?.map((genreId: GenreID, genreIndex: number, array: GenreID[]) => (
                                                            <div key={genreIndex + genreId} className="flex items-center flex-wrap gap-2">
                                                                <div className="flex flex-wrap items-center gap-2 hover:underline hover:text-blue-500" onClick={() => navigate(`/search?genres=${genreMapping[genreId]}`)} key={genreIndex}>
                                                                    {genreMapping[genreId]}
                                                                </div>
                                                                {genreIndex < array?.length - 1 && <span> • </span>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

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