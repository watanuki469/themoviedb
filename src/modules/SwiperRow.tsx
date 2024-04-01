import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface SwiperRowProps {
    searchItemList: any
}

export default function SwiperRow({
    searchItemList,
}: SwiperRowProps) {

    // let navigate = useNavigate()
    const [activeSlider, setActiveSlider] = useState(5);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveSlider(2);
            } else if (window.innerWidth < 1024) {
                setActiveSlider(3);
            } else {
                setActiveSlider(5);
            }
        };

        window.addEventListener('resize', handleResize);

        // Call handleResize at initial load
        handleResize();

        // Clean up event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="h-full ">
            <Swiper
                spaceBetween={10}
                // centeredSlides={true}
                slidesPerView={activeSlider}

                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                // pagination={{
                //     clickable: true,
                // }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper text-red-500"
            >
                {searchItemList.map((item: any, index: any) => {
                    return (
                        <SwiperSlide key={index}>

                            <div className="w-full h-auto">
                                <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images" />
                            </div>
                            <div className="bg-gray-900">
                                <div className="mx-3 ">
                                    <div className="flex gap-x-4 items-center ">
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-star text-yellow-300"></i>
                                            <p className="leading-relaxed text-gray-500">{item?.vote_average.toFixed(1)}</p>
                                        </div>
                                        <div className="grow ml-4">
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
