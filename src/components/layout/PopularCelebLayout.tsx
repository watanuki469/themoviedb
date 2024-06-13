import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Charts from "../../modules/Charts";
import ListRow from "../../modules/ListRow";
import TopNew from "../../modules/TopNew";
import TopRatedMovieByGenre from "../../modules/TopRatedMovieByGenre";
import apiController from '../../redux/client/api.Controller.';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPeoplePopular } from '../../redux/reducers/peoplePopular.reducer';
import { AppDispatch } from '../../redux/store';
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import { setGlobalLoading } from '../../redux/reducers/globalLoading.reducer';


export default function PopularCelebLayout() {
    const dispatch = useAppDispatch();
    const topRatedMovies = useAppSelector((state) => state.movies.listMoviesTopRated)
    let navigate = useNavigate()
    const [movieNews, setMovieNews] = useState<any[]>([]);
    const currentDate = new Date();
    const currentMonth2 = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Lấy tháng hiện tại, thêm 0 ở trước nếu cần
    const currentDay = ('0' + currentDate.getDate()).slice(-2); // Lấy ngày hiện tại, thêm 0 ở trước nếu cần 
    const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    // Lấy số tháng từ ngày hiện tại (chú ý rằng tháng trong JavaScript bắt đầu từ 0)
    const currentMonth = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonth];

    const popularCeleb = useAppSelector((state) => state.peoplePopular.peoplePopular)

    const fetPopularCeleb = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiPeoplePopular.peoplePopular()
        ])
            .then((data: any) => {
                if (data[0] && data[0].results) {
                    dispatch(setPeoplePopular(data[0]?.results));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        dispatch(fetPopularCeleb())
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, [dispatch]);

    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };

    const [currentView, setCurrentView] = useState('Detail'); // Default view is 'detail'

    const switchView = (view: any) => {
        setCurrentView(view);
    };
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };


    const renderMovieItem = (movie: any, movieIndex: number, currentView: any) => {
        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 border-t border-r border-l border-gray-500  w-full" key={movieIndex}
                    >
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <a href={`/person/${movie?.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${movie?.profile_path}`} alt="product images"
                                                onError={handleImageError} className="w-20 h-28 hover:opacity-80" />
                                        </a>
                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.name ? movie?.name : movie?.title}</p>
                                            <div >
                                                {movie?.known_for_department}
                                            </div>
                                            <div className='flex items-center flex-wrap gap-2 text-blue-500 hover:underline'
                                                onClick={() => navigate(`/${movie?.known_for[0]?.media_type}/${movie?.known_for[0]?.id}`)}
                                            >
                                                <p> {movie?.known_for[0]?.name ? movie?.known_for[0]?.name : movie?.known_for[0]?.title} ({movie?.known_for[0]?.first_air_date ? movie?.known_for[0]?.first_air_date : movie?.known_for[0]?.release_date})</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mt-1 line-clamp-4">
                                        <p>{movie?.overview}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                )
            case 'Grid':
                return (
                    <section className="w-1/2 md:w-1/4 px-2 sm:w-1/3 lg:1/4 " key={movieIndex}
                    >
                        <div className="text-black font-sans  shadow-sm shadow-black  " >
                            <div className=" items-center ">
                                <div className="mt-2">
                                    <div className="items-center gap-2">
                                        <a href={`/person/${movie?.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${movie?.profile_path}`} alt="product images"
                                                onError={handleImageError} className="w-full lg:h-56 h-80 hover:opacity-80" />
                                        </a>

                                        <div className="px-2 py-2 w-full">
                                            <div className="flex flex-wrap items-center gap-2 justify-start text-left">
                                                <div className="h-12 w-full"
                                                >
                                                    <p className="hover:opacity-50 line-clamp-2">{movieIndex}.  {movie?.name ? movie?.name : movie?.title}</p>
                                                </div>
                                                <div className='text-blue-500'
                                                    onClick={() => navigate(`/${movie?.known_for[0]?.media_type}/${movie?.known_for[0]?.id}`)}
                                                >
                                                    <p className='h-12 hover:underline line-clamp-2'> {movie?.known_for[0]?.name ? movie?.known_for[0]?.name : movie?.known_for[0]?.title} ({movie?.known_for[0]?.first_air_date ? movie?.known_for[0]?.first_air_date : movie?.known_for[0]?.release_date})</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                )
            case 'Compact':
                return (
                    <section className="px-2 border-t border-r border-l border-gray-500  w-full" key={movieIndex}
                    >
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <a href={`/person/${movie?.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${movie?.profile_path}`} alt="product images"
                                                onError={handleImageError} className="w-20 h-28 hover:opacity-80" />
                                        </a>
                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.name ? movie?.name : movie?.title}</p>
                                            <div >
                                                {movie?.known_for_department}
                                            </div>
                                            <div className='flex items-center flex-wrap gap-2 text-blue-500 hover:underline'
                                                onClick={() => navigate(`/${movie?.known_for[0]?.media_type}/${movie?.known_for[0]?.id}`)}
                                            >
                                                <p> {movie?.known_for[0]?.name ? movie?.known_for[0]?.name : movie?.known_for[0]?.title} ({movie?.known_for[0]?.first_air_date ? movie?.known_for[0]?.first_air_date : movie?.known_for[0]?.release_date})</p>
                                            </div>

                                        </div>
                                    </div>
                                    {/* <div className="mt-1 line-clamp-4">
                                        <p>{movie?.nameBio?.text?.plainText}</p>
                                    </div> */}
                                </div>
                            </div>

                        </div>
                    </section>
                )
        }
    }

    const handleRankingClose = () => {
        setAnchorRankingEl(null);
    };
    const [selectedRankingOption, setSelectedRankingOption] = useState(null);

    const [menuItemNum, setMenuItemNum] = useState(''); // Default view is 'detail'


    const handleMenuItemClick = (option: any) => {
        setSelectedRankingOption(option);
        let menuItemNum = '';
        switch (option) {
            case 'Alphabetical':
                menuItemNum = '1';
                break;
            case 'StarMETER':
                menuItemNum = '2';
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
    const popularCeleb2 = [...popularCeleb]

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black pb-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-white ">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center px-2 ">
                    <div className="lg:max-w-full w-full ">
                        <div className="flex mt-3 ">
                            <div className="items-center ">
                                <h2 className="text-2xl font-bold text-black ">IMDb Charts</h2>
                            </div>
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center text-2xl font-bold text-black ">Share </p>
                                <IconButton
                                    onClick={handleShareClick}
                                    size="small"
                                    aria-controls={openShare ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openShare ? 'true' : undefined}
                                >
                                    <Avatar sx={{
                                        width: 32, height: 32, bgcolor: 'white', color: 'black', padding: '20px', ":hover": {
                                            bgcolor: 'gray', opacity: '50%'
                                        }
                                    }}>
                                        <ShareIcon />
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorShareEl}
                                    id="account-menu"
                                    open={openShare}
                                    onClose={handleShareClose}
                                    onClick={handleShareClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32, height: 32, ml: -0.5, mr: 1,
                                            },
                                            '&::before': {
                                                content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={() => toast.success('meow meow')}>
                                        <ListItemIcon>
                                            <i className="fa-brands fa-facebook text-2xl"></i>
                                        </ListItemIcon>
                                        Facebook
                                    </MenuItem>
                                    <MenuItem onClick={() => toast.success('meow meow')}>
                                        <ListItemIcon>
                                            <i className="fa-brands fa-twitter text-2xl"></i>
                                        </ListItemIcon>
                                        Twitter
                                    </MenuItem>

                                    <MenuItem onClick={() => toast.success('meow meow')}>
                                        <ListItemIcon>
                                            <i className="fa-regular fa-envelope text-2xl"></i>
                                        </ListItemIcon>
                                        Email Link
                                    </MenuItem>
                                    <MenuItem onClick={handleCopyLink}>
                                        <ListItemIcon>
                                            <i className="fa-solid fa-link text-2xl"></i>
                                        </ListItemIcon>
                                        Copy Link
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex items-center ">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-black ">IMDb Most Popular Celebs</h2>
                            </div>
                            <p className="text-gray-500 py-2">As determined by IMDb user</p>
                        </div>

                    </div>
                    <div className="md:grid grid-cols-12 gap-2 w-full">
                        <div className="lg:col-span-8 col-span-12  w-full ">
                            <div className="flex ">
                                <div className="items-center ">
                                    <h2 className="text-2xl text-black ">
                                       {popularCeleb2?.length} Titles</h2>

                                </div>

                                <div className="flex items-center ml-auto gap-4 px-2 py-2" >
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

                            <div className="flex  px-2 py-2">
                                <div></div>
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
                                                backgroundColor: 'blue'
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
                                        <MenuItem sx={{ width: '100%' }} onClick={() => handleMenuItemClick('Alphabetical')} disableRipple>
                                            Alphabetical
                                        </MenuItem>
                                        <MenuItem sx={{ width: '100%' }} onClick={() => handleMenuItemClick('StarMETER')} disableRipple>
                                            StarMETER
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

                                    {
                                        popularCeleb2
                                            .sort((a: any, b: any) => {
                                                if (menuItemNum === '1') {
                                                    // Sắp xếp theo thứ tự alphabet của title
                                                    const titleA = a?.name?.toUpperCase();
                                                    const titleB = b?.name?.toUpperCase();
                                                    if (titleA < titleB) {
                                                        return -1;
                                                    }
                                                    if (titleA > titleB) {
                                                        return 1;
                                                    }
                                                    return 0;
                                                }
                                                else if (menuItemNum === '2') {
                                                    // Sắp xếp theo thứ tự alphabet của title
                                                    const titleA = a?.id;
                                                    const titleB = b?.id;
                                                    if (titleA < titleB) {
                                                        return -1;
                                                    }
                                                    if (titleA > titleB) {
                                                        return 1;
                                                    }
                                                    return 0;
                                                }

                                                else {
                                                    return 0
                                                }
                                            })
                                            .map((m: any, index: any) => renderMovieItem(m, index, currentView))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block col-span-4  h-full px-2 py-2 ">
                            <div>
                                <div className="flex items-center py-3">
                                    <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-black ">More to explore</h2>
                                </div>
                                <div className="lg:max-w-full w-full" onClick={() => navigate(`/top250Movie`)}>
                                    <ListRow listRowList={topRatedMovies} />
                                </div>
                                <p className="text-red w-full text-black"> Staff Picks: What to Watch in {currentMonthName}</p>
                                <p className="text-red w-full text-blue-500 hover:underline"> See our picks</p>
                            </div>
                            <div>
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black ">Charts</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <Charts />
                                </div>
                            </div>
                            <div className='py-3'>
                                <TopNew />
                            </div>
                            <div className='sticky top-0 right-0 left-0'>
                                <div className="flex items-center py-3">
                                    <h2 className="text-2xl font-bold text-black ">Top Rated Movies by Genre</h2>
                                </div>
                                <div className="lg:max-w-full w-full">
                                    <TopRatedMovieByGenre />
                                </div>
                            </div>


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