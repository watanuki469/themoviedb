import ShareIcon from '@mui/icons-material/Share';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { default as View, default as ViewTable } from '../../modules/View';
import { LanguageContext } from '../../pages/LanguageContext';
import apiController from '../../redux/client/api.Controller.';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAward } from '../../redux/reducers/award.reducer';
import { setListGenre } from '../../redux/reducers/genre.reducer';
import { AppDispatch } from '../../redux/store';
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";

export default function OscarLayout() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const oscarList = useAppSelector((state) => state.award.marvelList)
    const mostPopularTv = useAppSelector((state) => state.award.marvelList)

    useEffect(() => {
        // dispatch(setGlobalLoading(true));
        dispatch(fetchAward());
        // setTimeout(() => {
        //     dispatch(setGlobalLoading(false));
        // }, 1000);
    }, []);

    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre)
    const fetchGenre = () => (dispatch: AppDispatch) => {
        apiController.apiGenre.genre('movie')
            .then((data: any) => {
                if (data && data?.genres) {
                    dispatch(setListGenre(data?.genres)); // Adjust the dispatch based on actual response structure
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        dispatch(fetchGenre());
    }, [dispatch]);

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
    console.log(oscarList);
    

    return (
        <div className=" min-h-screen cursor-pointer">
            <div className="bg-black pb-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-white  px-2">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <div className="lg:max-w-full w-full ">
                        <div className="flex mt-3 items-center  ">
                            <h2 className="lg:text-2xl text-lg font-bold text-black ">IMDb {translations[language]?.chart}</h2>
                            <div className="flex items-center ml-auto gap-2" >
                                <p className="flex items-center lg:text-2xl  text-lg text-black ">{translations[language]?.share} </p>
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
                        <div className="">
                            <div className="flex items-center ">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="lg:text-2xl text-lg font-bold text-black ">IMDb {translations[language]?.top250Movie}</h2>
                            </div>
                            <p className="text-gray-500 py-2">{translations[language]?.voter}</p>
                        </div>

                    </div>
                    <ViewTable viewList={oscarList} moreToExploreList={mostPopularTv} genreList={listGenreFromApi} mediaType={'tv'}></ViewTable>
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