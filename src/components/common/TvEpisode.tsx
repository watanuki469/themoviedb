import { Rating } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export interface TwoTvRowProps {
    singleTvList: any
}

export default function TvEpisode({
    singleTvList,
}: TwoTvRowProps) {
    let navigate = useNavigate()
    const airDate = singleTvList[0]?.last_episode_to_air?.air_date;
    const formattedDate = airDate ? format(parseISO(airDate), 'EEE, MMM dd, yyyy') : '';

    const airNextDate = singleTvList[0]?.next_episode_to_air?.air_date;
    const formattedNextDate = airNextDate ? format(parseISO(airNextDate), 'EEE, MMM dd, yyyy') : '';

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
        <section className=" md:grid lg:py-4  lg:px-4 md:py-0 md:px-0">
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
                                <p className="text-2xl ">{numberIndex > 0 ? (singleTvList[0]?.next_episode_to_air?.name) : (singleTvList[0]?.last_episode_to_air?.name ? (singleTvList[0]?.last_episode_to_air?.name) : ('N/A'))}</p>
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
            <div className="text-black font-sans " >
                <div style={{ position: "relative" }}>
                    <div className=" w-full ">
                        <div className="grid grid-cols-2 gap-4 cursor-pointer">
                            <div className='bg-white shadow-sm shadow-black px-2 py-2'>
                                <div className="text-black flex gap-4 items-center ">
                                    <i className="fa-solid fa-bookmark text-4xl hover:text-gray-300 text-gray-400 "></i>
                                    <div>
                                        <div className='uppercase bg-yellow-300 px-1 py-1 font-bold text-sm'>Most Recent</div>
                                        <div>
                                            {formattedDate}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='items-center gap-2 flex-wrap h-20'>
                                        <p className='font-bold line-clamp-3 hover:underline mt-2' onClick={() => navigate(`/tv/${singleTvList[0]?.last_episode_to_air?.id}`)}>
                                            S{singleTvList[0]?.last_episode_to_air?.season_number}.E{singleTvList[0]?.last_episode_to_air?.episode_number}
                                            <span className='px-2'>•</span>
                                            {singleTvList[0]?.last_episode_to_air?.name}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="justify-start items-center  w-fit flex gap-2 hover:bg-gray-300  py-2 mt-3" onClick={() => handleClick(0)}>
                                        <i className="fa-regular fa-star text-blue-500"></i>
                                        <p className='text-blue-500 '>Rate</p>
                                        
                                    </div>
                                </div>

                            </div>
                            <div className='bg-white shadow-sm shadow-black px-2 py-2'>
                                <div className="text-black flex gap-4 items-center w-full ">
                                    <i className="fa-solid fa-bookmark text-4xl hover:text-gray-300 text-gray-400 "></i>
                                    <div>
                                        <div className='uppercase bg-yellow-300 px-1 py-1 font-bold text-sm'>Top-Rated</div>
                                        <div>
                                            {formattedDate}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='items-center gap-2 h-20 mt-2'>
                                        <p className='font-bold line-clamp-3 hover:underline' onClick={() => navigate(`/tv/${singleTvList[0]?.next_episode_to_air?.id}`)}>
                                            S{singleTvList[0]?.last_episode_to_air?.season_number - 1}.E{singleTvList[0]?.last_episode_to_air?.episode_number - 1}
                                            <span className='px-2'>•</span>
                                            Episode 1
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="justify-start items-center  w-fit flex gap-2 hover:bg-gray-300  py-2 mt-3" onClick={() => handleClick(0)}>
                                        <i className="fa-regular fa-star text-blue-500"></i>
                                        <p className='text-blue-500 '>Rate</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </section >
    )
}