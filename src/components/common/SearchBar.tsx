import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Divider, Fade, MenuItem, Popper } from "@mui/material";
import Menu from '@mui/material/Menu';
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleImageError } from '../../modules/BaseModule';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchSearch } from "../../redux/reducers/search.reducer";
import { LanguageContext } from '../../pages/LanguageContext';
import { toast } from 'react-toastify';

interface MenuItem {
    id: number;
    label: string;
    icon: string;
}

export default function SearchBar() {
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;
    const dispatch = useAppDispatch();
    const [mediatype, setMediaType] = useState('multi');
    const [query, setQuery] = useState('');
    const [anchorUserEl, setAnchorUserEl] = useState<null | HTMLElement>(null);
    const openUser = Boolean(anchorUserEl);

    const menuItems = [
        { id: 1, label: `multi`, display: `${translations[language]?.multi}`, icon: 'fa-magnifying-glass' },
        { id: 2, label: 'movie', display: `movie`, icon: 'fa-sharp fa-solid fa-film' },
        { id: 3, label: 'tv', display: `tv`, icon: 'fa-tv' },
        { id: 4, label: 'person', display: `person`, icon: 'fa-user-group' },
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

    const searchList = useAppSelector((state) => state.search.listSearch)

    useEffect(() => {
        if (query.trim().length === 0) {
        }
        else {
            setTimeout(() => {
                dispatch(fetchSearch(mediatype, query));
            }, 3000);
        }
        function handleResize() {
            const isLargeScreen = window.innerWidth > 768; // Điều kiện cho màn hình lớn
            setOpen(false)
            setMediaType('multi')
            if (isLargeScreen && anchorUserEl != null) {
                setAnchorUserEl(null);
            }
            else if (!isLargeScreen && anchorUserEl != null) {
                setAnchorUserEl(null);
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
    }
    function getHref(mediatype: any, item: any) {
        if (mediatype === 'multi') {
            if (item?.media_type === 'person') return `/person/${item?.id}`;
            if (item?.media_type === 'movie') return `/movie/${item?.id}`;
            return `/tv/${item?.id}`;
        } else {
            if (mediatype === 'person') return `/person/${item?.id}`;
            if (mediatype === 'movie') return `/movie/${item?.id}`;
            return `/tv/${item?.id}`;
        }
    }

    return (
        <div className="relative flex text-left w-full h-full">
            <div className='border-gray-300 border-l-2 border-t-2 border-b-2 lg:block hidden'>
                <Button
                    id="demo-customized-button"
                    aria-controls={openUser ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openUser ? 'true' : undefined}
                    sx={{ bgcolor: 'white', color: 'black', borderRadius: '0' }}
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    {mediatype.toString() === 'multi' ? `${translations[language]?.multi}` : mediatype.toString()}
                </Button>
            </div>
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
                {menuItems?.map((item: any, index: any) => (
                    <MenuItem disableRipple key={index} onClick={() => handleClose(item?.label)}>
                        <div className='items-start'>
                            <a key={item?.id} href="#" className=" text-gray-700 capitalize hover:opacity-80 flex items-center" role="menuitem">
                                <i className={`mr-2 fas ${item?.icon}`}></i>
                                {item?.display}
                            </a>
                        </div>
                    </MenuItem>
                ))}
                <Divider />
                <MenuItem>
                    <a href='/search' className='flex items-center gap-2'>
                        <i className="fa-solid fa-file-circle-question"></i>
                        <p>  {translations[language]?.advancedSearch}</p>
                    </a>
                </MenuItem>
            </Menu>

            <div className="relative flex-grow border border-l border-gray-300">
                <input type="text" name="price" id="price" ref={anchorRef}
                    value={query}
                    onChange={onQueryChange}
                    className="w-full h-full border-0 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={`${translations[language]?.searchFilter}....`}
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
                    zIndex: 50,
                    width: anchorRef.current?.['offsetWidth'],
                    transition: "width 0s ease-in-out 1s",
                }}
            >

                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box
                            // onClick={handleCloseButNotDeleteQuery}
                            sx={{
                                border: 1, p: 1, bgcolor: "#263238", color: "#999", width: "100%", height: '100%', maxHeight: '24rem', overflow: 'auto'
                            }}>

                            {searchList?.length > 0 ?
                                searchList?.map((item: any, index: any) => (
                                    <div className="mt-1 max-h-92 overflow-auto" key={index}>
                                        <a href={getHref(mediatype, item)} className="flex gap-2 px-2 py-2 border-gray-500 border-b-2">
                                            <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path ? item?.poster_path : item?.profile_path}`} alt="product images"
                                                className="w-20 h-28"
                                                onError={handleImageError} />
                                            <div>
                                                <p className="text-white text-lg"> {item?.name ? item?.name : item?.title}</p>
                                                {item?.media_type !== 'person' && (
                                                    <p> {item?.first_air_date ? item?.first_air_date?.slice(0, 4) : item?.release_date?.slice(0, 4)}</p>
                                                )}
                                                <div className="items-center flex flex-wrap  ">
                                                    <p>
                                                        {item?.known_for_department}
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                )) : (
                                    <div>{translations[language]?.noResultAvailable} </div>
                                )
                            }
                        </Box>
                    </Fade>
                )}
            </Popper>
        </div >

    )
}