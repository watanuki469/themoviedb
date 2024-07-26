import { useContext, useEffect } from "react";
import Share from '../../modules/Share';
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch } from '../../redux/hooks';
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';
import { fetchAddDislike, fetchAddlike, fetchGetAllMovieReview } from '../../redux/reducers/login.reducer';

export interface TwoMovieRowProps {
    singleMovieList: any,
    userInfoList: any,
    id: any,
    mediaType: any
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
            mediaType,
            itemId,
            reviewId,
            itemEmail,
            itemDisplayName
        ));
    };
    const handleAddDislike = async (
        itemId: any,
        reviewId: any,
        itemEmail: any,
        itemDisplayName: any,
    ) => {
        await dispatch(fetchAddDislike(
            mediaType,
            itemId,
            reviewId,
            itemEmail,
            itemDisplayName
        ));
    };
    useEffect(() => {
        dispatch(setGlobalLoading(true));
        if (userInfoList[0]) {
            dispatch(fetchGetAllMovieReview(mediaType, id))
        }
        dispatch(setGlobalLoading(false));
    }, [userInfoList[0]]);

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
            <div className={`cursor-pointer py-2`}>
                <div className="w-full bg-white shadow-sm  shadow-black px-4 py-4">
                    <div className='py-4'>
                        <div className="bg-yellow-300 text-black py-2 px-2 w-fit capitalize">{translations[language]?.latest} </div>
                    </div>
                    {singleMovieList?.length > 0 ? (
                        <div>
                            <div>
                                <div className='font-bold capitalize'>{translations[language]?.latest} {translations[language]?.reviews}:  {filteredList[0]?.itemDisplayName}</div>
                            </div>
                            <div className="">{filteredList[0]?.itemContent}</div>
                            <div className='items-center flex'>
                                <div className='flex items-center gap-1 h-full'>
                                    {existingIndex !== -1 ?
                                        <div className="flex flex-wrap items-center gap-2">
                                            <i className="fa-solid text-blue-500 fa-thumbs-up text-xl" onClick={() => handleAddlike(id, filteredList[0]?._id, userInfoList[0], userInfoList[1])}></i>
                                        </div> :
                                        <div className="flex flex-wrap items-center gap-2">
                                            <i className="fa-solid fa-thumbs-up text-xl" onClick={() => handleAddlike(id, filteredList[0]?._id, userInfoList[0], userInfoList[1])}></i>
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
                                    <div>•</div>
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
                    ) : (
                        <div></div>
                    )}

                </div>
            </div>
        </div>
    )
}