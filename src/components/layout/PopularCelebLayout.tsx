import { useContext, useEffect, useState } from "react";
import ViewTable from '../../modules/ViewTable';
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMovies } from '../../redux/reducers/movies.reducer';
import { fetPopularCeleb } from '../../redux/reducers/peoplePopular.reducer';
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";

export default function PopularCelebLayout() {
    const dispatch = useAppDispatch();
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const popularCeleb = useAppSelector((state) => state.peoplePopular.peoplePopular)
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetPopularCeleb(page))
        dispatch(fetchMovies())
    }, [dispatch,page]);

    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;
    const popularCeleb2 = [...popularCeleb]

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
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center bg-white px-2">
                    <ViewTable viewList={popularCeleb2} mediaType={'person'} moreToExploreList={topRatedMovies} genreList={''}></ViewTable>
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