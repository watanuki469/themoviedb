import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListRow from "../../modules/ListRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { fetchMovies } from "../../redux/reducers/movies.reducer";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Dialog, DialogContent, DialogTitle, Divider, Menu, MenuItem, Rating, Tooltip } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { ListMoviesPopular } from "../models/ListMoviesPopular";

export default function Top250MovieLayout() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    console.log(topRatedMovies);

    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        dispatch(fetchMovies());
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, []);
    const currentDate = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    // Lấy số tháng từ ngày hiện tại (chú ý rằng tháng trong JavaScript bắt đầu từ 0)
    const currentMonth = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonth];

    const [isChecked, setIsChecked] = useState(false);
    const handleChecked = () => {
        setIsChecked(!isChecked);
    }

    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };

    const [currentView, setCurrentView] = useState('Detail'); // Default view is 'detail'

    const switchView = (view: any) => {
        setCurrentView(view);
    };
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    type GenreID = number;
    type GenreName = string;
    const genreMapping: Record<GenreID, GenreName> = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
    };
    type Genre = | ' ';
    const [genreCount, setGenreCount] = useState<Record<string, number>>({});
    const [numberGen, setNumberGen] = useState(0);
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

    function countGenres(topRatedMovies: any): Record<GenreName, number> {
        const genreCounting: Record<GenreName, number> = {};
        topRatedMovies?.forEach((movie: any) => {
            movie?.genre_ids?.forEach((id: GenreID) => {
                // Lấy tên thể loại từ đối tượng ánh xạ
                const genreName: GenreName = genreMapping[id];
                // Nếu thể loại đã tồn tại, tăng giá trị đếm lên 1; ngược lại, tạo mới với giá trị 1.
                genreCounting[genreName] = (genreCounting[genreName] || 0) + 1;
            });
        });
        return genreCounting;
    }

    const sortedTopRatedMovies = [...topRatedMovies].sort((a: any, b: any) => {
        const sortOrderFactor = sortOrder === 'asc' ? 1 : -1;
        return sortOrderFactor * (a.movieIndex - b.movieIndex);
    });
    useEffect(() => {
        const genreCount = countGenres(topRatedMovies);
        setGenreCount(genreCount);
        const totalGenreCount = Object.values(genreCount).reduce((acc, count) => acc + count, 0);
        setNumberGen(totalGenreCount);

    }, [topRatedMovies]);

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
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
    const [isRating, setIsRating] = useState(false);
    console.log(isRating);

    const [selectedStudent, setSelectedStudent] = useState<ListMoviesPopular>();
    const handleClick = (index: any) => {
        setIsRating(true)
        setSelectedStudent(index);
    };
    const [value, setValue] = useState<number | null>(0);
    const handleClose = () => {
        setIsRating(false)
        setValue(0)
    };
    const renderMovieItem = (movie: any, movieIndex: number, currentView: any, sortOrder: any) => {
        // Implement rendering logic based on the currentView (detail, grid, compact)
        if (movieIndex >= 50) {
            return null;
        }

        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 border-t border-r border-l border-gray-500  " key={movieIndex}
                    >
                        {isRating && (
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
                                            <p className="text-2xl ">{selectedStudent?.original_title ? (selectedStudent?.original_title) : (selectedStudent?.title ? (selectedStudent?.title) : (selectedStudent?.title))}</p>
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
                                                <button className={`px-2 py-2 justify-center mt-2 items-center w-full ${value !== 0 ? 'bg-yellow-300' : 'bg-gray-500'} ${value !== null ? 'hover:opacity-75' : ''}`} onClick={() => handleClose()}>
                                                    Rate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="product images"
                                            onError={handleImageError} className="w-20 h-28" />
                                        <div>
                                            <p className="font-bold">{movieIndex}. {movie?.original_title}</p>
                                            <p>{movie?.release_date?.slice(0, 4)}</p>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-star text-yellow-300"></i>
                                                    <p>{movie?.vote_average} ({shortenNumber(movie?.vote_count)})</p>
                                                </div>
                                                <button className="flex items-center gap-2">
                                                    <i className="fa-regular fa-star text-blue-500"></i>
                                                    <p>Rate</p>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-1 line-clamp-2">
                                        <p>{movie?.overview}</p>
                                    </div>
                                </div>

                                <div className="ml-auto"  >
                                    <i className="fa-solid fa-circle-info px-2 text-blue-500 text-xl" onClick={() => handleClick(movie)}></i>
                                </div>
                            </div>

                        </div>
                    </section>

                )
            case 'Grid':
                return (
                    <div></div>
                )
            case 'Compact':
                return (
                    <div></div>
                )
        }
    }
    const [applyFilter, setApplyFilter] = useState(true);
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
        const releaseDateA = new Date(a.release_date);
        const releaseDateB = new Date(b.release_date);
        return releaseDateA.getTime() - releaseDateB.getTime();
    }
    const handleMenuItemClick = (option: any) => {
        setSelectedRankingOption(option);
        let menuItemNum = '';
        switch (option) {
            case 'Ranking':
                menuItemNum = '1';
                break;
            case 'IMDb Rating':
                menuItemNum = '2';
                break;
            case 'Release Day':
                menuItemNum = '3';
                break;
            case 'Number Of Rating':
                menuItemNum = '4';
                break;
            case 'Alphabetical':
                menuItemNum = '5';
                break;
            case 'Popularity':
                menuItemNum = '6';
                break;
            case 'Runtime':
                menuItemNum = '7';
                break;
            default:
                break;
        }
        setMenuItemNum(menuItemNum);
        handleRankingClose();
    };


    return (
        <div className=" min-h-screen cursor-pointer">

            <Dialog open={openGenDialog} onClose={handleDiaGenlogClose} maxWidth={'sm'}
                keepMounted={true}
                PaperProps={{
                    style: {
                        background: 'black', color: 'white'
                    },
                }}
            >
                <DialogTitle sx={{ color: 'yellow', textTransform: 'uppercase', fontWeight: 'bold' }}>Genres and Counts</DialogTitle>
                <DialogContent>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(genreCount).map(([genre, count], index) => (
                            <button key={`genre-${genre}-${index}`}
                                className="uppercase hover:bg-opacity-90 text-sm hover:bg-gray-500 rounded-full px-2 py-2 
                                border-2 border-white "
                                onClick={() => handleGenreClick(genre as Genre)}
                            >
                                <p>{`${genre}: (${count})`}</p>
                            </button>
                        ))}

                    </div>
                    <Divider sx={{
                        marginTop: '20px', width: '100%', maxWidth: '1100px', borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper',
                    }} />
                    <DialogTitle sx={{ color: 'yellow', textTransform: 'uppercase', fontWeight: 'bold' }}>IN THEATERS</DialogTitle>
                    <div className="flex gap-4 flex-wrap items-center">
                        <div onClick={() => handleOptionClick('none')} className="flex gap-2 items-center">
                            <i className={`fa-regular ${selectedOption === 'none' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                            <p>None</p>
                        </div>
                        <div onClick={() => handleOptionClick('near')} className="flex gap-2 items-center">
                            <i className={`fa-regular ${selectedOption === 'near' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                            <p> In Theaters Near You</p>
                        </div>
                        <div onClick={() => handleOptionClick('online')} className="flex gap-2 items-center">
                            <i className={`fa-regular ${selectedOption === 'online' ? 'fa-circle-dot' : 'fa-circle'}`}></i>
                            <p>In Theaters With Online Ticketing</p>
                        </div>
                    </div>

                    <Divider sx={{
                        marginTop: '20px', width: '100%', maxWidth: '1100px', borderRadius: 2,
                        border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper',
                    }} />
                    <DialogTitle sx={{ color: 'yellow', textTransform: 'uppercase', fontWeight: 'bold' }}>Movie Key</DialogTitle>
                </DialogContent>
            </Dialog>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-white">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <div className="lg:max-w-full md:w-screen ">
                        <div className="flex mt-3 ">
                            <div className="items-center ">
                                <h2 className="text-2xl font-bold text-black ">IMDb Charts</h2>
                            </div>
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center text-2xl font-bold text-black ">Share </p>
                                <i className="fa-solid fa-share-nodes text-black text-2xl ml-2 hover:bg-gray-500 rounded-full px-3 py-3"></i>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex items-center ">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">IMDb Top 250 Movies</h2>
                            </div>
                            <p className="text-gray-500 py-2">As rated by regular IMDb voters.</p>
                        </div>

                    </div>
                    <div className="md:grid grid-cols-12 gap-2 w-full">
                        <div className="lg:col-span-8 md-col-span-12  w-full ">
                            <div className="flex ">
                                <div className="items-center ">
                                    <h2 className="text-2xl text-black ">
                                        {topRatedMovies
                                            .filter((movie: any) => {
                                                if (selectedGenres?.length === 0) return true; // No genre filter
                                                // Check if every selected genre is present in the movie's genres
                                                const hasAllGenres = selectedGenres.every((genre) =>
                                                    movie?.genre_ids?.some((mGenre: any) => genreMapping[mGenre] === genre)
                                                );


                                                return hasAllGenres;
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

                                            .map((m, index) => renderMovieItem(m, index, currentView, sortOrder)).length}
                                        /{topRatedMovies.length} Titles</h2>

                                </div>

                                <div className="flex items-center ml-auto gap-4 px-2 py-2" >
                                    <Tooltip title="Detail View">
                                        <i className="fa-solid fa-list-ul" onClick={() => switchView('Detail')}></i>
                                    </Tooltip>
                                    <Tooltip title="Grid View">
                                        <AppsIcon onClick={() => switchView('Grid')} />
                                    </Tooltip>
                                    <Tooltip title="Compact View">
                                        <MenuIcon onClick={() => switchView('Compact')} />
                                    </Tooltip>
                                </div>
                            </div>
                            {/* filter icon */}
                            <div className=" flex flex-wrap items-center gap-2">
                                <button className="hover:bg-opacity-90 bg-blue-500 px-2 py-1 rounded-full min-w-14"
                                    onClick={handleDiaGenlogOpen}>
                                    <FilterListIcon />
                                </button>
                                {selectedGenres.map((genre, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <p className="font-bold">
                                            {genre}
                                        </p>
                                        <i className="fa-solid fa-xmark" onClick={() => handleRemoveGenreFilter(genre)}></i>
                                        {/* <IconButton
                                            size="small" onClick={() => handleRemoveGenreFilter(genre)}
                                            sx={{ color: 'red', padding: 0 }}
                                        >
                                            <CloseIcon />
                                        </IconButton> */}
                                    </div>
                                ))
                                }
                            </div>
                            <div className="flex  px-2 py-2">
                                <div>

                                </div>
                                <div className="ml-auto flex items-center gap-4">
                                    <p className="text-gray-500">Sort by</p>

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
                                                border: '2px dashed',
                                                backgroundColor: 'gray'
                                                , color: 'white'
                                            },


                                        }}

                                    >
                                        {selectedRankingOption ? selectedRankingOption : 'Options'}
                                    </Button>
                                    <Menu
                                        id="demo-customized-menu"
                                        anchorEl={anchorRankingEl}
                                        open={Boolean(anchorRankingEl)}
                                        onClose={handleRankingClose}
                                    >
                                        <MenuItem onClick={() => handleMenuItemClick('Ranking')} disableRipple>
                                            Ranking
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick('IMDb Rating')} disableRipple>
                                            IMDb Rating
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick('Release Day')} disableRipple>
                                            Release Day
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick('Number Of Rating')} disableRipple>
                                            Number Of Rating
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick('Alphabetical')} disableRipple>
                                            Alphabetical
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick('Popularity')} disableRipple>
                                            Popularity
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick('Runtime')} disableRipple>
                                            Runtime
                                        </MenuItem>
                                    </Menu>
                                    <SwapVertIcon className="hover:text-blue-500" />
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block col-span-4  h-full px-2 py-2 text-xl">
                            <p className="text-2xl font-bold" >You have rated</p>
                            <p className="mt-3"><span className="text-green-500">0</span>/250 (0%)</p>
                            <div className="flex items-center gap-3 mt-3 ">
                                {isChecked ? (
                                    <i className={`fa-regular fa-square-check ${isChecked ? '' : 'hidden'}`} onClick={handleChecked}></i>
                                ) : (
                                    <i className={`fa-regular fa-square }`} onClick={handleChecked}></i>
                                )}
                                <p>Hide titles you have rated</p>

                            </div>
                        </div>
                        <div className="lg:col-span-8 md-col-span-12  w-full ">
                            <div className="lg:max-w-full md:w-screen py-4 px-2">
                                <div
                                    style={{
                                        position: "relative", backgroundSize: "cover", backgroundPosition: "center",
                                    }}>
                                    {topRatedMovies.length === 0 && (
                                        <div style={{
                                            backgroundImage: `url(https://filmfair.in/website/images/error_screens/no-result.png')`,
                                            position: "absolute", width: "100%", height: "100%", opacity: "0.5",
                                            backgroundSize: "cover", backgroundPosition: "center", backgroundColor: 'black'
                                        }}>
                                        </div>
                                    )}
                                    {topRatedMovies
                                        .filter((movie: any) => {
                                            if (selectedGenres?.length === 0) return true; // No genre filter
                                            // Check if every selected genre is present in the movie's genres
                                            const hasAllGenres = selectedGenres.every((genre) =>
                                                movie?.genre_ids?.some((mGenre: any) => genreMapping[mGenre] === genre)
                                            );


                                            return hasAllGenres;
                                        })
                                        // .filter((movie) => {
                                        //     if (selectedKeys.length === 0) return true; // No key filter

                                        //     // Check if every selected genre is present in the movie's genres
                                        //     const hasAllGenres = selectedKeys.every((keyword) =>
                                        //         movie.keywords.some((mGenre) => mGenre.keyword === keyword)
                                        //     );

                                        //     return hasAllGenres;
                                        // })
                                        .filter(() => {
                                            if (applyFilter === true) return true; // No filter
                                            return null
                                        })
                                        .sort((a, b) => {
                                            if (menuItemNum === '5') {
                                                // Sắp xếp theo thứ tự alphabet của title
                                                const titleA = a?.original_title?.toUpperCase();
                                                const titleB = b?.original_title?.toUpperCase();
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

                                        .map((m, index) => renderMovieItem(m, index, currentView, sortOrder))}

                                </div>
                            </div>

                        </div>
                        <div className="hidden lg:block col-span-4  h-full px-2 py-2 ">
                            <div className="flex items-center py-3">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">More to explore</h2>
                            </div>
                            <div className="lg:max-w-full md:w-screen">
                                <ListRow listRowList={topRatedMovies} />
                            </div>
                            <p className="text-red w-full text-black"> Staff Picks: What to Watch in {currentMonthName}</p>
                            <p className="text-red w-full text-blue-500"> See our picks</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center mt-10 ">
                    <Footer />
                </div>
            </div>
        </div >
    )
}