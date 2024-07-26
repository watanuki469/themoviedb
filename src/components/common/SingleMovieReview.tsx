import { useContext, useEffect, useState } from "react";
import Share from '../../modules/Share';
import { LanguageContext } from '../../pages/LanguageContext';

export interface TwoMovieRowProps {
    singleMovieList: any
}

export default function SingleMovieReview({
    singleMovieList,
}: TwoMovieRowProps) {
    const [randomNumber1, setRandomNumber1] = useState(0);
    const [randomNumber2, setRandomNumber2] = useState(0);

    useEffect(() => {
        // Tạo số ngẫu nhiên từ 0 đến 999 cho cả hai số
        const newRandomNumber1 = Math.floor(Math.random() * 1000);
        let newRandomNumber2;
        do {
            newRandomNumber2 = Math.floor(Math.random() * 1000);
        } while (newRandomNumber2 === newRandomNumber1); // Đảm bảo số thứ hai khác số đầu tiên

        // Đặt số ngẫu nhiên vào state
        setRandomNumber1(newRandomNumber1);
        setRandomNumber2(newRandomNumber2);
    }, []); // Không có dependencies, vì chúng ta chỉ muốn tạo số ngẫu nhiên một lần khi component được render
   
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;
    return (
        <section className=" text-black font-sans grid ">
            <div className="bg-white shadow-sm shadow-black w-full py-4 px-4  ">
                <div className="text-black w-full flex py-4 ">
                    <div className="bg-yellow-300 text-black py-2 px-2 capitalize">{translations[language]?.latest} {translations[language]?.reviews}</div>
                    <div className="flex items-center ml-auto gap-2" >
                        <i className="fa-solid fa-star text-yellow-300 text-sm ml-2"></i>
                        <div>
                            <span className="">
                                {typeof singleMovieList[0]?.reviews.results[0]?.author_details?.rating === 'number' ?
                                    (singleMovieList[0]?.reviews.results[0]?.author_details?.rating % 1 === 0 ?
                                        singleMovieList[0]?.reviews.results[0]?.author_details?.rating?.toFixed(0) :
                                        singleMovieList[0]?.reviews.results[0]?.author_details?.rating?.toFixed(1)
                                    )
                                    :
                                    'N/A'
                                }

                            </span>
                            <span className="text-stone-400">  /10</span>
                        </div>
                    </div>
                </div>
                <div>
                    {singleMovieList[0]?.reviews.results.slice(0, 1).map((item: any, index: any) => (
                        <div className='flex text-black' key={index}>
                            <div>
                                <div className='font-bold text-xl'>A review by {item?.author}</div>
                                <div>
                                    <p>
                                        {item?.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    {singleMovieList[0]?.reviews?.results?.length > 0 ? (
                        <div>
                            <div className=' flex py-2 px-1 mt-1 items-center'>
                                <div className='flex items-center gap-1 h-full'>
                                    <i className="fa-solid fa-thumbs-up text-xl"></i>
                                    <div>helpful</div>
                                    <div>•</div>
                                    <div>{randomNumber1}</div>
                                    <i className="fa-solid fa-thumbs-up fa-rotate-180 ml-2 text-xl"></i>
                                    <div>{randomNumber2}</div>
                                </div>
                                <div className='ml-auto'>
                                    <Share bgColor={'black'}/>
                                </div>
                            </div>
                            <div className='flex gap-2 px-2 py-2'>
                                <p className='text-blue-500'>{singleMovieList[0]?.reviews?.results[0]?.author}</p>
                                <p>•</p>
                                <p>{singleMovieList[0]?.reviews.results[0]?.created_at?.slice(0, 10)}</p>
                            </div>
                        </div>
                    )
                        : (<div>

                        </div>)}

                </div>
            </div>
        </section >
    )
}