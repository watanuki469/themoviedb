import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListRow from "./ListRow";
import OneRow from "./OneRow";

export interface FourSwiperRowProps {
    listNewNetflix: any,
    listNewDisney: any,
    listNewHulu: any,
    listNewPrime: any,
    listNewStream: any,
    listNewMax: any,
    topRatedMovies: any,
    popularMovie: any,
    mostPopularTv: any,
    topRatedTv: any,
    discoverTv: any,
    discoverMovie: any,
}

export default function WatchGuide({
    listNewNetflix,
    listNewDisney,
    listNewHulu,
    listNewPrime,
    listNewStream,
    listNewMax,
    topRatedMovies,
    popularMovie,
    mostPopularTv,
    topRatedTv,
    discoverTv,
    discoverMovie


}: FourSwiperRowProps) {
    const [currentView, setCurrentView] = useState('WatchGuide');
    let navigate = useNavigate()

    const currentDate = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    // Lấy số tháng từ ngày hiện tại (chú ý rằng tháng trong JavaScript bắt đầu từ 0)
    const currentMonth = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonth];

    const buttons = [
        { name: 'Watch Guide', view: 'WatchGuide' },
        { name: 'Fan Favorite', view: 'FanFavorite' },
        { name: 'Top Pick', view: 'TopPick' },
        { name: 'From Your WatchList', view: 'FromYourWatchList' },
        { name: 'Most Popular', view: 'MostPopular' },
    ];
    const remainingButtons = buttons.filter(button => button.view !== currentView);

    return (
        <div >
            <div>
                <div className="flex items-center py-3">
                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                    <h2 className="lg:text-2xl text-lg font-bold">Streaming Guides</h2>
                </div>
                <p className="text-gray-400">Everything coming to Prime Video, Netflix, Disney Plus, and more</p>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2  py-2 text-white ">
                    <div onClick={() => navigate(`/trending/netflix`)}>
                        <ListRow listRowList={listNewNetflix} />
                        <p className="mt-2 hover:underline">Everything New On Disney In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline">See our picks</p>
                    </div>
                    <div onClick={() => navigate(`/trending/disney`)}>
                        <ListRow listRowList={listNewDisney} />
                        <p className="mt-2 hover:underline">Everything New On Netflix In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                    </div>
                    <div onClick={() => navigate(`/trending/hulu`)}>
                        <a href="/top250Tv">
                            <ListRow listRowList={listNewHulu} />
                        </a>
                        <p className="mt-2 hover:underline">Everything New On Hulu In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                    </div>
                    <div onClick={() => navigate(`/trending/prime`)}>
                        <ListRow listRowList={listNewPrime} />
                        <p className="mt-2 hover:underline">Everything New On Prime Video In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline">See our picks</p>
                    </div>
                    <div onClick={() => navigate(`/trending/stream`)}>
                        <ListRow listRowList={listNewStream} />
                        <p className="mt-2 hover:underline">Everything New On Stream Premiere In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                    </div>
                    <div onClick={() => navigate(`/trending/hulu`)}>
                        <a href="/top250Tv">
                            <ListRow listRowList={listNewMax} />
                        </a>
                        <p className="mt-2 hover:underline">Everything New On Max In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                    </div>
                </div>
                <div className="w-full py-4" >
                    Browse these IMDb collections to find the perfect next movie or TV show to watch
                    <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 ">
                        <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[0].name}</button>
                        <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[1].name}</button>
                        <button></button>
                    </div>
                    <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4">
                        <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[2].name}</button>
                        <button className="px-2 py-2 border-white border-2 text-white bg-black hover:opacity-80 overflow-ellipsis">{remainingButtons[3].name}</button>
                        <button></button>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2  py-2 text-white ">
                    <div onClick={() => navigate(`/trending/netflix`)}>
                        <OneRow listRowList={topRatedMovies} />
                        <p className="mt-2 hover:underline">Everything New On Disney In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline">See our picks</p>
                    </div>
                    <div onClick={() => navigate(`/trending/disney`)}>
                        <OneRow listRowList={popularMovie} />
                        <p className="mt-2 hover:underline">Everything New On Netflix In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                    </div>
                    <div onClick={() => navigate(`/trending/hulu`)}>
                        <a href="/top250Tv">
                            <OneRow listRowList={mostPopularTv} />
                        </a>
                        <p className="mt-2 hover:underline">Everything New On Hulu In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                    </div>
                    <div onClick={() => navigate(`/trending/prime`)}>
                        <OneRow listRowList={topRatedTv} />
                        <p className="mt-2 hover:underline">Everything New On Prime Video In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline">See our picks</p>
                    </div>
                    <div onClick={() => navigate(`/trending/stream`)}>
                        <OneRow listRowList={discoverTv} />
                        <p className="mt-2 hover:underline">Everything New On Stream Premiere In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                    </div>
                    <div onClick={() => navigate(`/trending/hulu`)}>
                        <a href="/top250Tv">
                            <OneRow listRowList={discoverMovie} />
                        </a>
                        <p className="mt-2 hover:underline">Everything New On Max In {currentMonthName}</p>
                        <p className="mt-2 text-blue-500 hover:underline" >Check the status</p>
                    </div>
                </div>
            </div>
        </div>

    )
}