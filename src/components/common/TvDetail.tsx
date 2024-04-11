import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface TwoMovieRowProps {
    singleTvList: any
    singleTvImageList: any
}

export default function TvDetail({
    singleTvList,
    singleTvImageList
}: TwoMovieRowProps) {
    let navigate = useNavigate()
    console.log(singleTvImageList);

    const totalImages = singleTvImageList[0]?.backdrops?.length + singleTvImageList[0]?.logos?.length + singleTvImageList[0]?.posters?.length;

    return (
        <section className="" style={{
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <div className="text-white font-sans font-medium " >
                <div style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w500${singleTvList[0]?.backdrop_path}')`,
                    position: "absolute", width: "100%", height: "100%", opacity: "0.5",
                    backgroundSize: "cover", backgroundPosition: "center",
                    backgroundColor: 'black'
                }}>

                </div>

                <div style={{ position: "relative", zIndex: "1" }}>
                    <div className="flex flex-row justify-end gap-2 items-center ">
                        <div className=" py-2 hidden lg:block">Cast & Crew</div>
                        <div className=" py-2 hidden lg:block">•</div>
                        <div className=" py-2 hidden lg:block">User Reviews</div>
                        <div className=" py-2 hidden lg:block">•</div>
                        <div className=" py-2 hidden lg:block">Trivia</div>
                        <div className=" py-2 hidden lg:block">•</div>
                        <div className=" py-2 hidden lg:block">FAQ</div>
                        <button className="py-2 px-3 border-l  border-r  border-gray-400 hidden lg:block">IMDbPro</button>
                        <button className="py-2 px-3 border-r border-gray-400 flex items-center gap-2">
                            <i className="fa-solid fa-icons"></i>
                            <p>All Topic</p>
                        </button>
                        <i className="fa-solid fa-share-nodes py-2 px-3"></i>
                    </div>
                    <div className="justify-between">
                        <div className="items-center">
                            <div className="mr-4 text-2xl">{singleTvList[0]?.name}</div>
                            <div className="flex space-x-4 text-stone-400">
                                {singleTvList[0]?.known_for_department}
                            </div>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-12 gap-y-4 h-full">
                        <div className="hidden lg:block col-span-3 bg-gray-200  h-full">
                            <img src={`https://image.tmdb.org/t/p/w500${singleTvList[0]?.poster_path}`} alt="product images" />
                        </div>
                        <div className="lg:col-span-7 md:col-span-12 lg:ml-2 bg-black relative">
                            <iframe
                                key={singleTvList[0]?.name}
                                src={`https://www.youtube.com/embed/${singleTvList[0]?.videos?.results[0]?.key}?controls=0&&autoplay=1`}
                                width="100%"
                                height={"100%"}
                                title={singleTvList[0]?.name}
                                style={{ border: 0, minHeight: '350px' }}
                            >

                            </iframe>

                        </div>

                        <div className="hidden lg:block col-span-2 h-full ml-2 overflow-hidden">
                            <div className="bg-red-200 flex flex-col justify-center items-center h-1/2 mb-1 ">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <VideoLibraryIcon />
                                    </div>
                                    <div className="text-center">
                                        {singleTvList[0]?.videos?.results?.length > 99 ? "99+" : singleTvList[0]?.videos?.results?.length} Videos
                                    </div>
                                </div>
                            </div>
                            <div className="bg-red-200 flex flex-col justify-center items-center h-1/2 mt-1">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <PhotoLibraryIcon />
                                    </div>
                                    <div className="text-center">
                                        {totalImages > 99 ? "99+" : totalImages} Photos
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bg-black relative px-2 py-2">
                        <div className=" grid-cols-12 hidden md:grid gap-6 h-full">
                            <div className=" col-span-8  bg-black  ">
                                <div className="flex gap-2 mb-1">
                                    {singleTvList[0]?.genres?.map((item: any) => (
                                        <button key={item.id} className="bg-none text-white py-2 px-4 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-white">
                                    <div className="py-2 border-b border-gray-300">{singleTvList[0]?.overview}</div>

                                    <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                        <div className="">Writers</div>
                                        <div className="flex gap-3 justify-center text-center aligns-center">
                                            {singleTvList[0]?.created_by?.slice(0, 3).map((item: any, index: number) => (
                                                <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                                    <span className="text-blue-600">{item?.name}</span>
                                                    <span>{index < Math.min(singleTvList[0]?.created_by?.length) - 1 ? '•' : ''}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                        <div className="">Star</div>
                                        <div className="flex gap-3">
                                            {singleTvList[0]?.aggregate_credits?.cast?.slice(0, 3).map((item: any, index: number) => (
                                                <p key={index} onClick={() => navigate(`/person/${item?.id}`)} className="hover:underline flex gap-2">
                                                    <span className="text-blue-600">{item?.name}</span>
                                                    <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                        <div className="">IMDb<span className="text-blue-500">Pro</span></div>
                                        <div className="flex gap-3 items-center">
                                            <p onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                                <span className="text-blue-600">See production info at IMDbPro</span>
                                            </p>
                                            <i className="fa-solid fa-arrow-up-right-from-square"></i>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-span-4">
                                <div className="w-full h-full items-center justify-center text-center">
                                    <div className="flex flex-col justify-center items-center h-full ">
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            {singleTvList[0]?.networks[0]?.logo_path !== null ? (
                                                <div className="w-full">
                                                    <button className="py-2 px-3 items-center gap-2 text-sm ">
                                                        <p className='text-yellow-300 text-left'>Streaming</p>
                                                        <img
                                                            src={`https://media.themoviedb.org/t/p/h60${singleTvList[0]?.networks[0]?.logo_path}`}
                                                            alt="product images"
                                                            className='bg-gray-500'
                                                        />

                                                    </button>
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}

                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 whitespace-nowrap">

                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 ">

                                                </button>
                                            </div>
                                        </div>
                                        <button className="flex items-center w-full  border-2 border-black bg-yellow-300 ">
                                            <div className="py-2 px-3 border-gray-400 flex items-center gap-2 grow  text-center h-full">
                                                <i className="fa-solid fa-icons text-black"></i>
                                                <div className="text-left">
                                                    <p className="text-black font-bold">Add to Watchlist 1</p>
                                                    <p>Added by {singleTvList[0]?.vote_count} user</p>
                                                </div>
                                            </div>
                                            <div className="py-3 px-3  flex items-center border-gray-500 border-l-2 justify-center h-full ">
                                                <i className="fa-solid fa-chevron-down"></i>
                                            </div>
                                        </button>
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 text-sm">
                                                    <p>{singleTvList[0]?.reviews?.results?.length}</p>
                                                    <p>User Review</p>
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 whitespace-nowrap">
                                                    <p>0</p>
                                                    <p>Critic Review</p>
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="py-2 px-3 flex items-center gap-2 ">
                                                    <p className="bg-yellow-300 h-6 w-6 items-center justify-center">
                                                        {isNaN(Math.floor(singleTvList[0]?.vote_average * 10 + 2)) ? 'N/A' : Math.floor(singleTvList[0]?.vote_average * 10 + 2)}

                                                    </p>
                                                    <p>Metascore</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-black relative  lg:hidden'>
                        <div className='grid grid-cols-2 gap-1' >
                            <div className='col-span-1'>
                                <div className='h-full aligns-center item-center justify-center px-2 py-2 bg-gray-500 text-center flex'>
                                    <div>   <VideoLibraryIcon />   </div>
                                    {singleTvList[0]?.videos?.results?.length > 99 ? "99+" : singleTvList[0]?.videos?.results?.length} Videos
                                </div>
                            </div>
                            <div className='col-span-1'>
                                <div className='flex h-full aligns-center item-center justify-center px-2 py-2 bg-gray-500 text-center'>
                                    <div>   <PhotoLibraryIcon /></div>
                                    {totalImages > 99 ? "99+" : totalImages} Photos
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-1 mt-2' >
                            <div>
                                <img src={`https://media.themoviedb.org/t/p/h60${singleTvList[0]?.networks[0]?.logo_path}`} alt="product images" className='bg-gray-500' />
                            </div>
                            <div className='col-span-2 px-2 '>
                                <div>
                                    <p className="py-2 ">
                                        {singleTvList[0]?.biography && singleTvList[0]?.biography.length > 120 ?
                                            singleTvList[0]?.biography.slice(0, 120) + "..." :
                                            singleTvList[0]?.biography}
                                    </p>
                                </div>
                                <div className='gap-2'>
                                    <p>{singleTvList[0]?.birthday &&
                                        new Date(singleTvList[0]?.birthday).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })
                                    }
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='px-3 py-2 border-b border-gray-300 '>
                            <button className="flex items-center w-full  border-2 border-black bg-yellow-300 ">
                                <div className="py-2 px-3 border-gray-400 flex items-center gap-2 grow  text-center h-full">
                                    <i className="fa-solid fa-icons text-black"></i>
                                    <div className="text-left">
                                        <p className="text-black font-bold">Add to list</p>
                                    </div>
                                </div>
                                <div className="py-3 px-3  flex items-center border-gray-500 border-l-2 justify-center h-full ">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </button>

                        </div>
                        <div className=" border-b border-gray-300 gap-3 py-2 items-center aligns-center px-2">
                            <div className="flex gap-3 items-center text-blue-500">
                                <i className="fa-solid fa-phone"></i>
                                <p onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                    <span className="text-blue-500">View contact info at IMDbPro</span>
                                </p>
                                <i className="fa-solid fa-arrow-up-right-from-square text-blue-500"></i>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </section >
    )
}