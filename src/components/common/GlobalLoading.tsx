import { Box, LinearProgress, Paper, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Player } from '@lottiefiles/react-lottie-player';
import Copy from '../../assets/lottie/AnimationCatWitchHat.json'


export default function GlobalLoading() {
    const { globalLoading } = useSelector((state: RootState) => state.globalLoading);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (globalLoading) {
            setIsLoading(true);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [globalLoading]);

    return (
        <>
            {/* <Paper sx={{
                opacity: isLoading ? 1 : 0,
                pointerEvents: "none",
                transition: "all .3s ease",
                position: "fixed",
                width: "100vw",
                height: "100%",
                bgcolor: 'black',
                zIndex: 999,
            }}>
                <Toolbar />
                <LinearProgress />
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                    <Typography variant="h1" fontWeight="700" fontSize="1.7rem" className="text-white">
                        Loading<span style={{ color: 'red' }}>IMDb</span>
                    </Typography>
                </Box>
            </Paper> */}
            <Paper sx={{
                opacity: isLoading ? 1 : 0,
                pointerEvents: "none",
                transition: "all .3s ease",
                position: "fixed",
                width: "100vw",
                height: "100%",
                bgcolor: 'black',
                zIndex: 999,
            }}>
                <Player
                    src={Copy}
                    autoplay={true}
                    speed={1.5}
                    // hover
                    className="w-full h-screen text-white"
                    loop
                />
            </Paper>

        </>
    );
};

