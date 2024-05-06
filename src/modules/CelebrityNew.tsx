import { useEffect, useState } from "react";
import axiosTvNew from "../redux/axios/axiosTVNew";
import { useNavigate } from "react-router-dom";

export default function CelebrityNew() {

    const [celebNew, setCelebNews] = useState<any[]>([]);
    useEffect(() => {
        axiosTvNew.get('', {
            params: {
                category: 'CELEBRITY',
                first: '20'
            }
        })
            .then((response) => {
                setCelebNews(response?.data?.news?.edges || []);
            })
            .catch((error) => {
                console.error('Error fetching Tv news:', error);
            });
    }, []);
    let navigate = useNavigate()


    return (
        <div className="relative">
            <div className="w-full">
                <div className="flex items-center flex-wrap gap-2 font-bold text-xl w-fit hover:text-yellow-300">
                    <p className="hover:text-black">Celebrity New</p>
                    <i className="fa-solid fa-chevron-right "></i>
                </div>
                <div onClick={() => navigate('/news/celeb')}>
                    {celebNew?.slice(0, 5).map((item, index) => (
                        <div key={index} className="py-2">
                            <div className="flex items-center border-2 border-gray-200 py-1 px-1">
                                <div className="w-9/12">
                                    <div className="line-clamp-2 hover:underline">
                                        {item?.node?.articleTitle?.plainText}
                                    </div>

                                    <div className="flex items-center flex-wrap gap-2">
                                        {item?.node?.date && (
                                            <>
                                                <div className="text-gray-400 line-clamp-2">
                                                    {item?.node?.date?.slice(0, 10)} • by {item?.node?.byline}
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                                <div className="w-3/12">
                                    <div className="w-full">
                                        <img
                                            className="h-28 w-full object-cover hover:opacity-90"
                                            src={`${item?.node?.image.url}`}
                                            alt="Article Thumbnail"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>



    );
}
