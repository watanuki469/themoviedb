import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../pages/LanguageContext";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Rating } from '@mui/material';
import { AppDispatch } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { getListRatingMongoApi, ratingMongoApi, removeRatingMongoApi } from "../redux/client/api.LoginMongo";
import { setDeleteRating, setListRating, setRating } from "../redux/reducers/login.reducer";

export interface SwiperRowProps {
    mediaType: any
    ratingList: any
    email: any
}
export default function RatingModule({
    mediaType,
    ratingList,
    email
}: SwiperRowProps) {
    const [value, setValue] = useState<number | null>(0);
    const [isRating, setIsRating] = useState(false);
    const [loading2, setLoading2] = useState<{ [key: number]: boolean }>({});
    const [loading3, setLoading3] = useState<{ [key: number]: boolean }>({});
    const [checkLog, setCheckLog] = useState(false)
    const dispatch = useAppDispatch()
    const ratingListFromApi = useAppSelector((state) => state.login.listRating);
    const handleClick = (value: any) => {
        setIsRating(true);
        setValue(value)
    };

    const fetchGetRating = () => async (dispatch: AppDispatch) => {
        try {
            const response = await getListRatingMongoApi(email);
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
        // dispatch(setGlobalLoading(true));
        if (email?.length > 0) {
            dispatch(fetchGetRating())
        }
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, [email]);
    const existingRating = ratingListFromApi?.find((rating: any) => rating?.itemId === ratingList?.id); // Find the rating object for the item

    const handleRating = async (itemRating: any,
        itemImg: any,
        itemName: any
    ) => {
        setLoading2((prevLoading2) => ({ ...prevLoading2, [0]: true }));
        await dispatch(fetchRating(
            ratingList?.id,
            mediaType,
            itemRating,
            itemImg,
            itemName
        ));
        setCheckLog(!checkLog);
        setIsRating(false)
        toast.success('Rating success')
        setLoading2((prevLoading2) => ({ ...prevLoading2, [0]: false }));
    };

    const fetchRating = (
        itemId: string,
        itemType: string,
        itemRating: string,
        itemImg: any,
        itemName: any
    ) => async (dispatch: AppDispatch) => {
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
    const fetchRemove = (
        movieId: string,
        movieType: string,
    ) => async (dispatch: AppDispatch) => {
        try {
            const response = await removeRatingMongoApi(
                email,
                movieId,
                movieType,
            );
            dispatch(setDeleteRating(response));
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
    const handleRemoveRating = async (
        index: number,
        movieId: any,
        movieType: any,
    ) => {
        setLoading3((prevLoading3) => ({ ...prevLoading3, [index]: true }));
        await dispatch(fetchRemove(
            movieId,
            movieType,
        ));
        setCheckLog(!checkLog);
        toast.info('Remove rating success')
        setIsRating(false)
        setLoading3((prevLoading3) => ({ ...prevLoading3, [index]: false }));
    };

    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;
    return (
        <div className="relative" >
            {isRating && (
                <div className="fixed top-0 left-0 w-full h-full bg-black text-white bg-opacity-50 flex justify-center items-center z-50">
                    <div className="p-5 rounded-lg max-w-2xl w-full bg-black px-4 py-4 relative">
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
                            <p className="text-yellow-300 font-bold text-center">Rate this</p>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center gap-2 mt-2">
                            <p className="text-2xl">{ratingList?.title ? ratingList?.title : ratingList?.name}</p>
                            <div className="gap-2 px-2 py-2">
                                <Rating
                                    name="customized-10"
                                    value={value}
                                    size="large"
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    max={10}
                                    sx={{
                                        color: 'blue',
                                        mt: 1,
                                        '& .MuiRating-iconEmpty': {
                                            borderColor: 'red',
                                            color: 'gray',
                                        },
                                    }}
                                />
                                <br />
                                <button
                                    className={`px-2 py-2 justify-center mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`}
                                    onClick={() => handleRating(value, ratingList?.poster_path, ratingList?.title ? ratingList?.title : ratingList?.name)}
                                >
                                    {loading2[0] ? (
                                        <div>
                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <div>Rate</div>
                                        </div>
                                    )}
                                </button>
                                <button
                                    className={`px-2 py-2 justify-center mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`}
                                    onClick={() => handleRemoveRating(0, ratingList?.id, 'TV')}
                                >
                                    {loading3[0] ? (
                                        <div>
                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <div>Remove Rating</div>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button className="flex px-3 py-3 text-blue-500 items-center gap-2 text-xl text-center justify-center w-full" onClick={() => handleClick(existingRating?.itemRating)}>
                {
                    existingRating ? (
                        loading2[0] ? (
                            <div>
                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 ">
                                <i className="fa-solid fa-star text-blue-500"></i>
                                <div>{existingRating?.itemRating}</div>
                            </div>

                        )
                    ) : (
                        <div className="font-bold text-sm">
                            {loading2[0] ? (
                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                            ) : (
                                <div className="flex items-center text-xl text-center gap-2">
                                    <div>Rate</div>
                                    <i className="fa-regular fa-star text-blue-500"></i>
                                </div>
                            )}
                        </div>
                    )
                }
            </button>
        </div >
    );
}
