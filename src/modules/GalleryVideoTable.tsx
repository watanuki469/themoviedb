import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Dialog, DialogContent, DialogTitle, Menu, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from '../pages/LanguageContext';

export interface ViewsProps {
    galleryList: any,
}

export default function GalleryVideoTable({
    galleryList,
}: ViewsProps) {
    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };
    const [selectedGenres, setSelectedGenres] = useState<any[]>([]);
    const characterCount = galleryList?.reduce((acc: any, movie: any) => {
        if (movie?.character) {
            acc[movie?.character] = (acc[movie?.character] || 0) + 1;
        }
        return acc;
    }, {});

    const handleGenreClick = (selectedGenre: any) => {
        if (selectedGenres?.includes(selectedGenre)) {
            // If already selected, remove it
            setSelectedGenres(selectedGenres?.filter((genre) => genre !== selectedGenre));
        } else {
            // If not selected, add it
            setSelectedGenres([...selectedGenres, selectedGenre]);
        }
    };

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x281'; // Set the fallback image source with the same aspect ratio
    };
    const [openGenDialog, setOpenGenDialog] = useState(false);
    const handleDiaGenlogOpen = () => {
        setOpenGenDialog(true);
    };

    const handleDiaGenlogClose = () => {
        setOpenGenDialog(false);
    };

    const [filterType, setFilterType] = useState('none');

    const [selectedOption, setSelectedOption] = useState<string | null>('none');

    const handleOptionClick = (option: any) => {
        setFilterType(option);
        setSelectedOption(option === selectedOption ? null : option);
    };
    const handleRankingClose = () => {
        setAnchorRankingEl(null);
    };
    const [selectedRankingOption, setSelectedRankingOption] = useState(null);

    const [menuItemNum, setMenuItemNum] = useState(''); // Default view is 'detail'

    function compareReleaseDates(a: any, b: any) {
        const releaseDateA = new Date(a?.release_date ? a?.release_date : a?.first_air_date);
        const releaseDateB = new Date(b?.release_date ? b?.release_date : b?.first_air_date);
        return releaseDateA.getTime() - releaseDateB.getTime();
    }
    const handleMenuItemClick = (option: any) => {
        setSelectedRankingOption(option);
        let menuItemNum = '';
        switch (option) {
            case `${translations[language]?.ranking}`: menuItemNum = '1'; break;
            case `IMDb ${translations[language]?.rating}`: menuItemNum = '2'; break;
            case `${translations[language]?.releaseDay}`: menuItemNum = '3'; break;
            case `${translations[language]?.numberRating}`: menuItemNum = '4'; break;
            case `${translations[language]?.alphabet}`: menuItemNum = '5'; break;
            case `${translations[language]?.popularity}`: menuItemNum = '6'; break;
            case `${translations[language]?.runTime}`: menuItemNum = '7'; break;
            default: break;
        }
        setMenuItemNum(menuItemNum);
        handleRankingClose();
    };

    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;

    return (
        <div className='cursor-pointer relative'>
            {openGenDialog && (
                <div className="fixed top-0 left-0 right-0 w-full h-full overflow-auto bg-black text-white bg-opacity-50 flex text-center justify-center items-center z-50">
                    <div className='md:w-1/2 w-full overflow-auto h-full'>
                        <div className="rounded-lg w-full bg-black  px-6 py-6 text-left">
                            <div>
                                <div></div>
                                <div onClick={() => handleDiaGenlogClose()} className='px-2 py-2 bg-black hover:bg-gray-500 bg-opacity-50 border border-white h-12 w-12 text-center ml-auto'>X</div>
                            </div>
                            <div className='py-1'>{translations[language]?.checkStatus}</div>
                            <div className="flex gap-4 py-2 flex-wrap items-center ">
                                <div onClick={() => handleOptionClick('none')} className="flex gap-2 items-center">
                                    <i className={`fa-regular ${selectedOption === 'none' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                    <p>{translations[language]?.none}</p>
                                </div>
                                <div onClick={() => handleOptionClick('movie')} className="flex gap-2 items-center">
                                    <i className={`fa-regular ${selectedOption === 'movie' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                    <p>Movie</p>
                                </div>
                                <div onClick={() => handleOptionClick('tv')} className="flex gap-2 items-center">
                                    <i className={`fa-regular ${selectedOption === 'tv' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                                    <p>TV</p>
                                </div>
                            </div>
                            <div className='py-1'>{translations[language]?.count}</div>
                            <div className="py-1 flex gap-2 flex-wrap items-center ">
                                {Object.entries(characterCount)?.map(([genre, count], index) => (
                                    <button key={`genre-${genre}-${index}`}
                                        className={`uppercase text-sm rounded-full px-2 py-1 border-2 border-white
                                     ${selectedGenres?.includes(genre) ? 'bg-yellow-300 hover:bg-yellow-400' : 'hover:bg-gray-500 hover:opacity-90'}
                                     `}
                                        onClick={() => handleGenreClick(genre)}
                                    >
                                        <p>{`${genre}: (${count})`}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* filter icon */}
            <div className=" flex flex-wrap items-center gap-2">
                <div className=" flex flex-wrap items-center gap-2">
                    <button className="hover:opacity-90 bg-blue-500 px-2 py-1 rounded-full min-w-14"
                        onClick={handleDiaGenlogOpen}>
                        <FilterListIcon />
                    </button>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <p className="text-gray-500">{translations[language]?.sortBy}</p>
                    <Button
                        id="demo-customized-button"
                        aria-controls={anchorRankingEl ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        variant="contained"
                        disableElevation
                        onClick={handleRankingClick}
                        endIcon={<i className="fa-solid fa-caret-down"></i>}
                        sx={{
                            bgcolor: anchorRankingEl ? 'blue' : 'white',
                            color: anchorRankingEl ? 'white' : 'blue',
                            border: anchorRankingEl ? '2px dashed' : '',
                            ":hover": {
                                backgroundColor: 'blue'
                                , color: 'white'
                            },
                        }}
                    >
                        {selectedRankingOption ? selectedRankingOption : `${translations[language]?.options}`}
                    </Button>
                    <Menu
                        id="demo-customized-menu"
                        anchorEl={anchorRankingEl}
                        open={Boolean(anchorRankingEl)}
                        onClose={handleRankingClose}
                    >
                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.ranking}`)} disableRipple>{translations[language]?.ranking}</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick(`IMDb ${translations[language]?.rating}`)} disableRipple>IMDb {translations[language]?.rating}</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.releaseDay}`)} disableRipple>{translations[language]?.releaseDay}</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.numberRating}`)} disableRipple>{translations[language]?.numberRating}</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.alphabet}`)} disableRipple>{translations[language]?.alphabet}</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.popularity}`)} disableRipple>{translations[language]?.popularity}</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.runTime}`)} disableRipple>{translations[language]?.runTime}</MenuItem>
                    </Menu>
                </div>
            </div>
            <div className='flex flex-wrap'>
                {galleryList?.filter((movie: any) => {
                    if (selectedGenres?.length === 0) return true;
                    const hasAllGenres = selectedGenres?.every((genre: any) =>
                        movie?.character === genre
                    );
                    return hasAllGenres;
                })?.filter((movie: any, index: any) => {
                    if (filterType === 'none') return true; // No filter
                    if (filterType === 'movie') {
                        return movie?.media_type === 'movie';
                    }
                    if (filterType === 'tv') {
                        return movie?.media_type === 'tv';
                    }
                    return true;
                })
                    .sort((a: any, b: any) => {
                        if (menuItemNum === '5') {
                            // Sắp xếp theo thứ tự alphabet của title
                            const titleA = a?.title ? a?.title : a?.name?.toUpperCase();
                            const titleB = b?.title ? b?.title : b?.name.toUpperCase();
                            if (titleA < titleB) {
                                return -1;
                            }
                            if (titleA > titleB) {
                                return 1;
                            }
                            return 0;
                        }
                        else if (menuItemNum === '1') {
                            return b?.vote_average - a?.vote_average;
                        }
                        else if (menuItemNum === '2') {
                            return a?.id - b?.id;
                        }
                        else if (menuItemNum === '3') {
                            return compareReleaseDates(a, b);

                        }
                        else if (menuItemNum === '4') {
                            return b?.vote_count - a?.vote_count;

                        }
                        else if (menuItemNum === '7') {
                            return compareReleaseDates(b, a);
                        }
                        else if (menuItemNum === '6') {
                            return b?.popularity - a?.popularity;
                        }
                        else {
                            return 0
                        }
                    })
                    .map((item: any, index: any) => (
                        <div key={index} className="w-1/2 px-2 py-2 bg-white">
                            <a href={`/${item?.media_type === 'movie' ? 'video' : 'videoTv'}/${item?.id}`}>
                                <div className="bg-white w-full relative rounded-3xl overflow-hidden">
                                    <div className="relative w-full aspect-w-16 aspect-h-9">
                                        <img src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt="product images"
                                            className="object-cover w-full h-full" onError={handleImageError} />
                                        <div className={`absolute inset-0 bg-black bg-opacity-20 blur-sm`}></div>
                                        <div className="absolute bottom-0 left-0 bg-transparent text-xl bg-opacity-50 text-white hover:text-yellow-300 px-2 py-2 flex flex-wrap items-center gap-2">
                                            <i className="fa-regular fa-circle-play"></i>
                                            <div>Trailer</div>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <div className="flex flex-col">
                                <div className="py-2">
                                    <div className="text-xl font-bold mb-1">
                                        <p className="line-clamp-2"> {item?.title ? item?.title : item?.name} {item?.release_date?.slice(0, 4) ? `(${item?.release_date?.slice(0, 4)})` : ''}</p>
                                    </div>
                                    <div className="items-center flex flex-wrap gap-2">
                                        <p className="line-clamp-1">{item?.character}</p>
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-star text-yellow-300"></i>
                                            <p className="leading-relaxed text-gray-500">{item?.vote_average?.toFixed(1)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}

            </div>

        </div>
    );
}
