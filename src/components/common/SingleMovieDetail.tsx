import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToElement } from "../../modules/BaseModule";
import Detail from '../../modules/Detail';
import RatingModule from '../../modules/RatingModule';
import Share from '../../modules/Share';
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch } from '../../redux/hooks';
import { fetchGetFavorites } from '../../redux/reducers/login.reducer';

export interface TwoMovieRowProps {
    singleMovieList: any
    movieImageList: any
}

export default function SingleMovieDetail({
    singleMovieList,
    movieImageList,
}: TwoMovieRowProps) {
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;
    let navigate = useNavigate()
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);

    useEffect(() => {
        if (userInfoList?.length > 0) {
            dispatch(fetchGetFavorites(userInfoList[0]));
        }
    }, [userInfoList]);

    const usRelease = singleMovieList[0]?.release_dates?.results?.find((release: any) => release?.iso_3166_1 === "US");
    const certification = usRelease?.release_dates?.find((release: any) => release.type === 3)?.certification || usRelease?.release_dates?.find((release: any) => release?.type !== 3)?.certification;

    return (
        <section style={{ position: "relative", cursor: "pointer" }}>
            <div className="text-white font-sans font-medium " >
                <div
                    style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/w500${singleMovieList[0]?.backdrop_path}')`,
                        position: "absolute", width: "100%", height: '100%',
                        backgroundSize: "cover", backgroundPosition: "center",
                        backgroundColor: 'black', filter: 'blur(100px)', opacity: "0.5",
                    }}>

                </div>
                <div className='relative'>
                    <div className="flex flex-row justify-end gap-2 items-center ">
                        <div className=" py-2 hidden lg:block hover:underline capitalize" onClick={() => scrollToElement('movieCast')}>Top {translations[language]?.star}</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline capitalize" onClick={() => scrollToElement('movieReview')}>{translations[language]?.reviews}</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline capitalize" onClick={() => scrollToElement('movieTrivia')}>{translations[language]?.storyLine}</div>
                        <button className="py-2 px-3 border-l  border-r  border-gray-400 hidden lg:block hover:underline" onClick={() => navigate('/IMDbPro')}>IMDbPro</button>
                        <Share bgColor={'white'} />
                    </div>
                </div>
                <div className="flex justify-between relative">
                    <div className="items-center">
                        <div className="mr-4 text-2xl">{singleMovieList[0]?.title}</div>
                        <div className="flex space-x-4 text-stone-400">
                            <div>{singleMovieList[0]?.release_date?.split("-")[0]}</div>
                            <div>{certification ? certification : "NR"}</div>
                            <div>
                                {Math.floor(singleMovieList[0]?.runtime / 60)} h {singleMovieList[0]?.runtime % 60} min
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="flex items-center">
                            <div className="items-center justify-center aligns-center  text-center">
                                <div className="mr-4 text-stone-400" >IMDb {translations[language]?.rating}</div>
                                <div className="flex space-x-4 hover:opacity-80 hover:bg-gray-500">
                                    <div className="flex justify-center aligns-center items-center h-full gap-2">
                                        <i className="fa-solid fa-star h-full items-center text-2xl text-yellow-300"></i>
                                        <div className="">
                                            <div>
                                                <span className=" text-xl">
                                                    {typeof singleMovieList[0]?.vote_average === 'number' ?
                                                        (singleMovieList[0]?.vote_average % 1 === 0 ?
                                                            singleMovieList[0]?.vote_average.toFixed(0) :
                                                            singleMovieList[0]?.vote_average.toFixed(1)
                                                        )
                                                        : 'N/A'
                                                    }
                                                </span>
                                                <span className="text-stone-400">  /10</span>
                                            </div>
                                            <div className="text-stone-400">{singleMovieList[0]?.vote_count}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="items-center text-center justify-center  mr-4 aligns-center ">
                                <div className="text-stone-400">{translations[language]?.rating}</div>
                                <div className="flex items-center gap-2  px-2 py-2 hover:bg-gray-300 hover:text-black text-blue-500">
                                    <RatingModule mediaType={'movie'} ratingList={singleMovieList[0]} userInfoList={userInfoList} starIndex={0} rateHidden={'false'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Detail detailList={singleMovieList[0]} detailImageList={movieImageList} mediaType={'movie'}></Detail>
            </div >
        </section >
    )
}