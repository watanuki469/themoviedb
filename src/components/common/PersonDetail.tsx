import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToElement } from '../../modules/BaseModule';
import Detail from '../../modules/Detail';
import Share from '../../modules/Share';
import { LanguageContext } from '../../pages/LanguageContext';

export interface TwoMovieRowProps {
    singleMovieList: any
}

export default function PersonDetail({
    singleMovieList
}: TwoMovieRowProps) {
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;
    let navigate = useNavigate()

    return (
        <section className="" style={{ position: "relative", backgroundSize: "cover", backgroundPosition: "center", overflow: 'hidden' }}>
            <div className="text-white font-sans font-medium cursor-pointer" >
                <div style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w500${singleMovieList[0]?.profile_path}')`,
                    position: "absolute", width: "100%", height: "100%", opacity: "0.5",
                    backgroundSize: "cover", backgroundPosition: "center",
                    backgroundColor: 'black', filter: 'blur(100px)',
                }}>
                </div>

                <div style={{ position: "relative", zIndex: "1" }}>
                    <div className="flex flex-row justify-end gap-2 items-center ">
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('personPhotos')}>{translations[language]?.photos}</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('personKnowFor')}>{translations[language]?.knowFor}</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('personVideos')}>Videos</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('personalDetails')}>{translations[language]?.moreExplore}</div>
                        <button className="py-2 px-3 border-l  border-r  border-gray-400 hidden lg:block hover:underline" onClick={() => navigate('/IMDbPro')}>IMDbPro</button>

                        <Share bgColor={'white'} />
                    </div>
                    <div className="justify-between">
                        <div className="items-center">
                            <div className="mr-4 text-2xl">{singleMovieList[0]?.name}</div>
                            <div className="flex space-x-4 text-stone-400">
                                {singleMovieList[0]?.known_for_department}
                            </div>
                        </div>
                    </div>
                    <Detail detailImageList={singleMovieList} detailList={singleMovieList[0]} mediaType={'person'}></Detail>
                </div>
            </div >
        </section >
    )
}