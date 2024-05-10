import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export interface TwoTvRowProps {
    singleTvList: any
}

export default function TvReview({
    singleTvList,
}: TwoTvRowProps) {
    let navigate = useNavigate()
    const [randomNumber1, setRandomNumber1] = useState(0);
    const [randomNumber2, setRandomNumber2] = useState(0);

    useEffect(() => {
        // Tạo số ngẫu nhiên từ 0 đến 999 cho cả hai số
        const newRandomNumber1 = Math.floor(Math.random() * 1000);
        let newRandomNumber2;
        do {
            newRandomNumber2 = Math.floor(Math.random() * 1000);
        } while (newRandomNumber2 === newRandomNumber1); // Đảm bảo số thứ hai khác số đầu tiên

        // Đặt số ngẫu nhiên vào state
        setRandomNumber1(newRandomNumber1);
        setRandomNumber2(newRandomNumber2);
    }, []); // Không có dependencies, vì chúng ta chỉ muốn tạo số ngẫu nhiên một lần khi component được render
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
        <section className=" md:grid lg:py-4  lg:px-4 md:py-0 md:px-0">
            <div className="text-black font-sans " >
                <div style={{ position: "relative" }}>
                    <div className="bg-white shadow-sm shadow-black w-full py-4 px-4 ">
                        <div className="text-black flex py-4 ">
                            <div className="flex items-center">
                                <div className="items-center">
                                    <div className="bg-yellow-300 text-black py-2 px-2">Features Reviews</div>
                                </div>
                            </div>
                            <div className="flex items-center ml-auto gap-2" >
                                <i className="fa-solid fa-star text-yellow-300 text-sm ml-2"></i>
                                <div>
                                    <span className="">
                                        {typeof singleTvList[0]?.reviews.results[0]?.author_details?.rating === 'number' ?
                                            (singleTvList[0]?.reviews.results[0]?.author_details?.rating % 1 === 0 ?
                                                singleTvList[0]?.reviews.results[0]?.author_details?.rating?.toFixed(0) :
                                                singleTvList[0]?.reviews.results[0]?.author_details?.rating?.toFixed(1)
                                            )
                                            :
                                            'N/A'
                                        }

                                    </span>
                                    <span className="text-stone-400">  /10</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            {singleTvList[0]?.reviews?.results?.slice(0, 1).map((item: any, index: any) => (
                                <div className='flex text-black' key={index}>
                                    <div>
                                        <div className='font-bold text-xl'>A review by {item.author}</div>
                                        <div>
                                            <p>
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {singleTvList[0]?.reviews?.results?.length > 0 ? (
                                <div>
                                    <div className=' flex py-2 px-1 mt-1'>
                                        <div className='flex items-center gap-1 h-full'>
                                            <i className="fa-solid fa-thumbs-up text-xl"></i>
                                            <div>helpful</div>
                                            <div>•</div>
                                            <div>{randomNumber1}</div>
                                            <i className="fa-solid fa-thumbs-up fa-rotate-180 ml-2 text-xl"></i>
                                            <div>{randomNumber2}</div>
                                        </div>
                                        <div className='ml-auto'>

                                            <IconButton
                                                onClick={handleShareClick}
                                                size="small"
                                                aria-controls={openShare ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openShare ? 'true' : undefined}
                                                sx={{ backgroundColor: 'white', }}
                                            >
                                                <Avatar sx={{
                                                    bgcolor: 'white', color: 'white', ":hover": {
                                                        bgcolor: 'gray', opacity: '50%'
                                                    }
                                                }}>

                                                    <MoreVertIcon sx={{ color: 'black' }} />
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
                                </div>
                            )
                                : (<div>

                                </div>)}

                        </div>
                    </div>
                    <div className=''>
                        {singleTvList[0]?.reviews?.results?.length > 0 ? (
                            <div className='flex gap-2 px-2 py-2'>
                                <p className='text-blue-500'>{singleTvList[0]?.reviews?.results[0]?.author}</p>
                                <p>•</p>
                                <p>{singleTvList[0]?.reviews.results[0]?.created_at?.slice(0, 10)}</p>
                            </div>
                        ) : (
                            <div>
                            </div>
                        )}

                    </div>


                </div>
            </div>
        </section >
    )
}