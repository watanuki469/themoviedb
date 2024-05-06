import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import axiosBornToday from "../../redux/axios/axiosBornToday";
import { useAppDispatch } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";

export default function BornToday() {
    const [movieNews, setMovieNews] = useState<any[]>([]);
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentDate = new Date();
    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Lấy tháng hiện tại, thêm 0 ở trước nếu cần
    const currentDay = ('0' + currentDate.getDate()).slice(-2); // Lấy ngày hiện tại, thêm 0 ở trước nếu cần 
    const currentYear = new Date().getFullYear(); // Lấy năm hiện tại


    useEffect(() => {
        // dispatch(setGlobalLoading(true));        

        axiosBornToday.get('', {
            params: {
                month: currentMonth,
                day: currentDay
            },
        })
            .then((response) => {
                console.log(response);
                setMovieNews(response.data.list || []);
            })
            .catch((error) => {
                console.error('Error fetching born today:', error);
            })
        // .finally(() => {
        //     // Dừng loading sau khi nhận dữ liệu
        //     dispatch(setGlobalLoading(false));
        // });
    }, []);


    const [activeSlider, setActiveSlider] = useState(3);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveSlider(2);
            }
            else if (window.innerWidth < 900) {
                setActiveSlider(3);
            }

            else {
                setActiveSlider(5);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="py-6">
            <Swiper
                spaceBetween={10}
                slidesPerView={activeSlider}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper text-white"
            >
                {movieNews?.map((item: any, index: any) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="w-full h-auto">
                                <div className="items-center justify-center text-center">
                                    <div className="w-36 h-36 mx-auto rounded-full bg-cover items-center justify-center hover:opacity-80"
                                        style={{
                                            backgroundImage: `url(${item?.primaryImage?.imageUrl})`
                                        }}
                                        onClick={() => navigate(`/search?title=${item?.nameText?.text}`)}
                                    >
                                    </div>

                                    <div className="">
                                        <p className="text-white">{item?.nameText?.text}</p>
                                        {item?.birthDateComponents?.dateComponents?.year ? (
                                            <p className="">Age: {currentYear - item?.birthDateComponents?.dateComponents?.year}</p>

                                        ) : (
                                            <div>
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}