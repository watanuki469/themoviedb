import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListMovieCredit } from '../../redux/reducers/movieCredit.reducer';
import { fetchTv, setListTv } from "../../redux/reducers/tv.reducer";
import { AppDispatch } from "../../redux/store";
import { fetchSingleMovies, setListSingleMovie } from "../../redux/reducers/singleMovie.reducer";
import TopBar from "../common/TopBar";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { handleImageError } from "../../modules/BaseModule";
import { LanguageContext } from "../../pages/LanguageContext";
import Share from "../../modules/Share";

export default function CastCrewLayout() {
    const { mediaType, id } = useParams();
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const tvList = useAppSelector((state) => state.tv.listTv)
    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        if (mediaType === 'tv') {
            dispatch(fetchTv(id));
        }
        else if (mediaType === 'person') {

        }
        else if (mediaType === 'movie') {
            dispatch(fetchSingleMovies(id))
        }
        dispatch(setGlobalLoading(false));
    }, [id]);

    let mediaList = [];

    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') {

    } else if (mediaType === 'movie') {
        mediaList = singleMovieList;
    } else if (mediaType === 'tv') {
        mediaList = tvList;
    }

    const context = useContext(LanguageContext)
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    return (
        <div className=" min-h-screen cursor-pointer bg-white text-black mx-auto aligns-center  ">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <TopBar />
                    <div className="w-full bg-black py-2 text-white ">
                        <div className="flex items-center  ">
                            <div className='flex gap-2 py-2 mb-2'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${mediaList[0]?.backdrop_path}`}
                                    onError={handleImageError}
                                    alt="movie-img"
                                    className='h-24 w-20 object-cover bg-gray-200 '
                                />
                                <div className='px-2'>
                                    <div className='flex items-center '
                                        onClick={() => navigate(`/${mediaType}/${mediaList[0]?.id} `)}>
                                        <p className='py-2 flex-grow hover:text-blue-500'>{mediaList[0]?.original_title ? mediaList[0]?.original_title : mediaList[0]?.original_name} ({mediaList[0]?.release_date ? mediaList[0]?.release_date?.slice(0, 4) : mediaList[0]?.first_air_date?.slice(0, 4)})</p>
                                        <i className="fa-solid fa-chevron-right ml-auto hover:text-yellow-300"></i>
                                    </div>
                                    <div className=' py-2'>
                                        <p>
                                            Full Cast & Crew: {
                                                (!isNaN(mediaList[0]?.credits?.cast?.length) ? mediaList[0]?.credits?.cast?.length : 0) +
                                                (!isNaN(mediaList[0]?.credits?.crew?.length) ? mediaList[0]?.credits?.crew?.length : 0) +
                                                (!isNaN(mediaList[0]?.aggregate_credits?.cast?.length) ? mediaList[0]?.aggregate_credits?.cast?.length : 0) +
                                                (!isNaN(mediaList[0]?.aggregate_credits?.crew?.length) ? mediaList[0]?.aggregate_credits?.crew?.length : 0)
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center ml-auto gap-2 text-gray-400" >
                                <div className="text-md justify-center  text-right">
                                    <p className='font-bold uppercase'> {translations[language]?.listActivity}</p>
                                    <div className='flex items-center gap-2 font-semibold capitalize'>
                                        <i className="fa-regular fa-eye text-xl text-white"></i>
                                        <div>
                                            <div> <span className='text-lg text-white'>87K</span> {translations[language]?.views}</div>
                                            <div>28K {translations[language]?.thisWeek}</div>
                                        </div>
                                    </div>
                                </div>
                                <Share bgColor={'white'} />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm" >
                            <a target='_blank' href='https://github.com/watanuki469?tab=repositories' className='text-blue-500 hover:underline'> Vasiliev-Editors   </a>
                            <div>•</div>
                            <div>{translations[language]?.createdModified} </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black">
                <div className="w-full lg:max-w-5xl mx-auto aligns-center bg-white font-semibold text-xl px-2  ">
                    <section className='relative overflow-hidden min-h-screen w-full '>
                        <div className="w-full flex flex-wrap">
                            <div className="items-center w-full grid md:grid-cols-2 text-black">
                                {mediaList[0]?.credits?.crew?.map((item: any, index: any) => (
                                    <div key={index} className="flex items-center w-full border-b-2 py-2">
                                        <img
                                            src={`${item?.profile_path ? (`https://image.tmdb.org/t/p/w200/${item?.profile_path}`) : (`https://via.placeholder.com/500x750`)}`}
                                            onClick={() => navigate(`/person/${item?.id}`)}
                                            className="h-44 w-32 flex-shrink-0 object-cover"
                                        />

                                        <div className="ml-4 flex-1">
                                            <p className="font-bold">{item?.name}</p>
                                            <p className="text-lg text-gray-500">Know For: {item?.known_for_department}</p>
                                            <p className="text-lg text-gray-500">Job: {item?.job}</p>
                                        </div>
                                        <i className="fa-solid fa-chevron-right ml-auto  text-black hover:text-yellow-300 text-sm px-2"></i>
                                    </div>
                                ))}
                            </div>
                            <div className="items-center w-full grid md:grid-cols-2 text-black">
                                {mediaList[0]?.credits?.cast?.map((item: any, index: any) => (
                                    <div key={index} className="flex items-center  border-b-2 py-2 w-full">
                                        <div className="flex gap-2 items-center w-full">
                                            <img
                                                src={`${item?.profile_path ? (`https://image.tmdb.org/t/p/w200/${item?.profile_path}`) : (`https://via.placeholder.com/500x750`)}`}
                                                onClick={() => navigate(`/person/${item?.id}`)}
                                                className="h-44 w-32 flex-shrink-0 object-cover"
                                            />

                                            <div className="">
                                                <p className="font-bold">{item?.name}</p>
                                                <div className="text-lg text-gray-500">Know For: {item?.known_for_department}</div>
                                                <div className="text-lg text-gray-500">Character: {item?.character}</div>
                                            </div>
                                        </div>
                                        <i className="fa-solid fa-chevron-right ml-auto  text-black hover:text-yellow-300 text-sm px-2"></i>
                                    </div>
                                ))}
                            </div>
                            <div className="items-center w-full grid md:grid-cols-2 text-black h-full">
                                {mediaList[0]?.aggregate_credits?.cast?.map((item: any, index: any) => (
                                    <div key={index} className="flex items-center border-b-2 py-2">
                                        <img
                                            src={`${item?.profile_path ? (`https://image.tmdb.org/t/p/w200/${item?.profile_path}`) : (`https://via.placeholder.com/500x750`)}`}
                                            onClick={() => navigate(`/person/${item?.id}`)}
                                            className="h-44 w-32 flex-shrink-0 object-cover"
                                        />
                                        <div className="ml-4 flex-1">
                                            <p className="font-bold">{item?.name}</p>
                                            <div className="text-lg text-gray-500">
                                                {item?.roles?.map((role: any, index: number) => (
                                                    <span key={index}>
                                                        {role?.character}
                                                        {index !== item.roles.length - 1 && ', '}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-lg text-gray-500">{item?.total_episode_count} episodes</p>
                                        </div>
                                        <i className="fa-solid fa-chevron-right ml-auto text-black hover:text-yellow-300 text-sm px-2"></i>
                                    </div>
                                ))}
                            </div>
                            <div className="items-center  w-full grid lg:grid-cols-2 text-black">
                                {mediaList[0]?.aggregate_credits?.crew?.map((item: any, index: any) => (
                                    <div key={index} className="flex items-center  border-b-2 py-2">

                                        <img
                                            src={`${item?.profile_path ? (`https://image.tmdb.org/t/p/w200/${item?.profile_path}`) : (`https://via.placeholder.com/500x750`)}`}
                                            onClick={() => navigate(`/person/${item?.id}`)}
                                            className="h-44 w-32 flex-shrink-0"
                                        />

                                        <div className="ml-4 flex-1">
                                            <p className="font-bold">{item?.name}</p>
                                            <p className="text-lg text-gray-500">{item?.character}</p>
                                            <p className="text-lg text-gray-500">{item?.total_episode_count} episodes</p>
                                        </div>
                                        <i className="fa-solid fa-chevron-right ml-auto  text-black hover:text-yellow-300 text-sm px-2"></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div >
    )
}