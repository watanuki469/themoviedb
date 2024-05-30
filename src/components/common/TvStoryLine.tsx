import { useNavigate } from "react-router-dom";

export interface TwoMovieRowProps {
    tvList: any
}

export default function TvStoryLine({
    tvList,
}: TwoMovieRowProps) {
    let navigate = useNavigate()

    const generateRandomText = (number: any) => {
        const words = [
            "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
            "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
            "magna", "aliqua", "Ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
            "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
            "commodo", "consequat", "Duis", "aute", "irure", "dolor", "in", "reprehenderit",
            "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
            "pariatur", "Excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
            "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
            "est", "laborum"
        ];

        let randomText = '';
        for (let i = 0; i < number; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            randomText += words[randomIndex] + ' ';
        }

        return randomText.trim(); // Remove trailing space
    }

    return (
        <section className="px-2 py-2 cursor-pointer">
            <div className="text-black font-sans " >
                <div style={{ position: "relative" }}>
                    <div className="bg-white">
                        <div className="">
                            <div className="">{tvList[0]?.overview}</div>
                        </div>
                        <div className="flex gap-2 mb-1 flex-wrap">
                            {tvList[0]?.keywords?.results?.slice(0, 4).map((item: any) => (
                                <button key={item.id} className="bg-none text-black py-2 px-4 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                    {item.name}
                                </button>
                            ))}
                            {tvList[0]?.keywords?.results?.length > 5 ? (
                                <button className="bg-none text-black py-2 px-4 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                    {tvList[0]?.keywords?.results?.length - 5} More

                                </button>
                            ) : (
                                <div></div>
                            )}

                        </div>


                        <div className="text-black">
                            <div className="py-2 border-b border-gray-300 flex gap-3 text-blue-500 ">
                                <div className="hover:underline">Plot Summary </div>
                                <div >•</div>
                                <div className="hover:underline">Add synopsis </div>

                            </div>

                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="font-bold">Genre</div>
                                <div className="flex gap-3">
                                    {tvList[0]?.genres.slice(0, 4).map((item: any, index: number) => (
                                        <p key={index} onClick={() => navigate(`/search?mediaType=tv&genres=${item?.name}`)} className=" flex gap-2">
                                            <span className="text-blue-600 hover:underline">{item?.name}</span>
                                            <span className="">{index < Math.min(tvList[0]?.genres?.length) - 1 ? '•' : ''}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="font-bold">Certificate</div>
                                <div className="flex gap-3">
                                    {tvList[0]?.content_ratings?.results?.slice(0, 1).map((item: any, index: number) => (
                                        <p key={index} className=" flex gap-2">
                                            <span className="hover:underline">{item?.rating}</span>
                                            {/* <span>{index < Math.min(tvList[0].content_ratings?.results?.length) - 1 ? '•' : ''}</span> */}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 gap-3 py-2 items-center">
                                <div className='flex'>
                                    <div className="font-bold">Parent Guide</div>
                                </div>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}