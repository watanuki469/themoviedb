import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function TopRatedMovieByGenre() {
    const genreMapping = {
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western',
    };
    let navigate=useNavigate()

    return (
        <div className="pt-2">
            <div>
                <div className="flex flex-wrap gap-2 ">
                    {
                        Object.values(genreMapping).map(genre => (
                            <div
                            onClick={()=>navigate(`/search?genre=${genre}`)}
                            className="px-2 py-2 border-2 border-gray-500 bg-white rounded-full hover:bg-opacity-90 hover:bg-gray-300" key={genre}>{genre}</div>
                        ))
                    }
                </div>
            </div>
        </div >
    );
}
