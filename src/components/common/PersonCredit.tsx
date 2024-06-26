import { Box, Rating } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LanguageContext } from "../../pages/LanguageContext";

export interface FourSwiperRowProps {
    personCreditList: any
}

export default function PersonCredit({
    personCreditList,
}: FourSwiperRowProps) {

    // const [activeSlider, setActiveSlider] = useState(2);
    const [naviSlider, setNaviSlider] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setNaviSlider(true)
            } else {
                setNaviSlider(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [isRating, setIsRating] = useState(false);
    const [numberIndex, setNumberIndex] = useState(0);
    const handleClick = (index: number) => {
        setIsOpen(true);
        setNumberIndex(index);
    };
    const [value, setValue] = useState<number | null>(0);

    let navigate = useNavigate()
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750'; // Set the fallback image source here
    };
    const [checkLog, setCheckLog] = useState(false)

    const handleWatchList = (movie: any) => {
        const storedDataString = localStorage.getItem('watchList');
        let storedData: { [key: string]: any } = {};
        if (storedDataString !== null) {
            storedData = JSON.parse(storedDataString);
        }
        if (storedData[movie?.id]) {
            delete storedData[movie?.id];
            localStorage.setItem('watchList', JSON.stringify(storedData));
            setCheckLog(!checkLog)
            toast.success(`Removed ${movie?.title ? movie?.title : movie?.name} from watch list successfully`);

        } else {
            storedData[movie?.id] = movie;
            setCheckLog(!checkLog)
            localStorage.setItem('watchList', JSON.stringify(storedData));
            toast.success(`Added ${movie?.title ? movie?.title : movie?.name} to watch list successfully`);

        }
    }
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;

    return (
        <section className="relative w-full cursor-pointer">
            <div className="px-2  w-full">
                <Box sx={{
                    "& .swiper-slide": {
                        width: {
                            xs: "50%",
                            sm: "35%",
                            md: "35%",
                            lg: "50%",
                        }
                    }
                }}>
                    {isOpen && (
                        <div className="fixed top-0 left-0 w-full text-white flex justify-center items-center z-20">
                            <div className="p-5 rounded-lg max-w-2xl ">
                                <div className="flex justify-end">
                                    <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-80 px-2 py-2 rounded-full border-2 border-blue-500 bg-black h-12 w-12  ">
                                        <i className="fa-solid fa-times text-xl"></i>
                                    </button>
                                </div>
                                <div className="bg-black px-4 py-4">
                                    <div className="flex gap-2 ">
                                        <img src={`https://image.tmdb.org/t/p/w500/${personCreditList[numberIndex]?.poster_path}`} alt="product images"
                                            className="w-20 h-28" onError={handleImageError} />
                                        <div className="gap-2">
                                            <div className="flex items-center text-white gap-2"
                                                onClick={() => navigate(`/movie/${personCreditList[numberIndex]?.id}`)}>
                                                <p className="text-xl font-bold"> {personCreditList[numberIndex]?.title}</p>
                                                <i
                                                    onClick={() => navigate(`/movie/${personCreditList[numberIndex]?.id}`)}
                                                    className="fa-solid fa-chevron-right text-2xl text-white hover:text-yellow-300"></i>

                                            </div>
                                            <div className="flex flex-row gap-3 mt-1">
                                                <p> {personCreditList[numberIndex]?.release_date?.slice(0, 4)}</p>
                                                <div>
                                                    {personCreditList[numberIndex]?.vote_count.toString().slice(0, 1)}h:
                                                    {personCreditList[numberIndex]?.vote_count.toString().slice(1, 2)}
                                                    min
                                                </div>
                                            </div>
                                            <div className="flex gap-4 flex-wrap items-center mt-1 ">
                                                <div className="flex gap-2 flex-wrap items-center">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p> {personCreditList[numberIndex]?.vote_average.toString().slice(0, 3)}/10</p>
                                                </div>
                                                {/* <div className="flex gap-2 flex-wrap items-center text-blue-500 hover:text-white hover:bg-gray-500 px-2 py-2"
                                                    onClick={() => setIsRating(true)} >
                                                    <i className="fa-regular fa-star"></i>
                                                    <p>Rate</p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className=""> {personCreditList[numberIndex]?.overview}</p>
                                    </div>
                                    <div>
                                        <p className="line-clamp-1"><span className="text-yellow-300">Character:</span>  {personCreditList[numberIndex]?.character}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 px-2 py-2 text-center items-center">
                                        {/* <button
                                            onClick={() => navigate(`/IMDbPro`)}
                                            className="flex text-blue-500 justify-center items-center text-center bg-gray-600 hover:opacity-80 px-2 py-2 gap-2">
                                            <p><i className="fa-solid fa-play"></i></p>
                                            <p>Watchlist</p>
                                        </button> */}
                                        <button className="w-full flex text-blue-500 justify-center items-center text-center bg-gray-600 hover:opacity-80 gap-2  "
                                            onClick={() => handleWatchList(personCreditList[numberIndex])}>
                                            {checkLog ? (
                                                <div>
                                                    {localStorage.getItem('watchList') && JSON.parse(localStorage.getItem('watchList')!)[personCreditList[numberIndex]?.id] ? (
                                                        <div className="py-2 px-3 flex justify-center items-center  text-center">
                                                            <i className="fas fa-check font-bold text-lg  mr-2"></i>
                                                            <div className="text-center">
                                                                <div className='font-bold'  >
                                                                    <p>Watchlist</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="py-2 px-3 flex justify-center items-center  text-center">
                                                            <i className="fas fa-plus font-bold text-lg  mr-2"></i>
                                                            <div className="text-center">
                                                                <div className='font-bold'  >
                                                                    <p>Watchlist</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div>
                                                    {localStorage.getItem('watchList') && JSON.parse(localStorage.getItem('watchList')!)[personCreditList[numberIndex]?.id] ? (
                                                        <div className="py-2 px-3 flex justify-center items-center  text-center">
                                                            <i className="fas fa-check font-bold text-lg  mr-2"></i>
                                                            <div className="text-center">
                                                                <div className='font-bold'  >
                                                                    <p>Watchlist</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="py-2 px-3 flex justify-center items-center  text-center">
                                                            <i className="fas fa-plus font-bold text-lg  mr-2"></i>
                                                            <div className="text-center">
                                                                <div className='font-bold'  >
                                                                    <p>Watchlist</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => navigate(`/movie/${personCreditList[numberIndex]?.id}`)}
                                            className="flex text-blue-500 justify-center font-bold items-center text-center bg-gray-600 hover:opacity-90 px-2 py-2 gap-2 ">
                                            <p><i className="fa-solid fa-plus "></i></p>
                                            <p>Trailer</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="z-10">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView="auto"
                            grabCursor={true}
                            style={{ width: "100%", height: "max-content", maxWidth: '100%', }}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            navigation={naviSlider}
                            modules={[Pagination, Navigation]}
                            className="mySwiper text-white w-full h-full "
                        >
                            {personCreditList?.map((item: any, index: any) => {
                                return (
                                    <SwiperSlide key={index} className="w-full " >
                                        <div className="flex items-stretch gap-2 shadow-sm shadow-black rounded-br-xl rounded-bl-xl rounded-tr-xl  h-full mt-3 mb-3 mr-3"> {/* Thêm class h-full để chiều cao bằng nhau */}
                                            <div className="flex-1" style={{ maxWidth: "100px" }}
                                                onClick={() => navigate(`/movie/${item?.id}`)}> {/* Đặt kích thước tối đa cho ảnh */}
                                                <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images"
                                                    className="object-cover h-full w-full bg-gray-500 rounded-bl-xl " style={{ maxWidth: "100%", height: '100%' }} onError={handleImageError} /> {/* Đặt kích thước tối đa cho ảnh */}
                                            </div>
                                            <div className=" text-black flex-1  flex-col" onClick={() => navigate(`/movie/${item?.id}`)}>
                                                <div className=" py-2">
                                                    <div className="text-xl font-bold  mb-1">
                                                        <p className="line-clamp-1"> {item.title ? item.title : item.name}</p>
                                                    </div>
                                                    <div className="items-center  mb-1">
                                                        <div className="flex items-center gap-2 ">
                                                            <i className="fas fa-star text-yellow-300"></i>
                                                            <p className="leading-relaxed text-gray-500">{item?.vote_average.toFixed(1)}</p>
                                                        </div>
                                                    </div>
                                                    <div className=" mb-1">
                                                        <p className="line-clamp-1"> {item.character}</p>
                                                    </div>
                                                    <div className=" mb-1">
                                                        <p className="line-clamp-1"> {item.release_date?.slice(0, 4)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 right-0 flex justify-end items-center">
                                                <div className='flex gap-2 px-5 py-5 ' onClick={() => handleClick(index)}>
                                                    <i className="fa-solid fa-circle-info text-blue-500 text-xl"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}

                        </Swiper>
                        <div className="hidden lg:block mt-2">
                            <Swiper
                                spaceBetween={10}
                                slidesPerView='auto'
                                grabCursor={true}
                                style={{ width: "100%", height: "max-content", maxWidth: '100%' }}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                }}
                                navigation={false}
                                modules={[Pagination, Navigation]}
                                className="mySwiper text-white w-full h-full"
                            >
                                {personCreditList?.slice(2).map((item: any, index: any) => {
                                    return (
                                        <SwiperSlide key={index} className="w-full">
                                            <div className="flex items-stretch gap-2 shadow-sm shadow-black rounded-br-xl rounded-bl-xl rounded-tr-xl h-full mt-3 mb-3 mr-3">
                                                <div className="flex-1" style={{ maxWidth: "100px" }}
                                                    onClick={() => navigate(`/movie/${item?.id}`)}>
                                                    <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images" onError={handleImageError}
                                                        className="object-cover h-full w-full bg-gray-500 rounded-bl-xl  "  style={{ maxWidth: "100%", height: '100%' }} />
                                                </div>
                                                <div className=" text-black px-2  flex-1 flex-col "
                                                    onClick={() => navigate(`/movie/${item?.id}`)}>
                                                    <div className="py-2 ">
                                                        <div className="text-xl font-bold mb-1">
                                                            <p className="line-clamp-1"> {item.title ? item.title : item.name}</p>
                                                        </div>
                                                        <div className="items-center mb-1">
                                                            <div className="flex items-center gap-2">
                                                                <i className="fas fa-star text-yellow-300"></i>
                                                                <p className="leading-relaxed text-gray-500">{item?.vote_average.toFixed(1)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="mb-1">
                                                            <p className="line-clamp-1"> {item?.character}</p>
                                                        </div>
                                                        <div className="mb-1">
                                                            <p className="line-clamp-1"> {item.release_date?.slice(0, 4)}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-0 right-0 flex justify-end items-center">
                                                    <div className='flex gap-2 px-5 py-5' onClick={() => handleClick(index + 2)}>
                                                        <i className="fa-solid fa-circle-info text-blue-500 text-xl cursor-pointer"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </Box>
            </div >
        </section>
    );
}
