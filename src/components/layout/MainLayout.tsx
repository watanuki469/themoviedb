import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import TopBar from "../common/TopBar";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import Slider from "../common/Slider";
import SwiperRow from "../../modules/SwiperRow";
import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";

export default function MainLayout() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const topRatedTv = useAppSelector((state) => state.movies.listTopRatedTvReq)


    return (
        <div className="">
            <div className="">
                
                {/* <TopBar /> */}

                <div className="mt-8 ">
                    <Slider />
                </div>
                <div className="text-white flex mt-3">
                    <p className="text-yellow-300 text-3xl">
                        What to watch
                    </p>
                    <div className="flex items-center ml-auto" >
                        <p className="mr-2 text-blue-500">
                            Get more recommendations
                        </p>
                        <i className="fa-solid fa-angle-right text-blue-500"></i>
                    </div>

                </div>
                <div className="flex items-center mt-4">
                    <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                    <h2 className="text-xl font-bold text-white ">Top picks</h2>
                    <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                </div>

                <div className="text-gray-300 mb-8">
                    <h3 className="text-sm font-semibold">Top rated movies just for you</h3>
                </div>

                <div className="mt-10">
                    <SwiperRow searchItemList={topRatedMovies} />

                </div>

                <div className="flex items-center mt-8">
                    <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                    <h2 className="text-xl font-bold text-white ">Most popular TV show this week</h2>
                    <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                </div>

                <div className="mt-8">
                    <SwiperRow searchItemList={mostPopularTv} />

                </div>

                <div className="flex items-center mt-8">
                    <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                    <h2 className="text-xl font-bold text-white ">Top Rated TV Shows</h2>
                    <i className="fa-solid fa-angle-right text-white text-xl ml-4"></i>
                </div>

                <div className="text-gray-300 mt-3">
                    <h3 className="text-sm font-semibold">Top rated TV shows just for you</h3>
                </div>
                <div className="mt-6">
                    <SwiperRow searchItemList={topRatedTv} />
                </div>
                <div className="flex items-center mt-12">
                    <div className="h-6 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                    <h2 className="text-xl font-bold text-white ">More to watch</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="text-gray-300 items-center">
                        <h3 className="text-sm font-semibold mr-4">IMDb helps you select the perfect next show or movie to watch.</h3>
                        <div className="flex w-full mt-5 bg-black ">
                            <button className="text-white font-semibold px-4 py-2 rounded-md mr-2 w-full border-2 border-white">Watch Guide</button>
                            <button className="text-white font-semibold px-4 py-2 rounded-md w-full  border-2 border-white">Most Popular</button>
                        </div>
                    </div>
                    <div></div>
                </div>


                <div>
                    <Footer />
                </div>

            </div>
        </div>

    )
}