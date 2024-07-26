import parse, { Element, domToReact } from 'html-react-parser';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiFilm from "../../redux/client/api.Film";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSingleFilm } from "../../redux/reducers/film.reducer";
import { AppDispatch } from "../../redux/store";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";

export default function FilmLayout() {
    const { id } = useParams()
    const { mediaType } = useParams()
    const { name } = useParams()
    let navigate = useNavigate()
    const [numberIndex, setNumberIndex] = useState(0);

    const dispatch = useAppDispatch();
    const singleMovieList = useAppSelector((state) => state.film.singleFilm) || { episodes: [] };

    const fetchSingleMovies = (name: any) => async (dispatch: AppDispatch) => {
        // Reset trạng thái để ngăn dữ liệu cũ hiển thị
        dispatch(setSingleFilm(null));

        try {
            const data = await apiFilm.fetchSingleFilm.singleFilm(name);
            if (data) {
                dispatch(setSingleFilm(data));
            } else {
                dispatch(setSingleFilm(''));
                console.error("API response structure is not as expected.", data);
            }
        } catch (e) {
            console.error(e);
        }
    }


    useEffect(() => {
        dispatch(fetchSingleMovies(name));
    }, [id, name, dispatch]);

    // Trích xuất nội dung từ API
    const content = singleMovieList?.movie?.content;

    // Hàm lọc chỉ các thẻ <p>
    const filterParagraphs = (htmlContent: string) => {
        return parse(htmlContent, {
            replace: (domNode) => {
                // Kiểm tra nếu domNode là một phần tử (Element)
                if (domNode instanceof Element && domNode.tagName === 'p') {
                    return <p>{domToReact(domNode.children as unknown as Element[])}</p>;
                }
            },
        });
    };

    // Chuyển đổi và lọc nội dung HTML thành phần tử React
    const filteredContent = content ? filterParagraphs(content) : null;

    return (
        <div className=" min-h-screen bg-black">
            <div className="">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                    {singleMovieList?.episodes?.length > 0 ? (
                        <section className="min-h-screen cursor-pointer relative text-white font-sans font-medium " >
                            <div className="grid grid-cols-12 gap-y-4 h-full gap-2">
                                <div className="col-span-12 lg:ml-2 bg-black relative">
                                    <div className='min-h-60 w-full h-full bg-black bg-cover border-2 border-gray-700'                            >
                                        <iframe
                                            allowFullScreen
                                            src={`${singleMovieList?.episodes?.[0]?.server_data[numberIndex]?.link_embed}`}
                                            width="100%"
                                            height={"100%"}
                                            style={{ border: '2px', borderColor: 'white', minHeight: '350px' }}
                                        >
                                        </iframe>
                                    </div>

                                </div>
                                <div className="col-span-12 h-full ml-2 overflow-hidden cursor-pointer">
                                    <div>Đang xem: Tập {numberIndex + 1}
                                        {singleMovieList?.episodes?.[0]?.server_data[numberIndex]?.filename ? `:` + singleMovieList?.episodes?.[0]?.server_data[numberIndex]?.filename : ''}
                                       : {singleMovieList?.movie?.time}
                                    </div>
                                    <div className=" h-1/2 flex px-2 py-2 gap-2 max-h-40">
                                        <a href={`/${mediaType}/${id}`}>
                                            <img src={`${singleMovieList?.movie?.thumb_url ? singleMovieList?.movie?.thumb_url : singleMovieList?.movie?.poster_url}`} alt="product images"
                                                className="max-w-32 h-full" />
                                        </a>
                                        <div className='' >
                                            <a href={`/${mediaType}/${id}`}>
                                                <div className='justify-between flex items-center hover:text-yellow-300' >
                                                    <p className='text-lg'>{singleMovieList?.movie?.name}</p>
                                                    <i className="fa-solid fa-chevron-right"></i>
                                                </div>
                                            </a>
                                            <div className='flex gap-2 flex-wrap text-gray-500  text-sm'>
                                                {singleMovieList?.movie?.category?.map((item: any, index: any) => (
                                                    <div key={index} className="flex gap-2 flex-wrap ">
                                                        <a href={`/search?mediaType=${mediaType}&genres=${item?.name}`}>
                                                            <p className="hover:text-yellow-300 hover:underline ">{item?.name}</p>
                                                        </a>
                                                        <p className=''>{index < Math.min(singleMovieList?.movie?.category?.length) - 1 ? '•' : ''}</p>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2 py-2">
                                        <div className="">
                                            {filteredContent}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center py-3 mt-3 px-2">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-white ">Danh sách tập phim</h2>
                            </div>

                            <div className="flex flex-wrap gap-2 max-h-56 overflow-auto px-2">
                                {singleMovieList?.episodes?.[0]?.server_data?.map((item: any, index: any) => (
                                    <div key={index} className="relative">
                                        <div className={`w-full  ${numberIndex === index ? 'bg-black text-white ' : 'bg-gray-300 text-black'} border-2 border-white hover:opacity-90 px-2 py-2`}
                                            onClick={() => { setNumberIndex(index) }}>
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section >
                    )
                        : (
                            <div className="text-white">
                                <img src="https://m.media-amazon.com/images/G/01/IMDbPro/images/Test/AnthemV2/upsellDesktop_v1.jpg"></img>
                                <div className="bg-white text-black">
                                    <div className="grid grid-cols-3 gap-4 px-2 py-2 min-h-40 text-center justify-center items-center lg:text-2xl text-lg">
                                        <div>Find contact info for agents and management</div>
                                        <div>View connections to industry professionals</div>
                                        <div>See who's working on titles in development</div>
                                    </div>
                                    <div className="py-4" onClick={() => navigate(`/IMDbPro`)}>
                                        <div className="px-2 py-2 bg-yellow-300 hover:opacity-80 text-black justify-center text-center items-center w-fit ml-auto mr-auto rounded-md">Become Pro Member</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    <Footer />
                </div>
            </div>
        </div>
    )
}