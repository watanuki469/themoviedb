import { useContext, useEffect, useState } from "react";
import { scrollToElement } from '../../modules/BaseModule';
import Detail from '../../modules/Detail';
import RatingModule from '../../modules/RatingModule';
import Share from '../../modules/Share';
import { LanguageContext } from '../../pages/LanguageContext';

export interface TwoMovieRowProps {
    singleTvList: any
    singleTvImageList: any
}

export default function TvDetail({
    singleTvList,
    singleTvImageList
}: TwoMovieRowProps) {
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);   
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;

    return (
        <section className='relative' style={{position: "relative"}}>
            <div className="text-white font-sans font-medium max-w-full " >
                <div style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w500${singleTvList[0]?.backdrop_path}')`,
                    position: "absolute", width: "100%", height: "100%", opacity: "0.5",
                    backgroundSize: "cover", backgroundPosition: "center",filter: 'blur(100px)'
                }}>
                </div>
                <div className='relative'>
                    <div className="flex flex-row justify-end gap-2 items-center ">
                        <div className=" py-2 hidden lg:block hover:underline capitalize" onClick={() => scrollToElement('tvCast')}>Top {translations[language]?.star}</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline capitalize" onClick={() => scrollToElement('tvReview')}>{translations[language]?.reviews}</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline capitalize" onClick={() => scrollToElement('tvVideo')}>Videos</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline capitalize" onClick={() => scrollToElement('tvTrvia')}>{translations[language]?.storyLine}</div>
                        <button className="py-2 px-3 border-l  border-r  border-gray-400 hidden lg:block">IMDbPro</button>
                        <Share bgColor={'white'}></Share>
                    </div>
                </div>

                <div className="relative flex justify-between py-2">
                    <div className="items-center">
                        <div className="mr-4 text-2xl">{singleTvList[0]?.name}</div>
                        <div className="flex space-x-4 text-stone-400">
                            <div>{singleTvList[0]?.first_air_date?.split("-")[0]}</div>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="flex">
                            <div className="items-center justify-center">
                                <div className="mr-4 text-stone-400" >IMDb {translations[language]?.rating}</div>
                                <div className="flex space-x-4 ">
                                    <div className="flex justify-center aligns-center items-center h-full gap-2">
                                        <i className="fa-solid fa-star h-full items-center text-2xl text-yellow-300"></i>
                                        <div className="">
                                            <div>
                                                <span className=" text-xl">
                                                    {typeof singleTvList[0]?.vote_average === 'number' ?
                                                        (singleTvList[0]?.vote_average % 1 === 0 ?
                                                            singleTvList[0]?.vote_average.toFixed(0) :
                                                            singleTvList[0]?.vote_average.toFixed(1)
                                                        ) : 'N/A'
                                                    }
                                                </span>
                                                <span className="text-stone-400">  /10</span>
                                            </div>
                                            <div className="text-stone-400">{singleTvList[0]?.vote_count}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="items-center text-center justify-center m-auto mr-4 aligns-center">
                                <div className="text-stone-400">{translations[language]?.rating}</div>
                                <div className='hover:bg-gray-300 rounded-xl px-2 py-2'>
                                    <RatingModule mediaType={'tv'} ratingList={singleTvList[0]} userInfoList={userInfoList} rateHidden={'false'} starIndex={0} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Detail detailList={singleTvList[0]} detailImageList={singleTvImageList} mediaType={'tv'}></Detail>
            </div>
        </section >
    )
}