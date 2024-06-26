import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LanguageContext } from "../../pages/LanguageContext";

export interface TwoMovieRowProps {
    singleMovieList: any
}

export default function SingleMovieStoryLine({
    singleMovieList,
}: TwoMovieRowProps) {
    let navigate = useNavigate()

    const languageString = localStorage.getItem('language');
    const usRelease = singleMovieList[0]?.release_dates?.results.find((release: any) => release?.iso_3166_1 === `${languageString?.slice(3)}`);
    const certification =
        usRelease?.release_dates?.find((release: any) => release.type === 3)?.certification || usRelease?.release_dates?.find((release: any) => release?.type !== 3)?.certification;

    const mpaaRate = () => {
        let mpaaRating;
        switch (certification) {
            case "G":
                mpaaRating = "General Audiences";
                break;
            case "PG":
                mpaaRating = "Parental Guidance Suggested";
                break;
            case "PG-13":
                mpaaRating = "For creature violence and action";
                break;
            case "R":
                mpaaRating = "Restricted";
                break;
            case "NC-17":
                mpaaRating = "Adults Only";
                break;
            default:
                mpaaRating = "All Allowed";
                break;
        }

        return mpaaRating
    }
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;
    return (
        <section className="px-2 ">
            <div className="text-black font-sans " >
                <div style={{ position: "relative", zIndex: "1" }}>
                    <div className="bg-white">
                        <div className="mb-1">
                            <div>{singleMovieList[0]?.overview}</div>
                        </div>
                        <div className="flex gap-2 mb-1 flex-wrap">
                            {singleMovieList[0]?.keywords?.keywords?.map((item: any) => (
                                <button key={item?.id}
                                    onClick={() => navigate(`/keyword/movies/${item?.id}/${item?.name}`)}
                                    className="bg-none text-black py-2 px-4 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                    {item?.name}
                                </button>
                            ))}
                        </div>

                        <div className="text-black">

                            <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                <div className="font-bold">Tag:
                                    <span className="font-normal ml-2">{singleMovieList[0]?.tagline}</span>
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex flex-wrap gap-3 py-2 items-center aligns-center">
                                <div className="font-bold">{translations[language]?.genre}</div>
                                <div className="flex gap-3 flex-wrap">
                                    {singleMovieList[0]?.genres.slice(0, 4).map((item: any, index: number) => (
                                        <p key={index}
                                            onClick={() => navigate(`/search?mediaType=movie&genres=${item?.name}`)}
                                            className=" flex gap-2">
                                            <span className="text-blue-600 hover:underline">{item?.name}</span>
                                            <span>{index < Math.min(singleMovieList[0]?.genres.slice(0, 4)?.length) - 1 ? '•' : ''}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="border-b border-gray-300 gap-3 py-2 items-center">
                                <div className="font-bold">MPA (Motion Picture Rating) <span className="font-normal ml-2">{certification ? certification : "NR"}: {mpaaRate()}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}