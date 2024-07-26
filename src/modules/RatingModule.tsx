import { Rating } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchGetRating, fetchRating, fetchRemoveRating } from "../redux/reducers/login.reducer";

export interface SwiperRowProps {
    mediaType: any
    ratingList: any
    userInfoList: any
    starIndex: any,
    rateHidden: any
}
export default function RatingModule({
    mediaType, ratingList, userInfoList, starIndex, rateHidden
}: SwiperRowProps) {
    const [value, setValue] = useState<number | null>(0);
    const [isRating, setIsRating] = useState(false);
    const [loading2, setLoading2] = useState<{ [key: number]: boolean }>({});
    const [loading3, setLoading3] = useState<{ [key: number]: boolean }>({});
    const dispatch = useAppDispatch()
    const ratingListFromApi = useAppSelector((state) => state.login.listRating);

    useEffect(() => {
        if (userInfoList?.length > 0) {
            dispatch(fetchGetRating(mediaType, userInfoList[0]));
        }
    }, [dispatch, userInfoList, mediaType]);

    const existingRating = ratingListFromApi?.find((item: any) => item?.itemId == ratingList?.id);
    const existingRating2 = existingRating?.ratings?.find((item: any) => item?.itemEmail == userInfoList[0]);

    const handleClick = (value: number) => {
        setIsRating(true);
        setValue(value)
    };
    const handleRating = async (
        itemRating: any
    ) => {
        setLoading2((prevLoading2) => ({ ...prevLoading2, [starIndex]: true }));
        await dispatch(fetchRating(
            mediaType, ratingList?.id, ratingList?.title ? ratingList?.title : ratingList?.name, ratingList?.vote_average, ratingList?.vote_count, ratingList?.release_date ? ratingList?.release_date : ratingList?.first_air_date, ratingList?.runtime, ratingList?.poster_path ? ratingList?.poster_path : ratingList?.profile_path, userInfoList[0], userInfoList[1], itemRating
        ));
        setIsRating(false)
        setLoading2((prevLoading2) => ({ ...prevLoading2, [starIndex]: false }));
    };

    const handleRemoveRating = async (
        itemId: any,
        ratingId: any,
    ) => {
        setLoading3((prevLoading3) => ({ ...prevLoading3, [starIndex]: true }));
        await dispatch(fetchRemoveRating(
            userInfoList[0], mediaType, itemId, ratingId,
        ));
        setIsRating(false)
        setLoading3((prevLoading3) => ({ ...prevLoading3, [starIndex]: false }));
    };

    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;
    return (
        <div className="relative" >
            {isRating && (
                <div className="fixed top-0 left-0 right-0 w-screen h-full bg-black text-white bg-opacity-50 flex text-center justify-center items-center z-50">
                    <div>
                        <div className="rounded-lg w-full bg-black px-4 py-4 ">
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
                                <p className="text-yellow-300 font-bold text-center capitalize"> {translations[language]?.rating}  {mediaType}</p>
                            </div>
                            <div className="flex flex-col flex-wrap items-center justify-center text-center gap-2 mt-2">
                                <p className="lg:text-2xl text-xl">{ratingList?.title ? ratingList?.title : ratingList?.name}</p>
                                <div className="px-2 py-2">
                                    <Rating
                                        name="customized-10"
                                        value={value}
                                        size="large"
                                        onChange={(event, newValue) => { setValue(newValue) }}
                                        max={10}
                                        sx={{ color: 'blue', mt: 1, '& .MuiRating-iconEmpty': { color: 'gray' } }}
                                    />
                                    <br />
                                    <button
                                        className={`px-2 py-2 justify-center mt-2 capitalize items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`}
                                        onClick={() => handleRating(value)}>
                                        {loading2[starIndex] ? (
                                            <div>  <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i> </div>
                                        ) : (
                                            <div>{translations[language]?.rate}</div>
                                        )}
                                    </button>
                                    <button
                                        className={`px-2 py-2 justify-center capitalize mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`}
                                        onClick={() => handleRemoveRating(`${ratingList?.id}`, existingRating2?._id)}
                                    >
                                        {loading3[starIndex] ? (
                                            <div>
                                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse "></i>
                                            </div>
                                        ) : (
                                            <div className="capitalize">
                                                <div>{translations[language]?.remove} {translations[language]?.rate}</div>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button className=" text-blue-500 items-center gap-2 text-center justify-center w-full" onClick={() => handleClick(existingRating2?.itemRating)}>
                {
                    existingRating2 ? (
                        loading2[starIndex] ? (
                            <div>
                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse "></i>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 ">
                                <i className="fa-solid fa-star text-blue-500"></i>
                                <div>{existingRating2?.itemRating}</div>
                            </div>

                        )
                    ) : (
                        <div className="font-bold text-sm">
                            {loading2[starIndex] ? (
                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>
                            ) : (
                                <div className="flex items-center text-center gap-2">
                                    <i className="fa-regular fa-star text-blue-500"></i>
                                    <div className={`${rateHidden === 'true' ? 'hidden' : ''} capitalize`}>   {translations[language]?.rate}</div>

                                </div>
                            )}
                        </div>
                    )
                }
            </button>
        </div >
    );
}
