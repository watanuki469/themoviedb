import { useNavigate } from "react-router-dom";
import ListRow from "../../modules/ListRow";
import SwiperRow from "../../modules/SwiperRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Footer from "../common/Footer";
import Slider from "../common/Slider";
import TopBar from "../common/TopBar";
import BornToday from "../common/BornToday";
import TopNew from "../../modules/TopNew";

export default function MainLayout() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const topRatedTv = useAppSelector((state) => state.movies.listTopRatedTvReq)
    const discoverTv = useAppSelector((state) => state.movies.discoverTv)
    const discoverMovie = useAppSelector((state) => state.movies.discoverMovies)
    const nextFlix = useAppSelector((state) => state.movies.listNetflixOriginal)

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
                                <ListRow listRowList={topRatedMovies} />
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

                    <div className=" overflow-hidden">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>

    )
}