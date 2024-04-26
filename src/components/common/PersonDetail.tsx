import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ShareIcon from '@mui/icons-material/Share';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export interface TwoMovieRowProps {
    singleMovieList: any
}

export default function PersonDetail({
    singleMovieList
}: TwoMovieRowProps) {
    let navigate = useNavigate()
    const scrollToElement = (elementId: any) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start", // Cuộn trang để phần tử hiển thị ở đầu trang
                inline: "nearest" // Cuộn trang để phần tử hiển thị ở phía trên cửa sổ trình duyệt
            });
        }
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
    return (
        <section className="" style={{
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <div className="text-white font-sans font-medium cursor-pointer" >
                <div style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w500${singleMovieList[0]?.profile_path}')`,
                    position: "absolute", width: "100%", height: "100%", opacity: "0.5",
                    backgroundSize: "cover", backgroundPosition: "center",
                    backgroundColor: 'black'
                }}>

                </div>

                <div style={{ position: "relative", zIndex: "1" }}>

                    <div className="flex flex-row justify-end gap-2 items-center ">
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('personalDetails')}>Biography</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('personPhotos')}>Photos</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('personKnowFor')}>Know For</div>
                        <div className=" py-2 hidden lg:block ">•</div>
                        <div className=" py-2 hidden lg:block hover:underline" onClick={() => scrollToElement('personVideos')}>Videos</div>
                        <button className="py-2 px-3 border-l  border-r  border-gray-400 hidden lg:block hover:underline" onClick={() => navigate('/IMDbPro')}>IMDbPro</button>
                        {/* <button className="py-2 px-3 border-r border-gray-400 flex items-center gap-2">
                            <i className="fa-solid fa-icons"></i>
                            <p>All Topic</p>
                        </button> */}
                        <IconButton
                            onClick={handleShareClick}
                            size="small"
                            aria-controls={openShare ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openShare ? 'true' : undefined}
                        >
                            {/* <Avatar sx={{
                                bgcolor: 'none', color: 'white', ":hover": {
                                    bgcolor: 'gray', opacity: '50%'
                                }
                            }}> */}
                                <ShareIcon sx={{color:'white',mr:'10px'}} />
                            {/* </Avatar> */}
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
                    <div className="justify-between">
                        <div className="items-center">
                            <div className="mr-4 text-2xl">{singleMovieList[0]?.name}</div>
                            <div className="flex space-x-4 text-stone-400">
                                {singleMovieList[0]?.known_for_department}
                            </div>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-12 gap-y-4 h-full">
                        <div className="hidden lg:block col-span-3 bg-gray-200  h-full">
                            <img src={`https://image.tmdb.org/t/p/w500${singleMovieList[0]?.profile_path}`} alt="product images" />
                        </div>
                        <div className="lg:col-span-7 md:col-span-12 lg:ml-2 bg-black relative"
                            onClick={() => navigate(`/video/${singleMovieList[0]?.combined_credits?.cast[0]?.id}`)}>
                            <div className='min-h-60'
                                style={{
                                    backgroundImage: `url('https://image.tmdb.org/t/p/w300/${singleMovieList[0]?.combined_credits?.cast[0]?.poster_path}')`,
                                    width: "100%",
                                    height: "100%",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundColor: 'black'
                                }}
                            >
                            </div>
                            <div className="absolute bottom-0 left-0 flex justify-start items-center">
                                <div className='flex gap-2 px-2 py-2'>
                                    <i className="fa-solid fa-circle-play text-white text-5xl"></i>
                                    <div>
                                        <div className='flex items-end text-center gap-2' >
                                            <div className='text-2xl '>Play Clip</div>
                                            <div className='text-lg'>
                                                {singleMovieList[0]?.combined_credits?.cast[0]?.vote_count &&
                                                    <>
                                                        {singleMovieList[0]?.combined_credits?.cast[0]?.vote_count.toString().slice(0, 1)}:
                                                        {singleMovieList[0]?.combined_credits?.cast[0]?.vote_count.toString().slice(1, 3)}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        <div>{singleMovieList[0]?.combined_credits?.cast[0]?.title}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block col-span-2 h-full ml-2 overflow-hidden">
                            <div onClick={() => navigate(`/video/${singleMovieList[0]?.combined_credits?.cast[0]?.id}`)}
                                className="bg-red-200 flex flex-col justify-center items-center h-1/2 mb-1 hover:bg-opacity-90 ">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <VideoLibraryIcon />
                                    </div>
                                    <div className="text-center">
                                        {singleMovieList[0]?.combined_credits?.cast?.length > 99 ? "99+" : singleMovieList[0]?.combined_credits?.cast?.length} Videos
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => navigate(`/image/person/${singleMovieList[0]?.id}`)}
                                className="bg-red-200 flex flex-col justify-center items-center h-1/2 mt-1 hover:bg-opacity-90">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <PhotoLibraryIcon />
                                    </div>
                                    <div className="text-center">
                                        {singleMovieList[0]?.images?.profiles?.length > 99 ? "99+" : singleMovieList[0]?.images?.profiles?.length} Photos
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bg-black relative px-2 py-2">
                        <div className=" grid-cols-12 hidden md:grid gap-6 h-full">
                            <div className=" col-span-8  bg-black  ">
                                <div className="flex gap-2 mb-1 border-b border-gray-500 py-2">
                                    {singleMovieList[0]?.biography && singleMovieList[0]?.biography.length > 400 ?
                                        singleMovieList[0]?.biography?.slice(0, 400) + "..." :
                                        singleMovieList[0]?.biography}
                                </div>
                                <div className="flex justify-between gap-3 py-2 items-center">
                                    <div className='gap-2 flex items-center '>
                                        <div className="font-bold text-white">More at IMDbPro</div>
                                        <div className='py-2 text-blue-500 flex gap-2'>
                                            <div className="hover:underline" onClick={() => navigate('/IMDbPro')}>Contact Info</div>
                                            <div className="">•</div>
                                            <div className="hover:underline" onClick={() => navigate('/IMDbPro')}>Agent Info</div>
                                            <div className="">•</div>
                                            <div className="hover:underline" onClick={() => navigate('/IMDbPro')}>Resume</div>
                                        </div>


                                    </div>
                                    <i className="fa-solid fa-arrow-up-right-from-square hover:text-yellow-300" onClick={() => navigate('/IMDbPro')}></i>
                                </div>

                            </div>
                            <div className=" col-span-4">
                                <div className="w-full h-full items-center justify-center text-center">
                                    <div className="flex flex-col justify-center items-center h-full ">
                                        <button className="items-center w-full  border-2 border-black  ">
                                            <div className="py-2 px-3 border-gray-400 flex items-center gap-2 grow  text-center h-full">
                                                <p className='font-bold'>Born</p>
                                                <p>{singleMovieList[0]?.birthday &&
                                                    new Date(singleMovieList[0]?.birthday).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })
                                                }
                                                </p>
                                            </div>

                                        </button>
                                        <button className="items-center w-full  border-2 border-black bg-yellow-300 ">
                                            <div className="py-2 px-3 border-gray-400 flex items-center gap-2 grow  text-center h-full">
                                                <i className="fa-solid fa-plus text-black"></i>
                                                <div className="text-left">
                                                    <p className="text-black font-bold">Add to list</p>
                                                </div>
                                            </div>

                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-black relative  lg:hidden'>
                        <div className='grid grid-cols-2 gap-1' >
                            <div className='col-span-1'>
                                <div
                                    onClick={() => navigate(`/video/${singleMovieList[0]?.combined_credits?.cast[0]?.id}`)}
                                    className='h-full aligns-center item-center justify-center px-2 py-2 bg-gray-500 text-center flex'>
                                    <div>   <VideoLibraryIcon />   </div>
                                    {singleMovieList[0]?.combined_credits?.cast?.length > 99 ? "99+" : singleMovieList[0]?.combined_credits?.cast?.length} Videos
                                </div>
                            </div>
                            <div className='col-span-1'>
                                <div
                                    onClick={() => navigate(`/image/person/${singleMovieList[0]?.id}`)}
                                    className='flex h-full aligns-center item-center justify-center px-2 py-2 bg-gray-500 text-center'>
                                    <div>   <PhotoLibraryIcon /></div>
                                    {singleMovieList[0]?.images?.profiles?.length > 99 ? "99+" : singleMovieList[0]?.images?.profiles?.length} Photos
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-1 mt-2' >
                            <div>
                                <img src={`https://image.tmdb.org/t/p/w500${singleMovieList[0]?.profile_path}`} alt="product images" />
                            </div>
                            <div className='col-span-2 px-2 '>
                                <div>
                                    <p className="py-2 ">
                                        {singleMovieList[0]?.biography && singleMovieList[0]?.biography.length > 120 ?
                                            singleMovieList[0]?.biography.slice(0, 120) + "..." :
                                            singleMovieList[0]?.biography}
                                    </p>
                                </div>
                                <div className='gap-2'>
                                    <p>{singleMovieList[0]?.birthday &&
                                        new Date(singleMovieList[0]?.birthday).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })
                                    }
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='px-3 py-2 border-b border-gray-300 '>
                            <button className="flex items-center w-full  border-2 border-black bg-yellow-300 ">
                                <div className="py-2 px-3 border-gray-400 flex items-center gap-2 grow  text-center h-full">
                                    <i className="fa-solid fa-icons text-black"></i>
                                    <div className="text-left">
                                        <p className="text-black font-bold">Add to list</p>
                                    </div>
                                </div>
                                <div className="py-3 px-3  flex items-center border-gray-500 border-l-2 justify-center h-full ">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </button>

                        </div>
                        <div className=" border-b border-gray-300 gap-3 py-2 items-center aligns-center px-2">
                            <div className="flex gap-3 items-center text-blue-500">
                                <i className="fa-solid fa-phone"></i>
                                <p onClick={() => navigate(`/`)} className="hover:underline flex gap-2">
                                    <span className="text-blue-500">View contact info at IMDbPro</span>
                                </p>
                                <i className="fa-solid fa-arrow-up-right-from-square text-blue-500"></i>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </section >
    )
}