import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Share from "../../modules/Share";
import { LanguageContext } from "../../pages/LanguageContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchSingleMovies } from "../../redux/reducers/singleMovie.reducer";
import { fetchTv } from "../../redux/reducers/tv.reducer";
import TopBar from "../common/TopBar";

export default function UserReviewLayout() {
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
            navigate('/')
            toast.error('Not exist type person')
        }
        else if (mediaType === 'movie') {
            dispatch(fetchSingleMovies(id))
        }
        dispatch(setGlobalLoading(false));
    }, [id]);

    let mediaList = [];

    // Xác định danh sách dựa trên mediaType
    if (mediaType === 'person') {
        navigate('/')
        toast.error('Not exist type person')
    } else if (mediaType === 'movie') {
        mediaList = singleMovieList;
    } else if (mediaType === 'tv') {
        mediaList = tvList;
    }

    const [randomNumbers, setRandomNumbers] = useState<any[]>([]);
    const generateRandomNumbers = () => {
        const randomNumber1 = Math.floor(Math.random() * 1000);
        const randomNumber2 = Math.floor(Math.random() * 200); // Generates a number between 0 and 1
        return { randomNumber1, randomNumber2 };
    };
    useEffect(() => {
        if (mediaList[0]?.reviews?.results) {
            const generatedNumbers = mediaList[0].reviews?.results?.map(() => generateRandomNumbers());
            setRandomNumbers(generatedNumbers);
        }
    }, [mediaList]);

    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    return (
        <div className=" min-h-screen cursor-pointer bg-white text-black  ">
            <div className="text-xl">
                <div className="h-20 bg-black px-4">
                    <TopBar />
                </div>

                <div className="w-full mx-auto aligns-center  ">
                    <section className='relative overflow-hidden min-h-screen'>
                        <div className="w-full ">
                            <div>
                                <div className="relative flex items-center justify-left min-h-screen bg-cover bg-center lg:p-16 p-5"
                                    style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500${mediaList[0]?.backdrop_path}')`, backgroundSize: "cover", backgroundPosition: "center", }}>
                                    <div className="absolute inset-0 bg-black opacity-50 blur-sm"></div>
                                    <div className="relative text-left text-white lg:max-w-4xl px-4 py-4 bg-opacity-50 rounded-lg">
                                        <h1 className="text-4xl font-bold">{mediaList[0]?.name ? mediaList[0]?.name : mediaList[0]?.title}</h1>
                                        <div className="text-xl mt-2 flex gap-2 flex-wrap">{mediaList[0]?.genres?.map((item: any, index: any) => (
                                            <a key={index * 2} href={`/search?mediaType=${mediaType}&genres=${item?.name}`}
                                                className="bg-blue-500 hover:opacity-80 px-2 py-2 bg-opacity-80 rounded-xl">
                                                {item?.name}
                                            </a>
                                        ))}</div>
                                        <p className="mt-4 line-clamp-4">{mediaList[0]?.overview}</p>
                                        <a href={`/${mediaType}/${mediaList[0]?.id}`}>
                                            <button className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl">{translations[language]?.views}</button>
                                        </a>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 px-2 py-4">
                                    <div className="lg:col-span-4 col-span-12">
                                        <div className="text-center justify-center w-fit mx-auto bg-blue-500 text-white rounded-xl flex items-center">
                                            <div className="px-2 py-2 flex items-center gap-2 justify-center"
                                                onClick={() => navigate(`/IMDbPro`)}>
                                                <div><i className="fa-solid fa-pencil"></i></div>
                                                <div>{translations[language]?.reviews}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-8 col-span-12">
                                        {mediaList[0]?.reviews?.results?.map((item: any, index: any) => (
                                            <div className="py-2">
                                                <div className="w-full bg-white shadow-sm rounded-xl shadow-black py-4 px-4" key={index}>
                                                    <div className="items-center w-full flex flex-wrap text-black px-2 py-2 gap-4">
                                                        <div className="text-blue-500">{item?.author}</div>
                                                        <div className="text-gray-500">{item?.created_at?.slice(0, 10)}</div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 items-end">
                                                        <i className="fa-solid fa-star text-yellow-300 text-3xl"> </i>
                                                        <div className="text-2xl"> {item?.author_details?.rating}</div>
                                                        <div> /10</div>
                                                    </div>
                                                    <div>
                                                        {item?.content}
                                                    </div>
                                                    <div className=' flex py-2 px-1 mt-1'>
                                                        <div className='flex items-center gap-1 h-full'>
                                                            <i className="fa-solid fa-thumbs-up text-xl"></i>
                                                            <div>helpful</div>
                                                            <div>•</div>
                                                            <div>{randomNumbers[index]?.randomNumber1}</div>
                                                            <i className="fa-solid fa-thumbs-up fa-rotate-180 ml-2 text-xl"></i>
                                                            <div>{randomNumbers[index]?.randomNumber2}</div>
                                                        </div>
                                                        <div className='ml-auto'>
                                                            <Share bgColor={'black'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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