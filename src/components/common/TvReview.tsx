import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface TwoTvRowProps {
    singleTvList: any
}

export default function TvReview({
    singleTvList,
}: TwoTvRowProps) {
    let navigate = useNavigate()

    return (
        <section className=" md:grid lg:py-4  lg:px-4 md:py-0 md:px-0">
            <div className="text-black font-sans " >
                <div style={{ position: "relative" }}>
                    <div className="bg-white shadow-sm shadow-black w-full py-4 px-4 ">
                        <div className="text-black flex py-4 ">
                            <div className="flex items-center">
                                <div className="items-center">
                                    <div className="bg-yellow-300 text-black py-2 px-2">Features Reviews</div>
                                </div>
                            </div>
                            <div className="flex items-center ml-auto gap-2" >
                                <i className="fa-solid fa-star text-yellow-300 text-sm ml-2"></i>
                                <div>
                                    <span className="">
                                        {typeof singleTvList[0]?.reviews.results[0]?.author_details?.rating === 'number' ?
                                            (singleTvList[0]?.reviews.results[0]?.author_details?.rating % 1 === 0 ?
                                                singleTvList[0]?.reviews.results[0]?.author_details?.rating?.toFixed(0) :
                                                singleTvList[0]?.reviews.results[0]?.author_details?.rating?.toFixed(1)
                                            )
                                            :
                                            'N/A'
                                        }

                                    </span>
                                    <span className="text-stone-400">  /10</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            {singleTvList[0]?.reviews?.results?.slice(0, 1).map((item: any, index: any) => (
                                <div className='flex text-black' key={index}>
                                    <div>
                                        <div className='font-bold text-xl'>A review by {item.author}</div>
                                        <div>
                                            <p>
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {singleTvList[0]?.reviews?.results?.length > 0 ? (
                                <div>
                                    <div className=' flex py-2 px-1 mt-1'>
                                        <div className='flex items-center gap-1 h-full'>
                                            <i className="fa-solid fa-thumbs-up text-xl"></i>
                                            <div>helpful</div>
                                            <div>•</div>
                                            <div>79</div>
                                            <i className="fa-solid fa-thumbs-up fa-rotate-180 ml-2 text-xl"></i>
                                            <div>12</div>
                                        </div>
                                        <div className='ml-auto'>
                                            <MoreVertIcon></MoreVertIcon>
                                        </div>
                                    </div>
                                </div>
                            )
                                : (<div>

                                </div>)}

                        </div>
                    </div>
                    <div className=''>
                        {singleTvList[0]?.reviews?.results?.length > 0 ? (
                            <div  className='flex gap-2 px-2 py-2'>
                                <p className='text-blue-500'>{singleTvList[0]?.reviews?.results[0]?.author}</p>
                                <p>•</p>
                                <p>{singleTvList[0]?.reviews.results[0]?.created_at?.slice(0, 10)}</p>
                            </div>
                        ) : (
                            <div>
                            </div>
                        )}

                    </div>


                </div>
            </div>
        </section >
    )
}