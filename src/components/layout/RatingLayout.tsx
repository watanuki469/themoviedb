import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../common/TopBar";
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Rating, Tooltip } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import AppsIcon from '@mui/icons-material/Apps';
import { toast } from "react-toastify";
import Footer from "../common/Footer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import { getListRatingMongoApi, getListRecentlyViewMongoApi, ratingMongoApi, removeListRecentlyViewMongoApi, removeRatingMongoApi } from "../../redux/client/api.LoginMongo";
import { setDeleteRecentlyView, setListRating, setListRecentlyView, setRating } from "../../redux/reducers/login.reducer";
import Share from "../../modules/Share";


export function RatingLayout() {
    const [handleRefine, setHandleRefine] = useState(false);
    const [mediaType, setMediaType] = useState('movie');
    const [isRating, setIsRating] = useState(false);
    const [value, setValue] = useState<number | null>(0);
    const [numberIndex, setNumberIndex] = useState(0);
    const [loading2, setLoading2] = useState<{ [key: number]: boolean }>({});

    const handleClick = (index: number, value: any) => {
        setIsRating(true)
        setNumberIndex(index);
        setValue(value)
    };

    let navigate = useNavigate()
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750'; // Set the fallback image source here
    };

    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const dispatch = useAppDispatch()
    const recentList = useAppSelector((state) => state.login.listRating);
    const fetchGetRating = () => async (dispatch: AppDispatch) => {
        setLoading2((prevLoading2) => ({ ...prevLoading2, [numberIndex]: true }));
        try {
            const response = await getListRatingMongoApi(mediaType, userInfoList[0]);
            if (response) {
                dispatch(setListRating(response));
            } else {
                throw new Error('Failed to fetch list');
            }
        } catch (e) {
            console.log("Fetching list failed: " + e);
        }
        setLoading2((prevLoading2) => ({ ...prevLoading2, [numberIndex]: false }));
    }
    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);
    useEffect(() => {
        if (userInfoList.length > 0) {
            dispatch(fetchGetRating());
        }
    }, [userInfoList, mediaType])


    const fetchRemove = (
        itemId: any,
        reviewId: any,
    ) => async (dispatch: AppDispatch) => {
        try {
            const response = await removeRatingMongoApi(
                mediaType,
                itemId,
                reviewId,
            );
            if (response) {
                console.log(response);
                await dispatch(fetchGetRating());
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating failed: " + e);
            toast.error("Remove rating failed due to " + e);
        }
    };
    const handleRemoveRating = async (
        numberIndex: any,
        itemId: any,
        ratingId: any,
    ) => {
        setLoading((prevLoading) => ({ ...prevLoading, [numberIndex]: true }));
        await dispatch(fetchRemove(
            itemId,
            ratingId,
        ));
        setIsRating(false)
        setLoading((prevLoading) => ({ ...prevLoading, [numberIndex]: false }));
    };


    const renderMovieItem = (movie: any, movieIndex: number) => {
        const existingRating = recentList.find(rating => rating?.itemId == movie?.itemId); // Find the rating object for the item
        const existingRating2 = existingRating?.ratings?.find((item: any) => item?.itemEmail == userInfoList[0]);

        return (
            <section className=" w-1/2 md:w-1/5 px-2 sm:w-1/3 py-2  " key={movieIndex}
            >
                <div className="text-black font-sans  shadow-sm shadow-black rounded-br-xl rounded-bl-xl rounded-tr-xl " >
                    <div className=" items-center ">
                        <div className="mt-2">
                            <div className="relative w-full pb-[150%] hover:opacity-80">
                                <img onClick={() => navigate(`/${mediaType}/${movie?.itemId}`)}
                                    src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images"
                                    onError={handleImageError} className="absolute top-0 left-0 w-full h-full object-cover rounded-tr-xl" />

                            </div>
                            <div className="px-2 py-2 w-full">
                                <div className="text-left">
                                    <div className="h-12 w-full ">
                                        <p className="font-bold hover:opacity-50 line-clamp-2">{movieIndex}. {movie?.itemName}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="grow ml-auto" onClick={() => handleClick(movieIndex, existingRating?.itemRating)}>
                            {
                                existingRating2 ? (
                                    loading2[movieIndex] ? (
                                        <div>
                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                        </div>
                                    ) : (
                                        <div className="flex items-center  gap-2 hover:bg-gray-500 w-fit px-2 py-2 rounded-lg">
                                            <i className="fa-solid fa-star text-blue-500"></i>
                                            <div>{existingRating2?.itemRating}</div>
                                        </div>

                                    )
                                ) : (
                                    <div className="font-bold text-sm">
                                        {loading2[movieIndex] ? (
                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                        ) : (
                                            <div className="hover:bg-gray-500  w-fit px-2 py-2 rounded-lg">
                                                <i className="fa-regular fa-star text-blue-500"></i>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>

                        <div className="px-2 py-2" onClick={() => handleRemoveRating(movieIndex, movie?.itemId, existingRating2?._id)}   >
                            <button className="px-2 py-2 bg-gray-300 hover:bg-blue-300 text-blue-500 w-full rounded-md font-medium text-center items-center">
                                <Tooltip title="Click here to remove rating">
                                    {loading[movieIndex] ? (
                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                    ) :
                                        (
                                            <p>Remove</p>
                                        )}
                                </Tooltip>
                            </button>
                        </div>
                    </div>
                </div>
            </section >
        )
    }

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black pb-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                </div>
            </div>
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
                                    <p className="text-2xl ">{recentList[numberIndex]?.itemName}</p>
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

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            <div className="bg-white text-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <div className="lg:max-w-full  ">
                        <div className="flex mt-3 border-b-2 border-gray">
                            <div className="items-center ">
                                <h2 className="text-2xl font-bold ">Your Rating List</h2>
                                <p className="text-xl font-semibold text-gray-500">Private</p>
                            </div>
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center text-2xl font-bold text-black ">Share </p>
                                <Share bgColor={'black'} />
                            </div>
                        </div>
                        <div className="flex border-b-2 border-gray py-2 items-center ">
                            <div className="items-center ">
                                <h2 className="lg:text-2xl text-lg font-bold ">{recentList?.length} Title</h2>
                            </div>
                            <div className="ml-auto gap-2" >
                                <div>
                                    <button
                                        onClick={() => setHandleRefine(!handleRefine)}
                                        className="bg-gray-300 hover:opacity-80 px-2 py-1">
                                        Refine
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            {handleRefine ? (
                                <div className="flex border-b-2 border-gray py-2 items-center w-full">
                                    <div className="grid grid-cols-12 cursor-pointer px-2 py-2 bg-gray-200 w-full ">
                                        <div className="lg:col-span-5 col-span-12 ">
                                            <div className={`h-full `}>
                                                <div className="font-bold">Type (Movie, TV, etc.)</div>
                                            </div>
                                        </div>
                                        <div className="lg:col-span-7 col-span-12 w-full h-full">
                                            <div className="relative w-full" >
                                                {
                                                    <div className="w-full ">
                                                        <div className="w-full text-xl">
                                                            <div className="items-center w-full">
                                                                <div className="flex items-center">
                                                                    <div className="flex gap-2 items-center">
                                                                        {mediaType === 'movie' ? (
                                                                            <i className="fa-regular fa-square-check" onClick={() => setMediaType("movie")}></i>
                                                                        )
                                                                            : (
                                                                                <i className="fa-regular fa-square" onClick={() => setMediaType("movie")}></i>
                                                                            )}

                                                                        <div>Feature Movie</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <div className="flex gap-2 items-center">
                                                                        {mediaType === 'tv' ? (
                                                                            <i className="fa-regular fa-square-check" onClick={() => setMediaType("tv")}></i>
                                                                        )
                                                                            : (
                                                                                <i className="fa-regular fa-square" onClick={() => setMediaType("tv")}></i>
                                                                            )}
                                                                        <div>Feature TV Mini-Series</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>}


                                            </div>
                                        </div>
                                    </div>


                                </div>) : (<div>

                                </div>)}

                        </div>
                        <div>
                            <div className="lg:max-w-full py-4 px-2 ">
                                <div
                                    style={{
                                        position: "relative", backgroundSize: "cover", backgroundPosition: "center",
                                        display: 'flex', flexWrap: 'wrap'
                                    }}>
                                    {recentList?.slice()?.sort((a: any, b: any) => {
                                        const dateA = new Date(a?.createdTime)?.getTime();
                                        const dateB = new Date(b?.createdTime)?.getTime();
                                        return dateB - dateA;
                                    }).map((m, index) => renderMovieItem(m, index))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center mt-10 ">
                    <Footer />
                </div>
            </div>
        </div >





    );
}