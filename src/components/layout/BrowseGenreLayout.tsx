import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { Button, Menu, MenuItem } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import apiController from "../../redux/client/api.Controller.";
import { setListGenre, setListGenre2 } from "../../redux/reducers/genre.reducer";
import { LanguageContext } from "../../pages/LanguageContext";

export default function BrowseGenreLayout() {
    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const [selectedRankingOption, setSelectedRankingOption] = useState(null);

    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };
    let navigate = useNavigate()
    const handleRankingClose = () => {
        setAnchorRankingEl(null);
    };
    const dispatch = useAppDispatch();
    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre);
    const listGenreFromApi2 = useAppSelector((state) => state.genre.listGenre2);
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
    const fetchGenre2 = () => (dispatch: AppDispatch) => {
        apiController.apiGenre.genre('tv')
            .then((data: any) => {
                if (data && data?.genres) {
                    dispatch(setListGenre2(data?.genres)); // Adjust the dispatch based on actual response structure
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
        dispatch(fetchGenre2());
    }, [dispatch]);

    const genreMapping: Record<number, string> = listGenreFromApi?.reduce((acc: Record<number, string>, genre: { id: number, name: string }) => {
        acc[genre?.id] = genre?.name;
        return acc;
    }, {});
    const genreMapping2: Record<number, string> = listGenreFromApi2?.reduce((acc: Record<number, string>, genre: { id: number, name: string }) => {
        acc[genre?.id] = genre?.name;
        return acc;
    }, {});

    const scrollToElement = (elementId: any) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start", // Cuộn trang để phần tử hiển thị ở đầu trang
                inline: "nearest" // Cuộn trang để phần tử hiển thị ở phía trên cửa sổ trình duyệt
            });
        }
    };
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;
    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black py-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-white capitalize">
                <div className="w-full lg:max-w-5xl xl:max-w-6xl mx-auto aligns-center  ">
                    <div className="md:grid grid-cols-12 gap-2 px-2 ">
                        <div className="lg:col-span-8 col-span-12  max-w-full ">
                            <div className="py-2 capitalize">
                                <Button
                                    id="demo-customized-button"
                                    aria-controls={anchorRankingEl ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    variant="contained"
                                    disableElevation
                                    onClick={handleRankingClick}
                                    endIcon={<i className="fa-solid fa-caret-down"></i>}
                                    sx={{
                                        // bgcolor: anchorRankingEl ? 'blue' : 'white',
                                        textTransform:'uppercase',
                                        bgcolor: anchorRankingEl ? 'blue' : 'white',
                                        color: anchorRankingEl ? 'white' : 'blue',
                                        border: anchorRankingEl ? ' dashed' : '',
                                        ":hover": {
                                            border: 'dashed',
                                            backgroundColor: 'blue'
                                            , color: 'white'
                                        },
                                    }}
                                >
                                    {selectedRankingOption ? selectedRankingOption : `${translations[language]?.options}`}
                                </Button>
                                <Menu
                                    id="demo-customized-menu"
                                    anchorEl={anchorRankingEl}
                                    open={Boolean(anchorRankingEl)}
                                    onClose={handleRankingClose}
                                    onClick={() => setAnchorRankingEl(null)}
                                    sx={{textTransform:'capitalize'}}
                                >
                                    <MenuItem onClick={() => scrollToElement('pupularTVShowAndMovieGenreRef')} disableRipple>
                                        {translations[language]?.mostPopularTv} & {translations[language]?.genre}
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToElement('popularMovieByGenre')} disableRipple>
                                        {translations[language]?.top250Movie} & {translations[language]?.genre}
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToElement('popularTVbyGenre')} disableRipple>
                                        {translations[language]?.topRatedTV} & {translations[language]?.genre}
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToElement('popularTvSerieByGenre')} disableRipple>
                                        {translations[language]?.mostPopularTv} & {translations[language]?.genre}
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToElement('PrimeVideo')} disableRipple>
                                        Prime videos & {translations[language]?.genre}
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToElement('videoGames')} disableRipple>
                                        Video games & {translations[language]?.genre}
                                    </MenuItem>

                                </Menu>
                            </div>
                            <div className="py-2">
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 id="pupularTVShowAndMovieGenreRef" className="text-2xl font-bold text-black capitalize">  {translations[language]?.mostPopularTv} & {translations[language]?.genre}</h2>
                                    <i className="fa-solid fa-link text-white hover:text-yellow-300 px-4" onClick={() => scrollToElement('pupularTVShowAndMovieGenreRef')}></i>
                                </div>
                                <div className="flex flex-wrap gap-2 text-blue-500 ">
                                    {
                                        Object.values(genreMapping).map((genre: any) => (
                                            <div
                                                onClick={() => navigate(`/search?mediaType=movie&genres=${genre}`)}
                                                className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 id="popularMovieByGenre" className="text-2xl font-bold text-black capitalize "> {translations[language]?.top250Movie} & {translations[language]?.genre}</h2>
                                    <i className="fa-solid fa-link text-white hover:text-yellow-300 px-4" onClick={() => scrollToElement('popularMovieByGenre')}></i>
                                </div>
                                <div className="flex flex-wrap gap-2 text-blue-500 ">
                                    {
                                        Object.values(genreMapping2).map(genre => (
                                            <div
                                                onClick={() => navigate(`/search?mediaType=tv&genres=${genre}`)}
                                                className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 id="popularTVbyGenre" className="text-2xl font-bold text-black capitalize "> {translations[language]?.topRatedTV} & {translations[language]?.genre}</h2>
                                    <i className="fa-solid fa-link text-white hover:text-yellow-300 px-4" onClick={() => scrollToElement('popularTVbyGenre')}></i>
                                </div>
                                <div className="flex flex-wrap gap-2 text-blue-500 ">
                                    {
                                        Object.values(genreMapping).map(genre => (
                                            <div
                                                onClick={() => navigate(`/search?mediaType=movie&genres=${genre}`)}
                                                className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 id="popularTvSerieByGenre" className="text-2xl font-bold text-black capitalize ">  {translations[language]?.mostPopularTv} & {translations[language]?.genre}</h2>
                                    <i className="fa-solid fa-link text-white hover:text-yellow-300 px-4" onClick={() => scrollToElement('popularTvSerieByGenre')}></i>
                                </div>
                                <div className="flex flex-wrap gap-2 text-blue-500 ">
                                    {
                                        Object.values(genreMapping2)?.map(genre => (
                                            <div
                                                onClick={() => navigate(`/search?mediaType=tv&genres=${genre}`)}
                                                className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 id="PrimeVideo" className="text-2xl font-bold text-black capitalize ">Prime videos & {translations[language]?.genre}</h2>
                                    <i className="fa-solid fa-link text-white hover:text-yellow-300 px-4" onClick={() => scrollToElement('PrimeVideo')}></i>
                                </div>
                                <div className="flex flex-wrap gap-2 text-blue-500 ">
                                    {
                                        Object.values(genreMapping).map(genre => (
                                            <div
                                                onClick={() => navigate(`/search?mediaType=movie&genres=${genre}`)}
                                                className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 id="videoGames" className="text-2xl font-bold text-black capitalize ">Video games & {translations[language]?.genre}</h2>
                                    <i className="fa-solid fa-link text-white hover:text-yellow-300 px-4" onClick={() => scrollToElement('videoGames')}></i>
                                </div>
                                <div className="flex flex-wrap gap-2 text-blue-500 ">
                                    {
                                        Object.values(genreMapping2).map(genre => (
                                            <div
                                                onClick={() => navigate(`/search?mediaType=tv&genres=${genre}`)}
                                                className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="col-span-4  h-full px-2 py-2 ">
                            <div className="flex items-center py-3">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black capitalize ">{translations[language]?.moreExplore}</h2>
                            </div>
                            <div className="py-2 mt-2">
                                <p className="font-bold text-xl">Movie & TV {translations[language]?.genre}</p>
                            </div>
                            <div>
                                <ul className="flex flex-wrap gap-x-2 gap-y-1 text-blue-500">
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/210024/anime`)}>Anime</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/308818/Avant Garde`)}>Avant Garde</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/11034/B Movie`)}>B Movie</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/288601/chick`)}>Chick Flick</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/10683/Coming of Age`)}>Coming of Age</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/328003/Cult Film`)}>Cult Film</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/4565/Dystopia`)}>Dystopia</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/6917/Epic`)}>Epic</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/5265/Espionage`)}>Espionage</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/9016/Femme Fatale`)}>Femme Fatale</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/6270/High School`)}>High School</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/780/Kung Fu`)}>Kung Fu</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/11800/Mockumentary`)}>Mockumentary</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/272793/Post Apocalypse`)}>Post Apocalypse</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/11931/Spoof`)}>Spoof</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/9715/Superhero`)}>Superhero</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/4379/Time Travel`)}>Time Travel</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/3133/Vampire`)}>Vampire</li> •
                                    <li className="hover:underline"
                                        onClick={() => navigate(`/keyword/movies/12377/zombie`)}>Zombie</li>
                                </ul>
                            </div>
                            <div className="py-2 mt-2">
                                <p className="font-bold text-xl">Movie {translations[language]?.chart}</p>
                            </div>
                            <div>
                                <ul className="flex flex-wrap gap-x-2 gap-y-1 text-blue-500">
                                    <li onClick={() => navigate('/top250Movie')} className="hover:underline">{translations[language]?.top250Movie}</li> •
                                    <li onClick={() => navigate('/topPopularTv')} className="hover:underline">{translations[language]?.mostPopularTv}</li> •
                                    <li onClick={() => navigate('/topBoxOffice')} className="hover:underline">{translations[language]?.topBoxOffice}</li>
                                </ul>
                            </div>
                            <div className="sticky top-0 right-0 left-0">
                                <div className="py-2 mt-2">
                                    <p className="font-bold text-xl">{translations[language]?.advancedSearch}</p>
                                </div>
                                <div>
                                    <ul className="flex flex-wrap gap-x-2 gap-y-1 text-black items-center text-center mt-2">
                                        <li onClick={() => navigate('/search?mediaType=movie')} className="hover:bg-gray-300 min-w-20 px-2 py-2 mt-1  border-2 border-gray-300 rounded-full">Movie</li>
                                        <li onClick={() => navigate('/search?mediaType=tv')} className="hover:bg-gray-300 min-w-20 px-2 py-2 mt-1  border-2 border-gray-300 rounded-full">TV</li>
                                        <li onClick={() => navigate('/search?mediaType=person')} className="hover:bg-gray-300 min-w-20 px-2 py-2 mt-1  border-2 border-gray-300 rounded-full">Person</li>
                                    </ul>
                                </div>
                            </div>

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