import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Share from '../../modules/Share';
import ViewTable from '../../modules/ViewTable';
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGenre } from '../../redux/reducers/genre.reducer';
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { fetchNetwork } from "../../redux/reducers/network.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";

export default function NetWorkLayout() {
    const { keyword } = useParams()
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const listNetwork = useAppSelector((state) => state.network.listNetwork)
    const [page, setPage] = useState(1);
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchNetwork(id, page));
        dispatch(fetchMovies());
        dispatch(setGlobalLoading(false));
    }, [page, id]);

    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre)

    useEffect(() => {
        dispatch(fetchGenre('tv'));
    }, [dispatch]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });

        const loadMoreElement = document.querySelector('#load-more');
        if (loadMoreElement) {
            observer.observe(loadMoreElement);
        }

        return () => {
            if (loadMoreElement) {
                observer.unobserve(loadMoreElement);
            }
        };
    }, []);


    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black pb-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                    <div className="w-full bg-black text-white ">
                        <div className="flex items-center  ">
                            <h2 className="lg:text-2xl text-lg font-bold  capitalize"> {translations[language]?.network}: {keyword}
                            </h2>
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
                            <div> {translations[language]?.createdModified}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center py-2 px-2 bg-white ">
                    <ViewTable viewList={listNetwork} mediaType={'tv'} moreToExploreList={mostPopularTv} genreList={listGenreFromApi}></ViewTable>
                    <div id="load-more"><div className="bg-white text-black text-center py-2"><i className="fa-solid fa-spinner fa-spin fa-spin-reverse"></i></div></div>
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