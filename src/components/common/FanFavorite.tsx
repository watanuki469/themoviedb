import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosWhatToWatch from "../../redux/axios/axiosWhatToWatch";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListFanFavorite } from "../../redux/reducers/fanfavorite.reducer";
import { AppDispatch } from "../../redux/store";
import { Rating } from "@mui/material";


export default function FanFavorite() {
    const dispatch = useAppDispatch();

    let navigate = useNavigate()
    const languageString = localStorage.getItem('language');
    const fanFavorite = useAppSelector((state) => state.fanFavorite.listFanFavorite)

    const fetchFanFavorite = () => (dispatch: AppDispatch) => {
        Promise.all([
            axiosWhatToWatch.get(`/getFanFavorites`),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListFanFavorite(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
        dispatch(fetchFanFavorite());
    }, [languageString]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750'; // Set the fallback image source here
    };
    // onError={(e) => {
    //     e.currentTarget.src = 'https://via.placeholder.com/500x750'; // Replace with your fallback image URL
    //     e.currentTarget.onerror = null; // Prevent infinite loop if the fallback image also fails to load
    // }}
    const handleClickImg = (id: any) => {
        window.scrollTo(0, 0)
        // navigate(`/${mediaType}/${id}`)
    };
    const [isRating, setIsRating] = useState(false);
    const [value, setValue] = useState<number | null>(0);

    const handleClose = () => {
        setIsRating(false)
        setValue(0)
    };
    const [selectedStudent, setSelectedStudent] = useState<any>();
    const handleClick = (index: any) => {
        setIsRating(true)
        setSelectedStudent(index);
    };



    return (
        <div>
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
                                <p className="text-2xl ">{selectedStudent?.titleText?.text}</p>
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
            <section className='relative overflow-hidden w-full'>
                <div className={`grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 w-full`}>
                    {fanFavorite[0]?.data?.list?.slice(12).map((item: any, index: any) => (
                        <div>
                            <div className=" object-cover">
                                <img src={`${item?.primaryImage?.imageUrl}`} alt="product images" className="h-60 w-full hover:opacity-80"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/500x750'; // Replace with your fallback image URL
                                        e.currentTarget.onerror = null; // Prevent infinite loop if the fallback image also fails to load
                                    }}

                                    onClick={() => handleClickImg(`${item?.id}`)} />
                            </div>
                            <div className="bg-gray-600 shadow-xl ">
                                <div className="mx-3 ">
                                    <div className="flex gap-x-4 items-center ">
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-star text-yellow-300"></i>
                                            <p className="leading-relaxed text-gray-200">{item?.ratingsSummary?.aggregateRating?.toFixed(1)}</p>
                                        </div>
                                        <div className="grow ml-auto" onClick={() => handleClick(item)}>
                                            <i className="fa-regular fa-star text-blue-500"></i>
                                        </div>
                                    </div>
                                    <div className="h-12 mt-2">
                                        <p className="line-clamp-2"> {item?.titleText?.text}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/IMDbPro`)}
                                        className="flex mt-1 items-center px-4 py-2 border rounded-lg w-full justify-center bg-gray-800 hover:opacity-50 text-blue-500 border-none">
                                        <i className="fas fa-plus mr-2"></i>
                                        <p>Watchlists</p>
                                    </button>
                                    <button className="flex items-center px-4 py-2 hover:opacity-60 rounded-lg w-full justify-center border-none "
                                        onClick={() => {
                                            if (item?.media_type === 'person') {
                                                navigate(`/person/${item.id}`);
                                            } else if (item?.media_type === "movie") {
                                                navigate(`/movie/${item.id}`);
                                            }
                                            else {
                                                navigate(`/tv/${item.id}`);
                                            }
                                        }}>
                                        <i className="fa-solid fa-play mr-2"></i>
                                        <p>Trailer</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                <div className="w-screen py-4" >
                    Browse these IMDb collections to find the perfect next movie or TV show to watch
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80">Watch Guide</button>
                        <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80">Top Picks</button>
                        <button></button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80">From Your Watchlist</button>
                        <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80">Most Popular</button>
                        <button></button>
                    </div>
                </div>
            </section>
        </div>
    )
}