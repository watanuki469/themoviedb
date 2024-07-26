import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Share from '../../modules/Share';
import ViewTableNoType from "../../modules/ViewTableNoType";
import { LanguageContext } from '../../pages/LanguageContext';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAward } from "../../redux/reducers/award.reducer";
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { toast } from "react-toastify";
import { monthNames } from "../../modules/BaseModule";

export default function AwardLayout() {
    const { type } = useParams()
    const dispatch = useAppDispatch();
    const koreanList = useAppSelector((state) => state.award.koreanList)
    const blackFilmList = useAppSelector((state) => state.award.blackFilmList)
    const starmeter = useAppSelector((state) => state.award.emnysComedyList)
    const oscarList = useAppSelector((state) => state.award.oscarList)
    const spotlight = useAppSelector((state) => state.award.animeList)
    const golden = useAppSelector((state) => state.award.goldenList)

    const context = useContext(LanguageContext);
    const [page, setPage] = useState(1);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    useEffect(() => {
        dispatch(fetchAward(page));
    }, [dispatch, page]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });
        const loadMoreElement = document.querySelector('#load-more');
        if (loadMoreElement) {
            observer.observe(loadMoreElement);
        }
        return () => {
            if (loadMoreElement) {
                observer.unobserve(loadMoreElement);
            }
        };
    }, []);

    const [presentList, setPresentList] = useState<any[]>([])
    useEffect(() => {
        switch (type) {
            case 'ABFF':
                setPresentList(koreanList);
                break;
            case 'blackFilm':
                setPresentList(blackFilmList);
                break;
            case 'starmeter':
                setPresentList(starmeter);
                break;
            case 'oscars':
                setPresentList(oscarList);
                break;
            case 'spotlight':
                setPresentList(spotlight);
                break;
            default:
                setPresentList([]);
                break;
        }
    }, [type, koreanList, blackFilmList,page,starmeter,spotlight,oscarList])   

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonth];    

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center">
                    <TopBar />
                    <div className="w-full bg-black py-2 text-white ">
                        <div className="flex items-center  ">
                            <h2 className="lg:text-2xl text-lg font-bold  capitalize">What New On {type} in  {currentMonthName}</h2>
                            <div className="flex items-center ml-auto gap-2 text-gray-400" >
                                <div className="text-md justify-center  text-right">
                                    <p className='font-bold uppercase'> {translations[language]?.listActivity}</p>
                                    <div className='flex items-center gap-2 font-semibold capitalize'>
                                        <i className="fa-regular fa-eye text-xl text-white"></i>
                                        <div>
                                            <div> <span className='text-lg text-white'>87K</span> {translations[language]?.views}</div>
                                            <div>28K {translations[language]?.thisWeek}</div>
                                        </div>
                                    </div>
                                </div>
                                <Share bgColor={'white'} />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm" >
                            <a target='_blank' href='https://github.com/watanuki469?tab=repositories' className='text-blue-500 hover:underline'> Vasiliev-Editors   </a>
                            <div>•</div>
                            <div>{translations[language]?.createdModified} </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center bg-white px-2">
                    <ViewTableNoType viewList={presentList} moreToExploreList={golden} ></ViewTableNoType>
                    <div id="load-more" style={{ height: '20px' }}></div>
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <Footer />
                </div>
            </div>

        </div >
    )
}