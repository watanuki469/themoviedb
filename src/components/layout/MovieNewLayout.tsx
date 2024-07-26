import { IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CelebrityNew from "../../modules/CelebrityNew";
import TopNew from "../../modules/TopNew";
import TvNew from "../../modules/TvNew";
import { fetchAllMovieNew } from "../../redux/client/api.MovieNew";
import TopBar from "../common/TopBar";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { useAppDispatch } from "../../redux/hooks";
import Share from "../../modules/Share";

export default function MovieNewLayout() {
    const [movieNews, setMovieNews] = useState<any[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        fetchAllMovieNew()
            .then((res) => {
                setMovieNews(res?.data?.news?.edges);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, []);

    function splitTextIntoParagraphs(text: any) {
        let paragraphs = [];
        if (text) {
            const sentences = text.split('.');
            paragraphs = sentences.map((item: any, index: any) => (
                <div key={index} className="py-2">
                    {index === sentences?.length - 1 ? item?.trim() + '...' : item?.trim() + '.'}
                </div>
            ));
        }
        return paragraphs;
    }
    return (
        <div className="min-h-screen cursor-pointer bg-white text-black">
            <div className="bg-black pb-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                </div>
            </div>
            <div>
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center py-2 px-2">
                    <section className='relative overflow-hidden min-h-screen'>
                        <div className="md:grid grid-cols-12 gap-3  w-full">
                            <div className="lg:col-span-8 col-span-12 w-full ">
                                <div className="">
                                    <div className="flex items-center ">
                                        <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                        <h2 className="text-2xl font-bold text-black py-4">Movies News</h2>
                                    </div>
                                </div>
                                <div className="border-2 border-gray-500 px-4 py-4">
                                    {movieNews?.map((article, index) => (
                                        <div key={index}>
                                            <div className="gap-2">
                                                <a className="font-bold hover:underline py-2" href={`${article?.node?.externalUrl}`}>
                                                    {article?.node?.articleTitle?.plainText}
                                                    <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>

                                                </a>
                                                <img className="py-2" src={`${article?.node?.image.url}`}
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'https://via.placeholder.com/500x750';
                                                        e.currentTarget.onerror = null; 
                                                    }}>

                                                </img>
                                                <div className="py-2">
                                                    {splitTextIntoParagraphs(article?.node?.text?.plainText)}
                                                </div>
                                                <a className="py-2 text-blue-500 hover:underline" href={`${article?.node?.source?.homepage?.url}`}>
                                                    See full article at {article?.node?.source?.homepage?.label}
                                                    <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                                                </a>
                                                <div className="flex items-center">
                                                    <div className="flex gap-2">
                                                        {article?.node?.date && (
                                                            <>
                                                                <div className="text-gray-500">{article?.node?.date?.slice(0, 10)}</div>
                                                                <div>•</div>
                                                            </>
                                                        )}
                                                        {article?.node?.byline && (
                                                            <>
                                                                <div className="text-gray-500">{article?.node?.byline}</div>
                                                                <div>•</div>
                                                            </>
                                                        )}
                                                        {article?.node?.source?.homepage?.label && (
                                                            <div className="text-blue-500 hover:underline">{article?.node?.source?.homepage?.label}
                                                                <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-auto">
                                                        <Share bgColor={'black'}></Share>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:col-span-4 col-span-5  h-full px-2 py-2">
                                <div className="">
                                    <div className="flex items-center ">
                                        <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                        <h2 className="text-2xl font-bold text-black py-4">More to explore</h2>
                                    </div>

                                    <TopNew />
                                    <TvNew />
                                    <div className="sticky top-0 right-0 left-0">
                                        <CelebrityNew />
                                    </div>

                                </div>

                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    )
}