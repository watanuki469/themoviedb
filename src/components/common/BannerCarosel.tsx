import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useContext, useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDate, handleImageError } from '../../modules/BaseModule';
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMovies } from "../../redux/reducers/movies.reducer";

export default function BannerCarosel() {
    const dispatch = useAppDispatch();
    const popularMovies = useAppSelector((state) => state.movies.listMoviesPopular)

    useEffect(() => {
        dispatch(fetchMovies());
    }, []);

    const [activeStep, setActiveStep] = useState(0);

    const handleBackgroundImageError = (e: any) => {
        e.target.style.backgroundImage = 'url(https://via.placeholder.com/500x750)';
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750';
    };
    useEffect(() => {
        const boxElement = document.getElementById('1234567');
        if (boxElement) {
            boxElement.style.backgroundImage = `url(${popularMovies[activeStep]?.backdrop_path})`;
            boxElement.addEventListener('error', handleBackgroundImageError);
        }

        return () => {
            if (boxElement) {
                boxElement.removeEventListener('error', handleBackgroundImageError);
            }
        };
    }, [activeStep, popularMovies]);

    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;

    const swiperRef = useRef<SwiperType | null>(null);
    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handleSlideChange = (swiper: any) => {
        setActiveStep(swiper.activeIndex);
    };

    return (
        <div>
            <section className='overflow-hidden'>
                <div className="grid grid-cols-12 text-white gap-2 items-end cursor-pointer w-full">
                    <div className="lg:col-span-8 col-span-12 flex items-stretch relative">
                        <Swiper
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            spaceBetween={10}
                            slidesPerView={1}
                            grabCursor={true}
                            style={{ width: "100%", height: "max-content", maxWidth: '100%' }}
                            autoplay={{
                                delay: 5000, disableOnInteraction: false,
                            }}
                            centeredSlides
                            onSlideChange={handleSlideChange}
                            modules={[Autoplay]}
                            className="mySwiper text-white w-full h-full"
                        >
                            {popularMovies?.map((movie) => (
                                <SwiperSlide key={movie?.id}>
                                    <div id='1' className="bg-cover bg-center relative w-full hover:opacity-80 rounded-br-xl rounded-bl-xl rounded-tr-xl"
                                        style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                                            backgroundPosition: 'center',
                                            objectFit: 'cover'
                                        }}>
                                        <div className="flex flex-col h-full">
                                            <a href={`/movie/${movie?.id}`}>
                                                <div className="flex items-end justify-start w-full h-96">
                                                    <div className='object-contain items-end justify-end'>
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                                                            onError={handleImageError}
                                                            alt="movie-img"
                                                            className="h-full w-52 top-0 left-0 rounded-br-xl rounded-tr-xl"
                                                        />
                                                    </div>
                                                    <div className='flex-col w-full'>
                                                        <div className='flex md:hidden items-center'>
                                                            <PlayCircleOutlineIcon sx={{
                                                                height: '40px', color: 'white', width: '40px', margin: '6px', alignSelf: 'center'
                                                                , ':hover': { color: 'yellow', borderColor: 'red' },
                                                            }} />
                                                            <div className="p-2 text-white">
                                                                {formatDate(movie?.release_date)}
                                                            </div>
                                                        </div>
                                                        <div className='flex bg-black bg-opacity-80 w-full'>
                                                            <div className='hidden md:block'>
                                                                <PlayCircleOutlineIcon sx={{
                                                                    height: '80px', color: 'white', width: '80px', margin: '6px', alignSelf: 'center'
                                                                    , ':hover': {color: 'yellow', borderColor: 'red'},
                                                                }} />
                                                            </div>
                                                            <div className="p-4 text-xl text-white text-left mb-3 transition duration-300 ease-in-out lg:col-span-6">
                                                                {movie.title}
                                                                <p className="text-gray-400 text-sm text-left whitespace-nowrap overflow-ellipsis mt-auto">
                                                                    {translations[language]?.watchTrailer}
                                                                </p>
                                                            </div>
                                                            <div className="hidden md:block mt-auto mb-auto ml-auto text-center p-2 text-white">
                                                                {formatDate(movie?.release_date)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button
                            onClick={handlePrev}
                            className="absolute hidden lg:block top-1/2 transform -translate-y-1/2 left-0 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 h-16 w-12 border-2 border-white"
                        >
                            <ChevronLeftIcon className="text-white" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute hidden lg:block top-1/2 transform -translate-y-1/2 right-0 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 h-16 w-12 border-2 border-white"
                        >
                            <ChevronRightIcon className="text-white" />
                        </button>
                    </div>
                    <div className="lg:flex hidden col-span-4 h-full w-screen">
                        <div className="relative h-96 w-screen">
                            <div id="6" className="text-red-500 hover:opacity-90">
                                <div className="text-white text-left duration-300 ease-in-out">
                                    <p className="text-yellow-400 font-bold text-left whitespace-nowrap capitalize">
                                        {translations[language]?.upNext}
                                    </p>
                                </div>
                            </div>
                            {popularMovies?.slice(activeStep + 1, activeStep + 4)?.map((movie, index) => (
                                <a key={movie?.id} href={`/movie/${movie?.id}`}>
                                    <div id={`${index + 2}`} className="h-24 mb-3 hover:opacity-90">
                                        <div className="flex flex-row w-full">
                                            <div>
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                                                    onError={handleImageError}
                                                    alt="movie-img"
                                                    className="w-20 object-cover self-start h-24 rounded-br-xl rounded-bl-xl rounded-tr-xl"
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <div className="flex flex-row items-center">
                                                    <PlayCircleOutlineIcon
                                                        sx={{
                                                            height: '40px', color: 'white', width: '40px', margin: '6px', alignSelf: 'center', ':hover': { color: 'yellow', borderColor: 'red' },
                                                        }}
                                                    />
                                                    <div className="text-red">
                                                        {formatDate(movie?.release_date)}
                                                    </div>
                                                </div>
                                                <div className="m-1 ml-2 text-sm text-white text-left overflow-ellipsis duration-300 ease-in-out lg:col-span-6 whitespace-normal">
                                                    <p>{movie.title}</p>
                                                    <p className="text-gray-300 text-sm text-left whitespace-nowrap overflow-ellipsis mt-auto">
                                                        {translations[language]?.watchTrailer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                            <a href={`/top250Movie`}>
                                <div className="flex flex-row items-center hover:text-yellow-300">
                                    <div className="font-semibold text-lg text-left whitespace-nowrap overflow-ellipsis capitalize">
                                        {translations[language]?.moreRecommendation}
                                    </div>
                                    <ArrowForwardIosIcon
                                        sx={{
                                            height: '20px', color: 'white', width: '20px', margin: '6px', alignSelf: 'center', ':hover': { color: 'yellow', borderColor: 'red', },
                                        }}
                                    />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}