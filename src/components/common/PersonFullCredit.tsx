import { useContext, useMemo, useState } from "react";
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

    const groupedAcstress = useMemo(() => {
        const crewMap: { [key: number]: any } = {};
        personCreditList?.cast?.forEach((item: any) => {
            if (crewMap[item?.id]) {
                crewMap[item?.id]?.character?.push(item?.character);
            } else {
                crewMap[item?.id] = {
                    id: item?.id,
                    poster_path: item?.poster_path,
                    name: item?.name ? item?.name : item?.title,
                    vote_average:item?.vote_average,
                    character: [item?.character],
                    media_type:item?.media_type,
                    release_date:item?.release_date?item?.release_date:item?.first_air_date
                };
            }
        });
        return Object.values(crewMap);
    }, [personCreditList]);

    const groupedDirector = useMemo(() => {
        const crewMap: { [key: number]: any } = {};
        personCreditList?.crew?.forEach((item: any) => {
            if (crewMap[item?.id]) {
                crewMap[item?.id]?.job?.push(item?.job);
            } else {
                crewMap[item?.id] = {
                    id: item?.id,
                    poster_path: item?.poster_path,
                    name: item?.name ? item?.name : item?.title,
                    vote_average:item?.vote_average,
                    job: [item?.job],
                    media_type:item?.media_type,
                    release_date:item?.release_date?item?.release_date:item?.first_air_date
                };
            }
        });
        return Object.values(crewMap);
    }, [personCreditList]);

    return (
        <section className="relative w-full cursor-pointer capitalize">
            <div className="px-2  w-full">
                <div className="w-full" id="Expand">
                    <div className="py-2" onClick={toggleContent}>{translations[language]?.expandAll} </div>
                    <div className="font-bold text-xl py-2">{translations[language]?.star}</div>
                    <div onClick={()=>isAcstress?scrollToElement('Actress'):setIsAcstress(!isAcstress)} className="shadow-sm shadow-current  py-2 px-2 " >
                        <div className="flex flex-wrap items-center sticky top-0 w-full bg-white px-2 py-2">
                            <div className="font-bold capitalize">{translations[language]?.details}: {groupedAcstress?.length}</div>
                            <div className="ml-auto">
                                {isAcstress ? (
                                    <i className="fa-solid fa-chevron-up"></i>
                                ) : (
                                    <i  className="fa-solid fa-chevron-down"></i>
                                )}
                            </div>
                        </div>
                        {isAcstress && (
                            <div className="divide-y divide-gray-300">
                                {groupedAcstress?.slice().sort((a: any, b: any) => {
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
                                                <div>{item?.character?.join(',')}</div>
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
                    <div className="font-bold text-xl py-2">{translations[language]?.director}</div>
                    <div className="shadow-sm shadow-current  py-2 px-2 " >
                        <div onClick={()=>isDirector?scrollToElement('Director'):setIsDirector(!isDirector)} className="flex flex-wrap items-center sticky top-0 w-full bg-white px-2 py-2">
                            <div className="font-bold capitalize">{translations[language]?.details}: {groupedDirector?.length}</div>
                            <div className="ml-auto">
                                {isDirector ? (
                                    <i className="fa-solid fa-chevron-up"></i>
                                ) : (
                                    <i className="fa-solid fa-chevron-down"></i>
                                )}
                            </div>
                        </div>
                        {isDirector && (
                            <div className="divide-y divide-gray-300">
                                {groupedDirector?.slice().sort((a: any, b: any) => {
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
                                                <div>{item?.job?.join(',')}</div>
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
