import { useNavigate } from "react-router-dom";
import ListRow from "../../modules/ListRow";
import SwiperRow from "../../modules/SwiperRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import BornToday from "../common/BornToday";
import Footer from "../common/Footer";
import Slider from "../common/Slider";
import TopBar from "../common/TopBar";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";

export default function MainLayout() {
    const dispatch=useAppDispatch()
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
    const [watchList, setWatchList] = useState<any[]>([]);
    useEffect(() => {
        // Lấy dữ liệu từ local storage
        const storedDataString = localStorage.getItem('activity');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        console.log('Stored data:', storedData);

        // Lưu dữ liệu vào state
        setWatchList(Object.values(storedData)); // Chuyển đổi dữ liệu từ đối tượng sang mảng
    }, []);
    const removeFromWatchList = () => {
        // Xóa dữ liệu với key 'activity' khỏi local storage
        localStorage.removeItem('activity');
    
        // Cập nhật state để render lại (nếu cần)
        setWatchList([]);
    };
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };
    function shortenNumber(number: any) {
        if (number >= 1000000000) {
            return (number / 1000000000).toFixed(1) + 'b';
        }
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'm';
        }
        if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'k';
        }
        return number;
    }
    const [activeSlider, setActiveSlider] = useState(3);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveSlider(2);
            } else if (window.innerWidth < 1024) {
                setActiveSlider(3);
            } else {
                setActiveSlider(6);
            }
        };

        window.addEventListener('resize', handleResize);
        // Call handleResize at initial load
        handleResize();

        // Clean up event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  
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

                    <div className="lg:max-w-full md:w-screen mt-2  ">
                        <div
                            onClick={() => navigate('/top250Movie')}
                            className="lg:grid lg:grid-cols-3 gap-2 text-white ">
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
                            <p className="mr-2 text-blue-500" onClick={() => navigate('/top250Movie')}>
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
                        <SwiperRow searchItemList={topRatedMovies} mediaType={'movie'} />

                    </div>

                    <div className="flex items-center mt-10">
                        <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                        <h2 className="text-xl font-bold text-white ">Most popular TV show this week</h2>
                        <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                    </div>

                    <div className="mt-8 overflow-hidden">
                        <SwiperRow searchItemList={mostPopularTv} mediaType={'tv'} />

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
                        <SwiperRow searchItemList={topRatedTv} mediaType={'tv'} />
                    </div>

                    <BornToday />

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

                    <div className="lg:max-w-full md:w-screen mt-6  ">
                        <div
                            onClick={() => navigate('/top250Movie')}
                            className="lg:grid lg:grid-cols-3 gap-2 text-white ">
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
                            <p className="mr-2 text-blue-500" onClick={() => removeFromWatchList()} >
                                Clear all
                            </p>
                            <i className="fa-solid fa-angle-right text-blue-500"></i>
                        </div>
                    </div>

                    <div className="relative">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={activeSlider}
                            direction="horizontal"
                            className="mySwiper w-full text-white h-auto flex "
                        >
                            {watchList?.map((movie: any, movieIndex: any) => (
                                <SwiperSlide key={movieIndex} className="w-full h-auto">
                                    <div className="font-sans shadow-sm shadow-black  " >
                                        <div className="mt-2">
                                            <div className="items-center gap-2">
                                                <img onClick={() => navigate(`/${movie?.poster_path ? (movie?.title ? 'movie' : 'tv') : ('person')}/${movie.id}`)}
                                                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path ? movie?.poster_path : movie?.profile_path}`} alt="product images"
                                                    onError={handleImageError} className="w-full h-60 hover:opacity-80" />
                                                <div className="px-2 py-2 w-full">
                                                    <div className="flex flex-wrap items-center gap-2 justify-start text-left">
                                                        {
                                                            movie?.poster_path ?
                                                                (
                                                                    < div className="flex items-center gap-2">
                                                                        <i className="fa-solid fa-star text-yellow-300"></i>
                                                                        <p>{movie?.vote_average} ({shortenNumber(movie?.vote_count)})</p>
                                                                    </div>
                                                                ) : (
                                                                    < div className="flex items-center gap-2">
                                                                        <i className="fa-solid fa-star text-yellow-300"></i>
                                                                        <p>{movie?.known_for_department} </p>
                                                                    </div>

                                                                )
                                                        }

                                                        <div className="h-12 w-full ">
                                                            <p className="font-bold hover:opacity-50 line-clamp-2"> {movie?.title ? movie?.title : movie?.name}</p>
                                                        </div>
                                                        <div className="flex flex-wrap">
                                                            {
                                                                movie?.poster_path ? (
                                                                    movie?.release_date ? movie?.release_date?.slice(0, 4) : movie?.first_air_date?.slice(0, 4)

                                                                ) : (
                                                                    movie?.birthday &&
                                                                    new Date(movie?.birthday).toLocaleDateString('en-US', {
                                                                        month: 'long',
                                                                        day: 'numeric',
                                                                        year: 'numeric'
                                                                    })
                                                                )
                                                            }
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

                    <div className=" overflow-hidden">
                        <Footer />
                    </div>
                </div>
            </div>
        </div >

    )
}