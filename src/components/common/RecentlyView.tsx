import { useContext, useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import { handleImageError } from "../../modules/BaseModule";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGetRecentlyView, fetchRemoveRecentlyView } from "../../redux/reducers/login.reducer";
import { Swiper as SwiperType } from 'swiper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


export default function RecentlyViewed() {
    const dispatch = useAppDispatch()
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
    const recentList = useAppSelector((state) => state.login.listRecentlyView);

    useEffect(() => {
        if (userInfoList.length > 0) {
            dispatch(fetchGetRecentlyView(userInfoList[0]));
        }
    }, [userInfoList]);
    const [loadingQuery, setLoadingQuery] = useState(false);

    const handleRecentlyList = async (
        movieId: any,
        movieType: any,
        removeAll: any
    ) => {
        setLoadingQuery(true)
        await dispatch(fetchRemoveRecentlyView(
            userInfoList[0], movieId, movieType, removeAll,
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

    const swiperRef = useRef<SwiperType | null>(null);
    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };
    return (
        <div>
            <div className="text-white flex">
                <p className="text-xl lg:text-3xl font-bold capitalize">{translations[language]?.recentlyViewed}</p>
                <div className="flex items-center ml-auto flex-wrap capitalize  " >
                    <div className="mr-2 text-blue-500" onClick={() => handleRecentlyList('mro', 'meo', 'true')} >
                        {
                            loadingQuery ? (
                                <i className="fa-solid fa-earth-americas fa-spin-pulse text-xl"></i>
                            ) : (
                                <div>{translations[language]?.clearAll}</div>
                            )
                        }
                    </div>
                    <i className="fa-solid fa-angle-right text-blue-500"></i>
                </div>
            </div>
            {recentList?.length > 0 ? (
                <div className="relative">
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        spaceBetween={10}
                        slidesPerView={activeSlider}
                        modules={[Pagination, Navigation]}
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
                                        <a href={`/${movie?.itemType}/${movie?.itemId}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images" onError={handleImageError} className="absolute top-0 left-0 w-full h-full object-cover  rounded-tr-xl" />
                                        </a>
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
                        <button
                            onClick={handlePrev}
                            className="absolute hidden lg:block top-1/2 transform -translate-y-1/2 left-0 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 h-16 w-12 border-2 border-white"
                        >
                            <ChevronLeftIcon className="text-white" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute hidden lg:block top-1/2 transform -translate-y-1/2 right-0 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 h-16 w-12 border-2 border-white"
                        >
                            <ChevronRightIcon className="text-white" />
                        </button>
                    </Swiper>
                </div>
            ) : (
                <div className="text-white h-12 py-2"> {translations[language]?.noViewedPage} </div>
            )}
        </div>
    )
}