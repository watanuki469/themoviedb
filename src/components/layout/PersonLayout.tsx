import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../common/TopBar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import apiController from "../../redux/client/api.Controller.";
import { setListPerson } from "../../redux/reducers/person.reducer.";
import { useEffect } from "react";
import PersonDetail from "../common/PersonDetail";
import ListRow from "../../modules/ListRow";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import FourPhotos from "../../modules/FourPhotos";
import PersonCredit from "../common/PersonCredit";
import TwoMovieRow from "../../modules/TwoMovieRow";
import PersonMovie from "../common/PersonMovie";
import PersonDetailExternal from "../common/PersonDetailExternal";
import Footer from "../common/Footer";

export default function PersonLayout() {
    const { id } = useParams()
    const dispatch = useAppDispatch();
    let navigate = useNavigate()


    const fetchPerson = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiPerson.person(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListPerson(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const personList = useAppSelector((state) => state.person.listPerson)
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)

    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        dispatch(fetchPerson());
        dispatch(fetchMovies());
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

    return (
        <div className=" min-h-screen">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                    <PersonDetail singleMovieList={personList} />

                </div>
            </div>
            <div className="bg-white">
                <div className="w-full lg:max-w-5xl xl:max-w-6xl mx-auto aligns-center  ">
                    <div className="md:grid grid-cols-12 gap-2 ">
                        <div className="lg:col-span-8 md-col-span-12  max-w-full ">
                            <div className="flex items-center py-4">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">Photos</h2>
                                <p className="text-lg font-bold text-gray-500 ml-4 ">{personList[0]?.images?.profiles?.length}</p>
                                <i className="fa-solid fa-angle-right text-black text-2xl ml-2"></i>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <FourPhotos fourPhotosList={personList[0]?.images?.profiles}></FourPhotos>
                            </div>
                            <div className="flex items-center py-4">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">Know For</h2>
                            </div>
                            <div className="lg:max-w-full md:w-screen ">
                                <PersonCredit personCreditList={personList[0]?.combined_credits?.cast} />
                            </div>
                            <div className="lg:max-w-full md:w-screen ">
                                <div className="flex items-center py-4"  >
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">Videos</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4 ">{personList[0]?.combined_credits?.cast?.length}</p>
                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2"></i>
                                </div>
                                <PersonMovie personMovieList={personList[0]?.combined_credits?.cast} />
                            </div>
                            <div className="lg:max-w-full md:w-screen ">
                                <div className="text-white flex py-4 ">
                                    <div className="flex items-center ">
                                        <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                        <h2 className="text-2xl font-bold text-black ">Personal details</h2>
                                    </div>
                                    <div className="flex items-center ml-auto gap-2" >
                                        <i className="fa-solid fa-pencil text-black text-2xl ml-2"></i>
                                        <p className="flex items-center text-2xl font-bold text-black ">
                                            Edit
                                        </p>
                                    </div>
                                </div>
                                <PersonDetailExternal personDetailExList={personList} />
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