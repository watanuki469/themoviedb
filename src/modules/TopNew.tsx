import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FilterIcon from '@mui/icons-material/Filter';
import axiosTopNew from "../redux/axios/axiosTopNew";

export default function TopNew() {

    const [topNews, setTopNews] = useState<any[]>([]);
    useEffect(() => {
        axiosTopNew.get('', {
            params: {
                category: 'TOP',
                first: '20'
            }
        })
            .then((response) => {
                setTopNews(response?.data?.news?.edges || []);
            })
            .catch((error) => {
                console.error('Error fetching top news:', error);
            });
    }, []);


    return (
        <div className="relative">
            <div className="w-full">
                <div className="flex items-center flex-wrap gap-2 font-bold text-xl w-fit hover:text-yellow-300">
                    <p className="hover:text-black">Top New</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                {topNews?.slice(0, 5).map((item, index) => (
                    <div key={index} className="py-2">
                        <div className="flex items-center border-2 border-gray-200 py-1 px-1">
                            <div className="w-9/12">
                                <div className="line-clamp-2 hover:underline">
                                    {item?.node?.articleTitle?.plainText}
                                </div>

                                <div className="flex items-center flex-wrap gap-2">
                                    {item?.node?.date && (
                                        <>
                                            <div className="text-gray-400 line-clamp-2">
                                                {item?.node?.date?.slice(0, 10)} • by {item?.node?.byline}
                                            </div>
                                        </>
                                    )}

                                </div>
                            </div>
                            <div className="w-3/12">
                                <div className="w-full">
                                    <img
                                        className="h-28 w-full object-cover hover:opacity-90"
                                        src={`${item?.node?.image.url}`}
                                        alt="Article Thumbnail"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>



    );
}
