import { useContext, useEffect, useState } from "react";
import Share from '../../modules/Share';
import ViewTable from '../../modules/ViewTable';
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGenre } from '../../redux/reducers/genre.reducer';
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";

export default function TopPopularTvLayout() {
    const dispatch = useAppDispatch();
    const mostPopularTv = useAppSelector((state) => state.movies.discoverTv)
    const popularMovies = useAppSelector((state) => state.movies.listMoviesPopular)
    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre)
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchMovies(page));
    }, [page]);

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

    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black pb-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center bg-white px-2 ">
                    <div className="lg:max-w-full w-full ">
                        <div className="flex items-center flex-wrap">
                            <div className="items-center ">
                                <h2 className="lg:text-2xl text-lg font-bold text-black ">IMDb {translations[language]?.chart}</h2>
                            </div>
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center lg:text-2xl text-lg  text-black ">{translations[language]?.share} </p>
                                <Share bgColor={'black'} />
                            </div>
                        </div>
                        <div className="">
                            <div className="flex items-center ">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="lg:text-2xl text-lg font-bold text-black ">IMDb {translations[language]?.topRatedTV}</h2>
                            </div>
                            <p className="text-gray-500 py-2">{translations[language]?.voter}.</p>
                        </div>

                    </div>
                    <ViewTable viewList={mostPopularTv} mediaType={'tv'} genreList={listGenreFromApi} moreToExploreList={popularMovies}></ViewTable>
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