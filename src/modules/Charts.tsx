import { useContext } from "react";
import { LanguageContext } from "../pages/LanguageContext";

export default function Charts() {
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;
    return (
        <div className="pt-2 capitalize">
            <div>
                <a href={`/topBoxOffice`}>
                    <div className="flex items-center gap-2 font-bold text-xl hover:text-yellow-300">
                        <p className="hover:text-black">{translations[language]?.topBoxOffice} (US)</p>
                        <i className="fa-solid fa-chevron-right "></i>
                    </div>
                </a>
                <p className="text-gray-500 text-lg">{translations[language]?.fromThePastWeekend}</p>
                <a href={`/top250Movie`} className="flex items-center gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">IMDb {translations[language]?.top250Movie}</p>
                    <i className="fa-solid fa-chevron-right "></i>
               </a>
                <p className="text-gray-500 text-lg">{translations[language]?.asRated}.</p>
                <a href={`/topPopularTv`} className="flex items-center gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">{translations[language]?.mostPopularTv}</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </a>
                <p className="text-gray-500 text-lg">{translations[language]?.asRated}</p>
                <a href={`/top250Tv`} className="flex items-center gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">{translations[language]?.top250Tv}</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </a>
                <p className="text-gray-500 text-lg">{translations[language]?.asRated}</p>
                <a href={`/popularCeleb`} className="flex items-center gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">{translations[language]?.popularCeleb}</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </a>
                <p className="text-gray-500 text-lg">{translations[language]?.asRated}</p>
            </div>
        </div >
    );
}
