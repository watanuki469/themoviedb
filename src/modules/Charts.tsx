import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Charts() {
    let navigate=useNavigate()
    return (
        <div className="pt-2">
            <div>
                <div
                onClick={()=>navigate('/')}
                className="flex items-center flex-wrap gap-2 font-bold text-xl hover:text-yellow-300">
                    <p className="hover:text-black">Top Box Office (US)</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">From the past weekend</p>

                <div className="flex items-center flex-wrap gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">IMDb Top 250 Movies</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">As rated by regular IMDb voters.</p>

                <div className="flex items-center flex-wrap gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">Top Rated English Movies</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">English-language movies as rated by IMDb users</p>

                <div className="flex items-center flex-wrap gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">Most Popular TV Shows</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">As determined by IMDb users</p>

                <div className="flex items-center flex-wrap gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">Top 250 TV Shows</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">Top 250 as rated by IMDb Users</p>

                <div className="flex items-center flex-wrap gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">Lowest Rated Movies</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">Bottom 100 as voted by IMDb users</p>

                <div className="flex items-center flex-wrap gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">Most Popular Celebs </p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">As determined by IMDb users</p>



            </div>
        </div >
    );
}
