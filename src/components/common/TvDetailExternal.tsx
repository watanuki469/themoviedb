import { useNavigate } from "react-router-dom";

export interface TwoMovieRowProps {
    tvDetailExList: any
}

export default function TvDetailExternal({
    tvDetailExList
}: TwoMovieRowProps) {
    let navigate = useNavigate()
    return (
        <section className="" style={{
            position: "relative",
        }}>
            <div className="text-black font-sans font-medium cursor-pointer" >
                <div style={{ position: "relative", zIndex: "1" }}>
                    <div className="text-black relative px-2 py-2">
                        <div className="text-black">
                            <div className="py-2 border-b border-t border-gray-300 flex items-center w-full">
                                <p className="flex flex-wrap gap-2"> Official sites
                                    <span className='flex text-blue-500 items-center gap-2 hover:underline'
                                        onClick={() => window.location.href = `https://www.facebook.com/${tvDetailExList[0]?.external_ids?.facebook_id}`}
                                    >
                                        Facebook
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </span>

                                    •
                                    <span className='flex text-blue-500  items-center gap-2  hover:underline'
                                        onClick={() => window.location.href = `https://twitter.com/${tvDetailExList[0]?.external_ids?.twitter_id}`}
                                    >
                                        Twitter
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </span>
                                    •

                                    <span className='flex text-blue-500  items-center gap-2  hover:underline'
                                        onClick={() => window.location.href = `https://www.instagram.com/${tvDetailExList[0]?.external_ids?.instagram_id}`}
                                    >
                                        Instagram
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </span>
                                </p>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <p className="flex flex-wrap items-center gap-2">Release date
                                    <span className="text-blue-500">
                                        {tvDetailExList[0]?.first_air_date &&
                                            new Date(tvDetailExList[0]?.first_air_date).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })
                                        }
                                    </span>
                                    <span className="text-blue-500">
                                        {tvDetailExList[0]?.production_countries[0] ? `(${tvDetailExList[0]?.production_countries[0]?.name})` : `(${tvDetailExList[0]?.origin_country[0]})`}
                                    </span>
                                </p>

                            </div>
                            <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                <div className="">Country of origin</div>
                                <div className="text-blue-500">
                                    <p>{tvDetailExList[0]?.production_countries[0]?.name ? tvDetailExList[0]?.production_countries[0]?.name : tvDetailExList[0]?.origin_country[0]}</p>
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                <div className="">Language</div>
                                <div className="text-blue-500">{tvDetailExList[0]?.spoken_languages[0]?.name}</div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                <div className="">As known as</div>
                                <div className="text-blue-500">
                                    <p>{tvDetailExList[0]?.alternative_titles?.results[0]?.title}</p>
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                <p className="flex flex-wrap gap-2">
                                    Production companies
                                    <span className="text-blue-500">  {tvDetailExList[0]?.production_companies[0]?.name} </span>
                                </p>

                            </div>
                            <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
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