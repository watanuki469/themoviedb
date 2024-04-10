import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface TwoMovieRowProps {
    personDetailExList: any
}

export default function PersonDetailExternal({
    personDetailExList
}: TwoMovieRowProps) {
    let navigate = useNavigate()
    return (
        <section className="" style={{
            position: "relative",
        }}>
            <div className="text-black font-sans font-medium " >
                <div style={{ position: "relative", zIndex: "1" }}>
                    <div className="text-black relative px-2 py-2">
                        {/* <div className="flex gap-2 mb-1 border-b border-t border-gray-500 py-2">
                            {personDetailExList[0]?.biography && personDetailExList[0]?.biography.length > 400 ?
                                personDetailExList[0]?.biography?.slice(0, 400) + "..." :
                                personDetailExList[0]?.biography}
                        </div> */}
                        <div className="text-black">
                            <div className="py-2 border-b border-t border-gray-300 flex gap-3">
                                <div>Official sites</div>
                                <div className='flex flex-wrap items-center gap-2 text-blue-500'>
                                    <div className='flex flex-wrap items-center gap-2'
                                        onClick={() => window.location.href = `https://www.facebook.com/${personDetailExList[0]?.external_ids?.facebook_id}`}
                                    >
                                        <p>Facebook</p>
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </div>

                                    <p>•</p>
                                    <div className='flex flex-wrap items-center gap-2'
                                        onClick={() => window.location.href = `https://twitter.com/${personDetailExList[0]?.external_ids?.twitter_id}`}
                                    >
                                        <p> Twitter</p>
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </div>
                                    <p>•</p>

                                    <div className='flex flex-wrap items-center gap-2'
                                        onClick={() => window.location.href = `https://www.instagram.com/${personDetailExList[0]?.external_ids?.instagram_id}`}
                                    >
                                        <p>Instagram</p>
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </div>
                                    {/* {personDetailExList.slice(0, 3).map((item: any, index: number) => (
                                        <p key={index} onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                            <span className="text-blue-600">{item?.name}</span>
                                            <span>{index < Math.min(personDetailExList.length) - 1 ? '•' : ''}</span>
                                        </p>
                                    ))} */}

                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                <div className="">Height</div>
                                <div className="flex gap-3 justify-center text-center aligns-center">
                                    5′ 5″ (1.65 m)
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="">Born</div>
                                <div className="flex text-blue-500 gap-2">
                                    <p>{personDetailExList[0]?.birthday &&
                                        new Date(personDetailExList[0]?.birthday).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })
                                    }
                                    </p>
                                    <p>•</p>
                                    <p>{personDetailExList[0]?.place_of_birth}</p>
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