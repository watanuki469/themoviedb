import { useContext, useState } from "react";
import { LanguageContext } from "../../pages/LanguageContext";
import { handleImageError } from "../../modules/BaseModule";

export interface PersonFullCreditProps {
    personCreditList: any
}

export default function PersonFullCredit({
    personCreditList,
}: PersonFullCreditProps) {
    const context = useContext(LanguageContext)
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;

    const [isOpen, setIsOpen] = useState(false);
    const [isAcstress, setIsAcstress] = useState(false);
    const [isDirector, setIsDirector] = useState(false);

    const toggleContent = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setIsAcstress(false)
            setIsDirector(false)
        }
        else {
            setIsAcstress(true)
            setIsDirector(true)
        }
    };
    const scrollToElement = (elementId: any) => {
        const element = document.getElementById('Expand');
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start", // Cuộn trang để phần tử hiển thị ở đầu trang
                inline: "nearest" // Cuộn trang để phần tử hiển thị ở phía trên cửa sổ trình duyệt
            });
        }
        switch (elementId) {
            case ('Actress'): {
                setIsAcstress(!isAcstress)
                break;
            }

            case ('Director'):
                setIsDirector(!isDirector)
                break
        }

    };

    return (
        <section className="relative w-full cursor-pointer">
            <div className="px-2  w-full">
                <div className="w-full" id="Expand">
                    <div className="py-2" onClick={toggleContent}>Expand Below</div>
                    <div className="font-bold text-xl py-2">Actress</div>
                    <div className="shadow-sm shadow-current  py-2 px-2 " >
                        <div className="flex flex-wrap items-center sticky top-0 w-full bg-white px-2 py-2">
                            <div className="font-bold capitalize">Previous :{personCreditList?.cast?.length}</div>
                            <div className="ml-auto">
                                {isAcstress ? (
                                    <i onClick={() => scrollToElement('Actress')} className="fa-solid fa-chevron-up"></i>
                                ) : (
                                    <i onClick={() => setIsAcstress(!isAcstress)} className="fa-solid fa-chevron-down"></i>
                                )}
                            </div>
                        </div>
                        {isAcstress && (
                            <div className="divide-y divide-gray-300">
                                {personCreditList?.cast?.slice().sort((a: any, b: any) => {
                                    const dateA = new Date(a?.release_date ? a.release_date : a?.first_air_date)?.getTime();
                                    const dateB = new Date(b?.release_date ? b?.release_date : b.first_air_date)?.getTime();
                                    return dateB - dateA;
                                })?.map((item: any, index: any) => (
                                    <div className="py-2 flex items-center" key={index}>
                                        <div className="flex gap-2 items-center">
                                            <a href={`/${item?.media_type}/${item?.id}}`}>
                                                <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images"
                                                    className="object-cover w-12 h-20 bg-gray-500 rounded-xl" onError={handleImageError} />
                                            </a>
                                            <div>
                                                <div>{item?.name ? item?.name : item?.title}</div>
                                                <div className="flex gap-2 items-center">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <div>{item?.vote_average?.toFixed(1)}</div>
                                                </div>
                                                <div>{item?.character}</div>
                                            </div>
                                        </div>
                                        <div className="ml-auto flex items-center gap-2 ">
                                            <div>{item?.release_date ? item?.release_date?.slice(0, 4) : item?.first_air_date?.slice(0, 4)}</div>
                                            <a href={`/${item?.media_type}/${item?.id}}`}>
                                                <i className="fa-solid fa-circle-info text-xl text-blue-500 hover:bg-blue-200 px-2 py-2 rounded-3xl"></i>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                    <div className="font-bold text-xl py-2">Director</div>
                    <div className="shadow-sm shadow-current  py-2 px-2 " >
                        <div className="flex flex-wrap items-center sticky top-0 w-full bg-white px-2 py-2">
                            <div className="font-bold capitalize">Previous :{personCreditList?.crew?.length}</div>
                            <div className="ml-auto">
                                {isDirector ? (
                                    <i onClick={() => scrollToElement('Director')} className="fa-solid fa-chevron-up"></i>
                                ) : (
                                    <i onClick={() => setIsDirector(!isDirector)} className="fa-solid fa-chevron-down"></i>
                                )}
                            </div>
                        </div>
                        {isDirector && (
                            <div className="divide-y divide-gray-300">
                                {personCreditList?.crew?.slice().sort((a: any, b: any) => {
                                    const dateA = new Date(a?.release_date ? a.release_date : a?.first_air_date)?.getTime();
                                    const dateB = new Date(b?.release_date ? b?.release_date : b.first_air_date)?.getTime();
                                    return dateB - dateA;
                                })?.map((item: any, index: any) => (
                                    <div className="py-2 flex items-center" key={index}>
                                        <div className="flex gap-2 items-center">
                                            <a href={`/${item?.media_type}/${item?.id}}`}>
                                                <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images"
                                                    className="object-cover w-12 h-20 bg-gray-500 rounded-xl" onError={handleImageError} />
                                            </a>
                                            <div>
                                                <div>{item?.name ? item?.name : item?.title}</div>
                                                <div className="flex gap-2 items-center">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <div>{item?.vote_average?.toFixed(1)}</div>
                                                </div>
                                                <div>{item?.job}</div>
                                            </div>
                                        </div>
                                        <div className="ml-auto flex items-center gap-2 ">
                                            <div>{item?.release_date ? item?.release_date?.slice(0, 4) : item?.first_air_date?.slice(0, 4)}</div>
                                            <a href={`/${item?.media_type}/${item?.id}}`}>
                                                <i className="fa-solid fa-circle-info text-xl text-blue-500 hover:bg-blue-200 px-2 py-2 rounded-3xl"></i>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section >
    );
}
