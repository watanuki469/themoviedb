import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import ListRow from "../../modules/ListRow";
import SwiperRow from "../../modules/SwiperRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import BornToday from "../common/BornToday";
import Footer from "../common/Footer";
import Slider from "../common/Slider";
import TopBar from "../common/TopBar";
import { AppDispatch } from "../../redux/store";
import { getListRecentlyViewMongoApi, removeListRecentlyViewMongoApi } from "../../redux/client/api.LoginMongo";
import { setDeleteRecentlyView, setListRecentlyView } from "../../redux/reducers/login.reducer";
import { toast } from "react-toastify";

export default function MainLayout() {
    const dispatch = useAppDispatch()
    let navigate = useNavigate()
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const topRatedTv = useAppSelector((state) => state.movies.listTopRatedTvReq)
    const discoverTv = useAppSelector((state) => state.movies.discoverTv)
    const discoverMovie = useAppSelector((state) => state.movies.discoverMovies)

    const currentDate = new Date();

    // Mảng các tên tháng
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Lấy số tháng từ ngày hiện tại (chú ý rằng tháng trong JavaScript bắt đầu từ 0)
    const currentMonth = currentDate.getMonth();

    // Lấy tên của tháng hiện tại từ mảng monthNames
    const currentMonthName = monthNames[currentMonth];
    // const [watchList, setWatchList] = useState<any[]>([]);
    // useEffect(() => {
    //     // Lấy dữ liệu từ local storage
    //     const storedDataString = localStorage.getItem('activity');
    //     let storedData = [];

    //     if (storedDataString) {
    //         storedData = JSON.parse(storedDataString);
    //     }
    //     // console.log('Stored data:', storedData);

    //     // Lưu dữ liệu vào state
    //     setWatchList(Object.values(storedData)); // Chuyển đổi dữ liệu từ đối tượng sang mảng
    // }, []);
    // const removeFromWatchList = () => {
    //     // Xóa dữ liệu với key 'activity' khỏi local storage
    //     localStorage.removeItem('activity');

    //     // Cập nhật state để render lại (nếu cần)
    //     setWatchList([]);
    // };
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };
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
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);

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
            movieId,
            movieType,
            removeAll,
        ));
        // Scroll to the top of the page
        window.scrollTo(0, 0);
        // Reload the page
        window.location.reload();
        setTimeout(() => {
            setLoadingQuery(false)
        }, 1000);
    };

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />

                    <div className="mt-8 ">
                        <Slider />
                    </div>
                    <div className="text-white mt-10">
                        <p className="text-yellow-300 text-xl lg:text-3xl font-bold">
                            Featured today
                        </p>
                    </div>

                    <div className="lg:max-w-full w-full mt-2  ">
                        <div
                            onClick={() => navigate('/top250Movie')}
                            className="lg:grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 grid gap-2 text-white ">
                            <div>
                                <ListRow listRowList={topRatedMovies} />
                                <p className="mt-2 hover:underline">Staff Picks: What to Watch in {currentMonthName}</p>
                                <p className="mt-2 text-blue-500 hover:underline">See our picks</p>
                            </div>
                            <div>
                                <a href="/top250Tv">
                                    <ListRow listRowList={mostPopularTv} />
                                </a>
                                <p className="mt-2 hover:underline">TV Tracker: Renewed and Canceled Shows</p>
                                <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-white flex mt-10">
                        <p className="text-yellow-300 text-xl lg:text-3xl font-bold">
                            What to watch
                        </p>
                        <div className="flex items-center ml-auto flex-wrap" >
                            <p className="mr-2 text-blue-500" onClick={() => navigate('/watchToWatch')}>
                                Get more recommendations
                            </p>
                            <i className="fa-solid fa-angle-right text-blue-500"></i>
                        </div>
                    </div>
                    <div className="flex items-center mt-10">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">Top picks</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="text-gray-300 mb-8">
                        <h3 className="text-sm font-semibold">Top rated movies just for you</h3>
                    </div>

                    <div className="mt-10 overflow-hidden">
                        <SwiperRow searchItemList={topRatedMovies} mediaType={'Movie'} />

                    </div>

                    <div className="flex items-center mt-10">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">Most popular TV show this week</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="mt-8 overflow-hidden">
                        <SwiperRow searchItemList={mostPopularTv} mediaType={'TV'} />

                    </div>

                    <div className="flex items-center mt-8">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">Top Rated TV Shows</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="text-gray-300 mt-3">
                        <h3 className="text-sm font-semibold">Top rated TV shows just for you</h3>
                    </div>
                    <div className="mt-8 overflow-hidden " >
                        <SwiperRow searchItemList={topRatedTv} mediaType={'TV'} />
                    </div>

                    <div className=" overflow-hidden">
                        <div className="items-center mt-12">
                            <h2 className="text-xl font-bold text-white mt-10 ">More to watch</h2>
                        </div>
                        <div className="gap-4 mb-8 mt-2">
                            <div className="text-gray-300 items-center">
                                <h3 className="text-sm font-semibold mr-4">IMDb helps you select the perfect next show or movie to watch.</h3>
                                <div className="flex w-1/2 mt-5 bg-black ">
                                    <button onClick={() => navigate('/top250Tv')} className="text-white font-semibold px-4 py-2 rounded-md mr-2 w-full border-2 border-white hover:opacity-80">Watch Guide</button>
                                    <button onClick={() => navigate('/top250Movie')} className="text-white font-semibold px-4 py-2 rounded-md w-full  border-2 border-white  hover:opacity-80">Most Popular</button>
                                </div>
                                <div className="flex w-1/2 mt-5 bg-black ">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-white mt-6">
                        <p className="text-yellow-300 text-xl lg:text-3xl font-bold">
                            Editor's picks
                        </p>
                    </div>

                    <div className="lg:max-w-full w-full mt-6  ">
                        <div
                            onClick={() => navigate('/top250Movie')}
                            className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2 text-white ">
                            <div>
                                <ListRow listRowList={topRatedMovies?.slice(3)} />
                                <p className="mt-2 hover:underline">Staff Picks: What to Watch in {currentMonthName}</p>
                                <p className="mt-2 text-blue-500 hover:underline">See our picks</p>
                            </div>
                            <div>
                                <a href="/top250Tv">
                                    <ListRow listRowList={discoverMovie} />
                                </a>
                                <p className="mt-2 hover:underline">{currentMonthName} 2024 TV and Streaming Premiere Dates</p>
                                <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                            </div>
                            <div>
                                <a href="/top250Tv">
                                    <ListRow listRowList={discoverTv} />
                                </a>
                                <p className="mt-2 hover:underline">Everything New On Netflix In {currentMonthName}</p>
                                <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                            </div>

                        </div>
                    </div>
                    <div className="text-white flex mt-10">
                        <p className="text-yellow-300 text-xl lg:text-3xl font-bold">
                            Recently viewed
                        </p>
                        <div className="flex items-center ml-auto flex-wrap" >
                            <p className="mr-2 text-blue-500" onClick={() => handleWatchList('mro', 'meo', 'true')} >

                                {
                                    loadingQuery ? (
                                        <i className="fa-solid fa-earth-americas fa-spin-pulse text-xl"></i>
                                    ) : (
                                        <div>
                                            Clear all
                                        </div>
                                    )
                                }
                            </p>
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
                                    <SwiperSlide key={movieIndex} className="w-full h-auto">
                                        <div className="font-sans shadow-sm shadow-black  " >
                                            <div className="mt-2">
                                                <div className="items-center gap-2">
                                                    <img onClick={() => navigate(`/${movie?.itemType}/${movie?.itemId}`)}
                                                        src={`https://image.tmdb.org/t/p/w500/${movie?.itemImg}`} alt="product images"
                                                        onError={handleImageError} className="w-full h-60 hover:opacity-80" />
                                                    <div className="px-2 py-2 w-full">
                                                        <div className="flex flex-wrap items-center gap-2 justify-start text-left">
                                                            <div className="h-12 w-full ">
                                                                <p className="font-bold hover:opacity-50 line-clamp-2"> {movie?.itemName}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide >
                                ))}
                            </Swiper>
                        </div>
                    ) : (
                        <div className="text-white h-12 py-2">You have no recently viewed pages</div>
                    )}

                    <div className=" overflow-hidden">
                        <Footer />
                    </div>
                </div>
            </div>
        </div >

    )
}