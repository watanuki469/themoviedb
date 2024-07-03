import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../pages/LanguageContext";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import ShareIcon from '@mui/icons-material/Share';
import { Player } from '@lottiefiles/react-lottie-player';
import Twitter from '../assets/lottie/AnimationTwitter.json'
import Facebook from '../assets/lottie/AnimationFB.json'
import Mail from '../assets/lottie/AnimationMail.json'
import Copy from '../assets/lottie/AnimationCopy.json'

export interface SwiperRowProps {
    bgColor: any
}

export default function Share({
    bgColor,
}: SwiperRowProps) {
    let navigate = useNavigate()
    const context = useContext(LanguageContext);
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

    if (!context) {
        return null;
    }

    const { language, translations, handleLanguageChange } = context;
    return (
        <div>
            <IconButton
                onClick={handleShareClick}
                size="small"
                aria-controls={openShare ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openShare ? 'true' : undefined}
            >
                <Avatar sx={{
                    width: 32, height: 32, bgcolor: 'transparent', color: `${bgColor}`, padding: '20px', ":hover": {
                     opacity: '50%'
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
                    <div className="fb-share-button " data-href="https://themoviedb-five.vercel.app/" data-layout="button_count" data-size="small">
                        <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://themoviedb-five.vercel.app/" className="fb-xfbml-parse-ignore flex items-center gap-2">
                            <Player
                                src={Facebook}
                                autoplay={true}
                                speed={1.0}
                                // hover
                                className="h-7 w-7 text-white"
                                loop
                            />
                            <div>Facebook</div>
                        </a>
                    </div>
                </MenuItem>

                <MenuItem>
                    <div className='gap-2 flex items-center '>
                        <Player
                            src={Twitter}
                            autoplay={true}
                            speed={1.0}
                            // hover
                            className="h-7 w-7 text-white"
                            loop
                        />
                        <a target="_blank" href="https://twitter.com/intent/tweet?url=https://themoviedb-five.vercel.app/" className="twitter-share-button">
                            Twitter
                        </a>
                    </div>
                </MenuItem>
                <MenuItem>
                    <a target="_blank" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://themoviedb-five.vercel.app."
                        title="Share by Email" className='gap-2 flex items-center'>
                        <Player
                            src={Mail}
                            autoplay={true}
                            speed={1.0}
                            // hover
                            className="h-7 w-7 text-white"
                            loop
                        />
                        <div>Email Link</div>
                    </a>
                </MenuItem>

                <MenuItem onClick={handleCopyLink}>
                    <div className='gap-2 flex items-center'>
                        <Player
                            src={Copy}
                            autoplay={true}
                            speed={1.0}
                            // hover
                            className="h-7 w-7 text-white"
                            loop
                        />
                        <div>Copy Link</div>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}
