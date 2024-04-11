import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface TwoMovieRowProps {
    singleMovieList: any
}

export default function VideoDetail({
    singleMovieList
}: TwoMovieRowProps) {
    let navigate = useNavigate()
    const { id } = useParams()

    const [numberIndex, setNumberIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [numberIndex]);


    const usRelease = singleMovieList[numberIndex]?.release_dates?.results.find((release: any) => release?.iso_3166_1 === "US");
    const certification =
        usRelease?.release_dates?.find((release: any) => release.type === 3)?.certification || usRelease?.release_dates?.find((release: any) => release?.type !== 3)?.certification;


    return (
        <section className="min-h-screen cursor-pointer" style={{ position: "relative" }}>
            <div className="text-white font-sans font-medium " >
                <div className="md:grid md:grid-cols-12 gap-y-4 h-full gap-2">
                    <div className="lg:col-span-8 md:col-span-12 lg:ml-2 bg-black relative">
                        <div className='min-h-60 w-full h-full bg-black bg-cover'                            >
                            <iframe
                                src={"https://www.youtube.com/embed/" +
                                    (singleMovieList[0]?.videos?.results[numberIndex]?.key || "") +
                                    "?controls=" + numberIndex + "&&autoplay=1"}
                                width="100%"
                                height={"100%"}
                                title={singleMovieList[0]?.name}
                                style={{ border: 0, minHeight: '350px' }}
                            >
                            </iframe>

                        </div>

                    </div>
                    <div className="hidden lg:block col-span-4 h-full ml-2 overflow-hidden">
                        <div className=" h-1/2 flex px-2 py-2 gap-2 max-h-40">
                            <img src={`https://image.tmdb.org/t/p/w500/${singleMovieList[0]?.poster_path}`} alt="product images"
                                className="max-w-32 h-full" />
                            <div className=''>
                                <div className='justify-between flex items-center'>
                                    <p className='text-lg'>{singleMovieList[0]?.original_title} ({singleMovieList[0]?.release_date?.slice(numberIndex, 4)} )</p>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </div>
                                <div className='flex gap-2 flex-wrap text-gray-500  text-sm'>
                                    {certification} |
                                    {singleMovieList[0]?.genres?.map((item: any, index: any) => (
                                        <div key={index} className=" gap-2 flex" >
                                            <p> {item.name}</p>

                                            <p className=''>{index < Math.min(singleMovieList[0]?.genres?.length) - 1 ? '•' : ''}</p>

                                        </div>

                                    ))}

                                </div>
                            </div>
                        </div>
                        <div className="h-1/2 px-2 py-2 gap-2">
                            <div className='items-center gap-2'>
                                {/* <p className='text-xl'>No. {numberIndex} </p> */}
                                <p>{singleMovieList[0]?.videos?.results[numberIndex]?.name}</p>

                            </div>
                            <div className="line-clamp-5">
                                <p>{singleMovieList[0]?.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-black relative  lg:hidden'>
                    <div className='grid grid-cols-1 gap-1' >
                        <div className='col-span-1'>
                            <div className='h-full aligns-center item-center justify-center px-2 py-2 bg-black flex'>
                                <div className='flex w-full gap-2'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${singleMovieList[0]?.poster_path}`} alt="product images"
                                        className="max-w-32 h-full max-h-32" />
                                    <div className=' px-2 py-2 w-full items-center'>
                                        <div className='justify-between flex items-center'>
                                            <p className='text-lg'>{singleMovieList[0]?.original_title} ({singleMovieList[0]?.release_date?.slice(numberIndex, 4)} )</p>
                                            <i className="fa-solid fa-chevron-right mr-4"></i>
                                        </div>
                                        <div className='flex gap-2 flex-wrap text-gray-500  text-sm'>
                                            {certification} |
                                            {singleMovieList[0]?.genres?.map((item: any, index: any) => (
                                                <div key={index} className=" gap-2 flex" >
                                                    <p> {item.name}</p>

                                                    <p className=''>{index < Math.min(singleMovieList[0]?.genres?.length) - 1 ? '•' : ''}</p>

                                                </div>

                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 px-2 py-2'>
                            <div className='flex h-full aligns-center item-center justify-center px-2 py-2  text-left'>
                                <div>
                                    <div className='items-center gap-2'>
                                        <p>{singleMovieList[0]?.videos?.results[numberIndex]?.name}</p>

                                    </div>
                                    <div className="line-clamp-5">
                                        <p>{singleMovieList[0]?.overview}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center py-3 mt-3">
                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white ">Related Video</h2>
                </div>

                <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper text-white mt-3"
                >
                    {singleMovieList[0]?.videos?.results.map((item: any, index: any) => {
                        return (
                            <div key={index}>
                                <SwiperSlide key={index}>
                                    <div className="w-full h-42" onClick={() => { setNumberIndex(index) }}  >
                                        <div className=''  >
                                            <iframe
                                                src={`https://www.youtube.com/embed/${item?.key}?controls=0&&autoplay=0`}
                                                width="100%"
                                                height={"100%"}
                                                title={item?.name}
                                                className="h-full w-full"
                                            ></iframe>
                                        </div>

                                        <p className="text-red w-full text-white font-bold">Watch {item?.name}</p>
                                        <p className="text-red w-full text-gray-500 ">{singleMovieList[0]?.original_title}</p>
                                    </div>
                                </SwiperSlide>
                            </div>
                        )
                    })}
                </Swiper>



            </div>
        </section >
    )
}