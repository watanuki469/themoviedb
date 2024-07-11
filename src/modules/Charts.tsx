import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../pages/LanguageContext";

export default function Charts() {
    let navigate = useNavigate()
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;
    return (
        <div className="pt-2 capitalize">
            <div>
                <div
                    onClick={() => navigate('/topBoxOffice')}
                    className="flex items-center gap-2 font-bold text-xl hover:text-yellow-300">
                    <p className="hover:text-black">{translations[language]?.topBoxOffice} (US)</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">{translations[language]?.fromThePastWeekend}</p>

                <div
                    onClick={() => navigate('/top250Movie')}
                    className="flex items-center gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">IMDb {translations[language]?.top250Movie}</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">{translations[language]?.asRated}.</p>

                <div
                    onClick={() => navigate('/topPopularTv')}
                    className="flex items-center gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">{translations[language]?.mostPopularTv}</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">{translations[language]?.asRated}</p>

                <div
                    onClick={() => navigate('/top250Tv')}
                    className="flex items-center gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">{translations[language]?.top250Tv}</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">{translations[language]?.asRated}</p>
               
                <div
                    onClick={() => navigate('/popularCeleb')}
                    className="flex items-center gap-2 font-bold text-xl hover:text-yellow-300 mt-2">
                    <p className="hover:text-black">{translations[language]?.popularCeleb}</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <p className="text-gray-500 text-lg">{translations[language]?.asRated}</p>
            </div>
        </div >
    );
}
