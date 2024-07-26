import { Button, Menu, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGenre, fetchGenre2, genreMapping, genreMapping2 } from "../../redux/reducers/genre.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { scrollToElement } from "../../modules/BaseModule";

export default function BrowseGenreLayout() {
    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const [selectedRankingOption, setSelectedRankingOption] = useState(null);

    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };
    const handleRankingClose = () => {
        setAnchorRankingEl(null);
    };
    const dispatch = useAppDispatch();
    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre);
    const listGenreFromApi2 = useAppSelector((state) => state.genre.listGenre2);

    useEffect(() => {
        dispatch(fetchGenre('movie'));
        dispatch(fetchGenre2('tv'));
    }, [dispatch]);

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
                                        textTransform: 'uppercase',
                                        bgcolor: anchorRankingEl ? 'blue' : 'white',
                                        color: anchorRankingEl ? 'white' : 'blue',
                                        ":hover": { backgroundColor: 'blue', color: 'white' },
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
                                    sx={{ textTransform: 'capitalize' }}
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
                                        Object.values(genreMapping(listGenreFromApi))?.map((genre: any) => (
                                            <a href={`/search?mediaType=movie&genres=${genre}`}>
                                                <div
                                                    className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                                </div>
                                            </a>

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
                                        Object.values(genreMapping2(listGenreFromApi2))?.map(genre => (
                                            <a href={`/search?mediaType=tv&genres=${genre}`}>
                                                <div
                                                    className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                                </div>
                                            </a>
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
                                        Object.values(genreMapping(listGenreFromApi))?.map(genre => (
                                            <a href={`/search?mediaType=movie&genres=${genre}`}>
                                                <div
                                                    className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                                </div>
                                            </a>
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
                                        Object.values(genreMapping2(listGenreFromApi2))?.map(genre => (
                                            <a href={`/search?mediaType=tv&genres=${genre}`}>
                                                <div
                                                    className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                                </div>
                                            </a>
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
                                        Object.values(genreMapping(listGenreFromApi))?.map(genre => (
                                            <a href={`/search?mediaType=movie&genres=${genre}`}>
                                                <div
                                                    className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                                </div>
                                            </a>
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
                                        Object.values(genreMapping2(listGenreFromApi2))?.map(genre => (
                                            <a href={`/search?mediaType=tv&genres=${genre}`}>
                                                <div
                                                    className="px-2 py-1 border-2 border-blue-500 bg-white rounded-full hover:opacity-90 hover:bg-gray-300" key={genre}>{genre}
                                                </div>
                                            </a>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="col-span-4 h-full px-2 py-2">
                            <div className="flex items-center py-3">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black capitalize">{translations[language]?.moreExplore}</h2>
                            </div>
                            <div className="py-2 mt-2">
                                <p className="font-bold text-xl">Movie & TV {translations[language]?.genre}</p>
                            </div>
                            <div>
                                <ul className="flex flex-wrap gap-x-2 gap-y-1 text-blue-500">
                                    <li className="hover:underline"><a href="/keyword/movies/210024/anime">Anime</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/308818/Avant Garde">Avant Garde</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/11034/B Movie">B Movie</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/288601/chick">Chick Flick</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/10683/Coming of Age">Coming of Age</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/328003/Cult Film">Cult Film</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/4565/Dystopia">Dystopia</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/6917/Epic">Epic</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/5265/Espionage">Espionage</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/9016/Femme Fatale">Femme Fatale</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/6270/High School">High School</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/780/Kung Fu">Kung Fu</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/11800/Mockumentary">Mockumentary</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/272793/Post Apocalypse">Post Apocalypse</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/11931/Spoof">Spoof</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/9715/Superhero">Superhero</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/4379/Time Travel">Time Travel</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/3133/Vampire">Vampire</a></li> •
                                    <li className="hover:underline"><a href="/keyword/movies/12377/zombie">Zombie</a></li>
                                </ul>
                            </div>
                            <div className="py-2 mt-2">
                                <p className="font-bold text-xl">Movie {translations[language]?.chart}</p>
                            </div>
                            <div>
                                <ul className="flex flex-wrap gap-x-2 gap-y-1 text-blue-500">
                                    <li className="hover:underline"><a href="/top250Movie">{translations[language]?.top250Movie}</a></li> •
                                    <li className="hover:underline"><a href="/topPopularTv">{translations[language]?.mostPopularTv}</a></li> •
                                    <li className="hover:underline"><a href="/topBoxOffice">{translations[language]?.topBoxOffice}</a></li>
                                </ul>
                            </div>
                            <div className="sticky top-0 right-0 left-0">
                                <div className="py-2 mt-2">
                                    <p className="font-bold text-xl">{translations[language]?.advancedSearch}</p>
                                </div>
                                <div>
                                    <ul className="flex flex-wrap gap-x-2 gap-y-1 text-black items-center text-center mt-2">
                                        <li className="hover:bg-gray-300 min-w-20 px-2 py-2 mt-1 border-2 border-gray-300 rounded-full">
                                            <a href="/search?mediaType=movie">Movie</a>
                                        </li>
                                        <li className="hover:bg-gray-300 min-w-20 px-2 py-2 mt-1 border-2 border-gray-300 rounded-full">
                                            <a href="/search?mediaType=tv">TV</a>
                                        </li>
                                        <li className="hover:bg-gray-300 min-w-20 px-2 py-2 mt-1 border-2 border-gray-300 rounded-full">
                                            <a href="/search?mediaType=person">Person</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <Footer />
                </div>
            </div>
        </div>
    )
}