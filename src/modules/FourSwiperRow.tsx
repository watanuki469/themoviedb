import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface FourSwiperRowProps {
    fourSwiperRowList: any
    mediaType: any
}

export default function FourSwiperRow({
    fourSwiperRowList,
    mediaType
}: FourSwiperRowProps) {

    const [activeSlider, setActiveSlider] = useState(6);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveSlider(2);
            } else if (window.innerWidth < 1024) {
                setActiveSlider(3);
            } else {
                setActiveSlider(4);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };

    const [isRating, setIsRating] = useState(false);
    const [numberIndex, setNumberIndex] = useState(0);
    const handleClick = (index: number) => {
        setIsRating(true)
        setNumberIndex(index);
    };
    const [value, setValue] = useState<number | null>(0);
    const handleClose = () => {
        setIsRating(false)
        setNumberIndex(0);
        setValue(0)
    };
    const handleClickImg = (id: any) => {
        window.scrollTo(0, 0)
        navigate(`/${mediaType}/${id}`)
    };
    let navigate = useNavigate()

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
    function formatNumber(num: any) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'm';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num;
    }


    return (
        <div className="px-2 pt-2">
            {isRating && (
                <div className="fixed top-0 left-0 w-full h-full bg-black text-white bg-opacity-50 flex justify-center items-center z-30">
                    <div className="p-5 rounded-lg max-w-2xl min-w-xl px-4 py-4 ">
                        <div className="flex items-center justify-end">
                            <div className="flex justify-end">
                                <button onClick={() => setIsRating(false)} className="text-white hover:text-gray-700 px-2 py-2 rounded-full  ">
                                    <i className="fa-solid fa-times text-xl"></i>
                                </button>
                            </div>
                        </div>
                        <div className="bg-black px-4 py-4">
                            <div className="aligns-center justify-center items-center text-center gap-2">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-52 flex flex-col items-center">
                                    <i className="fa-solid fa-star text-9xl text-blue-500"></i>
                                    <p className="-translate-y-20 text-4xl font-extrabold ">{value}</p>
                                </div>
                                <p className="text-yellow-300 font-bold">Rate this</p>
                                <p className="text-2xl ">{fourSwiperRowList[numberIndex]?.original_title ? (fourSwiperRowList[numberIndex]?.original_title) : (fourSwiperRowList[numberIndex]?.title ? (fourSwiperRowList[numberIndex]?.title) : (fourSwiperRowList[numberIndex]?.name))}</p>
                                <div className="gap-2 px-2 py-2">
                                    <Rating name="customized-10" value={value} size="large"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        max={10} sx={{
                                            color: 'blue', mt: 1,
                                            '& .MuiRating-iconEmpty': {
                                                borderColor: 'red',
                                                color: 'gray'
                                            },
                                        }} />
                                    <br />
                                    <button className={`px-2 py-2 justify-center mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`} onClick={() => handleClose()}>
                                        Rate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Swiper
                spaceBetween={10}
                slidesPerView={activeSlider}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper text-white h-full "
            >
                {fourSwiperRowList?.map((item: any, index: any) => {
                    return (
                        <SwiperSlide key={index} >
                            <div className=" object-cover">
                                <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images" className="h-60 w-full hover:opacity-80"
                                    onError={handleImageError}

                                    onClick={() => handleClickImg(`${item?.id}`)} />
                            </div>
                            <div className="bg-white shadow-xl text-black">
                                <div className="mx-3 ">
                                    <div className="flex gap-x-4 items-center ">
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-star text-yellow-300"></i>
                                            <p className="leading-relaxed text-gray-500">{item?.vote_average.toFixed(1)}</p>
                                        </div>
                                        <div className="grow ml-auto" onClick={() => handleClick(index)}>
                                            <i className="fa-regular fa-star text-blue-500"></i>
                                        </div>
                                    </div>
                                    <div className="h-12 mt-2">
                                        <p className="line-clamp-2"> {item.title ? item.title : item.name}</p>
                                    </div>
                                    <button className="w-full hover:opacity-70 rounded-lg bg-gray-300 " onClick={() => handleWatchList(item)}>
                                            {checkLog ? (
                                                <div>
                                                    {localStorage.getItem('watchList') && JSON.parse(localStorage.getItem('watchList')!)[item?.id] ? (
                                                        <div className="py-2 px-3 flex justify-center items-center text-blue-500  text-center h-full">
                                                            <i className="fas fa-check font-bold text-lg  mr-2"></i>
                                                            <div className="text-center">
                                                                <div className='font-bold text-sm'  >
                                                                    <p>Remove</p>
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="py-2 px-3 flex justify-center items-center text-blue-500  text-center h-full">
                                                            <i className="fas fa-plus font-bold text-lg  mr-2"></i>
                                                            <div className="text-center">
                                                            <div className='font-bold text-sm'  >
                                                                    <p>Watchlist</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div>
                                                    {localStorage.getItem('watchList') && JSON.parse(localStorage.getItem('watchList')!)[item?.id] ? (
                                                        <div className="py-2 px-3 flex justify-center items-center text-blue-500  text-center h-full">
                                                            <i className="fas fa-check font-bold text-lg  mr-2"></i>
                                                            <div className="text-center">
                                                                <div className='font-bold text-sm'  >
                                                                    <p>Remove</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="py-2 px-3 flex justify-center items-center text-blue-500  text-center h-full">
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
                                    <button className="flex items-center px-4 py-2 hover:opacity-50 rounded-lg w-full justify-center border-none "
                                        onClick={() => {
                                            if (item?.media_type === 'person') {
                                                navigate(`/person/${item.id}`);
                                            } else if (item?.media_type === "movie") {
                                                navigate(`/movie/${item.id}`);
                                            }
                                            else {
                                                navigate(`/tv/${item.id}`);
                                            }
                                        }}>
                                        <i className="fa-solid fa-play mr-2"></i>
                                        <p>Trailer</p>
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    );
}
