import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../pages/LanguageContext";

export interface TwoMovieRowProps {
    personDetailExList: any
}

export default function PersonDetailExternal({
    personDetailExList
}: TwoMovieRowProps) {
    let navigate = useNavigate()

    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    return (
        <section className="min-h-20" style={{ position: "relative", }}>
            <div className="text-black font-sans font-medium " >                
                <div style={{ position: "relative", zIndex: "1" }}>
                    <div className="text-black relative px-2 py-2">
                        <div className="text-black">
                            <div className="py-2 border-b border-t border-gray-300 flex gap-3">
                                <div className="flex flex-wrap gap-2">
                                    <p className="font-bold">{translations[language]?.officialSites}</p>
                                    <div className='flex flex-wrap items-center gap-2 text-blue-500'>
                                        <a target="_blank" href={`https://www.facebook.com/${personDetailExList[0]?.external_ids?.facebook_id}`}>
                                            <div className='flex flex-wrap items-center gap-2'>
                                                <p className="hover:underline">Facebook</p>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </div>
                                        </a>
                                        <p>•</p>
                                        <a target="_blank" href={`https://twitter.com/${personDetailExList[0]?.external_ids?.twitter_id}`}>
                                            <div className='flex flex-wrap items-center gap-2'>
                                                <p className="hover:underline"> Twitter</p>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </div>
                                        </a>
                                        <p>•</p>
                                        <a target="_blank" href={`https://www.instagram.com/${personDetailExList[0]?.external_ids?.instagram_id}`}>
                                            <div className='flex flex-wrap items-center gap-2'>
                                                <p className="hover:underline">Instagram</p>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-gray-300">
                                <div className="font-bold">{translations[language]?.alternativeName} </div>
                                <div className="">{personDetailExList[0]?.also_known_as?.map((item: any, index: any) => {
                                    return (
                                        <div key={index}>{item}</div>
                                    )
                                })}
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                <div className="font-bold">{translations[language]?.height}  </div>
                                <div> 5′ 5″ (1.65 m)</div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="flex flex-wrap gap-2">
                                    <p className="font-bold">{translations[language]?.born}</p>
                                    <div className="flex flex-wrap text-blue-500 gap-2">
                                        <div>
                                            {personDetailExList[0]?.birthday &&
                                                <div className="flex flex-wrap gap-2">
                                                    <div>
                                                        {new Date(personDetailExList[0]?.birthday).toLocaleDateString('en-US', {
                                                            month: 'long', day: 'numeric', year: 'numeric'
                                                        })
                                                        }
                                                    </div>
                                                    <div>•</div>
                                                </div>}
                                        </div>
                                        <p>{personDetailExList[0]?.place_of_birth}</p>
                                    </div>
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="flex flex-wrap gap-2">
                                    <p className="font-bold">   IMDb<span className="text-blue-500">Pro</span></p>
                                    <div className="flex gap-3 items-center">
                                        <p onClick={() => navigate(`/IMDbPro`)} className="hover:underline flex gap-2">
                                            <span className="text-blue-600">{translations[language]?.seePro}</span>
                                        </p>
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}