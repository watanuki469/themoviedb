import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import { getListRecentlyViewMongoApi, removeListRecentlyViewMongoApi } from "../../redux/client/api.LoginMongo";
import { setDeleteRecentlyView, setListRecentlyView } from "../../redux/reducers/login.reducer";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";

export default function RecentlyViewed() {
    const dispatch = useAppDispatch()
    let navigate = useNavigate()
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);

    const [activeSlider, setActiveSlider] = useState(3);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) {
                setActiveSlider(2);
            } else if (window.innerWidth < 600) {
                setActiveSlider(3);
            } else if (window.innerWidth < 768) {
                setActiveSlider(4);
            } else if (window.innerWidth < 1024) {
                setActiveSlider(5);
            } else {
                setActiveSlider(6);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750'; // Set the fallback image source here
    };
    const recentList = useAppSelector((state) => state.login.listRecentlyView);

    const fetchGetFavorites = () => async (dispatch: AppDispatch) => {
        try {
            const response = await getListRecentlyViewMongoApi(userInfoList[0]);
            if (response) {
                dispatch(setListRecentlyView(response));
            } else {
                throw new Error('Failed to fetch favorites');
            }
        } catch (e) {
            console.log("Fetching favorites failed: " + e);
        }
    }
    useEffect(() => {
        if (userInfoList.length > 0) {
            dispatch(fetchGetFavorites());
        }
    }, [userInfoList]);

    const fetchRemove = (
        movieId: string,
        movieType: string,
        removeALl: string
    ) => async (dispatch: AppDispatch) => {
        const email = userInfoList[0];
        try {
            const response = await removeListRecentlyViewMongoApi(
                email,
                movieId,
                movieType,
                removeALl
            );
            dispatch(setDeleteRecentlyView(response));
            if (response) {
                await dispatch(fetchGetFavorites());
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Updating watch list failed");
        }
    };

    const [loadingQuery, setLoadingQuery] = useState(false);

    const handleWatchList = async (
        movieId: any,
        movieType: any,
        removeAll: any
    ) => {
        setLoadingQuery(true)
        await dispatch(fetchRemove(
            movieId, movieType, removeAll,
        ));
        window.scrollTo(0, 0);
        // Reload the page
        window.location.reload();
        setTimeout(() => {
            setLoadingQuery(false)
        }, 1000);
    };

    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;
    return (
        <div>
            <div className="text-white flex">
                <p className="text-xl lg:text-3xl font-bold">
                    {translations[language]?.recentlyViewed}
                </p>
                <div className="flex items-center ml-auto flex-wrap" >
                    <div className="mr-2 text-blue-500" onClick={() => handleWatchList('mro', 'meo', 'true')} >
                        {
                            loadingQuery ? (
                                <i className="fa-solid fa-earth-americas fa-spin-pulse text-xl"></i>
                            ) : (
                                <div>
                                    {translations[language]?.clearAll}
                                </div>
                            )
                        }
                    </div>
                    <i className="fa-solid fa-angle-right text-blue-500"></i>
                </div>
            </div>
            {recentList?.length > 0 ? (
                <div className="relative">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={activeSlider}
                        direction="horizontal"
                        className="mySwiper w-full text-white h-auto flex "
                    >
                        {recentList?.slice()?.sort((a: any, b: any) => {
                            const dateA = new Date(a?.createdTime)?.getTime();
                            const dateB = new Date(b?.createdTime)?.getTime();
                            return dateB - dateA;
                        })?.map((movie: any, movieIndex: any) => (
                            <SwiperSlide key={movieIndex} className="w-full h-auto ">
                                <div className="font-sans py-2" >
                                    <div className="relative w-full pb-[150%] hover:opacity-80">
                                        <img onClick={() => navigate(`/${movie?.itemType}/${movie?.itemId}`)}
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images"
                                            onError={handleImageError}
                                            className="absolute top-0 left-0 w-full h-full object-cover  rounded-tr-xl" />
                                    </div>
                                    <div className="px-2 py-2 w-full bg-gray-900 rounded-br-xl rounded-bl-xl ">
                                        <div className="flex flex-wrap items-center gap-2 justify-start text-left">
                                            <div className="h-12 w-full ">
                                                <p className="font-bold hover:opacity-50 line-clamp-2"> {movie?.itemName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide >
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div className="text-white h-12 py-2"> {translations[language]?.noViewedPage} </div>
            )}
        </div>
    )
}