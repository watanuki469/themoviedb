import AppsIcon from '@mui/icons-material/Apps';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, ListItemIcon, Menu, MenuItem, Rating, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { AppDispatch } from '../redux/store';
import { getListRatingMongoApi, ratingMongoApi, removeRatingMongoApi } from '../redux/client/api.LoginMongo';
import { setDeleteRating, setListRating, setRating } from '../redux/reducers/login.reducer';
import { LanguageContext } from '../pages/LanguageContext';
import ListRow from './ListRow';
import Charts from './Charts';
import TopRatedMovieByGenre from './TopRatedMovieByGenre';

export interface ViewsProps {
    viewList: any,
    moreToExploreList: any,
    genreList: any,
}

export default function ViewTableNoType({
    viewList,
    moreToExploreList,
    genreList
}: ViewsProps) {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()

    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };

    const [currentView, setCurrentView] = useState('Detail'); // Default view is 'detail'

    const switchView = (view: any) => {
        setCurrentView(view);
    };

    type GenreID = number;
    type GenreName = string;

    const genreMapping: Record<number, string> = genreList?.reduce((acc: Record<number, string>, genre: { id: number, name: string }) => {
        acc[genre?.id] = genre?.name;
        return acc;
    }, {});

    type Genre = | ' ';
    const [genreCount, setGenreCount] = useState<Record<string, number>>({});
    const [numberGen, setNumberGen] = useState(0);
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

    function countGenres(viewList: any): Record<GenreName, number> {
        const genreCounting: Record<GenreName, number> = {};
        viewList?.forEach((movie: any) => {
            movie?.genre_ids?.forEach((id: GenreID) => {
                // Lấy tên thể loại từ đối tượng ánh xạ
                const genreName: GenreName = genreMapping[id];
                // Nếu thể loại đã tồn tại, tăng giá trị đếm lên 1; ngược lại, tạo mới với giá trị 1.
                genreCounting[genreName] = (genreCounting[genreName] || 0) + 1;
            });
        });
        return genreCounting;
    }
    useEffect(() => {
        const genreCount = countGenres(viewList);
        setGenreCount(genreCount);
        const totalGenreCount = Object.values(genreCount).reduce((acc, count) => acc + count, 0);
        setNumberGen(totalGenreCount);

    }, [viewList, genreList]);

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://via.placeholder.com/500x750'; // Set the fallback image source here
    };
    const [openGenDialog, setOpenGenDialog] = useState(false);
    const handleDiaGenlogOpen = () => {
        setOpenGenDialog(true);
    };

    const handleDiaGenlogClose = () => {
        setOpenGenDialog(false);
    };
    const handleGenreClick = (selectedGenre: Genre) => {
        if (selectedGenres.includes(selectedGenre)) {
            // If already selected, remove it
            setSelectedGenres(selectedGenres.filter((genre) => genre !== selectedGenre));
        } else {
            // If not selected, add it
            setSelectedGenres([...selectedGenres, selectedGenre]);
        }
    };

    const handleRemoveGenreFilter = (removedGenre: any) => {
        setSelectedGenres(selectedGenres.filter((genre) => genre !== removedGenre));

    };
    function shortenNumber(number: any) {
        if (number >= 1000000000) {
            return (number / 1000000000).toFixed(1) + 'b';
        }
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'm';
        }
        if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'k';
        }
        return number;
    }
    const [value, setValue] = useState<number | null>(0);
    const [isRating, setIsRating] = useState(false);
    const [numberIndex, setNumberIndex] = useState(0);
    const [checkLog, setCheckLog] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<any>();

    const handleClick = (movie: any, value: any) => {
        setIsRating(true)
        setSelectedStudent(movie);
        setValue(value)
    };

    const ratingList = useAppSelector((state) => state.login.listRating);
    const [userInfoList, setUserInfoList] = useState<any[]>([]);
    const [loading2, setLoading2] = useState<{ [key: number]: boolean }>({});
    const [loading3, setLoading3] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const storedDataString = localStorage.getItem('user');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        setUserInfoList(Object.values(storedData));
    }, []);
    const fetchGetRating = () => async (dispatch: AppDispatch) => {
        try {
            const response = await getListRatingMongoApi(userInfoList[0]);
            if (response) {
                dispatch(setListRating(response));
            } else {
                throw new Error('Failed to fetch favorites');
            }
        } catch (e) {
            console.log("Fetching favorites failed: " + e);
        }
    }

    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        if (userInfoList?.length > 0) {
            dispatch(fetchGetRating())
        }
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, [userInfoList]);
    const fetchRating = (
        itemId: string,
        itemType: string,
        itemRating: string,
        itemImg: string,
        itemName: string
    ) => async (dispatch: AppDispatch) => {
        const email = userInfoList[0];
        try {
            const response = await ratingMongoApi(
                email, itemId, itemType, itemRating, itemImg, itemName
            );
            dispatch(setRating(response));
            if (response) {
                await dispatch(fetchGetRating());
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Updating watch list failed");
        }
    };

    const handleRating = async (
        index: number,
        itemId: any,
        itemType: any,
        itemRating: any,
        itemImg: any,
        itemName: any
    ) => {
        setLoading2((prevLoading2) => ({ ...prevLoading2, [index]: true }));

        await dispatch(fetchRating(
            itemId, itemType, itemRating, itemImg, itemName
        ));
        setCheckLog(!checkLog);
        setIsRating(false)
        setLoading2((prevLoading2) => ({ ...prevLoading2, [index]: false }));
        toast.success('Rating success')
    };
    const fetchRemove = (
        movieId: string,
        movieType: string,
    ) => async (dispatch: AppDispatch) => {
        const email = userInfoList[0];

        try {
            const response = await removeRatingMongoApi(
                email, movieId, movieType,
            );
            dispatch(setDeleteRating(response));
            if (response) {
                await dispatch(fetchGetRating());
                toast.info('Remove rating success')
            } else {
                toast.error('Something went wrong');
            }
        } catch (e) {
            console.log("Updating watch list failed: " + e);
            toast.error("Updating watch list failed");
        }
    };
    const handleRemoveRating = async (
        index: number, movieId: any, movieType: any,
    ) => {
        setLoading3((prevLoading3) => ({ ...prevLoading3, [index]: true }));
        await dispatch(fetchRemove(
            movieId, movieType,
        ));
        setCheckLog(!checkLog);
        setIsRating(false)
        setLoading3((prevLoading3) => ({ ...prevLoading3, [index]: false }));
    };

    const renderMovieItem = (movie: any, movieIndex: number, currentView: any) => {
        const existingRating = ratingList.find(rating => rating?.itemId == movie?.id); // Find the rating object for the item

        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 border-t border-r border-l border-gray-500 w-full " key={movieIndex}
                    >
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <img onClick={() => navigate(`/${movie?.media_type}/${movie?.id}`)}
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="product images"
                                            onError={handleImageError} className="w-20 h-28 hover:opacity-80" />
                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.title ? movie?.title : movie?.name}</p>
                                            <p>{movie?.release_date ? movie?.release_date?.slice(0, 4) : movie?.first_air_date?.slice(0, 4)}</p>
                                            <div className="flex item-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                </div>
                                                <button className=" hover:text-black text-blue-500" >
                                                    <div className="" onClick={() => handleClick(movie, existingRating?.itemRating)}>
                                                        {
                                                            existingRating ? (
                                                                loading2[movieIndex] ? (
                                                                    <div>
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse "></i>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center  gap-2 ">
                                                                        <i className="fa-solid fa-star text-blue-500"></i>
                                                                        <div>{existingRating?.itemRating}</div>
                                                                    </div>

                                                                )
                                                            ) : (
                                                                <div className="font-bold text-sm">
                                                                    {loading2[movieIndex] ? (
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                    ) : (
                                                                        <div className="">
                                                                            <i className="fa-regular fa-star text-blue-500"></i> Rate
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-auto" onClick={() => navigate(`/${movie?.media_type}/${movie?.id}`)} >
                                    <i className="fa-solid fa-circle-info px-2 text-blue-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                        <div className="py-2">
                            <p>{movie?.overview}</p>
                        </div>
                    </section>
                )

            case 'Grid':
                return (
                    <section className="w-1/2 md:w-1/4 px-2 sm:w-1/3 lg:1/4" key={movieIndex}
                    // {/* mai fix grid responsive  */ }
                    >
                        <div className="text-black font-sans  shadow-sm shadow-black  " >
                            <div className=" items-center ">
                                <div className="mt-2">
                                    <div className="items-center gap-2 ">
                                        <div className="px-2"></div>
                                        <div className="relative w-full pb-[150%] hover:opacity-80">
                                            <img onClick={() => navigate(`/${movie?.media_type}/${movie?.id}`)}
                                                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path ? movie?.poster_path : movie?.profile_path}`} alt="product images"
                                                onError={handleImageError} className="absolute top-0 left-0 w-full h-full object-cover" />
                                        </div>
                                        <div className="">
                                            <div className="justify-start text-left px-2 py-2">
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                </div>
                                                <button className="flex items-center gap-2 hover:bg-gray-300 hover:text-black text-blue-500 ">
                                                    <div className="grow ml-auto py-2" onClick={() => handleClick(movie, existingRating?.itemRating)}>
                                                        {
                                                            existingRating ? (
                                                                loading2[movieIndex] ? (
                                                                    <div>
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center  gap-2">
                                                                        <i className="fa-solid fa-star text-blue-500"></i>
                                                                        <div>{existingRating?.itemRating}</div>
                                                                    </div>

                                                                )
                                                            ) : (
                                                                <div className="text-black">
                                                                    {loading2[movieIndex] ? (
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse "></i>
                                                                    ) : (
                                                                        <div className="">
                                                                            <i className="fa-regular fa-star text-blue-500"></i>
                                                                            Rate
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </button>
                                                <div className="h-12 w-full ">
                                                    <p className="font-bold hover:opacity-50 line-clamp-2">{movieIndex}.{movie?.title ? movie?.title : movie?.name}</p>
                                                </div>
                                                <div className="flex flex-wrap">
                                                    {movie?.release_date ? movie?.release_date?.slice(0, 4) : movie?.first_air_date?.slice(0, 4)}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-2 py-2" onClick={() => navigate(`/${movie?.media_type}/${movie?.id}`)}   >
                                    <button className="px-2 py-1 bg-gray-300 hover:bg-blue-300 text-blue-500 w-full rounded-md font-medium text-center items-center">
                                        {translations[language]?.details}
                                    </button>

                                </div>
                            </div>

                        </div>
                    </section>

                )
            case 'Compact':
                return (
                    <section className="px-2 border-t border-r border-l border-gray-500 w-full " key={movieIndex}
                    >
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <img onClick={() => navigate(`/${movie?.media_type}/${movie?.id}`)}
                                            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="product images"
                                            onError={handleImageError} className="w-20 h-28 hover:opacity-80" />
                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.title ? movie?.title : movie?.name}</p>
                                            <p>{movie?.release_date ? movie?.release_date?.slice(0, 4) : movie?.first_air_date?.slice(0, 4)}</p>
                                            <div className="flex item-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p>{movie?.vote_average?.toFixed(1)} ({shortenNumber(movie?.vote_count)})</p>
                                                </div>
                                                <button className=" hover:text-black text-blue-500" >
                                                    <div className="" onClick={() => handleClick(movie, existingRating?.itemRating)}>
                                                        {
                                                            existingRating ? (
                                                                loading2[movieIndex] ? (
                                                                    <div>
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse "></i>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center  gap-2 ">
                                                                        <i className="fa-solid fa-star text-blue-500"></i>
                                                                        <div>{existingRating?.itemRating}</div>
                                                                    </div>

                                                                )
                                                            ) : (
                                                                <div className="font-bold text-sm">
                                                                    {loading2[movieIndex] ? (
                                                                        <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                                    ) : (
                                                                        <div className="">
                                                                            <i className="fa-regular fa-star text-blue-500"></i> Rate
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-auto" onClick={() => navigate(`/${movie?.media_type}/${movie?.id}`)} >
                                    <i className="fa-solid fa-circle-info px-2 text-blue-500 text-xl"></i>
                                </div>
                            </div>

                        </div>
                    </section>
                )
        }
    }
    const [applyFilter, setApplyFilter] = useState(true);
    const [filterRatedMovie, setFilterRatedMovie] = useState(false);
    const [filterType, setFilterType] = useState('none');

    const [selectedOption, setSelectedOption] = useState<string | null>('none');

    const handleOptionClick = (option: any) => {
        setApplyFilter(option === 'none' ? (true) : (false));
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
            case `${translations[language]?.ranking}`:
                menuItemNum = '1';
                break;
            case `IMDb ${translations[language]?.rating}`:
                menuItemNum = '2';
                break;
            case `${translations[language]?.releaseDay}`:
                menuItemNum = '3';
                break;
            case `${translations[language]?.numberRating}`:
                menuItemNum = '4';
                break;
            case `${translations[language]?.alphabet}`:
                menuItemNum = '5';
                break;
            case `${translations[language]?.popularity}`:
                menuItemNum = '6';
                break;
            case `${translations[language]?.runTime}`:
                menuItemNum = '7';
                break;
            default:
                break;
        }
        setMenuItemNum(menuItemNum);
        handleRankingClose();
    };
    const [anchorShareEl, setAnchorShareEl] = useState<null | HTMLElement>(null);
    const openShare = Boolean(anchorShareEl);
    const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorShareEl(event.currentTarget);
    };
    const handleShareClose = () => {
        setAnchorShareEl(null);
    };
    const handleCopyLink = () => {
        // Lấy địa chỉ URL hiện tại
        const currentUrl = window.location.href;

        // Thử copy địa chỉ URL vào clipboard
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                // Nếu thành công, hiển thị thông báo
                toast.success('Link copied');
            })
            .catch((error) => {
                // Nếu có lỗi, hiển thị thông báo lỗi
                toast.error('Failed to copy link');
                console.error('Error copying link:', error);
            });
    };
    const context = useContext(LanguageContext);

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;

    return (
        <div className='cursor-pointer'>
            {isRating &&
                (
                    <div className="fixed top-0 left-0 w-full h-full bg-black text-white bg-opacity-50 flex justify-center items-center z-30">
                        <div className="p-5 rounded-lg max-w-2xl min-w-xl px-4 py-4 ">
                            <div className="flex items-center justify-end">
                                <div className="flex justify-end">
                                    <button onClick={() => setIsRating(false)} className="text-white hover:text-gray-700 px-2 py-2 rounded-full  ">
                                        <i className="fa-solid fa-times text-xl"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="bg-black px-4 py-4">
                                <div className="aligns-center justify-center items-center text-center gap-2">
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-52 flex flex-col items-center">
                                        <i className="fa-solid fa-star text-9xl text-blue-500"></i>
                                        <p className="-translate-y-20 text-4xl font-extrabold ">{value}</p>
                                    </div>
                                    <p className="text-yellow-300 font-bold">Rate this</p>
                                    <p className="text-2xl ">{selectedStudent?.title ? selectedStudent.title : selectedStudent?.name}</p>
                                    <div className="gap-2 px-2 py-2">
                                        <Rating name="customized-10" value={value} size="large"
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            max={10} sx={{
                                                color: 'blue', mt: 1,
                                                '& .MuiRating-iconEmpty': {
                                                    borderColor: 'red',
                                                    color: 'gray'
                                                },
                                            }} />
                                        <br />
                                        <button className={`px-2 py-2 justify-center mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`}
                                            onClick={() => handleRating(numberIndex, selectedStudent?.id, selectedStudent?.media_type === 'movie' ? 'Movie' : 'TV', value, selectedStudent?.poster_path, selectedStudent?.name ? selectedStudent?.name : selectedStudent?.title)}>
                                            {loading2[numberIndex] ? (
                                                <div>
                                                    <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <div>Rate</div>
                                                </div>
                                            )
                                            }
                                        </button>
                                        <button className={`px-2 py-2 justify-center mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`}
                                            onClick={() => handleRemoveRating(numberIndex, selectedStudent?.id, selectedStudent?.media_type === 'movie' ? 'Movie' : 'TV')}>
                                            {loading3[numberIndex] ? (
                                                <div>
                                                    <i className="fa-solid fa-spinner fa-spin fa-spin-reverse py-2 px-3"></i>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <div>Remove Rating</div>
                                                </div>
                                            )
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            <Dialog open={openGenDialog} onClose={handleDiaGenlogClose} maxWidth={'sm'}
                keepMounted={true}
                PaperProps={{
                    style: {
                        background: 'black', color: 'white'
                    },
                }}
            >
                <DialogTitle sx={{ color: 'yellow', textTransform: 'uppercase', fontWeight: 'bold' }}>{translations[language]?.genre} && {translations[language]?.count}</DialogTitle>
                <DialogContent>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(genreCount).map(([genre, count], index) => (
                            <button key={`genre-${genre}-${index}`}
                                className={`uppercase text-sm rounded-full px-2 py-2 border-2 border-white ${selectedGenres.includes(genre as Genre) ? 'bg-yellow-300 hover:bg-yellow-400' : 'hover:bg-gray-200 hover:opacity-90'}`}
                                onClick={() => handleGenreClick(genre as Genre)}
                            >
                                <p>{`${genre}: (${count})`}</p>
                            </button>
                        ))}

                    </div>
                    <Divider sx={{
                        marginTop: '20px', width: '100%', maxWidth: '1100px', borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper',
                    }} />
                </DialogContent>
                <DialogTitle sx={{ color: 'yellow', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '-20px' }}>{translations[language]?.inTheater}</DialogTitle>
                <DialogContent>
                    <div className="flex gap-4 flex-wrap items-center ">
                        <div onClick={() => handleOptionClick('none')} className="flex gap-2 items-center">
                            <i className={`fa-regular ${selectedOption === 'none' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                            <p>{translations[language]?.none}</p>
                        </div>
                        <div onClick={() => handleOptionClick('near')} className="flex gap-2 items-center">
                            <i className={`fa-regular ${selectedOption === 'near' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                            <p>{translations[language]?.inTheaterNearYou}</p>
                        </div>
                        <div onClick={() => handleOptionClick('online')} className="flex gap-2 items-center">
                            <i className={`fa-regular ${selectedOption === 'online' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                            <p>{translations[language]?.inTheaterWithOnlineTicked}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="grid grid-cols-12 gap-2 w-full">
                <div className="lg:col-span-12 col-span-12  w-full ">
                    <div className="flex ">
                        <div className="items-center ">
                            <h2 className="lg:text-2xl text-lg text-black ">
                                {viewList
                                    .filter((movie: any) => {
                                        if (selectedGenres?.length === 0) return true; // No genre filter
                                        const hasAllGenres = selectedGenres.every((genre: any) =>
                                            movie?.genre_ids?.some((mGenre: any) => genreMapping[mGenre] === genre)
                                        );
                                        return hasAllGenres;
                                    })
                                    .filter((movie: any) => {
                                        const existingRating = ratingList?.find(rating => movie?.id == rating?.itemId);
                                        if (filterRatedMovie === false) return true
                                        return existingRating == undefined;
                                    })
                                    .filter((movie: any) => {
                                        if (!applyFilter) return true; // No filter
                                        if (filterType === 'none') return true; // No filter
                                        if (filterType === 'inTheaters') {
                                            return null;
                                        }
                                        if (filterType === 'In theaters with online ticketing') {
                                            return null;
                                        }
                                        return true;
                                    })
                                    .map((m: any, index: any) => renderMovieItem(m, index, currentView))?.length}
                                /{viewList?.length} {translations[language]?.award}</h2>

                        </div>

                        <div className="flex items-center ml-auto gap-4 px-2 py-2 " >
                            <Tooltip title="Detail View" className={`${currentView === "Detail" ? "text-blue-500" : ""}`}>
                                <i className="fa-solid fa-list-ul " onClick={() => switchView('Detail')}></i>
                            </Tooltip>
                            <Tooltip title="Grid View" className={`${currentView === "Grid" ? "text-blue-500" : ""}`}>
                                <AppsIcon onClick={() => switchView('Grid')} />
                            </Tooltip>
                            <Tooltip title="Compact View" className={`${currentView === "Compact" ? "text-blue-500" : ""}`}>
                                <MenuIcon onClick={() => switchView('Compact')} />
                            </Tooltip>
                        </div>
                    </div>
                    {/* filter icon */}
                    <div className=" flex flex-wrap items-center gap-2">
                        <div className=" flex flex-wrap items-center gap-2">
                            <button className="hover:opacity-90 bg-blue-500 px-2 py-1 rounded-full min-w-14"
                                onClick={handleDiaGenlogOpen}>
                                <FilterListIcon />
                            </button>

                            {selectedGenres?.map((genre, index) => (
                                <div key={index} className="flex items-center gap-2 border-2 border-black px-2 py-2 rounded-xl hover:bg-gray-300">
                                    <p className="">
                                        {genre}
                                    </p>
                                    <i className="fa-solid fa-xmark text-xl" onClick={() => handleRemoveGenreFilter(genre)}></i>
                                </div>
                            ))}
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
                                <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.ranking}`)} disableRipple>
                                    {translations[language]?.ranking}
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick(`IMDb ${translations[language]?.rating}`)} disableRipple>
                                    IMDb {translations[language]?.rating}
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.releaseDay}`)} disableRipple>
                                    {translations[language]?.releaseDay}
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.numberRating}`)} disableRipple>
                                    {translations[language]?.numberRating}
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.alphabet}`)} disableRipple>
                                    {translations[language]?.alphabet}
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.popularity}`)} disableRipple>
                                    {translations[language]?.popularity}
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick(`${translations[language]?.runTime}`)} disableRipple>
                                    {translations[language]?.runTime}
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 col-span-12  w-full ">
                    <div className="lg:max-w-full w-full py-4 px-2 ">
                        <div
                            style={{
                                position: "relative", backgroundSize: "cover", backgroundPosition: "center",
                                display: 'flex', flexWrap: 'wrap'
                            }}>
                            {viewList?.length === 0 && (
                                <div style={{
                                    backgroundImage: `url(https://filmfair.in/website/images/error_screens/no-result.png')`,
                                    position: "absolute", width: "100%", height: "100%", opacity: "0.5",
                                    backgroundSize: "cover", backgroundPosition: "center", backgroundColor: 'black'
                                }}>
                                </div>
                            )}
                            {viewList
                                .filter((movie: any) => {
                                    if (selectedGenres?.length === 0) return true; // No genre filter
                                    // Check if every selected genre is present in the movie's genres
                                    const hasAllGenres = selectedGenres?.every((genre: any) =>
                                        movie?.genre_ids?.some((mGenre: any) => genreMapping[mGenre] === genre)
                                    );
                                    return hasAllGenres;
                                })
                                .filter(() => {
                                    if (applyFilter === true) return true; // No filter
                                    return null
                                })
                                .filter((movie: any) => {
                                    const existingRating = ratingList?.find(rating => movie?.id == rating?.itemId);
                                    if (filterRatedMovie === false) return true
                                    return existingRating == undefined;
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
                                .map((m: any, index: any) => renderMovieItem(m, index, currentView))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 col-span-12  h-full px-2 py-2 ">
                    <div>
                        <div className="flex items-center py-3">
                            <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                            <h2 className="text-2xl font-bold text-black ">  {translations[language]?.featuredToday}</h2>
                        </div>
                        <div className="lg:max-w-full w-full" onClick={() => navigate(`/${moreToExploreList}`)}>
                            <ListRow listRowList={moreToExploreList} />
                        </div>
                        <p className="text-red w-full text-black">   {translations[language]?.staffPick}</p>
                        <p className="text-red w-full text-blue-500 hover:underline">   {translations[language]?.checkStatus}</p>
                    </div>
                    <div>
                        <div className="flex items-center py-3">
                            <h2 className="text-2xl font-bold text-black ">  {translations[language]?.chart}</h2>
                        </div>
                        <div className="lg:max-w-full w-full">
                            <Charts />
                        </div>
                    </div>
                    {/* <div className='py-3'>
                    <TopNew />
                </div> */}
                    <div className='sticky top-0 right-0 left-0'>
                        <div className="flex items-center py-3">
                            <h2 className="text-xl font-bold text-black capitalize"> {translations[language]?.moreExplore} {translations[language]?.genre}</h2>
                        </div>
                        <div className="lg:max-w-full w-full">
                            <TopRatedMovieByGenre />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
