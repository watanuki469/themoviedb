import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface SwiperRowProps {
    searchItemList: any
}

export default function SwiperRow({
    searchItemList,
}: SwiperRowProps) {
   

    let navigate = useNavigate()
    const [activeSlider, setActiveSlider] = useState(6);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveSlider(2);
            } else if (window.innerWidth < 1024) {
                setActiveSlider(3);
            } else {
                setActiveSlider(6);
            }
        };

        window.addEventListener('resize', handleResize);

        // Call handleResize at initial load
        handleResize();

        // Clean up event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
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

    return (
        <div className="h-full ">
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
                                <p className="text-2xl ">{searchItemList[numberIndex]?.original_title ? (searchItemList[numberIndex]?.original_title):(searchItemList[numberIndex]?.title?(searchItemList[numberIndex]?.title):(searchItemList[numberIndex]?.name))}</p>
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
                // centeredSlides={true}
                slidesPerView={activeSlider}

                // autoplay={{
                //     delay: 3500,
                //     disableOnInteraction: false,
                // }}
                // pagination={{
                //     clickable: true,
                // }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper text-white"
            >
                {searchItemList.map((item: any, index: any) => {
                    return (
                        <SwiperSlide key={index}>

                            <div className="w-full h-auto"  onClick={() => navigate(`/movie/${item?.id}`)}>
                                <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images " className="h-60" />
                            </div>
                            <div className="bg-gray-900">
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
                                        <p className="line-clamp-2">{index}. {item.title ? item.title : item.name}</p>
                                    </div>
                                    <button className="flex mt-1 items-center px-4 py-2 border rounded-lg w-full justify-center bg-gray-800 text-blue-500 border-none">
                                        <i className="fas fa-plus mr-2"></i>
                                        <p>Watchlists</p>
                                    </button>
                                    <button className="flex items-center px-4 py-2 border rounded-lg w-full justify-center border-none text-white">
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
