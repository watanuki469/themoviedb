import { useNavigate } from "react-router-dom";
import { fetchAllMovieNew } from "../../redux/client/api.MovieNew";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";

export default function MovieNewLayout() {
    const [movieNews, setMovieNews] = useState<any[]>([]);

    useEffect(() => {
        fetchAllMovieNew()
            .then((res) => {
                console.log(res.data.news.edges);
                setMovieNews(res.data.news.edges);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="min-h-screen cursor-pointer bg-white text-black">
            <div className="text-xl">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center font-semibold">
                    <section className='relative overflow-hidden min-h-screen'>
                        <div>
                            {movieNews?.map((article, index) => (
                                <div key={index}>
                                    <h3>Article {index + 1}</h3>
                                    <p>Title: {article?.node?.articleTitle?.plainText}</p>
                                    {/* <p>Byline: {article.node.byline}</p>
                                        <p>Date: {article.node.date}</p>
                                        <p>External URL: {article.node.externalUrl}</p>
                                        <p>Image URL: {article.node.image.url}</p>
                                        <p>Text: {article.node.text.plainText}</p> */}
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}