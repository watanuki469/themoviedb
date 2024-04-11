import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FourPhotos from "../../modules/FourPhotos";
import FourSwiperRow from "../../modules/FourSwiperRow";
import ListRow from "../../modules/ListRow";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { setListTv } from "../../redux/reducers/tv.reducer";
import { setListTvImage } from "../../redux/reducers/tvImage.reducer";
import { AppDispatch } from "../../redux/store";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import TvDetail from "../common/TvDetail";
import TvEpisode from "../common/TvEpisode";
import TvPerson from "../common/TvPerson";
import TvStoryLine from "../common/TvStoryLine";
import TwoMovieRow from "../../modules/TwoMovieRow";
import TvReview from "../common/TvReview";
import TvDetailExternal from "../common/TvDetailExternal";

export default function TvLayout() {
    const { id } = useParams()
    const dispatch = useAppDispatch();
    let navigate = useNavigate()


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
    const fetchTvImages = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiTvImages.tvImage(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListTvImage(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const tvList = useAppSelector((state) => state.tv.listTv)
    const tvImageList = useAppSelector((state) => state.tvImages.listTvImage)
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)

    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        dispatch(fetchMovies());
        dispatch(fetchTv());
        dispatch(fetchTvImages());
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, [id]);
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
    const totalImages = tvImageList[0]?.backdrops?.length + tvImageList[0]?.logos?.length + tvImageList[0]?.posters?.length;
    const [totalEpisodes, setTotalEpisodes] = useState(0);
    useEffect(() => {
        let sum = 0;
        if (tvList && tvList.length > 0) {
            tvList[0]?.seasons?.forEach((item: any) => {
                sum += item?.episode_count || 0;
            });
            setTotalEpisodes(sum);
        }
    }, [tvList]);


    return (
        <div className=" min-h-screen">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                    <TvDetail singleTvList={tvList} singleTvImageList={tvImageList} />
                </div>
            </div>
            <div className="bg-white">
                <div className="w-full lg:max-w-5xl xl:max-w-6xl mx-auto aligns-center  ">
                    <div className="md:grid grid-cols-12 gap-2 ">
                        <div className="lg:col-span-8 md-col-span-12  max-w-full ">
                            <div className="lg:max-w-full md:w-screen">
                                <div className="text-white py-4 ">
                                    <div className="flex items-center ">
                                        <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                        <h2 className="text-2xl font-bold text-black ">Episodes</h2>
                                        <p className="text-lg font-bold text-gray-500 ml-4 ">{typeof totalEpisodes === 'number' ? totalEpisodes : 'Loading...'}</p>
                                        <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                    </div>
                                </div>
                                <TvEpisode singleTvList={tvList} />
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <div className="text-white py-4 ">
                                    <div className="flex items-center ">
                                        <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                        <h2 className="text-2xl font-bold text-black ">Videos</h2>
                                        <p className="text-lg font-bold text-gray-500 ml-4 ">{tvList[0]?.videos?.results?.length}</p>
                                        <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                    </div>
                                </div>
                                <TwoMovieRow twoMovieRowList={tvList[0]?.videos?.results}/>
                            </div>
                            <div className="flex items-center py-4">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">Photos</h2>
                                <p className="text-lg font-bold text-gray-500 ml-4 ">{totalImages}</p>
                                <i className="fa-solid fa-angle-right text-black text-2xl ml-2"></i>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <FourPhotos fourPhotosList={tvImageList[0]?.backdrops}></FourPhotos>
                            </div>
                            <div className="text-white flex py-4 ">
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">Top Cast</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4 ">{tvList[0]?.aggregate_credits?.cast?.length}</p>
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                </div>
                                <div className="flex items-center ml-auto gap-2 hover:bg-opacity-80 hover:bg-gray-500 px-2 py-2" >
                                    <i className="fa-solid fa-pencil text-black text-xl ml-2"></i>
                                    <p className="flex items-center text-xl font-bold text-black ">
                                        Edit
                                    </p>
                                </div>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <TvPerson singleMovieList={tvList} />
                            </div>
                            <div className="text-white flex py-4 mt-4">
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">More Like This</h2>
                                </div>
                                <div className="flex items-center ml-auto gap-2" >
                                    <i className="fa-regular fa-circle-question text-black text-2xl ml-2"></i>
                                </div>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <FourSwiperRow fourSwiperRowList={tvList[0]?.similar?.results} />
                            </div>

                            <div className="text-white flex py-2 ">
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">Story Line</h2>
                                </div>
                                <div className="flex items-center ml-auto gap-2 hover:bg-opacity-80 hover:bg-gray-500 px-2 py-2" >
                                    <i className="fa-solid fa-pencil text-black text-xl ml-2"></i>
                                    <p className="flex items-center text-xl font-bold text-black ">
                                        Edit
                                    </p>
                                </div>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <TvStoryLine tvList={tvList} />
                            </div>
                            <div className="text-white flex py-4 ">
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">User Reviews</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4 ">{tvList[0]?.reviews.results.length}</p>
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2"></i>
                                </div>
                                <div className="flex items-center ml-auto gap-2" >
                                    <i className="fa-solid fa-plus text-blue-500 text-sm ml-2"></i>
                                    <p className="flex items-center text-sm text-blue-500 ">
                                        Review
                                    </p>
                                </div>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <TvReview singleTvList={tvList} />
                            </div>
                            <div className="text-white flex py-4 ">
                                <div className="flex items-center ">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">Detail</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4 ">{tvList[0]?.aggregate_credits?.cast?.length}</p>
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                </div>
                                <div className="flex items-center ml-auto gap-2 hover:bg-opacity-80 hover:bg-gray-500 px-2 py-2" >
                                    <i className="fa-solid fa-pencil text-black text-xl ml-2"></i>
                                    <p className="flex items-center text-xl font-bold text-black ">
                                        Edit
                                    </p>
                                </div>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <TvDetailExternal tvDetailExList={tvList} />
                            </div>


                        </div>
                        <div className="hidden lg:block col-span-4  h-full px-2 py-2 ">
                            <div className="flex items-center py-3">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">More to explore</h2>
                            </div>
                            <ListRow listRowList={topRatedMovies} />
                            <p className="text-red w-full text-black"> Staff Picks: What to Watch in {currentMonthName}</p>
                            <p className="text-red w-full text-blue-500"> See our picks</p>
                        </div>


                    </div>
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center mt-10 ">
                    <Footer />
                </div>
            </div>
        </div>
    )
}