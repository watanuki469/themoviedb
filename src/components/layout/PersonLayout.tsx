import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FourPhotos from "../../modules/FourPhotos";
import ListRow from "../../modules/ListRow";
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";
import { LanguageContext } from "../../pages/LanguageContext";
import { addRecentlyViewed } from "../../redux/client/api.LoginMongo";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { fetchPerson } from "../../redux/reducers/person.reducer";
import Footer from "../common/Footer";
import PersonCredit from "../common/PersonCredit";
import PersonDetail from "../common/PersonDetail";
import PersonDetailExternal from "../common/PersonDetailExternal";
import PersonFullCredit from "../common/PersonFullCredit";
import PersonMovie from "../common/PersonMovie";
import TopBar from "../common/TopBar";

export default function PersonLayout() {
    const { id } = useParams()
    const dispatch = useAppDispatch();

 
    const personList = useAppSelector((state) => state.person.listPerson)
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchPerson(id));
        dispatch(fetchMovies());
        dispatch(setGlobalLoading(false));;
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
            <div className="bg-black px-2">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                    <PersonDetail singleMovieList={personList} />
                </div>
            </div>
            <div className="bg-white px-2">
                <div className="w-full lg:max-w-5xl xl:max-w-6xl mx-auto aligns-center  ">
                    <div className="md:grid grid-cols-12 gap-2 ">
                        <div className="lg:col-span-8 col-span-12  max-w-full ">
                            <a href={`/image/person/${personList[0]?.id}`}>
                                <div className="flex items-center py-4">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 id="personPhotos" className="text-2xl font-bold text-black ">{translations[language]?.photos}</h2>
                                    <p className="text-lg font-bold text-gray-500 ml-4 ">{personList[0]?.images?.profiles?.length}</p>

                                    <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <FourPhotos fourPhotosList={personList[0]?.images?.profiles}></FourPhotos>
                                </div>
                            </a>
                            <div className="flex items-center py-4">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 id="personKnowFor" className="text-2xl font-bold text-black ">{translations[language]?.knowFor}</h2>
                            </div>
                            <div className="lg:max-w-full w-full ">
                                <PersonCredit personCreditList={personList[0]?.combined_credits?.cast} />
                            </div>
                            <div className="flex items-center py-4">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 id="personKnowFor" className="text-2xl font-bold text-black ">Credits</h2>
                            </div>
                            <div className="lg:max-w-full w-full ">
                                <PersonFullCredit personCreditList={personList[0]?.combined_credits} />
                            </div>

                            <div className="lg:max-w-full w-full ">
                                <a href={`/videoGallery/${personList[0]?.title ? personList[0]?.title : personList[0]?.name}/${personList[0]?.id}`}>
                                    <div className="flex items-center py-4"  >
                                        <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                        <h2 id="personVideos" className="text-2xl font-bold text-black ">Videos</h2>
                                        <p className="text-lg font-bold text-gray-500 ml-4 ">{personList[0]?.combined_credits?.cast?.length}</p>
                                        <i className="fa-solid fa-angle-right text-black text-2xl ml-2 hover:text-yellow-300"></i>
                                    </div>
                                </a>
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
                            <a href={`/top250Movie`}>
                                <ListRow listRowList={topRatedMovies} />
                            </a>

                            <p className="text-red w-full text-black">{translations[language]?.staffPick}</p>
                            <a href={`/top250Movie`}>
                                <p className="text-red w-full text-blue-500"> {translations[language]?.seeOurPick}</p>
                            </a>

                            <div className="sticky top-0">
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black capitalize">{translations[language]?.moreExplore} {translations[language]?.genre}</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <TopRatedMovieByGenre />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black px-2">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <Footer />
                </div>
            </div>
        </div >
    )
}