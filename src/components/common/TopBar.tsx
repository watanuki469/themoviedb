import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LaunchIcon from '@mui/icons-material/Launch';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PublicIcon from '@mui/icons-material/Public';
import StarsIcon from "@mui/icons-material/Stars";
import TvIcon from '@mui/icons-material/Tv';
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import * as Dialog from "@radix-ui/react-dialog";
import "flowbite";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import SearchBar from "./SearchBar";
import { LanguageContext } from '../../pages/LanguageContext';


export default function TopBar() {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [anchorUserEl, setAnchorUserEl] = useState<null | HTMLElement>(null);
  const [userInfoList, setUserInfoList] = useState<any[]>([]);
  useEffect(() => {
    // Lấy dữ liệu từ local storage
    const storedDataString = localStorage.getItem('user');
    let storedData = [];

    if (storedDataString) {
      storedData = JSON.parse(storedDataString);
    }
    console.log('Stored data:', storedData);

    // Lưu dữ liệu vào state
    setUserInfoList(Object.values(storedData)); // Chuyển đổi dữ liệu từ đối tượng sang mảng
  }, []);


  const handleCloseDialogClick = () => {
    setOpen(false);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    function handleResize() {
      const isLargeScreen = window.innerWidth > 768; // Điều kiện cho màn hình lớn
      if (isLargeScreen && isDrawerOpen) {
        setOpen(!open);
        setIsDrawerOpen(!isDrawerOpen);
      }
      else if (isLargeScreen && anchorUserEl != null) {
        setAnchorUserEl(null);
      }
      else if (!isLargeScreen && open) {
        setOpen(!open);
        setIsDrawerOpen(!isDrawerOpen);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [open, isDrawerOpen]);
  useEffect(() => {
    function handleResize() {
      const isLargeScreen = window.innerWidth > 768; // Điều kiện cho màn hình lớn
      if (isLargeScreen && isSearchOpen) {
        setIsSearchOpen(false);
      }
      else if (!isLargeScreen && isSearchOpen) {
        setIsSearchOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSearchOpen]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');

  const toggleMenu = (menu: any) => {
    if (selectedMenu === menu) {
      setSelectedMenu('');
      setMenuOpen(false);
    } else {
      setSelectedMenu(menu);
      setMenuOpen(true);
    }
  };
  const getMenuContent = (menu: any) => {
    switch (menu) {
      case 'Movies':
        return [`${translations[language]?.releaseCalendar}`, `${translations[language]?.top250Movie}`, `${translations[language]?.topBoxOffice}`, `Movie ${translations[language]?.news}`, `${translations[language]?.browseMovieByGenre}`];
      case 'TV Shows':
        return [`${translations[language]?.whatOnTvStream}`,`${translations[language]?.top250Tv}`, `${translations[language]?.topRatedTV}`, `${translations[language]?.browseTVByGenre}`,`TV ${translations[language]?.news}`];
      case 'Watch':
        return [`${translations[language]?.whatToWatch}`, `${translations[language]?.latest} Trailers`, `IMDb ${translations[language]?.originals}`,  `IMDb ${translations[language]?.editorPick}`, 'IMDb Podcasts'];
      case 'Awards & Events':
        return ['Oscars', 'ABFF', 'Best Of 2024', `${translations[language]?.holidayPicks}`, 'Starmeter Awards', `${translations[language]?.total} Event`];
      case 'Celebs':
        return [`${translations[language]?.popularCeleb}`,`${translations[language]?.popularCeleb} ${translations[language]?.news}`];
      case 'Community':
        return [`${translations[language]?.helpCenter}`, `${translations[language]?.contributeZone}`, `${translations[language]?.polls}`];
      case 'Language':
        return ['English (En-US)', 'VietNamese (Vi-VI)', 'French (Fr-FR)', 'German (De-DE)', 'Hindi (Hi-IN)', 'Indonesian (Id-ID)', 'Italian (It-IT)', 'Korean (Ko-KR)'];
      default:
        return [];
    }
  };
  const handleItemClick = (item: string) => {
    switch (selectedMenu) {
      case 'Movies':
        if (item === `${translations[language]?.releaseCalendar}`) {
          navigate(`/upComing`);
        } else if (item ===`${translations[language]?.top250Movie}`) {
          navigate('/top250Movie');
        } else if (item ===`${translations[language]?.topBoxOffice}`) {
          navigate('/topBoxOffice');
        } else if (item === `Movie ${translations[language]?.news}`) {
          navigate('/news/movie');
        } else if (item === `${translations[language]?.browseMovieByGenre}`) {
          navigate('/features/genre');
        } else {
          navigate('/NotFound');
        }
        break;

      case 'TV Shows':
        if (item === `${translations[language]?.whatOnTvStream}`) {
          navigate('/whatOnTv');
        } else if (item === `${translations[language]?.top250Tv}`) {
          navigate('/Top250Tv');
        } else if (item === `${translations[language]?.topRatedTV}`) {
          navigate('/topPopularTv');
        } else if (item === `${translations[language]?.browseTVByGenre}`) {
          navigate('/features/genre');
        } else if (item === `TV ${translations[language]?.news}`) {
          navigate('/news/tv');
        } else {
          navigate('/NotFound');
        }
        break;

      case 'Watch':
        if (item === `${translations[language]?.whatToWatch}`) {
          navigate('/watchToWatch');
        } else if (item === `${translations[language]?.latest} Trailers`) {
          navigate('/upComing');
        } else if (item === `IMDb ${translations[language]?.originals}`) {
          navigate('/whatOnTv');
        } else if (item ===  `IMDb ${translations[language]?.editorPick}`) {
          navigate('/whatOnTv');
        } else if (item === 'IMDb Podcasts') {
          navigate('/search');
        } else {
          navigate('/NotFound');
        }
        break;

      case 'Awards & Events':
        if (item === 'Oscars') {
          navigate('/');
        } else if (item === 'ABFF') {
          navigate('/');
        } else if (item === 'Best Of 2024') {
          navigate('/');
        } else if (item === `${translations[language]?.holidayPicks}`) {
          navigate('/');
        } else if (item === 'Starmeter Awards') {
          navigate('/');
        } else if (item === `${translations[language]?.total} Event`) {
          navigate('/');
        } else {
          navigate('/');
        }
        break;

      case 'Celebs':
        if (item === `${translations[language]?.popularCeleb}`) {
          navigate('/popularCeleb');
        } else if (item === `${translations[language]?.popularCeleb} ${translations[language]?.news}`) {
          navigate('/news/celeb');
        } else {
          navigate('/NotFound');
        }
        break;

      case 'Community':
        if (item ===`${translations[language]?.helpCenter}`) {
          window.location.href = 'https://help.imdb.com/imdb?ref_=cons_nb_hlp';
        } else if (item ===`${translations[language]?.contributeZone}`) {
          window.location.href = ' https://contribute.imdb.com/czone?ref_=nv_cm_cz';
        } else if (item ===`${translations[language]?.polls}`) {
          window.location.href = 'https://www.imdb.com/poll/?ref_=nv_cm_pl';
        } else {
          navigate('/');
        }
        break;
      case 'Language':
        if (item === 'English (En-US)') {
          handleClose('en-US')
        }
        else if (item === 'VietNamese (Vi-VI)') {
          handleClose('vi-VI')
        }
        else if (item === 'French (Fr-FR)') {
          handleClose('fr-FR')
        }
        else if (item === 'German (De-DE)') {
          handleClose('de-DE')
        }
        else if (item === 'Hindi (Hi-IN)') {
          handleClose('hi-IN')
        }
        else if (item === 'Indonesian (Id-ID)') {
          handleClose('id-ID')
        }
        else if (item === 'Italian (It-IT)') {
          handleClose('it-IT')
        }
        else if (item === 'Korean (Ko-KR)') {
          handleClose('ko-KR')
        }
        else {
        }
        break;
      default:
        break;
    }
    setMenuOpen(false);
  };

  const email = localStorage.getItem('email')
  const [anchorShareEl, setAnchorShareEl] = useState<null | HTMLElement>(null);
  const openShare = Boolean(anchorShareEl);
  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorShareEl(event.currentTarget);
  };
  const handleShareClose = () => {
    setAnchorShareEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem('activity');
    navigate('/login2')
  };

  const stringToColor = (str: any) => {
    let hash = 0;
    let i;

    for (i = 0; i < str?.length; i += 1) {
      hash = str?.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value?.toString(16)}`?.slice(-2);
    }

    return color;
  };
  const menuItems = [
    { id: 1, label: 'en-US', name: 'English' },
    { id: 2, label: 'vi-VI', name: 'Vietnamese' },
    { id: 3, label: 'ja-JP', name: 'Japanese' },
    { id: 4, label: 'fr-FR', name: 'French' },
    { id: 5, label: 'de-DE', name: 'German' },
    { id: 6, label: 'hi-IN', name: 'Hindi' },
    { id: 7, label: 'id-ID', name: 'Indonesian' },
    { id: 8, label: 'it-IT', name: 'Italian' },
    { id: 9, label: 'ko-KR', name: 'Korean' },
  ];

  const [mediatype, setMediaType] = useState('EN');
  useEffect(() => {
    const languageString = localStorage.getItem('language');
    if (languageString) {
      setMediaType(languageString);
    }
  }, []);
  const openUser = Boolean(anchorUserEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUserEl(event.currentTarget);
  };
  const handleClose = (index: any) => {
    setAnchorUserEl(null);
    setMediaType(index)
    if (typeof index === "string") {
      localStorage.setItem("language", index);
      window.location.reload();

    } else {
      localStorage.setItem("language", index.join(","));
      window.location.reload();
    }
  };
  const context = useContext(LanguageContext);

  if (!context) {
    return null;
  }

  const { language, translations, handleLanguageChange } = context;

  return (
    <section className=" w-full bg-black mx-auto py-4 h-full static ">
      {isSearchOpen ? (
        <div className='items-center h-10 mt-1 px-2 w-full flex gap-2'>
          <SearchBar />
          <i className="fa-regular fa-circle-xmark text-white text-3xl" onClick={() => setIsSearchOpen(false)}></i>
        </div>

      ) : (
        <div className="flex w-full gap-x-3 items-center  justify-center ">
          <div onClick={toggleDrawer} className=" lg:hidden font-extrabold text-xl text-white m-3">
            <i className="fa-sharp fa-solid fa-bars"></i>
          </div >
          <button
            onClick={() => navigate("/")}
            className=" bg-yellow-400 text-black text-center 
            border-none font-extrabold text-xl font-sans
            whitespace-nowrap hover:bg-black hover:text-blue-500 rounded-md px-1 py-1"
          >
            IMDb
          </button>
          <Dialog.Root open={open} onOpenChange={setOpen} >
            <Dialog.Trigger>
              <div className="hidden lg:flex items-center content-center justify-center self-center text-white gap-2 hover:bg-black hover:opacity-95">
                <i className="fa-sharp fa-solid fa-bars"></i>
                <p> Menu </p>
              </div>
            </Dialog.Trigger>
            <Dialog.Portal >
              <Dialog.Content
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
               rounded-md bg-black  p-8 shadow w-full  items-center justify-center aligns-center z-30 "
              >
                <div className="max-w-4xl ml-auto mr-auto capitalize">
                  <div className="flex items-center">
                    <button
                      onClick={() => navigate("/")}
                      className="bg-yellow-400 px-2 py-1 text-black text-center border-none font-extrabold text-2xl font-sans whitespace-nowrap hover:opacity-80 rounded-md"
                    >
                      IMDb
                    </button>
                    <div className="flex-grow"></div>
                    <button
                      onClick={handleCloseDialogClick}
                      className="bg-yellow-400 border-4 rounded-full h-12 w-12 aligns-center justify-center
                                         text-black text-center border-yellow-400 font-extrabold text-2xl font-sans whitespace-nowrap  hover:opacity-80  "
                    >
                      X
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-white mt-10 cursor-pointer">
                    <div className=" items-center">
                      <div className="flex  items-center gap-3">
                        <div className="aligns-start">
                          <i className="fa-solid fa-film text-yellow-400"></i>
                        </div>
                        <div>
                          <p className="font-extrabold text-2xl font-sans whitespace-nowrap">
                            Movies
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film "></i>
                        </div>
                        <div className="">
                          <p className="mt-2 hover:underline" onClick={() => (navigate('/upComing'))}>{translations[language]?.releaseCalendar}</p>
                          <p className="mt-2 hover:underline " onClick={() => (navigate('/top250Movie'))}>
                            {translations[language]?.top250Movie}
                          </p>
                          <p className="mt-2 hover:underline" onClick={() => (navigate('/topBoxOffice'))}>{translations[language]?.topBoxOffice}</p>
                          <p className="mt-2 hover:underline" onClick={() => (navigate('/news/movie'))}>Movies {translations[language]?.news}</p>
                          <p className="mt-2 hover:underline" onClick={() => (navigate('/features/genre'))}>
                            {translations[language]?.browseMovieByGenre}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="items-center">
                      <div className="flex  items-center gap-3">
                        <div className="aligns-start text-yellow-400">
                          <i className="fa-solid fa-tv"></i>
                        </div>
                        <div>
                          <p className="font-extrabold text-2xl font-sans whitespace-nowrap">
                            TV Shows
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film "></i>
                        </div>
                        <div className="">
                          <p onClick={() => navigate('/whatOnTv')} className="mt-2 hover:underline">
                            {translations[language]?.whatOnTvStream}
                          </p>
                          <p onClick={() => navigate('/top250Tv')} className="mt-2 hover:underline">{translations[language]?.top250Tv}</p>
                          <p onClick={() => navigate('/topPopularTv')} className="mt-2 hover:underline">  {translations[language]?.topRatedTV}   </p>
                          <p onClick={() => navigate('/features/genre')} className="mt-2 hover:underline">  {translations[language]?.browseTVByGenre}</p>
                          <p className="mt-2 hover:underline" onClick={() => navigate('/news/tv')}>TV {translations[language]?.news}</p>
                        </div>
                      </div>
                    </div>
                    <div className="items-center">
                      <div className="flex  items-center gap-3">
                        <div className="aligns-center text-yellow-400 ">
                          <StarsIcon />
                        </div>
                        <div>
                          <p className="font-extrabold text-2xl font-sans whitespace-nowrap"> {" "}  Award & Event  </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film "></i>
                        </div>
                        <div className="cursor-not-allowed ">
                          <p className="mt-2 hover:underline">Oscars</p>
                          <p className="mt-2 hover:underline">ABFF</p>
                          <p className="mt-2 hover:underline">Best Of 2024</p>
                          <p className="mt-2 hover:underline">{translations[language]?.holidayPicks}</p>
                          <p className="mt-2 hover:underline">Starmeter Awards</p>
                          <p className="mt-2 hover:underline"> {translations[language]?.total} Event</p>
                        </div>
                      </div>
                    </div>
                    <div className="items-center">
                      <div className="flex  items-center gap-3">
                        <div className="aligns-start text-yellow-400">
                          <i className="fa-solid fa-user-group"></i>
                        </div>
                        <div>
                          <p className="font-extrabold text-2xl font-sans whitespace-nowrap">
                            {" "}
                            {translations[language]?.popularCeleb?.slice(0,15)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film "></i>
                        </div>
                        <div className="">

                          <p className="mt-2 hover:underline" onClick={() => navigate('/popularCeleb')}>
                          {translations[language]?.popularCeleb}
                          </p>
                          <p className="mt-2 hover:underline" onClick={() => navigate('/news/celeb')}>{translations[language]?.popularCeleb} {translations[language]?.news}</p>
                        </div>
                      </div>
                    </div>
                    <div className="items-center">
                      <div className="flex  items-center gap-3">
                        <div className="aligns-start text-yellow-400">
                          <VideoLibraryIcon />
                        </div>
                        <div>
                          <p className="font-extrabold text-2xl font-sans whitespace-nowrap">
                            {" "}
                            Watch
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film "></i>
                        </div>
                        <div className="">
                          <p className="mt-2 hover:underline" onClick={() => navigate(`/watchToWatch`)}>{translations[language]?.whatToWatch}</p>
                          <p className="mt-2 hover:underline" onClick={() => navigate(`/upComing`)}>{translations[language]?.latest} Trailers</p>
                          <p className="mt-2 hover:underline" onClick={() => navigate(`/whatOnTv`)}>IMDb {translations[language]?.originals}</p>
                          <p className="mt-2 hover:underline" onClick={() => navigate(`/whatOnTv`)}>IMDb {translations[language]?.editorPick}</p>
                          <p className="mt-2 hover:underline" onClick={() => navigate(`/search?mediaType=tv&title=podcast`)}>IMDb Podcasts</p>
                        </div>
                      </div>
                    </div>

                    <div className="items-center">
                      <div className="flex  items-center gap-3">
                        <div className="aligns-start text-yellow-400">
                          <i className="fa-solid fa-earth-americas"></i>
                        </div>
                        <div>
                          <p className="font-extrabold text-2xl font-sans whitespace-nowrap">
                            {" "}
                            {translations[language]?.community}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film "></i>
                        </div>
                        <div className="">
                          <a href='https://help.imdb.com/imdb?ref_=cons_nb_hlp'>
                            <p className="mt-2 hover:underline"> {translations[language]?.helpCenter}</p>
                          </a>
                          <a href='https://contribute.imdb.com/czone?ref_=nv_cm_cz'>
                            <p className="mt-2 hover:underline">{translations[language]?.contributeZone}</p>
                          </a>
                          <a href='https://www.imdb.com/poll/?ref_=nv_cm_pl'>
                            <p className="mt-2 hover:underline">{translations[language]?.polls}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <div className="grow ">
            <div className=" hidden lg:flex bg-white w-full z-20">
              <SearchBar />
            </div>
          </div>

          <button
            onClick={() => navigate("/IMDbPro")}
            className=" hidden lg:flex bg-black text-white text-center 
           font-extrabold text-lg font-sans whitespace-nowrap  hover:opacity-90  rounded-md"
          >
            IMDb<span className="text-blue-600">Pro</span>
          </button>
          <Divider className=" hidden lg:flex" orientation="vertical" sx={{ bgcolor: "red", color: 'white', border: "1px solid gray", height: '20px' }} />
          <div className=" items-center bg-black  font-extrabold md:flex hidden lg:flex">
            <button
              onClick={() => navigate("/watchList2")}
              className="flex items-center gap-2"
            >
              <i className="fa-regular fa-bookmark  text-white"></i>
              <p className="text-white border-none ">
                Watchlist
              </p>
            </button>
          </div>

          <div className="lg:hidden text-white " >
            <i className="fa-solid fa-magnifying-glass" onClick={() => setIsSearchOpen(true)}></i>
          </div>
          {/*change language */}

          <Button
            id="demo-customized-button"
            aria-controls={openUser ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openUser ? 'true' : undefined}
            sx={{
              bgcolor: 'black', fontWeight: 'extrabold', color: 'white', borderRadius: '0',
              display: { xs: "none", md: "flex" },
              '&:hover': {
                opacity: '80%'
              }
            }}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {mediatype?.toString().slice(0, 2)}
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
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "black"
              },
              color: "white",
            }}

            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorUserEl}
            open={openUser}
            onClose={() => setAnchorUserEl(null)}
          >
            <MenuItem sx={{ color: '#e0e0e0', fontWeight: 'bold', borderBottom: '2px solid gray', padding: '1rem' }}>Fully Supported <span className='ml-2'> (No film)</span> </MenuItem>
            {/* <Divider sx={{ color: 'white', borderColor: "white" }} /> */}
            {menuItems?.map((item: any, index: any) => (
              <div key={index} className=''>
                {item?.name === 'English' ? (
                  <div>
                    <MenuItem
                      disableRipple
                      sx={{
                        borderBottom: '2px solid gray',
                        '&:hover': {
                          backgroundColor: 'blue'
                        }
                      }}
                      key={index}
                      onClick={() => handleClose(item?.label)}
                    >
                      <div className={`flex items-center text-gray-200 gap-3 ${mediatype === item?.label ? 'text-white font-extrabold' : ''}`}>
                        {mediatype === item?.label ? (
                          <i className="fa-brands fa-gg-circle text-yellow-300 text-2xl"></i>
                        ) : (
                          <i className="fa-regular fa-circle text-2xl"></i>
                        )}
                        <p className="capitalize flex items-center font-bold px-2 py-2" role="menuitem">
                          {item?.name} ({item?.label})
                        </p>
                      </div>
                    </MenuItem>
                    <MenuItem sx={{ color: '#e0e0e0', fontWeight: 'bold', borderBottom: '2px solid gray', padding: '1rem' }}>
                      Film  Supported
                    </MenuItem>
                  </div>
                ) : item?.name === 'Vietnamese' ? (
                  <div>
                    <MenuItem
                      disableRipple
                      sx={{
                        borderBottom: '2px solid gray',
                        '&:hover': {
                          backgroundColor: 'blue'
                        }
                      }}
                      key={index}
                      onClick={() => handleClose(item?.label)}
                    >
                      <div className={`flex items-center text-gray-200 gap-3 ${mediatype === item?.label ? 'text-white font-extrabold' : ''}`}>
                        {mediatype === item?.label ? (
                          <i className="fa-brands fa-gg-circle text-yellow-300 text-2xl"></i>
                        ) : (
                          <i className="fa-regular fa-circle text-2xl"></i>
                        )}
                        <p className="capitalize flex items-center font-bold px-2 py-2" role="menuitem">
                          {item?.name} ({item?.label})
                        </p>
                      </div>
                    </MenuItem>
                    <MenuItem sx={{ color: '#e0e0e0', fontWeight: 'bold', borderBottom: '2px solid gray', padding: '1rem' }}>
                      Partially Supported
                    </MenuItem>
                  </div>
                ) : (
                  <MenuItem
                    disableRipple
                    key={index}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'blue'
                      }
                    }}
                    onClick={() => handleClose(item?.label)}
                  >
                    <div className={`flex items-center text-gray-200 gap-3 ${mediatype === item?.label ? 'text-white' : ''}`}>
                      {mediatype === item?.label ? (
                        <i className="fa-brands fa-gg-circle text-yellow-300 text-2xl"></i>
                      ) : (
                        <i className="fa-regular fa-circle text-2xl"></i>
                      )}
                      <p className="capitalize flex items-center font-bold px-2 py-2" role="menuitem">
                        {item?.name} ({item?.label})
                      </p>
                    </div>
                  </MenuItem>
                )}
              </div>
            ))}
          </Menu>

          <IconButton
            onClick={handleShareClick}
            size="small"
            aria-controls={openShare ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openShare ? 'true' : undefined}
          >
            <div className="rounded-full bg-blue-500 p-2 w-10 h-10 flex justify-center items-center">
              <i className="fa-solid fa-id-badge text-white fa-flip"></i>
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
            <MenuItem sx={{
              ":hover": {
                color: '#ffc107',
              }
            }}
              onClick={() => navigate('/changePassword')}
            >
              <Avatar
                sx={{
                  backgroundColor: stringToColor(email), width: 40, height: 40,
                }}
                children={`${userInfoList[1]?.split(" ")[0][0]}`}
              />
              {userInfoList[1]}
            </MenuItem>

            <div className='hover:text-yellow-300'>
              <MenuItem onClick={() => navigate('/favoriteList')}>
                <Avatar
                  sx={{
                    backgroundColor: 'green', width: 40, height: 40
                  }}
                  children={
                    <i className="fa-solid fa-user-astronaut"></i>
                  }
                />
                <p>Favorite Actor List</p>
              </MenuItem>
            </div>

            <div className='hover:text-yellow-300'>
              <MenuItem onClick={() => navigate('/rating')}>
                <Avatar
                  sx={{
                    backgroundColor: '#FB9AD1', width: 40, height: 40
                  }}
                  children={
                    <i className="fa-solid fa-ranking-star"></i>
                  }
                />
                <p>Rating List</p>
              </MenuItem>
            </div>
            <div className='hover:text-yellow-300'>
              <MenuItem onClick={() => navigate('/activity')}>
                <Avatar
                  sx={{
                    backgroundColor: 'purple', width: 40, height: 40
                  }}
                  children={
                    <i className="fa-solid fa-street-view"></i>
                  }
                />
                <p>Your Activity</p>
              </MenuItem>
            </div>

            <div className='hover:text-yellow-300'>
              <MenuItem onClick={handleLogout}>
                <Avatar
                  sx={{
                    backgroundColor: 'chocolate', width: 40, height: 40
                  }}
                  children={
                    <i className="fa-solid fa-cat"></i>
                  }
                />
                <p>Logout</p>
              </MenuItem>
            </div>


          </Menu>
          <button
            onClick={() => window.open('https://apps.apple.com/us/app/imdb-movies-tv-shows/id342792525?_branch_match_id=1303228076714752528&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL86pTNJLLCjQy8nMy9YP9k6pDDRzNDGxBABVqlN1IAAAAA%3D%3D&utm_campaign=mdot+sitewide+footer+Branch+update&utm_medium=marketing&utm_source=IMDb+Mdot', '_blank')}

            className=" bg-yellow-400 text-black text-center border-none font-bold text-sm  rounded-lg
            whitespace-nowrap hover:bg-black hover:text-blue-500 lg:hidden hover:border-red-500 px-2 py-2 mr-2"
          >
            Use App
          </button>
        </div >
      )}

      {/* drawer */}
      <div
        className={`fixed overflow-auto  top-0 left-0 h-screen w-fit bg-black shadow z-40 justify-start  rounded-md  ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Toolbar />
        <Button onClick={toggleDrawer} sx={{ color: 'white', top: '20px', right: '10px', position: "fixed", fontWeight: 'bold', fontSize: '20px', fontFamily: 'sans-serif',backgroundColor:'red' }}>X</Button>
        <List>
          {['Movies', 'TV Shows', 'Watch', 'Awards & Events', 'Celebs', 'Community', 'Language'].map((text, index) => (
            <Fragment key={text} >
              <ListItem >
                <ListItemButton onClick={() => toggleMenu(text)}>
                  <ListItemIcon sx={{ color: 'white', left: '0' }}>
                    {index === 0 && <LocalMoviesIcon />}   {index === 1 && <TvIcon />}
                    {index === 2 && <VideoLibraryIcon />}     {index === 3 && <StarsIcon />}
                    {index === 4 && <PeopleAltIcon />}       {index === 5 && <PublicIcon />}
                    {index === 6 && <i className="fa-solid fa-language"></i>}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ color: 'white' }} />
                  {menuOpen && selectedMenu === text ? <ArrowDropUpIcon
                    sx={{ cursor: 'pointer', color: 'white', fontSize: '30px' }}
                    onClick={() => toggleMenu(text)} /> : <ArrowDropDownIcon
                    sx={{ cursor: 'pointer', color: 'white', fontSize: '30px' }} onClick={() => toggleMenu(text)}
                  />}
                </ListItemButton>

              </ListItem>
              {menuOpen && selectedMenu === text && getMenuContent(text).map((item, index) => (
                <ListItem disablePadding key={index} sx={{ color: 'white',textTransform:'capitalize' }}>
                  <ListItemButton onClick={() => handleItemClick(item)}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={item} sx={{ cursor: 'pointer' }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </Fragment>
          ))}
        </List>
        <List sx={{ color: "white", display: 'flex' }}>
          <Fragment>
            <Box sx={{ ml: 5 }}>
              <Typography sx={{ fontSize: "large", fontWeight: 'bold' }}>IMDbPro</Typography>
              <Typography>For industry Professionals</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>

            </Box>
            <LaunchIcon sx={{ padding: '10px', fontSize: '40px' }} />
          </Fragment>

        </List>

      </div>

      {/* drawer */}


    </section >
  );
}
