import { useNavigate } from "react-router-dom";

export interface TwoMovieRowProps {
    tvDetailExList: any
}

export default function TvDetailExternal({
    tvDetailExList
}: TwoMovieRowProps) {
    let navigate = useNavigate()
    console.log(tvDetailExList);
    
    return (
        <section className="" style={{
            position: "relative",
        }}>
            <div className="text-black font-sans font-medium cursor-pointer" >
                <div style={{ position: "relative", zIndex: "1" }}>
                    <div className="text-black relative px-2 py-2">
                        <div className="text-black">
                            <div className="py-2 border-b border-t border-gray-300 flex gap-3">
                                <div>Official sites</div>
                                <div className='flex flex-wrap items-center gap-2 text-blue-500'>
                                    <div className='flex flex-wrap items-center gap-2 hover:underline'
                                        onClick={() => window.location.href = `https://www.facebook.com/${tvDetailExList[0]?.external_ids?.facebook_id}`}
                                    >
                                        <p>Facebook</p>
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </div>

                                    <p>•</p>
                                    <div className='flex flex-wrap items-center gap-2  hover:underline'
                                        onClick={() => window.location.href = `https://twitter.com/${tvDetailExList[0]?.external_ids?.twitter_id}`}
                                    >
                                        <p> Twitter</p>
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </div>
                                    <p>•</p>

                                    <div className='flex flex-wrap items-center gap-2  hover:underline'
                                        onClick={() => window.location.href = `https://www.instagram.com/${tvDetailExList[0]?.external_ids?.instagram_id}`}
                                    >
                                        <p>Instagram</p>
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </div>

                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="">Release date</div>
                                <div className="flex text-blue-500 gap-2">
                                    <p>{tvDetailExList[0]?.first_air_date &&
                                        new Date(tvDetailExList[0]?.first_air_date).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })
                                    }
                                    </p>
                                    {/* <p>•</p> */}
                                    <p>({tvDetailExList[0]?.production_countries[0]? tvDetailExList[0]?.production_countries[0]?.name:tvDetailExList[0]?.origin_country[0]})</p>
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="">Country of origin</div>
                                <div className="text-blue-500">
                                    <p>{tvDetailExList[0]?.production_countries[0]?.name?tvDetailExList[0]?.production_countries[0]?.name:tvDetailExList[0]?.origin_country[0]}</p>
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="">Language</div>
                                <div className="text-blue-500">
                                    <p>{tvDetailExList[0]?.spoken_languages[0]?.name}</p>
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="">As known as</div>
                                <div className="text-blue-500">
                                    <p>{tvDetailExList[0]?.alternative_titles?.results[0]?.title}</p>
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="">Production companies</div>
                                <div className="text-blue-500">
                                    <p>{tvDetailExList[0]?.production_companies[0]?.name}</p>
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="">IMDb<span className="text-blue-500">Pro</span></div>
                                <div className="flex gap-3 items-center">
                                    <p onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                        <span className="text-blue-600">See more at IMDbPro</span>
                                    </p>
                                    <i className="fa-solid fa-arrow-up-right-from-square"></i>

                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </section >
    )
}