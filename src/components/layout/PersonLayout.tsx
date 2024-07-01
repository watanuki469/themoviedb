import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FourPhotos from "../../modules/FourPhotos";
import ListRow from "../../modules/ListRow";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { setListPerson } from "../../redux/reducers/person.reducer";
import { AppDispatch } from "../../redux/store";
import Footer from "../common/Footer";
import PersonCredit from "../common/PersonCredit";
import PersonDetail from "../common/PersonDetail";
import PersonDetailExternal from "../common/PersonDetailExternal";
import PersonMovie from "../common/PersonMovie";
import TopBar from "../common/TopBar";
import { setRecentlyView } from "../../redux/reducers/login.reducer";
import { addRecentlyViewed, recentlyViewMongoApi } from "../../redux/client/api.LoginMongo";
import { LanguageContext } from "../../pages/LanguageContext";

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
        dispatch(setGlobalLoading(true));
        dispatch(fetchPerson());
        dispatch(fetchMovies());
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, [id]);
  
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);
    
    useEffect(() => {
        dispatch(addRecentlyViewed({
            email: userInfoList[0],
            movieId: personList[0]?.id,
            movieName: personList[0]?.name,
            movieImg: personList[0]?.profile_path,
            movieType: "Person",
        }))
    }, [userInfoList, personList, dispatch])
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;


    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                    <PersonDetail singleMovieList={personList} />

                </div>
            </div>
            <div className="bg-white">
                <div className="w-full lg:max-w-5xl xl:max-w-6xl mx-auto aligns-center  ">
                    <div className="md:grid grid-cols-12 gap-2 ">
                        <div className="lg:col-span-8 col-span-12  max-w-full ">
                            <div className="flex items-center py-4">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 id="personPhotos" className="text-2xl font-bold text-black ">{translations[language]?.photos}</h2>
                                <p className="text-lg font-bold text-gray-500 ml-4 ">{personList[0]?.images?.profiles?.length}</p>
                                <i
                                    onClick={() => navigate(`/image/person/${personList[0]?.id}`)}
                                    className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                            </div>
                            <div className="lg:max-w-full w-full" onClick={() => navigate(`/image/person/${id}`)}>
                                <FourPhotos fourPhotosList={personList[0]?.images?.profiles}></FourPhotos>
                            </div>
                            <div className="flex items-center py-4">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 id="personKnowFor" className="text-2xl font-bold text-black ">{translations[language]?.knowFor}</h2>
                            </div>
                            <div className="lg:max-w-full w-full ">
                                <PersonCredit personCreditList={personList[0]?.combined_credits?.cast} />
                            </div>
                            <div className="lg:max-w-full w-full ">
                                <div className="flex items-center py-4"  >
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 id="personVideos" className="text-2xl font-bold text-black ">Videos</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4 ">{personList[0]?.combined_credits?.cast?.length}</p>
                                    <i
                                        onClick={() => navigate(`/video/${personList[0]?.combined_credits?.cast[0]?.id}`)}
                                        className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                </div>
                                <PersonMovie personMovieList={personList[0]?.combined_credits?.cast} />
                            </div>
                            <div className="lg:max-w-full w-full ">
                                <div className="text-white flex py-4 ">
                                    <div className="flex items-center ">
                                        <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                        <h2 id="personalDetails" className="text-2xl font-bold text-black ">{translations[language]?.moreExplore}</h2>
                                    </div>
                                </div>
                                <PersonDetailExternal personDetailExList={personList} />
                            </div>
                        </div>
                        <div className="hidden lg:block col-span-4  h-full px-2 py-2 ">
                            <div className="flex items-center py-3">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">{translations[language]?.moreExplore}</h2>
                            </div>
                            <div onClick={() => navigate(`/top250Movie`)}>
                                <ListRow listRowList={topRatedMovies} />
                            </div>

                            <p className="text-red w-full text-black">{translations[language]?.staffPick}</p>
                            <p
                                onClick={() => navigate(`/top250Movie`)}
                                className="text-red w-full text-blue-500"> {translations[language]?.seeOurPick}</p>
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