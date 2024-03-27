import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import TopBar from "../common/TopBar";
import { fetchMovies } from "../../redux/movies.reducer";
import Slider from "../common/Slider";

export default function MainLayout() {

    return (
        <div className="bg-black h-screen">
            <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                <TopBar />
                <div className="mt-8">
                    <Slider />
                </div>

            </div>
        </div>

    )
}