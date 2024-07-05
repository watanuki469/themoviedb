import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewModule from "../../modules/ReviewModule";
import Share from "../../modules/Share";
import { LanguageContext } from "../../pages/LanguageContext";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListSingleMovie } from "../../redux/reducers/singleMovie.reducer";
import { setListTv } from "../../redux/reducers/tv.reducer";
import { AppDispatch } from "../../redux/store";
import TopBar from "../common/TopBar";
import { addLikeToReviewMongoMovieApi, getFullReviewMongoMovieApi, getUserReviewMongoMovieApi, remoReviewMongoMovieApi, reviewMongoMovieApi } from "../../redux/client/api.LoginMongo";
import { setListAddLikeToReview, setListFullMovieReview, setListSingleUserReview, setReview } from "../../redux/reducers/login.reducer";
import { toast } from "react-toastify";
import { Avatar, Tooltip } from "@mui/material";

export default function UserDiscussLayout() {
    const { mediaType, id } = useParams();
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const tvList = useAppSelector((state) => state.tv.listTv)
    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)
    const [content, setContent] = useState<string>('');
    const [loading2, setLoading2] = useState<{ [key: number]: boolean }>({});
    const [loading3, setLoading3] = useState<{ [key: number]: boolean }>({});
    const [loading4, setLoading4] = useState<{ [key: number]: boolean }>({});
    const [showModal, setShowModal] = useState(false);
    const [checkLog, setCheckLog] = useState(false)
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const singleUserReviewListFromApi = useAppSelector((state) => state.login.singleUserReview);
    const fullMovieReviewListFromApi = useAppSelector((state) => state.login.fullMovieReview);


    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);
    const fetchTv = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiTv.tv(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListTv(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const fetchSingleMovies = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiSingleMovieRequests.singleMovie(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListSingleMovie(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const handleDiscuss = async (
        itemId: any,
        itemName: any,
        itemContent: any,
    ) => {
        setLoading2((prevLoading2) => ({ ...prevLoading2, [0]: true }));
        await dispatch(fetchDiscuss(
            itemId,
            itemName,
            userInfoList[0],
            userInfoList[1],
            itemContent,
        ));
        setLoading2((prevLoading2) => ({ ...prevLoading2, [0]: false }));
    };

    const fetchDiscuss = (
        itemId: string,
        itemName: string,
        itemEmail: string,
        itemDisplayName: string,
        itemContent: string,
    ) => async (dispatch: AppDispatch) => {
        try {
            const response = await reviewMongoMovieApi(
                itemId, itemName, itemEmail, itemDisplayName, itemContent
            );
            dispatch(setReview(response));
            if (response) {
                await dispatch(fetchGetAllMovieReview());
                setShowModal(false)
            } else {
                toast.error('Something went wrong');
                setShowModal(false)
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Updating watch list failed");
            setShowModal(false)
        }
    };

    const handleAddlike = async (
        itemId: any,
        reviewId: any,
        itemEmail: any,
        itemDisplayName: any,
    ) => {
        setLoading3((prevLoading3) => ({ ...prevLoading3, [0]: true }));
        await dispatch(fetchAddlike(
            itemId,
            reviewId,
            itemEmail,
            itemDisplayName
        ));
        setLoading3((prevLoading3) => ({ ...prevLoading3, [0]: false }));
    };

    const fetchAddlike = (
        itemId: string,
        reviewId: string,
        itemEmail: string,
        itemDisplayName: string,
    ) => async (dispatch: AppDispatch) => {
        try {
            const response = await addLikeToReviewMongoMovieApi(
                itemId, reviewId, itemEmail, itemDisplayName
            );
            dispatch(setListAddLikeToReview(response));
            if (response) {
                await dispatch(fetchGetAllMovieReview());
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Something went wrong");
        }
    };

    const handleRemoveReview = async (
        itemId: any,
        reviewId: any,
    ) => {
        setLoading4((prevLoading4) => ({ ...prevLoading4, [0]: true }));
        await dispatch(fetchRemoveReview(
            itemId,
            reviewId,
        ));
        setLoading4((prevLoading4) => ({ ...prevLoading4, [0]: false }));
    };
    const fetchRemoveReview = (
        itemId: string,
        reviewId: string
    ) => async (dispatch: AppDispatch) => {
        try {
            const response = await remoReviewMongoMovieApi(
                itemId, reviewId
            );
            if (response) {
                await dispatch(fetchGetAllMovieReview());
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Something went wrong");
        }
    };


    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        if (mediaType === 'tv') {
            dispatch(fetchTv());
        }
        else if (mediaType === 'person') {

        }
        else if (mediaType === 'movie') {
            dispatch(fetchSingleMovies())
        }
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, [id]);

    let mediaList = [];

    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') {

    } else if (mediaType === 'movie') {
        mediaList = singleMovieList;
    } else if (mediaType === 'tv') {
        mediaList = tvList;
    }

    const fetchGetSingleUserReview = () => async (dispatch: AppDispatch) => {
        try {
            const response = await getUserReviewMongoMovieApi(id, userInfoList[0]);
            if (response) {
                dispatch(setListSingleUserReview(response));
            } else {
                throw new Error('Failed to fetch list');
            }
        } catch (e) {
            console.log("Fetching GetSingleUserReview failed: " + e);
        }
    }
    const fetchGetAllMovieReview = () => async (dispatch: AppDispatch) => {
        try {
            const response = await getFullReviewMongoMovieApi(id);
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
        if (userInfoList[0]?.length > 0) {
            dispatch(fetchGetSingleUserReview())
            dispatch(fetchGetAllMovieReview())
        }
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, [userInfoList[0]]);

    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;

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
    const uniqueEmails = new Set<string>();

    // Filter the array to remove duplicates based on itemEmail
    const filteredList = fullMovieReviewListFromApi.filter(item => {
        if (!uniqueEmails.has(item?.itemEmail)) {
            uniqueEmails.add(item?.itemEmail);
            return true;
        }
        return false;
    });
    const formatTime = (timeString: any) => {
        const [hours, minutes] = timeString.slice(11, 16).split(':');
        const hour = parseInt(hours, 10);
        const minute = parseInt(minutes, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute < 10 ? '0' + minute : minute} ${ampm}`;
    };


    return (
        <div className=" min-h-screen cursor-pointer bg-white text-black  ">
            <div className="text-xl">
                <div className="h-20 bg-black px-4">
                    <TopBar />
                </div>
                {showModal &&
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2 z-50">
                        <div className="bg-white p-6 rounded-lg lg:w-1/3 w-full">
                            <h2 className="text-xl mb-4">Subject</h2>
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                rows={5}
                                value={content}
                                required
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                {content?.length > 10 ? (
                                    <button
                                        onClick={() => handleDiscuss(mediaList[0]?.id, mediaList[0]?.name ? mediaList[0]?.name : mediaList[0]?.title, content)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        {loading2[0] ? (
                                            <div>
                                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                            </div>
                                        ) : (
                                            <div>
                                                Submit
                                            </div>)}
                                    </button>
                                ) :
                                    (
                                        <button
                                            onClick={() => toast.error('Review content must have at least 10 character ')}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            Submit
                                        </button>
                                    )
                                }

                            </div>
                        </div>
                    </div>}

                <div className="w-full mx-auto aligns-center  ">
                    <section className='relative overflow-hidden min-h-screen'>
                        <div className="w-full ">
                            <div>
                                <div className="relative flex items-center justify-left min-h-screen bg-cover bg-center lg:p-16 p-5"
                                    style={{
                                        backgroundImage: `url('https://image.tmdb.org/t/p/w500${mediaList[0]?.backdrop_path}')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}>
                                    <div className="absolute inset-0 bg-black opacity-50 blur-sm"></div>
                                    <div className="relative text-left text-white lg:max-w-4xl px-4 py-4 bg-opacity-50 rounded-lg">
                                        <h1 className="text-4xl font-bold">{mediaList[0]?.name ? mediaList[0]?.name : mediaList[0]?.title}</h1>
                                        <div className="text-xl mt-2 flex gap-2 flex-wrap">{mediaList[0]?.genres?.map((item: any, index: any) => (
                                            <div key={index * 2} onClick={() => navigate(`/search?mediaType=${mediaType}&genres=${item?.name}`)}
                                                className="bg-blue-500 hover:opacity-80 px-2 py-2 bg-opacity-80 rounded-xl">
                                                {item?.name}
                                            </div>
                                        ))}</div>
                                        <p className="mt-4 line-clamp-4">{mediaList[0]?.overview}</p>
                                        <button onClick={() => navigate(`/${mediaType}/${mediaList[0]?.id}`)} className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl">{translations[language]?.views}</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12">
                                    <div className="lg:block col-span-3 hidden bg-black text-white">
                                        <div className="text-center justify-center">
                                            <div className="px-2">
                                                <div className="lg:text-6xl text-xl text-yellow-300 font-bold">IMDb</div>
                                                <div className="flex items-center gap-2 flex-wrap justify-end text-gray-500 py-2">
                                                    <div><i className="fa-solid fa-arrow-left"></i></div>
                                                    <div>Back to {mediaList[0]?.title ? mediaList[0]?.title : mediaList[0]?.name}</div>
                                                </div>

                                                <div className="justify-end flex py-2">
                                                    <div onClick={() => setShowModal(true)} className=" bg-yellow-300 text-white w-fit  rounded-xl px-2 py-2 flex items-center gap-2 ">
                                                        <div><i className="fa-solid fa-pencil"></i></div>
                                                        <div>New discussion</div>
                                                    </div>
                                                </div>
                                                <div className="justify-end flex py-2">
                                                    <div className="">
                                                        <div className="capitalize mb-2">User in this discussion</div>
                                                        <div className="flex flex-wrap gap-2 items-center justify-end">
                                                            {filteredList?.map((item: any, index: any) => (
                                                                <Tooltip title={`${item?.itemDisplayName}`}>
                                                                    <Avatar
                                                                        key={index}
                                                                        sx={{
                                                                            backgroundColor: stringToColor(`${item?.itemDisplayName}`), width: 40, height: 40,
                                                                        }}
                                                                        children={`${item?.itemDisplayName?.split(" ")[0][0]}`}
                                                                    />
                                                                </Tooltip>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-9 col-span-12">
                                        <div className="px-4 py-4">
                                            <div className="text-3xl font-bold py-2">Discuss {mediaList[0]?.title ? mediaList[0]?.title : mediaList[0]?.name}</div>
                                            <div className="flex-wrap flex gap-2 capitalize py-2">
                                                <div>Discuss</div>
                                                <div>{`-->`}</div>
                                                <div>{mediaType}</div>
                                                <div>{`-->`}</div>
                                                <div> {mediaList[0]?.title ? mediaList[0]?.title : mediaList[0]?.name}</div>
                                                <div>{`-->`}</div>
                                                <div>General</div>
                                            </div>

                                            {
                                                fullMovieReviewListFromApi
                                                    .slice()
                                                    .sort((a: any, b: any) => {
                                                        const dateA = new Date(a?.createdTime)?.getTime();
                                                        const dateB = new Date(b?.createdTime)?.getTime();
                                                        return dateA - dateB;
                                                    })
                                                    .map((item: any, index: any) => {
                                                        const existingIndex = item?.peopleLike.findIndex((fav: any) => fav?.itemEmail == userInfoList[0]);
                                                        return (
                                                            <div key={index} className={`${index > 0 ? 'py-2' : ''}`}>
                                                                <div className="w-full bg-white shadow-sm rounded-xl shadow-black">
                                                                    <div className="flex items-center flex-wrap gap-2 bg-gray-200 w-full px-2 py-2 rounded-tl-xl rounded-tr-xl">
                                                                        <Tooltip title={`${item?.itemDisplayName}`}>
                                                                            <Avatar
                                                                                key={index}
                                                                                sx={{
                                                                                    backgroundColor: stringToColor(`${item?.itemDisplayName}`),
                                                                                    width: 40,
                                                                                    height: 40,
                                                                                }}
                                                                                children={`${item?.itemDisplayName?.split(" ")[0][0]}`}
                                                                            />
                                                                        </Tooltip>
                                                                        <div className="">
                                                                            <div className="text-blue-500">{item?.itemDisplayName}</div>
                                                                            <div className="text-gray-500">{item?.createdTime.slice(0, 10)} at {formatTime(item?.createdTime)}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-black px-2 py-2">
                                                                        {item?.itemContent}
                                                                    </div>
                                                                    <div className='items-center flex px-2 border-t border-gray-500'>
                                                                        <div className='flex items-center gap-1 h-full'>
                                                                            {existingIndex !== -1 ?
                                                                                <div className="flex flex-wrap items-center gap-2">
                                                                                    <i className="fa-solid text-blue-500 fa-thumbs-up text-xl" onClick={() => handleAddlike(id, item?._id, userInfoList[0], userInfoList[1])}></i>
                                                                                    {loading3[index] ? (
                                                                                        <div>
                                                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div>Liked</div>)
                                                                                    }
                                                                                </div> :
                                                                                <div className="flex flex-wrap items-center gap-2">
                                                                                    <i className="fa-solid fa-thumbs-up text-xl" onClick={() => handleAddlike(id, item?._id, userInfoList[0], userInfoList[1])}></i>
                                                                                    {loading3[index] ? (
                                                                                        <div>
                                                                                            <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div>Like</div>)
                                                                                    }
                                                                                </div>
                                                                            }

                                                                            <div>•</div>
                                                                            <div>{item?.peopleLike?.length}</div>
                                                                            <i className="fa-solid fa-thumbs-up fa-rotate-180 ml-2 text-xl"></i>
                                                                            <div>{item?.peopleDislike?.length}</div>
                                                                        </div>
                                                                        <div className='ml-auto flex flex-wrap gap-2 items-center'>
                                                                            <div>
                                                                                {item?.itemEmail===userInfoList[0] ?
                                                                                    <div  onClick={() => handleRemoveReview(id, item?._id)} className="flex flex-wrap items-center gap-2">
                                                                                       
                                                                                        {loading4[0] ? (
                                                                                            <div>
                                                                                                <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div>Remove</div>)
                                                                                        }
                                                                                    </div> :
                                                                                    <div>
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                            <Share bgColor={'black'} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div >
        </div >
    )
}