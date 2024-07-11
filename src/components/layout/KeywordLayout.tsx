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

export default function KeywordLayout() {
    const { mediaType } = useParams()
    const { keyword } = useParams()
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const listKeywordMovie = useAppSelector((state) => state.keyword.listKeyWord)
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    const fetchKeyword = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiKeyword.keyword(id, mediaType)
        ])
            .then((data: any) => {
                if (data[0] && data[0].results) {
                    dispatch(setlistKeyWord(data[0].results));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const [mediaKeywordType, setMediaKeyWordType] = useState('');

    useEffect(() => {
        switch (mediaType) {
            case 'movies':
                setMediaKeyWordType('movie')
                break;
            case 'movie':
                setMediaKeyWordType('movie')
                break;
            case 'tvs':
                setMediaKeyWordType('tv')
                break;
            case 'tv':
                setMediaKeyWordType('tv')
                break;
            default:
                setMediaKeyWordType('movie')
                break;
        }
    }, [id, mediaType]);
    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchKeyword());
        dispatch(fetchMovies());
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, []);

    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre)
    const fetchGenre = () => (dispatch: AppDispatch) => {
        apiController.apiGenre.genre('movie')
            .then((data: any) => {
                if (data && data?.genres) {
                    dispatch(setListGenre(data?.genres)); // Adjust the dispatch based on actual response structure
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        dispatch(fetchGenre());
    }, [dispatch]); 

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black pb-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                    <div className="w-full bg-black text-white ">
                        <div className="flex items-center  ">
                            <h2 className="lg:text-2xl text-lg font-bold  capitalize"> {translations[language]?.keyword}: {keyword}
                            </h2>
                            <div className="flex items-center ml-auto gap-2 text-gray-400" >
                                <div className="text-md justify-center  text-right">
                                    <p className='font-bold uppercase'> {translations[language]?.listActivity}</p>
                                    <div className='flex items-center gap-2 font-semibold capitalize'>
                                        <i className="fa-regular fa-eye text-xl text-white"></i>
                                        <div>
                                            <div> <span className='text-lg text-white'>107K</span> {translations[language]?.views}</div>
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
            <div className="bg-white px-2">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <ViewTable viewList={listKeywordMovie}  mediaType={mediaKeywordType} moreToExploreList={mostPopularTv} genreList={listGenreFromApi}></ViewTable>
                </div>
            </div>

            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center mt-10 ">
                    <Footer />
                </div>
            </div>
        </div >
    )
}