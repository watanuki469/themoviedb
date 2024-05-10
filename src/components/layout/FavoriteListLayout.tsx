import AppsIcon from '@mui/icons-material/Apps';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";


export function FavoriteListLayout() {
    const [watchList, setWatchList] = useState<any[]>([]);
    useEffect(() => {
        // Lấy dữ liệu từ local storage
        const storedDataString = localStorage.getItem('favoriteList');
        let storedData = [];

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }
        console.log('Stored data:', storedData);

        // Lưu dữ liệu vào state
        setWatchList(Object.values(storedData)); // Chuyển đổi dữ liệu từ đối tượng sang mảng
    }, []);
    const removeFromWatchList = (imdb_id: string) => {
        // Lấy dữ liệu từ local storage
        const storedDataString = localStorage.getItem('favoriteList');
        let storedData: Record<string, any> = {};

        if (storedDataString) {
            storedData = JSON.parse(storedDataString);
        }

        // Xóa item với imdb_id tương ứng khỏi object
        delete storedData[imdb_id];

        // Cập nhật local storage
        localStorage.setItem('favoriteList', JSON.stringify(storedData));

        // Cập nhật state để render lại
        setWatchList(Object.values(storedData));
    };
    let navigate = useNavigate()
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
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
                toast.success('Link copied');
            })
            .catch((error) => {
                toast.error('Failed to copy link');
                console.error('Error copying link:', error);
            });
    };

    const [anchorRankingEl, setAnchorRankingEl] = useState<null | HTMLElement>(null);
    const handleRankingClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorRankingEl(event.currentTarget);
    };

    const handleRankingClose = () => {
        setAnchorRankingEl(null);
    };
    const [selectedRankingOption, setSelectedRankingOption] = useState(null);

    const [menuItemNum, setMenuItemNum] = useState(''); // Default view is 'detail'

    function compareReleaseDates(a: any, b: any) {
        const releaseDateA = new Date(a.birthday);
        const releaseDateB = new Date(b.birthday);
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
            default:
                break;
        }
        setMenuItemNum(menuItemNum);
        handleRankingClose();
    };
    const [currentView, setCurrentView] = useState('Detail'); // Default view is 'detail'

    const switchView = (view: any) => {
        setCurrentView(view);
    };

    const renderMovieItem = (movie: any, movieIndex: number, currentView: any) => {
        // Implement rendering logic based on the currentView (detail, grid, compact)
        if (movieIndex >= 50) {
            return null;
        }

        switch (currentView) {
            case 'Detail':
                return (
                    <section className="px-2 border-t border-r border-l border-gray-500  w-full" key={movieIndex}
                    >
                        <div className="text-black font-sans w-full " >
                            <div className="flex w-full  items-center py-2 px-2">
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <img onClick={() => navigate(`/person/${movie?.id}`)}
                                            src={`https://image.tmdb.org/t/p/w500${movie?.profile_path}`}
                                            alt="product images"
                                            onError={handleImageError} className="w-28 h-40 hover:opacity-80" />
                                        <div>
                                            <p className="font-bold hover:opacity-50 line-clamp-2 ">{movieIndex}. {movie?.title ? movie?.title : movie?.name}</p>
                                            <div className="flex flex-wrap gap-2">
                                                <div>
                                                    {movie?.birthday &&
                                                        new Date(movie?.birthday).toLocaleDateString('en-US', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })
                                                    }
                                                </div>
                                                <div>||</div>
                                                <div> {movie?.known_for_department}</div>
                                            </div>
                                            <div className="mt-1 lg:line-clamp-none line-clamp-4">
                                                {movie?.biography && movie?.biography?.length > 400 ?
                                                    movie?.biography?.slice(0, 400) + "..." :
                                                    movie?.biography}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="ml-auto" onClick={() => removeFromWatchList(movie.id)} >
                                    <Tooltip title="Click here to remove from watchlist">
                                        <i className="fa-solid fa-trash px-2 text-green-500 text-xl"></i>
                                    </Tooltip>
                                </div>
                            </div>

                        </div>
                    </section>

                )
            case 'Grid':
                return (
                    <section className=" w-1/2 lg:w-1/6 md:w-1/3 px-2 " key={movieIndex}
                    >
                        <div className="text-black font-sans  shadow-sm shadow-black  " >
                            <div className=" items-center ">
                                <div className="mt-2">
                                    <div className="items-center gap-2">
                                        <div className="px-2">{movieIndex}</div>
                                        <img onClick={() => navigate(`/movie/${movie?.id}`)}
                                            src={`https://image.tmdb.org/t/p/w500${movie?.profile_path}`}
                                            alt="product images"
                                            onError={handleImageError} className="w-full  hover:opacity-80" />
                                        <div className="px-2 py-2 w-full">
                                            <div className="flex flex-wrap items-center gap-2 justify-start text-left">
                                                <div className="h-12 w-full ">
                                                    <p className="font-bold hover:opacity-50 line-clamp-2"> {movie?.name}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {movie?.known_for_department}
                                                </div>

                                                <div className="">
                                                    {movie?.birthday &&
                                                        new Date(movie?.birthday).toLocaleDateString('en-US', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2 py-2" onClick={() => removeFromWatchList(movie.id)}   >
                                    <button className="px-2 py-1 bg-gray-300 hover:bg-blue-300 text-blue-500 w-full rounded-md font-medium text-center items-center">
                                        Remove
                                    </button>

                                </div>
                            </div>
                        </div>
                    </section>
                )
        }
    }

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black pb-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-white text-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <div className="lg:max-w-full md:w-screen ">
                        <div className="flex mt-3 border-b-2 border-gray py-4">
                            <div className="items-center ">
                                <h2 className="text-2xl font-bold ">Your Favorite Actor List</h2>
                                <p className="text-xl font-semibold text-gray-500">Public</p>
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
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem>
                                        <div className="fb-share-button" data-href="https://themoviedb-five.vercel.app/" data-layout="button_count" data-size="small">
                                            <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://themoviedb-five.vercel.app/" className="fb-xfbml-parse-ignore">
                                                <ListItemIcon>
                                                    <i className="fa-brands fa-facebook text-2xl"></i>
                                                </ListItemIcon>
                                                Facebook
                                            </a>
                                        </div>
                                    </MenuItem>

                                    <MenuItem>
                                        <blockquote className="twitter-tweet items-center">
                                            <ListItemIcon>
                                                <i className="fa-brands fa-twitter text-2xl"></i>
                                            </ListItemIcon>
                                            <a href="https://twitter.com/intent/tweet?url=https://themoviedb-five.vercel.app/" className="twitter-share-button">
                                                Twitter
                                            </a>
                                        </blockquote>
                                    </MenuItem>
                                    <MenuItem>
                                        <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://themoviedb-five.vercel.app."
                                            title="Share by Email">
                                            <ListItemIcon>
                                                <i className="fa-regular fa-envelope text-2xl"></i>
                                            </ListItemIcon>
                                            Email Link
                                        </a>
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
                        <div className="flex border-b-2 border-gray py-2 items-center ">
                            <div className="items-center ">
                                <h2 className="lg:text-2xl text-lg font-bold ">{watchList?.length} Title</h2>
                            </div>
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center text-lg text-gray-400 ">Sort by </p>
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
                                            // border: '2px dashed',
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
                                </Menu>
                                <div className="flex items-center ml-auto gap-4 px-2 py-2" >
                                    <Avatar sx={{
                                        width: 32, height: 32, bgcolor: 'white', color: 'black', padding: '20px', ":hover": {
                                            opacity: '50%'
                                        }
                                    }}>
                                        {currentView == "Detail" ?
                                            (
                                                <Tooltip title="Detail View" className={"text-blue-500"} onClick={() => switchView('Grid')}>
                                                    <i className="fa-solid fa-list-ul "></i>
                                                </Tooltip>
                                            ) :
                                            (
                                                <Tooltip title="Grid View" className={"text-blue-500"}>
                                                    <AppsIcon onClick={() => switchView('Detail')} />
                                                </Tooltip>
                                            )
                                        }
                                    </Avatar>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="lg:max-w-full md:w-screen py-4 px-2 ">
                                <div
                                    style={{
                                        position: "relative", backgroundSize: "cover", backgroundPosition: "center",
                                        display: 'flex', flexWrap: 'wrap'
                                    }}>
                                    {watchList
                                        .sort((a, b) => {
                                            if (menuItemNum === '5') {
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
                                            else if (menuItemNum === '1') {
                                                return b?.vote_average - a?.vote_average;
                                            }
                                            else if (menuItemNum === '2') {
                                                return b?.id - a?.id;
                                            }
                                            else if (menuItemNum === '3') {
                                                return compareReleaseDates(a, b);

                                            }
                                            else if (menuItemNum === '4') {
                                                return b?.vote_count - a?.vote_count;

                                            }
                                            else if (menuItemNum === '6') {
                                                return b?.popularity - a?.popularity;
                                            }
                                            else {
                                                return 0
                                            }
                                        })
                                        .map((m, index) => renderMovieItem(m, index, currentView))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center mt-10 ">
                    <Footer />
                </div>
            </div>
        </div >





    );
}