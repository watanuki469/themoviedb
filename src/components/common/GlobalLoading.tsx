import { useSelector } from "react-redux";
import { Paper, Box, LinearProgress, Toolbar, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";

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
    const theme = useTheme();



    return (
        <>
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
            </Paper>
        </>
    );
};

