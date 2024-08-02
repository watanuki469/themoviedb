import { useContext } from "react";
import { LanguageContext } from "../../pages/LanguageContext";

export interface TwoMovieRowProps {
    tvList: any
}

export default function TvStoryLine({
    tvList,
}: TwoMovieRowProps) {
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    return (
        <section className="px-2 py-2 cursor-pointer">
            <div className="text-black font-sans " >
                <div className="relative bg-white">
                    <div className="">{tvList[0]?.overview}</div>
                    <div className="flex gap-2 flex-wrap">
                        {tvList[0]?.keywords?.results?.map((item: any) => (
                            <a href={`/keyword/movie/${item?.id}/${item?.name}`} key={item?.id}
                                className="bg-none text-black py-2 px-2 hover:bg-gray-200 rounded-2xl border-gray-200 border-2 text-sm">
                                {item?.name}
                            </a>
                        ))}
                    </div>

                    <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                        <div className="font-bold">{translations[language]?.genre}</div>
                        <div className="flex gap-2">
                            {tvList[0]?.genres?.slice(0, 3)?.map((item: any, index: number) => (
                                <a key={index} href={`/search?mediaType=tv&genres=${item?.name}`}>
                                    <p className="">
                                        <span className="text-blue-600 hover:underline">{item?.name} {index < Math.min(tvList[0]?.genres?.length) - 1 ? '•' : ''}</span>
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                        <div className="font-bold">{translations[language]?.certificate}</div>
                        <div className="flex gap-2">
                            {tvList[0]?.content_ratings?.results?.slice(0, 1).map((item: any, index: number) => (
                                <p key={index} className=" flex gap-2">
                                    <span className="hover:underline">{item?.rating}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}