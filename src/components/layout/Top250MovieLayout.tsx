import { useContext, useEffect, useState } from "react";
import Share from '../../modules/Share';
import ViewTable from '../../modules/ViewTable';
import { LanguageContext } from '../../pages/LanguageContext';
import apiController from '../../redux/client/api.Controller.';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListGenre } from '../../redux/reducers/genre.reducer';
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { AppDispatch } from '../../redux/store';
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";

export default function Top250MovieLayout() {
    const dispatch = useAppDispatch();
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchMovies(page));
    }, [page, dispatch]);

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

    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;
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
            <div className="bg-white  px-2">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <div className="lg:max-w-full w-full ">
                        <div className="flex items-center  ">
                            <h2 className="lg:text-2xl text-lg font-bold text-black ">IMDb {translations[language]?.chart}</h2>
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center lg:text-2xl  text-lg text-black ">{translations[language]?.share} </p>
                            </div>
                            <Share bgColor={'black'} />
                        </div>
                        <div className="">
                            <div className="flex items-center ">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="lg:text-2xl text-lg font-bold text-black ">IMDb {translations[language]?.top250Movie}</h2>
                            </div>
                            <p className="text-gray-500 py-2">{translations[language]?.voter}</p>
                        </div>
                    </div>


                    <ViewTable viewList={topRatedMovies} mediaType={'movie'} genreList={listGenreFromApi} moreToExploreList={mostPopularTv}></ViewTable>
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center mt-10 ">
                    <Footer />
                </div>
            </div>
            <div id="load-more" style={{ height: '20px' }}></div>
        </div >
    )
}