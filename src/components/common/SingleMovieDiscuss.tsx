import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { LanguageContext } from '../../pages/LanguageContext';
import Share from '../../modules/Share';
import { AppDispatch } from '../../redux/store';
import { useAppDispatch } from '../../redux/hooks';
import { addDislikeToReviewMongoMovieApi, addLikeToReviewMongoMovieApi, getFullReviewMongoMovieApi } from '../../redux/client/api.LoginMongo';
import { setListFullMovieReview } from '../../redux/reducers/login.reducer';

export interface TwoMovieRowProps {
    singleMovieList: any,
    userInfoList: any,
    id: any,
    mediaType:any
}

export default function SingleMovieDiscuss({
    singleMovieList,
    userInfoList,
    id,
    mediaType
}: TwoMovieRowProps) {
    const dispatch = useAppDispatch();


    const handleAddlike = async (
        itemId: any,
        reviewId: any,
        itemEmail: any,
        itemDisplayName: any,
    ) => {
        await dispatch(fetchAddlike(
            itemId,
            reviewId,
            itemEmail,
            itemDisplayName
        ));
    };

    const fetchAddlike = (
        itemId: string,
        reviewId: string,
        itemEmail: string,
        itemDisplayName: string,
    ) => async (dispatch: AppDispatch) => {
        try {
            const response = await addLikeToReviewMongoMovieApi(
                mediaType,itemId, reviewId, itemEmail, itemDisplayName
            );
            if (response) {
                await dispatch(fetchGetAllMovieReview());
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating failed: " + e);
            toast.error("Something went wrong");
        }
    };

    const handleAddDislike = async (
        itemId: any,
        reviewId: any,
        itemEmail: any,
        itemDisplayName: any,
    ) => {
        await dispatch(fetchAddDislike(
            itemId,
            reviewId,
            itemEmail,
            itemDisplayName
        ));
    };

    const fetchAddDislike = (
        itemId: string,
        reviewId: string,
        itemEmail: string,
        itemDisplayName: string,
    ) => async (dispatch: AppDispatch) => {
        try {
            const response = await addDislikeToReviewMongoMovieApi(
                mediaType,itemId, reviewId, itemEmail, itemDisplayName
            );
            if (response) {
                await dispatch(fetchGetAllMovieReview());
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating failed: " + e);
            toast.error("Something went wrong");
        }
    };

    const fetchGetAllMovieReview = () => async (dispatch: AppDispatch) => {
        try {
            const response = await getFullReviewMongoMovieApi(mediaType,id);
            if (response) {
                dispatch(setListFullMovieReview(response));
            } else {
                throw new Error('Failed to fetch list');
            }
        } catch (e) {
            console.log("Fetching fetchGetAllMovieReview failed: " + e);
        }
    }
    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        if (userInfoList[0]) {
            dispatch(fetchGetAllMovieReview())
        }
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, [userInfoList[0]]);

    const stringToColor = (str: any) => {
        let hash = 0;
        let i;

        for (i = 0; i < str?.length; i += 1) {
            hash = str?.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value?.toString(16)}`?.slice(-2);
        }

        return color;
    };

    const formatTime = (timeString: any) => {
        const [hours, minutes] = timeString.slice(11, 16).split(':');
        const hour = parseInt(hours, 10);
        const minute = parseInt(minutes, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute < 10 ? '0' + minute : minute} ${ampm}`;
    };

    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;

    const filteredList = singleMovieList.slice().sort((a: any, b: any) => {
        const dateA = new Date(a?.createdTime)?.getTime();
        const dateB = new Date(b?.createdTime)?.getTime();
        return dateB - dateA;
    })
    const existingIndex = filteredList[0]?.peopleLike.findIndex((fav: any) => fav?.itemEmail == userInfoList[0]);
    const existingDislikeIndex = filteredList[0]?.peopleDislike.findIndex((fav: any) => fav?.itemEmail == userInfoList[0]);

    return (
        <div>
            <div className={`cursor-pointer`}>
                <div className="w-full bg-white shadow-sm  shadow-black px-4">
                    <div className='py-4'>
                        <div className="bg-yellow-300 text-black py-2 px-2 w-fit capitalize">{translations[language]?.latest} </div>
                    </div>
                    <div>
                        <div className='font-bold capitalize'>A review by {filteredList[0]?.itemDisplayName}</div>
                    </div>              
                    <div className="">
                        {filteredList[0]?.itemContent}
                    </div>
                    <div className='items-center flex'>
                        <div className='flex items-center gap-1 h-full'>
                            {existingIndex !== -1 ?
                                <div className="flex flex-wrap items-center gap-2">
                                    <i className="fa-solid text-blue-500 fa-thumbs-up text-xl" onClick={() => handleAddlike(id, filteredList[0]?._id, userInfoList[0], userInfoList[1])}></i>
                                    <div>Liked</div>
                                </div> :
                                <div className="flex flex-wrap items-center gap-2">
                                    <i className="fa-solid fa-thumbs-up text-xl" onClick={() => handleAddlike(id, filteredList[0]?._id, userInfoList[0], userInfoList[1])}></i>
                                    <div>Like</div>
                                </div>
                            }

                            <div>•</div>
                            <div>{filteredList[0]?.peopleLike?.length}</div>
                            {existingDislikeIndex !== -1 ?
                                <div className="">
                                    <i className="fa-solid fa-thumbs-up rotate-180 text-purple-500 text-xl" onClick={() => handleAddDislike(id, filteredList[0]?._id, userInfoList[0], userInfoList[1])}></i>
                                </div> :
                                <div className="">
                                    <i className="fa-solid fa-thumbs-up  rotate-180 text-xl" onClick={() => handleAddDislike(id, filteredList[0]?._id, userInfoList[0], userInfoList[1])}></i>
                                </div>
                            }
                            <div>{filteredList[0]?.peopleDislike?.length}</div>
                        </div>
                        <div className='ml-auto flex flex-wrap gap-2 items-center'>
                            <Share bgColor={'black'} />
                        </div>
                    </div>
                    <div className='flex items-center gap-2 py-2 flex-wrap'>
                        <div className="text-blue-500">{filteredList[0]?.itemDisplayName}</div>
                        <div>•</div>
                        <div>{filteredList[0]?.createdTime.slice(0, 10)} </div>
                    </div>
                </div>
            </div>
        </div>
    )
}