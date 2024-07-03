import { format, parseISO } from 'date-fns';

export interface TwoTvRowProps {
    singleTvList: any
}

export default function TvEpisode({
    singleTvList,
}: TwoTvRowProps) {
    const airDate = singleTvList[0]?.last_episode_to_air?.air_date;
    const formattedDate = airDate ? format(parseISO(airDate), 'EEE, MMM dd, yyyy') : '';
    return (
        <section className=" md:grid lg:py-4  lg:px-4 md:py-0 md:px-0">
            <div className="text-black font-sans rounded-xl " >
                <div style={{ position: "relative" }}>
                    <div className=" w-full ">
                        <div className="grid grid-cols-2 gap-4 cursor-pointer  px-2 py-2">
                            <div className='bg-white shadow-sm shadow-black  px-2 py-2  rounded-xl  '>
                                <div className="text-black flex gap-4 items-center ">
                                    <i className="fa-solid fa-bookmark text-4xl hover:text-gray-300 text-gray-400 "></i>
                                    <div>
                                        <div className='uppercase bg-yellow-300 px-1 py-1 font-bold text-sm'>Most Recent</div>
                                        <div>
                                            {formattedDate}
                                        </div>
                                    </div>
                                </div>
                                <div className='items-center gap-2 flex-wrap h-12'>
                                    <p className='font-bold line-clamp-2  mt-2'>
                                        S{singleTvList[0]?.last_episode_to_air?.season_number}.E{singleTvList[0]?.last_episode_to_air?.episode_number}
                                        <span className='px-2'>•</span>
                                        <span className='hover:underline'>{singleTvList[0]?.last_episode_to_air?.name}</span>
                                    </p>
                                </div>
                                <div>
                                    {singleTvList[0]?.last_episode_to_air?.overview}
                                </div>
                                <div className=''>
                                    <div className='flex items-center gap-2'>
                                        <i className="fa-solid fa-star text-yellow-300"></i>
                                        <div> {singleTvList[0]?.last_episode_to_air?.vote_average?.toFixed(1)} /10</div>
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