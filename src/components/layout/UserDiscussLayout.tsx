import { Avatar, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { bgGrayColor, formatTime, stringToColor } from "../../modules/BaseModule";
import Share from "../../modules/Share";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchAddDislike, fetchAddlike, fetchDiscuss, fetchGetAllMovieReview, fetchRemoveReview } from "../../redux/reducers/login.reducer";
import { fetchSingleMovies } from "../../redux/reducers/singleMovie.reducer";
import { fetchTv } from "../../redux/reducers/tv.reducer";
import TopBar from "../common/TopBar";

export default function UserDiscussLayout() {
    const { mediaType, id } = useParams();
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const tvList = useAppSelector((state) => state.tv.listTv)
    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)
    const [content, setContent] = useState<string>('');
    const [loading2, setLoading2] = useState<{ [key: number]: boolean }>({});
    const [loading4, setLoading4] = useState<{ [key: number]: boolean }>({});
    const [showModal, setShowModal] = useState(false);
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const fullMovieReviewListFromApi = useAppSelector((state) => state.login.fullMovieReview);

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        if (mediaType === 'tv') {
            dispatch(fetchTv(id));
        }
        else if (mediaType === 'person') {
            navigate('/')
            toast.error('There is no type person')
        }
        else if (mediaType === 'movie') {
            dispatch(fetchSingleMovies(id))
        }
        dispatch(setGlobalLoading(false));
    }, [id]);

    let mediaList = [];

    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') {
        navigate('/')
        toast.error('Not exist')
    } else if (mediaType === 'movie') {
        mediaList = singleMovieList;
    } else if (mediaType === 'tv') {
        mediaList = tvList;
    }
    const handleDiscuss = async (
        itemId: any,
        itemName: any,
        itemTMDbRating: any,
        itemTMDbRatingCount: any,
        itemTMDbReleaseDay: any,
        itemTMDbRunTime: any,
        itemImg: any,
        itemContent: any,
    ) => {
        setLoading2((prevLoading2) => ({ ...prevLoading2, [0]: true }));
        await dispatch(fetchDiscuss(
            mediaType, itemId, itemName, itemTMDbRating, itemTMDbRatingCount, itemTMDbReleaseDay, itemTMDbRunTime, itemImg, userInfoList[0], userInfoList[1], itemContent,
        ));
        setLoading2((prevLoading2) => ({ ...prevLoading2, [0]: false }));
        setContent('')
        setShowModal(false)
    };

    const handleAddlike = async (
        itemId: any,
        reviewId: any,
        itemEmail: any,
        itemDisplayName: any,
    ) => {
        await dispatch(fetchAddlike(
            mediaType, itemId, reviewId, itemEmail, itemDisplayName
        ));
    };

    const handleAddDislike = async (
        itemId: any,
        reviewId: any,
        itemEmail: any,
        itemDisplayName: any,
    ) => {
        await dispatch(fetchAddDislike(
            mediaType, itemId, reviewId, itemEmail, itemDisplayName
        ));
    };

    const handleRemoveReview = async (
        index: any,
        itemId: any,
        reviewId: any,
    ) => {
        setLoading4((prevLoading4) => ({ ...prevLoading4, [index]: true }));
        await dispatch(fetchRemoveReview(
            mediaType, itemId, reviewId,
        ));
        setLoading4((prevLoading4) => ({ ...prevLoading4, [index]: false }));
    };

    useEffect(() => {
        if (userInfoList[0]?.length > 0) {
            dispatch(fetchGetAllMovieReview(mediaType, id))
        }
    }, [userInfoList[0]]);

    const context = useContext(LanguageContext);
    if (!context) { return null; }
    const { language, translations, handleLanguageChange } = context;
    const uniqueEmails = new Set<string>();

    // Filter the array to remove duplicates based on itemEmail
    const filteredList = fullMovieReviewListFromApi.filter(item => {
        if (!uniqueEmails.has(item?.itemEmail)) {
            uniqueEmails.add(item?.itemEmail);
            return true;
        }
        return false;
    });

    return (
        <div className=" min-h-screen cursor-pointer bg-white text-black  ">
            <div className="text-xl bg-black text-white">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <TopBar />
                </div>
                {showModal &&
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2 z-50 capitalize">
                        <div className="rounded-lg lg:w-1/3 md:w-1/2 w-full relative">
                            <div className="bg-white text-black px-4 py-2">
                                <div className="flex items-center py-2 ">
                                    <h2 className="text-xl">{translations[language]?.discussion}</h2>
                                    <button className={`ml-auto text-3xl rounded-lg hover:text-red-500`} onClick={() => setShowModal(false)}>
                                        <i className="fa-regular fa-circle-xmark"></i>
                                    </button>
                                </div>
                                <textarea className="w-full border border-gray-300 rounded-lg text-black"rows={5} value={content} required onChange={(e) => setContent(e.target.value)}></textarea>

                                <div className="text-end mt-4 ">
                                    <button onClick={() => handleDiscuss(mediaList[0]?.id, mediaList[0]?.name ? mediaList[0]?.name : mediaList[0]?.title, mediaList[0]?.vote_average, mediaList[0]?.vote_count, mediaList[0]?.release_date ? mediaList[0]?.release_date : mediaList[0]?.first_air_date, mediaList[0]?.runtime, mediaList[0]?.poster_path, content)}
                                        className="bg-yellow-300 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg">
                                        {loading2[0] ? (
                                            <div>  <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i></div>
                                        ) : (
                                            <div>{translations[language]?.submit}</div>)}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>}

                <div className="w-full mx-auto aligns-center  ">
                    <section className='relative'>
                        <div className="w-full ">
                            <div>
                                <div className="relative flex items-center justify-left bg-cover bg-center lg:p-16 p-5"
                                    style={{
                                        backgroundImage: `url('https://image.tmdb.org/t/p/w500${mediaList[0]?.backdrop_path}')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}>
                                    <div className={`absolute inset-0 bg-black bg-opacity-50 blur-sm`}></div>
                                    <div className="relative text-left text-white lg:max-w-4xl px-4 py-4 rounded-lg">
                                        <h1 className="text-4xl font-bold">{mediaList[0]?.name ? mediaList[0]?.name : mediaList[0]?.title}</h1>
                                        <div className="text-xl mt-2 flex gap-2 flex-wrap">{mediaList[0]?.genres?.map((item: any, index: any) => (
                                            <a href={`/search?mediaType=${mediaType}&genres=${item?.name}`} key={index * 2}
                                                className="px-2 py-2 bg-opacity-80 rounded-xl">
                                                {item?.name}
                                            </a>
                                        ))}</div>
                                        <p className="mt-4 line-clamp-4">{mediaList[0]?.overview}</p>
                                        <div className="py-4">
                                            <a href={`/${mediaType}/${mediaList[0]?.id}`} className="relative mt-6 px-4 py-2 text-white border-2 border-white w-fit font-bold rounded-xl overflow-hidden cursor-pointer">
                                                <span
                                                    className="absolute inset-0 bg-cover bg-center bg-black bg-opacity-50 blur-[10px]"
                                                    style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500${mediaList[0]?.backdrop_path}')` }}
                                                />
                                                <span className="relative z-10 ">{translations[language]?.moreExplore}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 min-h-screen">
                                    <div className="sm:block hidden col-span-3  bg-black text-white ">
                                        <div className="text-center justify-center px-2 sticky top-0">
                                            <div className="lg:text-6xl text-xl text-yellow-300 font-bold">IMDb</div>
                                            <div className="hover:text-white text-right text-gray-500 py-2"
                                            >  <i className="fa-solid fa-arrow-left"></i> {translations[language]?.details} {mediaList[0]?.title ? mediaList[0]?.title : mediaList[0]?.name}</div>
                                            <div className="justify-end flex py-2">
                                                <div onClick={() => setShowModal(true)} className=" bg-yellow-300 hover:bg-yellow-200 text-white w-fit capitalize  rounded-xl px-2 py-2 flex items-center gap-2 ">
                                                    <div><i className="fa-solid fa-pencil"></i></div>
                                                    <div>{translations[language]?.news} {translations[language]?.discussion}</div>
                                                </div>
                                            </div>
                                            <div className="justify-end flex py-2 sticky top-0 ">
                                                <div className="">
                                                    <div className="capitalize mb-2 "> {translations[language]?.user} {translations[language]?.discussion} </div>
                                                    <div className="flex flex-wrap gap-2 items-center justify-end">
                                                        {filteredList?.map((item: any, index: any) => (
                                                            <Tooltip key={index} title={`${item?.itemDisplayName}`}>
                                                                <Avatar
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

                                    <div className="sm:col-span-9 col-span-12">
                                        <div className="px-4 py-4">
                                            <div className="text-3xl font-bold py-2">{translations[language]?.discussion}: {mediaList[0]?.title ? mediaList[0]?.title : mediaList[0]?.name}</div>
                                            <div className="flex-wrap flex gap-2 capitalize py-2">
                                                <div className="">{translations[language]?.discussion}</div>
                                                <div>{`-->`}</div>
                                                <a href={`/search?mediaType=${mediaType}`} className="hover:text-yellow-300 uppercase">{mediaType}</a>
                                                <div>{`-->`}</div>
                                                <a href={`/mediaType=${mediaType}/${mediaList[0]?.title ? mediaList[0]?.title : mediaList[0]?.name}`} className="hover:text-yellow-300"> {mediaList[0]?.title ? mediaList[0]?.title : mediaList[0]?.name}</a>
                                                <div>{`-->`}</div>
                                                <div>{translations[language]?.community}</div>
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
                                                        const existingDislikeIndex = item?.peopleDislike.findIndex((fav: any) => fav?.itemEmail == userInfoList[0]);
                                                        return (
                                                            <div key={index} className={`cursor-pointer ${index > 0 ? 'py-2' : ''}`}>
                                                                <div className="w-full bg-white text-black shadow-sm rounded-xl shadow-black">
                                                                    <div className="flex items-center flex-wrap gap-2 bg-gray-200 w-full px-2 py-2 rounded-tl-xl rounded-tr-xl">
                                                                        <Tooltip title={`${item?.itemDisplayName}`}>
                                                                            <Avatar
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
                                                                                    <div>Liked</div>
                                                                                </div> :
                                                                                <div className="flex flex-wrap items-center gap-2">
                                                                                    <i className="fa-solid fa-thumbs-up text-xl" onClick={() => handleAddlike(id, item?._id, userInfoList[0], userInfoList[1])}></i>
                                                                                    <div>Like</div>
                                                                                </div>
                                                                            }

                                                                            <div>•</div>
                                                                            <div>({item?.peopleLike?.length})</div>
                                                                            {/* <i className="fa-solid fa-thumbs-up fa-rotate-180 ml-2 text-xl"></i> */}
                                                                            {existingDislikeIndex !== -1 ?
                                                                                <div className="">
                                                                                    <i className="fa-solid fa-thumbs-up rotate-180 text-purple-500 text-xl" onClick={() => handleAddDislike(id, item?._id, userInfoList[0], userInfoList[1])}></i>
                                                                                </div> :
                                                                                <div className="">
                                                                                    <i className="fa-solid fa-thumbs-up  rotate-180 text-xl" onClick={() => handleAddDislike(id, item?._id, userInfoList[0], userInfoList[1])}></i>
                                                                                </div>
                                                                            }
                                                                            <div>•</div>
                                                                            <div>({item?.peopleDislike?.length})</div>
                                                                        </div>
                                                                        <div className='ml-auto flex flex-wrap gap-2 items-center'>
                                                                            <div>
                                                                                {item?.itemEmail === userInfoList[0] ?
                                                                                    <div onClick={() => handleRemoveReview(index, id, item?._id)} className="flex flex-wrap items-center gap-2">
                                                                                        {loading4[index] ? (
                                                                                            <div>
                                                                                                <i className="fa-solid fa-snowflake fa-spin-pulse"></i>
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div> {translations[language]?.remove}</div>
                                                                                        )}

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
                                            <div className="sm:hidden block py-2">
                                                <div onClick={() => setShowModal(true)} className=" bg-yellow-300 text-white w-fit  rounded-xl px-2 py-2 flex items-center gap-2 ">
                                                    <div><i className="fa-solid fa-pencil"></i></div>
                                                    <div>{translations[language]?.news} {translations[language]?.discussion}</div>
                                                </div>
                                            </div>
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