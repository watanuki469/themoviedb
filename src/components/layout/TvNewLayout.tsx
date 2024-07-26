import { IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CelebrityNew from "../../modules/CelebrityNew";
import TopNew from "../../modules/TopNew";
import TvNew from "../../modules/TvNew";
import { fetchAllMovieNew } from "../../redux/client/api.MovieNew";
import TopBar from "../common/TopBar";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { useAppDispatch } from "../../redux/hooks";
import axiosTvNew from "../../redux/axios/axiosTVNew";
import Footer from "../common/Footer";

export default function TvNewLayout() {
    const [movieNews, setMovieNews] = useState<any[]>([]);
    let navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setGlobalLoading(true));
        axiosTvNew.get('', {
            params: {
                category: 'TV',
                first: '20'
            }
        })
            .then((response) => {
                setMovieNews(response?.data?.news?.edges || []);
            })
            .catch((error) => {
                console.error('Error fetching Tv news:', error);
            });
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }, []);

    function splitTextIntoParagraphs(text: any) {
        let paragraphs = [];
        if (text) {
            const sentences = text.split('.');
            paragraphs = sentences.map((item: any, index: any) => (
                <div key={index} className="py-2">
                    {index === sentences?.length - 1 ? item?.trim() + '...' : item?.trim() + '.'}
                </div>
            ));
        }
        return paragraphs;
    }
    const [anchorShareEl, setAnchorShareEl] = useState<null | HTMLElement>(null);
    const openShare = Boolean(anchorShareEl);
    const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorShareEl(event.currentTarget);
    };
    const handleShareClose = () => {
        setAnchorShareEl(null);
    };

    return (
        <div className="min-h-screen cursor-pointer bg-white text-black">
            <div className="bg-black pb-1">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center ">
                    <TopBar />
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center bg-white px-2 py-2">
                    <section className='relative overflow-hidden min-h-screen'>
                        <div className="md:grid grid-cols-12 gap-3  w-full">
                            <div className="lg:col-span-8 col-span-12 w-full ">
                                <div className="">
                                    <div className="flex items-center ">
                                        <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                        <h2 className="text-2xl font-bold text-black py-4">TV News</h2>
                                    </div>
                                </div>
                                <div className="border-2 border-gray-500 px-4 py-4">
                                    {movieNews?.map((article, index) => (
                                        <div key={index}>
                                            <div className="gap-2">
                                                <a className="font-bold hover:underline py-2" href={`${article?.node?.externalUrl}`}>
                                                    {article?.node?.articleTitle?.plainText}
                                                    <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>

                                                </a>
                                                <img className="py-2" src={`${article?.node?.image.url}`}>
                                                </img>
                                                <div className="py-2">
                                                    {splitTextIntoParagraphs(article?.node?.text?.plainText)}
                                                </div>
                                                <a className="py-2 text-blue-500 hover:underline" href={`${article?.node?.source?.homepage?.url}`}>
                                                    See full article at {article?.node?.source?.homepage?.label}
                                                    <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                                                </a>
                                                <div className="flex items-center">
                                                    <div className="flex gap-2">
                                                        {article?.node?.date && (
                                                            <>
                                                                <div className="text-gray-500">{article?.node?.date?.slice(0, 10)}</div>
                                                                <div>•</div>
                                                            </>
                                                        )}
                                                        {article?.node?.byline && (
                                                            <>
                                                                <div className="text-gray-500">{article?.node?.byline}</div>
                                                                <div>•</div>
                                                            </>
                                                        )}
                                                        {article?.node?.source?.homepage?.label && (
                                                            <div className="text-blue-500 hover:underline">{article?.node?.source?.homepage?.label}
                                                                <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-auto">
                                                        <IconButton
                                                            onClick={handleShareClick}
                                                            size="small"
                                                            aria-controls={openShare ? 'account-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={openShare ? 'true' : undefined}
                                                        >
                                                            <div className="rounded-full bg-blue-500 p-2 w-10 h-10 flex justify-center items-center">
                                                                {anchorShareEl != null ?
                                                                    <i className="text-white fa-solid fa-xmark"></i>
                                                                    :
                                                                    <i className="text-white fa-solid fa-ellipsis-vertical"></i>
                                                                }
                                                            </div>
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
                                                                    '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, },
                                                                    '&::before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0, },
                                                                },
                                                            }}
                                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                        >
                                                            <div className=''>
                                                                <MenuItem>
                                                                    <a className="font-bold" href={`${article?.node?.externalUrl}`}>Permalink</a>
                                                                </MenuItem>
                                                                <MenuItem className="font-bold" onClick={() => navigate('/IMDbPro')}>
                                                                    <p>Report This</p>
                                                                </MenuItem>
                                                            </div>
                                                        </Menu>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:col-span-4 col-span-5  h-full px-2 py-2">
                                <div className="">
                                    <div className="flex items-center ">
                                        <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                        <h2 className="text-2xl font-bold text-black py-4">More to explore</h2>
                                    </div>
                                    <TopNew />
                                    <TvNew />
                                    <div className="sticky top-0 right-0 left-0">
                                        <CelebrityNew />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="bg-black">
                <div className="w-full lg:max-w-5xl mx-auto aligns-center">
                    <Footer />
                </div>
            </div>
        </div>
    )
}