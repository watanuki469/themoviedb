import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { AppDispatch } from "../../redux/store";
import apiController from "../../redux/client/api.Controller.";
import { setListUpComing } from "../../redux/reducers/upComing.reducer";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";

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
        // dispatch(setGlobalLoading(true));
        dispatch(fetchUpComing())
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, [mediatype]);


    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };
    type GenreID = number;
    type GenreName = string;
    const genreMapping: Record<GenreID, GenreName> = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
    };

    return (
        <div className=" min-h-screen cursor-pointer px-2 py-2">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                </div>
            </div>

            <div className="bg-white">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <div className="lg:flex items-center lg:text-5xl text-xl gap-3 px-2 py-2">
                        <p>Upcoming releases</p>
                        <p className="text-blue-500">United States</p>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4">
                        <button
                            className={`px-3 py-3 text-black border-2 border-gray-300 rounded-full text-center items-center justify-center hover:bg-gray-400  ${mediatype === 'movie' ? 'bg-gray-400' : 'bg-white'}`}
                            onClick={() => setMediaType('movie')}
                        >
                            Movie
                        </button>
                        <button
                            className={`px-3 py-3 text-black border-2 border-gray-300 rounded-full text-center items-center justify-center hover:bg-gray-400  ${mediatype === 'tv' ? 'bg-gray-400' : 'bg-white'}`}
                            onClick={() => setMediaType('tv')}
                        >
                            TV
                        </button>
                        <button
                            className={`px-3 py-3 text-black border-2 border-gray-300 rounded-full text-center items-center justify-center hover:bg-gray-400  ${mediatype === 'TvEspisode' ? 'bg-gray-400' : 'bg-white'}`}
                            onClick={() => setMediaType('tvEspisode')}
                        >
                            Tv Episode
                        </button>
                    </div>
                    <div className="mt-4">
                        {mediatype === 'movie' && upComingList[0]?.results?.map((item: any, index: any) => {
                            const releaseDate = new Date(item?.release_date);
                            if (releaseDate >= new Date()) {
                                return (
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
                                        <div className="border-gray-300 border-2 mt-3 mb-2">
                                            <div className="flex mt-2">
                                                <div className="flex px-2 py-2 gap-2">
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                                                        alt="product images"
                                                        className="w-20 h-28 hover:opacity-80"
                                                        onError={handleImageError}
                                                    />
                                                    <div>
                                                        <p>{item?.original_title} ({item?.release_date?.slice(0, 4)})</p>
                                                        <p>Original Language: {item?.original_language}</p>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            Genre: {item?.genre_ids?.map((genreId: GenreID, genreIndex: number, array: GenreID[]) => (
                                                                <div className="flex flex-wrap items-center gap-2" key={genreIndex}>
                                                                    {genreMapping[genreId]}
                                                                    {genreIndex < array.length - 1 && <span> • </span>}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null; // Tránh hiển thị phần tử không hợp lệ
                        })}

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