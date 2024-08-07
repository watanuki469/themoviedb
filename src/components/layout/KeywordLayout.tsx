import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Share from '../../modules/Share';
import ViewTable from '../../modules/ViewTable';
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGenre } from '../../redux/reducers/genre.reducer';
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';
import { fetchKeyword } from '../../redux/reducers/keyword.reducer';
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { Button, Menu, MenuItem } from "@mui/material";

export default function KeywordLayout() {
    const { mediaType } = useParams()
    const { keyword } = useParams()
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState(1);
    let navigate=useNavigate()
    const dispatch = useAppDispatch();
    const mostPopularTv = useAppSelector((state) => state.movies.listMostPopularTvReq)
    const listKeywordMovie = useAppSelector((state) => state.keyword.listKeyWord)
    
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    // const [mediaKeywordType, setMediaKeywordType] = useState(mediaType);
 
    const { language, translations, handleLanguageChange } = context;

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchKeyword(id, mediaType,page));
        dispatch(fetchMovies());
        dispatch(setGlobalLoading(false));
    }, [keyword, id,mediaType, page]);

    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre)

    useEffect(() => {
        dispatch(fetchGenre(mediaType));
    }, [dispatch, mediaType]);

    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };
    const handleRankingClose = () => {
        setAnchorRankingEl(null);
    };

    const handleMenuItemClick = (option: any) => {
        // set(option)
        navigate(`/keyword/${option}/${id}/${keyword}`);
        handleRankingClose();
    };

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
                            <h2 className="lg:text-2xl text-lg font-bold  capitalize"> {translations[language]?.keyword}: {keyword}
                            </h2>
                            <div className="flex items-center ml-auto gap-2 text-gray-400" >                               
                                <div>
                                    <Button
                                        id="demo-customized-button"
                                        aria-controls={anchorRankingEl ? 'demo-customized-menu' : undefined}
                                        aria-haspopup="true"
                                        variant="contained"
                                        disableElevation
                                        onClick={handleRankingClick}
                                        endIcon={<i className="fa-solid fa-caret-down"></i>}
                                        sx={{
                                            bgcolor: anchorRankingEl ? 'blue' : 'white',
                                            color: anchorRankingEl ? 'white' : 'blue',
                                            ":hover": { backgroundColor: 'blue', color: 'white' },
                                        }}
                                    >
                                        {mediaType}
                                    </Button>
                                    <Menu
                                        id="demo-customized-menu"
                                        anchorEl={anchorRankingEl}
                                        open={Boolean(anchorRankingEl)}
                                        onClose={handleRankingClose}
                                    >
                                        <MenuItem onClick={() => handleMenuItemClick(`movie`)} disableRipple>Movie</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick(`tv`)} disableRipple>Tv</MenuItem>
                                    </Menu>
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
                    <ViewTable viewList={listKeywordMovie} mediaType={mediaType} moreToExploreList={mostPopularTv} genreList={listGenreFromApi}></ViewTable>
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