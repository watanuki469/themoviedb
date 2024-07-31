import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Share from '../../modules/Share';
import ViewTable from '../../modules/ViewTable';
import { LanguageContext } from '../../pages/LanguageContext';
import apiController from '../../redux/client/api.Controller.';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGenre, setListGenre } from '../../redux/reducers/genre.reducer';
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { fetchTrending } from '../../redux/reducers/trending.reducer';
import { AppDispatch } from '../../redux/store';
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { monthNames } from "../../modules/BaseModule";

export default function TrendingLayout() {
    const { type } = useParams()
    const dispatch = useAppDispatch();
    const listNewNetflix = useAppSelector((state) => state.trending.listNewNetflix)
    const listNewDisney = useAppSelector((state) => state.trending.listNewDisney)
    const listNewHulu = useAppSelector((state) => state.trending.listNewHulu)
    const listNewPrime = useAppSelector((state) => state.trending.listNewPrime)
    const listNewStream = useAppSelector((state) => state.trending.listNewStream)
    const listNewMax = useAppSelector((state) => state.trending.listNewMax)
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)

    const context = useContext(LanguageContext);
    if (!context) {
        return null
    }

    const { language, translations, handleLanguageChange } = context;

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchTrending());
        dispatch(fetchMovies());
        dispatch(setGlobalLoading(false))
    }, [dispatch]);

    const [presentList, setPresentList] = useState<any[]>([])
    const [mediatype, setMediaType] = useState('');

    useEffect(() => {
        switch (type) {
            case 'netflix':
                setPresentList(listNewNetflix);
                setMediaType('movie')
                break;
            case 'disney':
                setPresentList(listNewDisney);
                setMediaType('movie')
                break;
            case 'hulu':
                setPresentList(listNewHulu);
                setMediaType('tv')

                break;
            case 'prime':
                setPresentList(listNewPrime);
                setMediaType('movie')
                break;
            case 'stream':
                setPresentList(listNewStream);
                setMediaType('person')
                break;
            case 'max':
                setPresentList(listNewMax);
                setMediaType('tv')

                break;
            default:
                setPresentList([]);
                break;
        }
    }, [type, listNewNetflix, listNewDisney, listNewHulu, listNewPrime, listNewStream, listNewMax]);

    const currentDate = new Date();
    // Lấy số tháng từ ngày hiện tại (chú ý rằng tháng trong JavaScript bắt đầu từ 0)
    const currentMonth = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonth];

    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre)

    useEffect(() => {
        dispatch(fetchGenre(mediatype));
    }, [dispatch]);
   
    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black pb-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                    <div className="w-full bg-black mt-5 text-white ">
                        <div className="flex mt-3 items-center  ">
                            <h2 className="lg:text-2xl text-lg font-bold  capitalize">{translations[language]?.whatNewToStreamOn} {type} </h2>
                            <div className="flex items-center ml-auto gap-2 text-gray-400" >
                                <div className="text-md justify-center  text-right">
                                    <p className='font-bold uppercase'> {translations[language]?.listActivity}</p>
                                    <div className='flex items-center gap-2 font-semibold capitalize'>
                                        <i className="fa-regular fa-eye text-xl text-white"></i>
                                        <div>
                                            <div> <span className='text-lg text-white'>87K</span> {translations[language]?.views}</div>
                                            <div>28K {translations[language]?.thisWeek}</div>
                                        </div>
                                    </div>
                                </div>
                                <Share bgColor={'white'} />

                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm" >
                            <a target='_blank' href='https://github.com/watanuki469?tab=repositories'
                                className='text-blue-500 hover:underline'>
                                Vasiliev-{translations[language]?.editor}
                            </a>
                            <div>•</div>
                            <div>{translations[language]?.createdModified} </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-black ">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center bg-white px-2 py-2">
                    <ViewTable viewList={presentList} mediaType={mediatype} moreToExploreList={mostPopularTv} genreList={listGenreFromApi}></ViewTable>
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <Footer />
                </div>
            </div>

        </div >
    )
}