import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleImageError } from '../../modules/BaseModule';
import Share from '../../modules/Share';
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';
import { fetchMovieImage } from "../../redux/reducers/movieImage.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { fetchPerson } from "../../redux/reducers/person.reducer";
import { fetchSingleMovies } from "../../redux/reducers/singleMovie.reducer";
import { fetchTv } from "../../redux/reducers/tv.reducer";
import { fetchTvImages } from "../../redux/reducers/tvImage.reducer";

export default function ImageLayout() {
    const { mediaType, id } = useParams();
    const dispatch = useAppDispatch();
    const personList = useAppSelector((state) => state.person.listPerson)
    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)
    const tvList = useAppSelector((state) => state.tv.listTv)
    const tvImageList = useAppSelector((state) => state.tvImages.listTvImage)
    const movieImageList = useAppSelector((state) => state.movieImage.listMovieImage)

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        if (mediaType === 'tv') {
            dispatch(fetchTv(id));
            dispatch(fetchTvImages(id));
        }
        else if (mediaType === 'person') {
            dispatch(fetchPerson(id))
        }
        else if (mediaType === 'movie') {
            dispatch(fetchSingleMovies(id))
            dispatch(fetchMovies());
            dispatch(fetchMovieImage(id));
        }
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, [id,mediaType]);

    let mediaList = [];

    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') { mediaList = personList; }
    else if (mediaType === 'movie') { mediaList = singleMovieList; }
    else if (mediaType === 'tv') { mediaList = tvList; }

    let mediaImageList = [];

    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') {
        mediaImageList = personList[0]?.images?.profiles;
    } else if (mediaType === 'movie') {
        mediaImageList = movieImageList;
    } else if (mediaType === 'tv') {
        mediaImageList = tvImageList;
    }

    let mediaLength = 0;
    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') {
        mediaLength = personList[0]?.images?.profiles?.length;
    } else if (mediaType === 'movie') {
        mediaLength = movieImageList[0]?.posters?.length;
    } else if (mediaType === 'tv') {
        mediaLength = tvImageList[0]?.posters?.length;
    }

    const [currentView, setCurrentView] = useState('table'); // Default view is 'table'
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSwitchImage = (e: any) => {
        setCurrentView('table')
        setActiveStep(e)
    };
    const [isContentVisible, setContentVisible] = useState(true);

    const toggleContentVisibility = () => {
        setContentVisible(!isContentVisible);
    };
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    return (
        <div className=" min-h-screen cursor-pointer bg-black relative ">
            <div className="text-white text-xl px-2">
                {currentView == 'table' ? (
                    <div className='p'>
                        <button onClick={handleNext} className={`absolute top-1/2 right-0  p-2 border-2 border-white mr-2 px-2 py-2 h-20 w-12 text-white bg-black z-20 hover:text-yellow-300 ${activeStep === mediaLength - 1 || mediaLength === 0 ? 'hidden' : ''}`}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                        <button onClick={handleBack} className={`absolute top-1/2  p-2 border-2 border-white px-2 py-2  h-20 w-12 bg-black hover:text-yellow-300  text-white z-20 ${activeStep === 0 || mediaLength === 0 ? 'hidden' : ''}`}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    </div>
                ) : (<div></div>)}

                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center font-semibold  ">
                    <section className='relative overflow-hidden min-h-screen'>
                        <div className="w-full ">
                            <div className="items-center flex">
                                <a className=" " href={`/${mediaType}/${id}`}>
                                    <i className="fa-solid fa-xmark"></i>
                                </a>
                                <div className="ml-auto flex items-center">
                                    {currentView == 'table' ? (
                                        <p className='mr-4 text-yellow-300  '>{activeStep + 1}/{mediaLength}</p>
                                    ) : (<div></div>)}
                                    {currentView === 'table' ? (
                                        <Tooltip title="Table View">
                                            <i className="fa-brands fa-docker text-xl" onClick={() => setCurrentView('galery')}></i>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Galery View">
                                            <i className="fa-solid fa-table-cells text-xl" onClick={() => setCurrentView('table')}></i>
                                        </Tooltip>
                                    )}
                                    <Share bgColor={'white'}></Share>
                                </div>
                            </div>
                            {currentView == 'table' ? (
                                <div>
                                    {mediaType != 'person' ?
                                        (
                                            <div className="w-full flex justify-center items-center ">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500/${mediaImageList && mediaImageList[0]?.posters && mediaImageList[0]?.posters[activeStep]?.file_path}`}
                                                    onError={handleImageError}
                                                    alt="movie-img"
                                                    className='max-h-96 object-cover bg-gray-200 '
                                                />
                                            </div>
                                        )
                                        : (
                                            <div className="w-full flex justify-center items-center ">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500/${mediaImageList && mediaImageList[activeStep]?.file_path}`}
                                                    onError={handleImageError}
                                                    alt="person-img"
                                                    className='max-h-96 object-cover bg-gray-200 '
                                                />
                                            </div>
                                        )}
                                    <button onClick={toggleContentVisibility} className={`absolute top-96 right-20 p-2 mt-6 border-2 border-white px-2 py-2 rounded-full h-12 w-12 text-white bg-black z-20 hover:text-yellow-300 ${isContentVisible ? 'hidden' : ''}`}>
                                        <i className="fa-solid fa-circle-info"></i>
                                    </button>
                                    <button onClick={toggleContentVisibility} className={`absolute top-96 right-20 mt-6 p-2 border-2 border-white px-2 py-2 rounded-full  h-12 w-12 bg-black hover:text-yellow-300  text-white z-20 ${isContentVisible ? '' : 'hidden'}`}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>

                                    {isContentVisible ? (
                                        <div className='w-full capitalize'>
                                            <div className='border-t-2 border-gray-200 md:grid grid-cols-12 gap-2 relative'>
                                                <div className="lg:col-span-8 col-span-12 text-lg">
                                                    <p className='text-yellow-300'>{mediaList[0]?.name ? mediaList[0]?.name : mediaList[0]?.title}</p>
                                                    <div className='text-blue-500'>
                                                        <div className=''>
                                                            {mediaType != 'person' ? (
                                                                <div >
                                                                    <span className='hover:underline'>
                                                                        <a href={`/person/${mediaList[0]?.credits?.cast[activeStep]?.id}`}>
                                                                            {mediaList[0]?.credits?.cast[activeStep]?.name}
                                                                        </a>
                                                                    </span>
                                                                    < span className='text-white'>{translations[language]?.knowFor}</span>
                                                                    <span className=''>  {mediaList[0]?.credits?.cast[activeStep]?.character}</span>

                                                                </div>
                                                            ) : (
                                                                <div >
                                                                    <span className='hover:underline'>  {mediaList[0]?.name}</span>
                                                                    <span className='text-white p-2'>{translations[language]?.knowFor}</span>
                                                                    <span className='hover:underline'>
                                                                        <a href={`/${mediaList[0]?.combined_credits?.cast[activeStep]?.media_type}/${mediaList[0]?.combined_credits?.cast[activeStep]?.id}`}>
                                                                            {mediaList[0]?.combined_credits?.cast[activeStep]?.title}
                                                                        </a>
                                                                    </span> ({mediaList[0]?.combined_credits?.cast[activeStep]?.release_date?.slice(0, 4)})
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-4 col-span-12 text-lg w-full ">
                                                    <p className={`lg:flex hidden text-black `}>.</p>
                                                    <div className='border-l-2 border-gray-200 px-4 lg:block hidden'>
                                                        <div className='flex items-center gap-2 flex-wrap'>
                                                            {mediaType != 'person' ? (
                                                                <div className=''>
                                                                    <p>{translations[language]?.star}
                                                                        <a href={`/person/${mediaList[0]?.credits?.cast[activeStep]?.id}`} className='text-blue-500 ml-3 hover:underline '>
                                                                            {mediaList[0]?.credits?.cast[activeStep]?.name}
                                                                        </a>
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <div className=''>
                                                                    <p>{mediaType}
                                                                        <a href={`/person/${mediaList[0]?.id}`} className='text-blue-500 ml-3 hover:underline'>
                                                                            {mediaList[0]?.combined_credits?.cast[activeStep]?.character}
                                                                        </a>
                                                                    </p>
                                                                </div>
                                                            )}

                                                        </div>
                                                        <div className={`flex items-center gap-2`}>
                                                            {mediaType != 'person' ? (
                                                                <div className=''>
                                                                    <p>{mediaType}
                                                                        <a href={`/${mediaType}/${mediaList[0]?.id}`} className='text-blue-500 hover:underline ml-3'>
                                                                            {mediaList[0]?.name ? mediaList[0]?.name : mediaList[0]?.title}
                                                                        </a>
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <div className=''>
                                                                    <p>{mediaList[0]?.combined_credits?.cast[activeStep]?.media_type}
                                                                        <a href={`/${mediaList[0]?.combined_credits?.cast[activeStep]?.media_type}/${mediaList[0]?.combined_credits?.cast[activeStep]?.id}`} className='text-blue-500 hover:underline ml-3'>
                                                                            {mediaList[0]?.combined_credits?.cast[activeStep]?.title}
                                                                        </a>
                                                                    </p>
                                                                </div>
                                                            )}

                                                        </div>
                                                        <div>
                                                            {translations[language]?.photos}: Panagiotis Pantazidis/Amazon Studios
                                                        </div>
                                                    </div>
                                                    <div className='lg:hidden block'>
                                                        <div >
                                                            {mediaType != 'person' ? (
                                                                <div className=''>
                                                                    <div>{translations[language]?.star}
                                                                        <a href={`/person/${mediaList[0]?.id}`} className='text-blue-500 ml-3 hover:underline'>
                                                                            {mediaList[0]?.credits?.cast[activeStep]?.name}
                                                                        </a>
                                                                    </div>

                                                                </div>
                                                            ) : (
                                                                <div className=''>
                                                                    <div>{mediaType}
                                                                        <a href={`/person/${mediaList[0]?.id}`} className='text-blue-500 ml-3 hover:underline '>
                                                                            {mediaList[0]?.combined_credits?.cast[activeStep]?.character}
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className={`flex items-center gap-2`}>
                                                            {mediaType != 'person' ? (
                                                                <div className=''>
                                                                    <p>{mediaType}
                                                                        <a href={`/${mediaType}/${mediaList[0]?.id}`} className='text-blue-500 hover:underline ml-3 '>
                                                                            {mediaList[0]?.name ? mediaList[0]?.name : mediaList[0]?.title}</a>
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <div className=''>
                                                                    <p>{mediaList[0]?.combined_credits?.cast[activeStep]?.media_type}
                                                                        <a href={`/${mediaList[0]?.combined_credits?.cast[activeStep]?.media_type}/${mediaList[0]?.combined_credits?.cast[activeStep]?.id}`} className='text-blue-500 hover:underline ml-3 '>
                                                                            {mediaList[0]?.combined_credits?.cast[activeStep]?.title}</a>
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            {translations[language]?.photos}: Panagiotis Pantazidis/Amazon Studios
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (<div></div>)
                                    }
                                </div>
                            ) : (<div>
                                {mediaType != 'person' ?
                                    (
                                        <div>
                                            <div className='items-center flex w-full'>
                                                <div className='flex gap-2 py-2 mb-2 w-full'>
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500/${mediaList && mediaList[0]?.backdrop_path}`}
                                                        onError={handleImageError}
                                                        alt="movie-img"
                                                        className='h-24 w-20 object-cover bg-gray-200 '
                                                    />
                                                    <div className='w-full px-2'>
                                                        <a href={`/${mediaType}/${mediaList[0]?.id}`} className='flex items-center '>
                                                            <p className='py-2 flex-grow hover:text-blue-500'>{mediaList[0]?.title ? mediaList[0]?.title : mediaList[0]?.name} ({mediaList[0]?.release_date ? mediaList[0]?.release_date?.slice(0, 4) : mediaList[0]?.first_air_date?.slice(0, 4)})</p>
                                                            <i className="fa-solid fa-chevron-right ml-auto text-gray-200 hover:text-yellow-300"></i>
                                                        </a>
                                                        <div className='border-t-2 border-gray py-2'>
                                                            <p>{translations[language]?.photos} ({mediaLength}) </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-wrap gap-4">
                                                {mediaImageList && mediaImageList[0]?.posters && mediaImageList[0]?.posters?.map((item: any, index: any) => (
                                                    <img
                                                        key={index}
                                                        src={`https://image.tmdb.org/t/p/w500/${item?.file_path}`}
                                                        onError={handleImageError}
                                                        alt="movie-img"
                                                        className='h-24 w-24 object-cover bg-gray-200 '
                                                        onClick={() => handleSwitchImage(index)}

                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <div>
                                            <div className='items-center flex w-full px-2 '>
                                                <div className='flex gap-2 py-2 mb-2 w-full'>
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500/${mediaList && mediaList[0]?.profile_path}`}
                                                        onError={handleImageError}
                                                        alt="movie-img"
                                                        className='h-24 w-20 object-cover bg-gray-200 '
                                                    />
                                                    <div className='w-full'>
                                                        <a href={`/${mediaType}/${mediaList[0]?.id}`} className='flex items-center '>
                                                            <p className='py-2 flex-grow hover:text-blue-500'>{mediaList[0]?.name} </p>
                                                            <i className="fa-solid fa-chevron-right ml-auto text-gray-200 hover:text-yellow-300"></i>
                                                        </a>
                                                        <div className='border-t-2 border-gray py-2'>
                                                            <p>{translations[language]?.photos} ({mediaLength}) </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex gap-4 flex-wrap ">
                                                {mediaImageList && mediaImageList?.map((item: any, index: any) => (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500/${item?.file_path}`}
                                                        onError={handleImageError}
                                                        alt="person-img"
                                                        className='h-24 w-24 object-cover bg-gray-200 '
                                                        key={index * 10}
                                                        onClick={() => handleSwitchImage(index)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                            </div>)}
                        </div>
                    </section>
                </div>
            </div >
        </div >
    )
}