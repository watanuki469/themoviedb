import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Divider, Fade, MenuItem, Popper } from "@mui/material";
import Menu from '@mui/material/Menu';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListSearch } from "../../redux/reducers/search.reducer";
import { AppDispatch } from "../../redux/store";



interface MenuItem {
    id: number;
    label: string;
    icon: string;
}

export default function SearchBar() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const [mediatype, setMediaType] = useState('multi');
    const [query, setQuery] = useState('');
    const [anchorUserEl, setAnchorUserEl] = useState<null | HTMLElement>(null);
    const openUser = Boolean(anchorUserEl);

    const menuItems = [
        { id: 1, label: 'multi', icon: 'fa-magnifying-glass' },
        { id: 2, label: 'movie', icon: 'fa-sharp fa-solid fa-film' },
        { id: 3, label: 'tv', icon: 'fa-tv' },
        { id: 4, label: 'person', icon: 'fa-user-group' },
    ];
  

    const anchorRef = useRef(null);

    const [open, setOpen] = useState(false);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorUserEl(event.currentTarget);
    };
    const handleClose = (index: any) => {
        setAnchorUserEl(null);
        setMediaType(index)
    };

    const fetchSearch = () => (dispatch: AppDispatch) => {
        Promise.all([
            apiController.apiSearch.search(mediatype, query),
        ])
            .then((data: any) => {
                if (data) {
                    dispatch(setListSearch(data));
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const searchList = useAppSelector((state) => state.search.listSearch)

    useEffect(() => {
        if (query.trim().length === 0) {
        }
        else {
            dispatch(fetchSearch());
        }
        function handleResize() {
            const isLargeScreen = window.innerWidth > 768; // Điều kiện cho màn hình lớn
            if (isLargeScreen && open) {
                setOpen(false);
            }
            else if (!isLargeScreen && open) {
                setOpen(false);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }

    }, [mediatype, query, open]);

    const onQueryChange = (e: any) => {
        const newQuery = e.target.value;
        setOpen(!!newQuery);
        setQuery(newQuery);
    };
    const handleImageError = (e: any) => {
        const imgElement = e.currentTarget as HTMLImageElement;
        imgElement.src = 'https://www.dtcvietnam.com.vn/web/images/noimg.jpg'; // Set the fallback image source here
    };

    return (
        <div className="relative flex text-left w-full h-full">
            <Button
                id="demo-customized-button"
                aria-controls={openUser ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openUser ? 'true' : undefined}
                sx={{ bgcolor: 'white', color: 'black', borderRadius: '0' }}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {mediatype.toString()}
            </Button>
            <Menu
                elevation={0}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorUserEl}
                open={openUser}
                onClose={() => setAnchorUserEl(null)}
            >
                {menuItems.map((item: any, index: any) => (
                    <MenuItem disableRipple key={index} onClick={() => handleClose(item.label)}>
                        <div className='items-start'>
                            <a key={item.id} href="#" className=" text-gray-700 capitalize hover:opacity-80 flex items-center" role="menuitem">
                                <i className={`mr-2 fas ${item.icon}`}></i>
                                {item.label}
                            </a>
                        </div>
                    </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={() => navigate(`/search`)}>
                    <div className='flex items-center gap-2'>
                        <i className="fa-solid fa-file-circle-question"></i>
                        <p>  Advanced Search</p>
                    </div>
                </MenuItem>

            </Menu>

            <div className="relative flex-grow">
                <input type="text" name="price" id="price" ref={anchorRef}
                    value={query}
                    onChange={onQueryChange}
                    className="w-full h-full border-0 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search IMDb..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <div className="flex items-center mr-3">
                        <i className="fa-solid fa-search text-gray-500" />
                    </div>
                </div>
            </div>
            <Popper
                anchorEl={anchorRef?.current}
                open={open}
                transition
                placement="bottom-start"
                sx={{
                    zIndex: 1,
                    width: anchorRef.current?.['offsetWidth'],
                    transition: "width 0s ease-in-out 1s",
                }}
            >

                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box
                            // onClick={handleCloseButNotDeleteQuery}
                            sx={{
                                border: 1,
                                p: 1,
                                bgcolor: "#263238",
                                color: "#999",
                                width: "100%",
                                height: '100%',
                            }}>
                            {searchList[0]?.results?.map((item: any, index: any) => (
                                <div className="mt-1" key={index}
                                >
                                    <div className="flex gap-2 px-2 py-2 border-gray-500 border-b-2 "
                                        onClick={() => {
                                            if (mediatype === 'person') {
                                                navigate(`/person/${item.id}`);
                                            } else if (mediatype === "movie") {
                                                navigate(`/movie/${item.id}`);
                                            }
                                            else {
                                                navigate(`/tv/${item.id}`);
                                            }
                                        }}>

                                        <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path ? item?.poster_path : item?.profile_path}`} alt="product images"
                                            className="w-20 h-28"
                                            onError={handleImageError} />
                                        <div>
                                            <p className="text-white text-lg"> {item?.original_name ? item.original_name : item?.original_title}</p>
                                            {item?.media_type !== 'person' && (
                                                <p> {item?.first_air_date ? item.first_air_date?.slice(0, 4) : item.release_date?.slice(0, 4)}</p>
                                            )}
                                            <div className="items-center flex flex-wrap  ">
                                                <p>
                                                    {item?.known_for_department}, {item?.known_for?.[0]?.title} (
                                                    {item?.known_for?.[0]?.release_date?.slice(0, 4)})
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Box>
                    </Fade>
                )}
            </Popper>
        </div>

    )
}