import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { IconButton } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';

export default function Slider() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const popularMovies = useAppSelector((state) => state.movies.listMoviesPopular)

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetchMovies());
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);

    }, []);

    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };
    const handleBackgroundImageError = (e: any) => {
        e.target.style.backgroundImage = 'url(https://www.dtcvietnam.com.vn/web/images/noimg.jpg)';
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
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
    const cutNum = (e: any) => {
        // Lấy 2 ký tự đầu tiên của chuỗi số
        const firstTwoDigits = e.substring(0, 1)

        // Lấy 2 ký tự tiếp theo của chuỗi số
        const nextTwoDigits = e.substring(2, 4)

        // Hiển thị dạng "2:47"
        const formattedTime = `${firstTwoDigits}:${nextTwoDigits}`
        return formattedTime
    }

    return (
        <div>
            <section className='relative overflow-hidden'>
                <div className="md:grid md:grid-cols-12 text-white gap-3  items-end cursor-pointer w-full ">
                    <div className="lg:col-span-8 md:col-span-12 flex items-stretch">
                        <div id='1' className=" bg-cover bg-top relative w-screen hover:opacity-90"
                            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${popularMovies[activeStep]?.backdrop_path})` }}>
                            <div className="flex flex-col h-full "  >
                                <div className='flex absolute w-full '>
                                    <div className='grow text-left' >
                                        <IconButton
                                            onClick={handleBack}
                                            disabled={activeStep === 0 || popularMovies.length === 0}
                                            size="medium"

                                            sx={{
                                                top: '200%',
                                                left: "0px",
                                                background: "rgba(0, 0, 0, 0.35)",
                                                border: '1px solid white',
                                                "&:hover": {
                                                    background: "rgba(0, 0, 0, 0.35)",
                                                },
                                            }}
                                        >
                                            <KeyboardArrowLeftIcon sx={{ width: "50px", height: "50px", color: 'white', ':hover': { color: 'yellow' } }} />
                                        </IconButton>
                                    </div>
                                    <div className='justify-end'>
                                        <IconButton
                                            onClick={handleNext}
                                            disabled={activeStep === popularMovies.length - 5 || popularMovies.length === 0} // Disable khi activeStep = popularMovies.length hoặc popularMovies.length = 0
                                            size="medium"
                                            sx={{
                                                justifyContent: 'flex-end', alignItems: 'center', right: '0', top: '200%',

                                                background: "rgba(0, 0, 0, 0.35)",
                                                border: '1px solid white',
                                                "&:hover": {
                                                    background: "rgba(0, 0, 0, 0.35)",
                                                },
                                            }}
                                        >
                                            <KeyboardArrowRightIcon sx={{ width: "50px", height: "50px", color: 'white', ':hover': { color: 'yellow' } }} />
                                        </IconButton>
                                    </div>


                                </div>
                                <div className="flex items-end justify-start w-full h-96 "
                                    onClick={() => navigate(`/movie/${popularMovies[activeStep]?.id}`)}
                                >
                                    <div className=' object-contain items-end justify-end '>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${popularMovies[activeStep]?.poster_path}`}
                                            onError={handleImageError}
                                            alt="movie-img"
                                            className="h-full w-52 "
                                        />
                                    </div>
                                    <div className='flex-col w-full'>
                                        <div className='flex md:hidden items-center'>
                                            <PlayCircleOutlineIcon sx={{
                                                height: '40px', color: 'white', width: '40px', margin: '6px', alignSelf: 'center'
                                                , ':hover': {
                                                    color: 'yellow', borderColor: 'red'
                                                },
                                            }} />

                                            <div className="p-2 text-red ">
                                                {popularMovies[activeStep]?.vote_count} min
                                            </div>
                                        </div>
                                        <div className='flex bg-black bg-opacity-60 w-full ' >
                                            <div className='hidden md:block'>
                                                <PlayCircleOutlineIcon sx={{
                                                    height: '80px', color: 'white', width: '80px', margin: '6px', alignSelf: 'center'
                                                    , ':hover': {
                                                        color: 'yellow', borderColor: 'red'
                                                    },
                                                }} />
                                            </div>

                                            <div className="p-4 text-xl text-white text-left  mb-3  transition duration-300 ease-in-out lg:col-span-6">
                                                {popularMovies[activeStep]?.title}
                                                <p className="text-gray-400 text-sm text-left  whitespace-nowrap  overflow-ellipsis mt-auto">
                                                    Watch The Trailer
                                                </p>

                                            </div>
                                            <div className="hidden md:block mt-auto mb-auto ml-auto text-center p-2 text-white">
                                                {cutNum(`${popularMovies[activeStep]?.id}`)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 w-screen flex">
                        <div className='hidden lg:block relative h-96 w-screen'>
                            <div id='6' className="h-8 text-red-500 hover:opacity-90">
                                <div className="text-xl text-white text-left  duration-300 ease-in-out ">
                                    <p className="text-yellow-400 font-bold text-left  whitespace-nowrap  ">
                                        Up next
                                    </p>
                                </div>
                            </div>
                            <div id='2' className="h-24 mb-3 hover:opacity-90"
                                onClick={() => navigate(`/movie/${popularMovies[activeStep + 1]?.id}`)}
                            >
                                <div className='flex flex-row w-full'>
                                    <div >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${popularMovies[activeStep + 1]?.poster_path}`}
                                            onError={handleImageError}
                                            alt="movie-img"
                                            className='w-20 object-cover self-start h-24'
                                        />
                                    </div>
                                    <div className='flex flex-col w-full '>
                                        <div className='flex flex-row md-flex items-center'>
                                            <PlayCircleOutlineIcon sx={{
                                                height: '40px', color: 'white', width: '40px', margin: '6px', alignSelf: 'center'
                                                , ':hover': {
                                                    color: 'yellow', borderColor: 'red'
                                                },
                                            }} />

                                            <div className="text-red ">
                                                {cutNum(`${popularMovies[activeStep + 1]?.id}`)}

                                            </div>
                                        </div>
                                        <div className="m-1 ml-2 text-sm text-white text-left overflow-ellipsis duration-300 ease-in-out lg:col-span-6 whitespace-normal">
                                            <p >
                                                {popularMovies[activeStep + 1]?.title}
                                            </p>
                                            <p className="text-gray-300 text-sm text-left  whitespace-nowrap  overflow-ellipsis mt-auto">
                                                Watch The Trailer
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div id='3' className="h-24 mb-4 hover:opacity-90"
                                onClick={() => navigate(`/movie/${popularMovies[activeStep + 2]?.id}`)}>
                                <div className='flex flex-row w-full'>
                                    <div >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${popularMovies[activeStep + 2]?.poster_path}`}
                                            onError={handleImageError}
                                            alt="movie-img"
                                            className='w-20 object-cover self-start h-24'
                                        />
                                    </div>
                                    <div className='flex flex-col w-full '>
                                        <div className='flex flex-row md-flex items-center'>
                                            <PlayCircleOutlineIcon sx={{
                                                height: '40px', color: 'white', width: '40px', margin: '6px', alignSelf: 'center'
                                                , ':hover': {
                                                    color: 'yellow', borderColor: 'red'
                                                },
                                            }} />

                                            <div className="text-red ">
                                                {cutNum(`${popularMovies[activeStep + 2]?.id}`)}
                                            </div>
                                        </div>
                                        <div className="m-1 ml-2 text-sm text-white text-left overflow-ellipsis duration-300 ease-in-out lg:col-span-6 whitespace-normal">
                                            <p>
                                                {popularMovies[activeStep + 2]?.title}
                                            </p>
                                            <p className="text-gray-300 text-sm text-left  whitespace-nowrap  overflow-ellipsis mt-auto">
                                                Watch The Trailer
                                            </p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div id='4' className="h-24 mb-4 "
                                onClick={() => navigate(`/movie/${popularMovies[activeStep + 3]?.id}`)}>
                                <div className='flex flex-row w-full'>
                                    <div >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${popularMovies[activeStep + 3]?.poster_path}`}
                                            onError={handleImageError}
                                            alt="movie-img"
                                            className='w-20 object-cover self-start h-24'
                                        />
                                    </div>
                                    <div className='flex flex-col w-full '>
                                        <div className='flex flex-row md-flex items-center'>
                                            <PlayCircleOutlineIcon sx={{
                                                height: '40px', color: 'white', width: '40px', margin: '6px', alignSelf: 'center'
                                                , ':hover': {
                                                    color: 'yellow', borderColor: 'red'
                                                },
                                            }} />

                                            <div className="text-red ">
                                                {cutNum(`${popularMovies[activeStep + 3]?.id}`)}
                                            </div>
                                        </div>
                                        <div className="m-1 ml-2 text-sm text-white text-left overflow-ellipsis duration-300 ease-in-out lg:col-span-6 whitespace-normal">
                                            <p>
                                                {popularMovies[activeStep + 3]?.title}
                                            </p>
                                            <p className="text-gray-300 text-sm text-left  whitespace-nowrap  overflow-ellipsis mt-auto">
                                                Watch The Trailer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row md-flex items-center'
                                    onClick={() => navigate(`/Popular`)}
                                >
                                    <div className="text-white font-semibold text-lg text-left  whitespace-nowrap  overflow-ellipsis ">
                                        Browse Trailer
                                    </div>
                                    <ArrowForwardIosIcon sx={{
                                        height: '20px', color: 'white', width: '20px', margin: '6px', alignSelf: 'center'
                                        , ':hover': {
                                            color: 'yellow', borderColor: 'red'
                                        },
                                    }} />
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}