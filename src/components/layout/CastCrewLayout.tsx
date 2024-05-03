import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListMovieCredit } from '../../redux/reducers/movieCredit.reducer';
import { setListTv } from "../../redux/reducers/tv.reducer";
import { AppDispatch } from "../../redux/store";
import { setListSingleMovie } from "../../redux/reducers/singleMovie.reducer";

export default function CastCrewLayout() {
    const { mediaType, id } = useParams();
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const tvList = useAppSelector((state) => state.tv.listTv)
    const singleMovieList = useAppSelector((state) => state.singleMovies.listSingleMovie)


    const fetchTv = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiTv.tv(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListTv(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const fetchSingleMovies = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiSingleMovieRequests.singleMovie(id),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListSingleMovie(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        if (mediaType === 'tv') {
            dispatch(fetchTv());
        }
        else if (mediaType === 'person') {

        }
        else if (mediaType === 'movie') {
            dispatch(fetchSingleMovies())
        }
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, [id]);

    let mediaList = [];

    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') {

    } else if (mediaType === 'movie') {
        mediaList = singleMovieList;
    } else if (mediaType === 'tv') {
        mediaList = tvList;
    }
    console.log(mediaList);
    console.log(singleMovieList);

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };
    // đang thực hiện trang cast & crew cho movie và tv

    return (
        <div className=" min-h-screen cursor-pointer bg-white text-black  ">
            <div className="text-xl">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center font-semibold  ">
                    <section className='relative overflow-hidden min-h-screen'>
                        <div className="w-full ">
                            <div>
                                <div>
                                    <div className='items-center flex w-full border-2 border-gray bg-gray-200'>
                                        <div className='flex gap-2 py-2 mb-2 w-full'>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${mediaList[0]?.backdrop_path}`}
                                                onError={handleImageError}
                                                alt="movie-img"
                                                className='h-24 w-20 object-cover bg-gray-200 '
                                            />
                                            <div className='w-full px-2'>
                                                <div className='flex items-center '
                                                    onClick={() => navigate(`/${mediaType}/${mediaList[0]?.id} `)}>
                                                    <p className='py-2 flex-grow hover:text-blue-500'>{mediaList[0]?.original_title ? mediaList[0]?.original_title : mediaList[0]?.original_name} ({mediaList[0]?.release_date ? mediaList[0]?.release_date?.slice(0, 4) : mediaList[0]?.first_air_date?.slice(0, 4)})</p>
                                                    <i className="fa-solid fa-chevron-right ml-auto hover:text-yellow-300"></i>
                                                </div>
                                                <div className='border-t-2 border-gray py-2'>
                                                    <p>Full Cast & Crew: {mediaList[0]?.credits?.cast?.length + mediaList[0]?.credits?.crew?.length}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full border-t-2 border-gray-500">
                                        <div className="items-center flex-wrap w-full grid lg:grid-cols-2 text-black">
                                            {mediaList[0]?.credits?.crew?.map((item: any, index: any) => (
                                                <div className="flex items-center  border-b-2 py-2">
                                                    <div key={index} className="flex items-center">
                                                        <div className="h-32 w-24 bg-cover mr-4 hover:opacity-80"
                                                            style={{
                                                                backgroundImage: `url(${item.profile_path ? `https://image.tmdb.org/t/p/w200/${item?.profile_path}` : 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'})`
                                                            }}
                                                            onClick={() => navigate(`/person/${item?.id}`)}>
                                                        </div>

                                                        <div className="">
                                                            <p className="font-bold">{item?.name}</p>
                                                            <p className="text-lg text-gray-500">{item?.job}</p>
                                                        </div>
                                                    </div>
                                                    <i className="fa-solid fa-chevron-right ml-auto  text-black hover:text-yellow-300 text-sm px-2"></i>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="items-center flex-wrap w-full grid lg:grid-cols-2 text-black">
                                            {mediaList[0]?.credits?.cast?.map((item: any, index: any) => (
                                                <div className="flex items-center  border-b-2 py-2">
                                                    <div key={index} className="flex items-center">
                                                        <div className="h-32 w-24 bg-cover mr-4 hover:opacity-80"
                                                            style={{
                                                                backgroundImage: `url(${item.profile_path ? `https://image.tmdb.org/t/p/w200/${item?.profile_path}` : 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'})`
                                                            }}
                                                            onClick={() => navigate(`/person/${item?.id}`)}>
                                                        </div>

                                                        <div className="">
                                                            <p className="font-bold">{item?.name}</p>
                                                            <p className="text-lg text-gray-500">{item?.character}</p>
                                                        </div>
                                                    </div>
                                                    <i className="fa-solid fa-chevron-right ml-auto  text-black hover:text-yellow-300 text-sm px-2"></i>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </div >
        </div >
    )
}