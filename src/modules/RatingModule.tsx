import StarIcon from '@mui/icons-material/Star';
import { Dialog, DialogContent, DialogTitle, Rating } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchGetRating, fetchRating, fetchRemoveRating } from "../redux/reducers/login.reducer";
import { bgGrayColor } from './BaseModule';

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
    const handleDiaGenlogClose = () => {
        setIsRating(false);
    };

    return (
        <div className="relative" >
            <Dialog
                open={isRating}
                onClose={handleDiaGenlogClose}
                maxWidth="sm"
                keepMounted
                PaperProps={{
                    style: {
                        background: `${bgGrayColor}`, width: '100%', color: 'white', minHeight: '200px',
                        position: 'relative', overflow: 'visible', textAlign: 'center'
                    },
                }}
            >
                <div style={{ position: 'absolute', top: '-69px', left: '50%', transform: 'translateX(-50%)', padding: '0 10px' }}>
                    <StarIcon style={{ fontSize: '130px', color: 'blue' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: 'bold', fontSize: '24px' }}>
                        {value ? value : '?'}
                    </div>
                </div>
                <div className='w-fit text-center justify-center ml-auto  mr-auto'>
                    <DialogTitle></DialogTitle>
                    <DialogTitle>{translations[language]?.rating} {mediaType}</DialogTitle>
                    <DialogTitle sx={{ color: 'yellow', fontWeight: 'bold', marginTop: '-20px' }}>
                        {ratingList?.title ? ratingList?.title : ratingList?.name}
                    </DialogTitle>
                    <DialogContent style={{ marginTop: '-20px' }}>
                        <Rating
                            name="customized-10"
                            value={value}
                            size="large"
                            onChange={(event, newValue) => { setValue(newValue) }}
                            max={10}
                            sx={{ color: 'blue', mt: 1, '& .MuiRating-iconEmpty': { color: 'gray' } }}
                        />
                    </DialogContent>
                    <DialogContent style={{ marginTop: '-20px' }}>
                        <button
                            className={`px-2 py-2 justify-center rounded-full w-full capitalize items-center ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`}
                            onClick={() => handleRating(value)}>
                            {loading2[starIndex] ? (
                                <div>  <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i> </div>
                            ) : (
                                <div>{translations[language]?.rate}</div>
                            )}
                        </button>
                    </DialogContent>
                    {existingRating2 ? (
                        <DialogContent style={{ marginTop: '-20px' }}>
                            <button
                                className={`px-2 py-2 justify-center rounded-full capitalize  items-center w-full hover:bg-blue-900`}
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
                        </DialogContent>
                    ) : (
                        <div></div>
                    )}
                </div>
            </Dialog>
            <button className="items-center gap-2 text-center justify-center w-fit" onClick={() => handleClick(existingRating2?.itemRating)}>
                {
                    existingRating2 ? (
                        loading2[starIndex] ? (
                            <div><i className="fa-solid fa-spinner fa-spin fa-spin-reverse "></i></div>
                        ) : (
                            <div className="flex items-center gap-2 ">
                                <i className="fa-solid fa-star"></i>
                                <div>{existingRating2?.itemRating}</div>
                            </div>
                        )
                    ) : (
                        <div className="font-bold">
                            {loading2[starIndex] ? (
                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>
                            ) : (
                                <div className="flex items-center text-center gap-2">
                                    <i className="fa-regular fa-star"></i>
                                    <div className={`${rateHidden === 'true' ? 'hidden' : ''} capitalize`}>{translations[language]?.rate}</div>
                                </div>
                            )}
                        </div>
                    )
                }
            </button>
        </div >
    );
}
