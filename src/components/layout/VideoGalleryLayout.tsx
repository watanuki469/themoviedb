import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Share from '../../modules/Share';
import ViewTable from '../../modules/ViewTable';
import { LanguageContext } from '../../pages/LanguageContext';
import apiController from '../../redux/client/api.Controller.';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListGenre } from '../../redux/reducers/genre.reducer';
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';
import { setlistKeyWord } from '../../redux/reducers/keyword.reducer';
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { AppDispatch } from '../../redux/store';
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { setListPerson } from "../../redux/reducers/person.reducer";
import GalleryVideoTable from "../../modules/GalleryVideoTable";
import ListRow from "../../modules/ListRow";
import Charts from "../../modules/Charts";
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";

export default function VideoGalleryLayout() {
    const { id } = useParams<{ id: any }>();
    const { name } = useParams()

    const dispatch = useAppDispatch();
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const personList = useAppSelector((state) => state.person.listPerson)
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

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

    useEffect(() => {
        dispatch(fetchPerson());
        dispatch(fetchMovies());
    }, [id])

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center px-2 ">
                    <TopBar />
                    <div className="w-full bg-black text-white ">
                        <div className="flex items-center  ">
                            <div className="lg:text-2xl text-lg font-bold  capitalize">
                                <a href={`/person/${id}`}>
                                    <div className="text-gray-500 hover:text-yellow-300"> {name}</div>
                                </a>
                                <h2 className="lg:text-2xl text-lg font-bold  capitalize"> Videos </h2>
                            </div>
                            <div className="flex items-center ml-auto gap-2 text-gray-400" >
                                <div className="text-md justify-center  text-right">
                                    <p className='font-bold uppercase'> {translations[language]?.listActivity}</p>
                                    <div className='flex items-center gap-2 font-semibold capitalize'>
                                        <i className="fa-regular fa-eye text-xl text-white"></i>
                                        <div>
                                            <div> <span className='text-lg text-white'>{personList[0]?.popularity}k</span> {translations[language]?.views}</div>
                                            <div>18K {translations[language]?.thisWeek}</div>
                                        </div>
                                    </div>
                                </div>
                                <Share bgColor={'white'} />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm" >
                            <div>by</div>
                            <a target='_blank' href='https://github.com/watanuki469?tab=repositories'
                                className='text-blue-500 hover:underline'>
                                Vasiliev-Editors
                            </a>
                            <div>•</div>
                            <div> {translations[language]?.createdModified}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" px-2">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <div className="grid grid-cols-12 gap-2 w-full">
                        <div className="lg:col-span-8 col-span-12  w-full px-2 py-2 ">
                            <GalleryVideoTable galleryList={personList[0]?.combined_credits?.cast} />
                        </div>
                        <div className="lg:col-span-4 col-span-12  h-full px-2 py-2 ">
                            <div>
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">  {translations[language]?.featuredToday}</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <ListRow listRowList={mostPopularTv} />
                                </div>
                                <p className="text-red w-full text-black">   {translations[language]?.staffPick}</p>
                                <p className="text-red w-full text-blue-500 hover:underline">   {translations[language]?.checkStatus}</p>
                            </div>
                            <div>
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black ">  {translations[language]?.chart}</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <Charts />
                                </div>
                            </div>
                            <div className='sticky top-0 right-0 left-0'>
                                <div className="flex items-center py-3">
                                    <h2 className="text-xl font-bold text-black capitalize"> {translations[language]?.moreExplore} {translations[language]?.genre}</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <TopRatedMovieByGenre />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <Footer />
                </div>
            </div>
        </div >
    )
}