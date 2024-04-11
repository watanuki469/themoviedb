import { useNavigate } from "react-router-dom";

export interface TwoMovieRowProps {
    singleMovieList: any
}

export default function SingleMovieStoryLine({
    singleMovieList,
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

    const usRelease = singleMovieList[0]?.release_dates?.results.find((release: any) => release?.iso_3166_1 === "US");
    const certification =
        usRelease?.release_dates?.find((release: any) => release.type === 3)?.certification || usRelease?.release_dates?.find((release: any) => release?.type !== 3)?.certification;

    const mpaaRate = () => {
        let mpaaRating;
        switch (certification) {
            case "G":
                mpaaRating = "General Audiences";
                break;
            case "PG":
                mpaaRating = "Parental Guidance Suggested";
                break;
            case "PG-13":
                mpaaRating = "For creature violence and action";
                break;
            case "R":
                mpaaRating = "Restricted";
                break;
            case "NC-17":
                mpaaRating = "Adults Only";
                break;
            default:
                mpaaRating = "All Allowed";
                break;
        }

        return <div>{mpaaRating}</div>
    }
    return (
        <section className="px-2 py-2">
            <div className="text-black font-sans " >
                <div style={{ position: "relative", zIndex: "1" }}>
                    <div className="bg-white">
                        <div className="mb-1">
                            <div className="">{generateRandomText(50)}</div>
                            <div></div>
                        </div>
                        <div className="flex gap-2 mb-1 flex-wrap">
                            {singleMovieList[0]?.keywords.keywords.slice(0, 5).map((item: any) => (
                                <button key={item.id} className="bg-none text-black py-2 px-4 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                    {item.name}
                                </button>
                            ))}
                            <button className="bg-none text-black py-2 px-4 hover:bg-gray-400 mt-2 rounded-2xl border-gray-200 border-2 text-sm">
                                {singleMovieList[0]?.keywords.keywords.length - 5} More

                            </button>
                        </div>


                        <div className="text-black">
                            <div className="py-2 border-b border-gray-300 flex gap-3 text-blue-500">
                                <div>Plot Summary </div>
                                <div>•</div>
                                <div>Plot synopsis </div>

                            </div>
                            <div className=" border-b border-gray-300 flex gap-2 py-2 items-center aligns-center">
                                <div className="font-bold">Tag line</div>
                                <div className="flex gap-3 justify-center text-center aligns-center">
                                    <p className="hover:underline flex gap-2">
                                        <span className="text-blue-600">{singleMovieList[0]?.tagline}</span>
                                    </p>
                                </div>
                            </div>
                            <div className=" border-b border-gray-300 flex gap-3 py-2 items-center aligns-center">
                                <div className="font-bold">Genres</div>
                                <div className="flex gap-3">
                                    {singleMovieList[0]?.genres.slice(0, 4).map((item: any, index: number) => (
                                        <p key={index} onClick={() => navigate(`/actor/${item?.id}`)} className="hover:underline flex gap-2">
                                            <span className="text-blue-600">{item?.name}</span>
                                            <span>{index < Math.min(3) - 1 ? '•' : ''}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between border-b border-gray-300 gap-3 py-2 items-center">
                                <div className='flex'>
                                    <div className="font-bold">Motion Picture Rating (MPA)</div>
                                    <div className='ml-2 flex gap-2' >{certification ? certification : "NR"}{mpaaRate()}</div>
                                </div>
                                <i className="fa-solid fa-chevron-right"></i>
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