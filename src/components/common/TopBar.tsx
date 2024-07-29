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
import { LanguageContext } from '../../pages/LanguageContext';
import SearchBar from "./SearchBar";
import { stringToColor } from '../../modules/BaseModule';

export default function TopBar() {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [anchorUserEl, setAnchorUserEl] = useState<null | HTMLElement>(null);
  const [userInfoList, setUserInfoList] = useState<any[]>([]);

  useEffect(() => {
    const storedDataString = localStorage.getItem('user');
    let storedData = [];
    if (storedDataString) {
      storedData = JSON.parse(storedDataString);
    }
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
      setSelectedMenu(''); setMenuOpen(false);
    } else {
      setSelectedMenu(menu); setMenuOpen(true);
    }
  };

  const getMenuContent = (menu: any) => {
    switch (menu) {
      case 'Movies':
        return [`${translations[language]?.releaseCalendar}`, `${translations[language]?.top250Movie}`, `${translations[language]?.topBoxOffice}`, `Movie ${translations[language]?.news}`, `${translations[language]?.browseMovieByGenre}`, `${translations[language]?.india} Movie ${translations[language]?.spotlight}`];
      case 'TV Shows':
        return [`${translations[language]?.whatOnTvStream}`, `${translations[language]?.top250Tv}`, `${translations[language]?.topRatedTV}`, `${translations[language]?.browseTVByGenre}`, `TV ${translations[language]?.news}`];
      case 'Watch':
        return [`${translations[language]?.whatToWatch}`, `${translations[language]?.latest} Trailers`, `IMDb ${translations[language]?.originals}`, `IMDb ${translations[language]?.editorPick}`, 'IMDb Podcasts'];
      case 'Awards & Events':
        return ['Oscars', 'ABFF', 'Best Of 2024', `${translations[language]?.holidayPicks}`, 'Starmeter Awards', `${translations[language]?.total} ${translations[language]?.event}`];
      case 'Celebs':
        return [`${translations[language]?.popularCeleb}`, `${translations[language]?.popularCeleb} ${translations[language]?.news}`];
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
        } else if (item === `${translations[language]?.top250Movie}`) {
          navigate('/top250Movie');
        } else if (item === `${translations[language]?.topBoxOffice}`) {
          navigate('/topBoxOffice');
        } else if (item === `Movie ${translations[language]?.news}`) {
          navigate('/news/movie');
        } else if (item === `${translations[language]?.browseMovieByGenre}`) {
          navigate('/features/genre');
        } else if (item === `${translations[language]?.india} Movie ${translations[language]?.spotlight}`) {
          navigate(`/keyword/movies/14636/india`);
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
          navigate('/trending/netflix');
        } else if (item === `IMDb ${translations[language]?.editorPick}`) {
          navigate('/trending/prime');
        } else if (item === 'IMDb Podcasts') {
          navigate('/search?mediaType=tv&title=podcast');
        } else {
          navigate('/NotFound');
        }
        break;

      case 'Awards & Events':
        if (item === 'Oscars') {
          navigate('/award/oscars');
        } else if (item === 'ABFF') {
          navigate('/award/ABFF');
        } else if (item === 'Best Of 2024') {
          navigate('/award/spotlight');
        } else if (item === `${translations[language]?.holidayPicks}`) {
          navigate('/award/holidayPick');
        } else if (item === 'Starmeter Awards') {
          navigate('/award/starmeter');
        } else if (item === `${translations[language]?.total} ${translations[language]?.event}`) {
          navigate('/IMDbPro');
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
        if (item === `${translations[language]?.helpCenter}`) {
          window.location.href = 'https://help.imdb.com/imdb?ref_=cons_nb_hlp';
        } else if (item === `${translations[language]?.contributeZone}`) {
          window.location.href = ' https://contribute.imdb.com/czone?ref_=nv_cm_cz';
        } else if (item === `${translations[language]?.polls}`) {
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
      default: break;
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
    navigate('/login')
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
      {/*search full page */}
      {isSearchOpen ? (
        <div className='items-center h-10 mt-1 px-2 w-full flex gap-2'>
          <SearchBar />
          <i className="fa-regular fa-circle-xmark text-white text-3xl" onClick={() => setIsSearchOpen(false)}></i>
        </div>

      ) : (
        <div className="flex w-full gap-x-3 items-center  justify-center ">
          {/*menu icon khi màn hình nhỏ start */}
          <div onClick={toggleDrawer} className=" lg:hidden font-extrabold text-xl text-white m-3">
            <i className="fa-sharp fa-solid fa-bars"></i>
          </div >
          {/*menu icon khi màn hình nhỏ end */}

          {/*icon imdb */}
          <a href='/'>
            <button
              className=" bg-yellow-400 text-black text-center  border-none font-extrabold text-xl font-sans whitespace-nowrap hover:bg-black hover:text-blue-500 rounded-md px-1 py-1"
            >
              IMDb
            </button>
          </a>
          {/*icon imdb  end*/}
          {/* Dialog màn hình lớn start */}
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
                    <div className="items-center">
                      <div className="flex items-center gap-3">
                        <div className="aligns-start">
                          <i className="fa-solid fa-film text-yellow-400"></i>
                        </div>
                        <div>
                          <p className="font-extrabold text-xl font-sans whitespace-nowrap">Movies</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film"></i>
                        </div>
                        <div>
                          <a href='/upComing'>
                            <p className="mt-2 hover:underline">{translations[language]?.releaseCalendar}</p>
                          </a>
                          <a href='/top250Movie'>
                            <p className="mt-2 hover:underline">{translations[language]?.top250Movie}</p>
                          </a>
                          <a href='/topBoxOffice'>
                            <p className="mt-2 hover:underline">{translations[language]?.topBoxOffice}</p>
                          </a>
                          <a href='/news/movie'>
                            <p className="mt-2 hover:underline">Movies {translations[language]?.news}</p>
                          </a>
                          <a href='/features/genre'>
                            <p className="mt-2 hover:underline">{translations[language]?.browseMovieByGenre}</p>
                          </a>
                          <a href={`/keyword/movies/14636/india`}>
                            <p className="mt-2 hover:underline">{translations[language]?.india} Movie {translations[language]?.spotlight}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="items-center">
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-yellow-400">
                          <i className="fa-solid fa-tv"></i>
                        </div>
                        <div>
                          <p className="font-extrabold text-xl font-sans whitespace-nowrap">TV Shows</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film"></i>
                        </div>
                        <div>
                          <a href='/whatOnTv'>
                            <p className="mt-2 hover:underline">{translations[language]?.whatOnTvStream}</p>
                          </a>
                          <a href='/top250Tv'>
                            <p className="mt-2 hover:underline">{translations[language]?.top250Tv}</p>
                          </a>
                          <a href='/topPopularTv'>
                            <p className="mt-2 hover:underline">{translations[language]?.topRatedTV}</p>
                          </a>
                          <a href='/features/genre'>
                            <p className="mt-2 hover:underline">{translations[language]?.browseTVByGenre}</p>
                          </a>
                          <a href='/news/tv'>
                            <p className="mt-2 hover:underline">TV {translations[language]?.news}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="items-center">
                      <div className="flex items-center gap-3">
                        <div className="aligns-center text-yellow-400">
                          <StarsIcon />
                        </div>
                        <div>
                          <p className="font-extrabold text-xl font-sans whitespace-nowrap">{translations[language]?.award} & {translations[language]?.event} </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film"></i>
                        </div>
                        <div>
                          <a href='/award/oscars'>
                            <p className="mt-2 hover:underline">Oscars</p>
                          </a>
                          <a href='/award/ABFF'>
                            <p className="mt-2 hover:underline">ABFF</p>
                          </a>
                          <a href='/award/spotlight'>
                            <p className="mt-2 hover:underline">Best Of 2024 </p>
                          </a>
                          <a href='/award/holidayPick'>
                            <p className="mt-2 hover:underline">{translations[language]?.holidayPicks}</p>
                          </a>
                          <a href='/award/starmeter'>
                            <p className="mt-2 hover:underline">Starmeter {translations[language]?.award} </p>
                          </a>
                          <a href='/IMDbPro'>
                            <p className="mt-2 hover:underline">{translations[language]?.total} {translations[language]?.event}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="items-center">
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-yellow-400">
                          <i className="fa-solid fa-user-group"></i>
                        </div>
                        <div>
                          <p className="font-extrabold text-xl font-sans whitespace-nowrap">{translations[language]?.popularCeleb?.slice(0, 18)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film"></i>
                        </div>
                        <div>
                          <a href='/popularCeleb'>
                            <p className="mt-2 hover:underline">{translations[language]?.popularCeleb}</p>
                          </a>
                          <a href='/news/celeb'>
                            <p className="mt-2 hover:underline">{translations[language]?.popularCeleb} {translations[language]?.news}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="items-center">
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-yellow-400">
                          <VideoLibraryIcon />
                        </div>
                        <div>
                          <p className="font-extrabold text-xl font-sans whitespace-nowrap">{translations[language]?.whatToWatch}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film"></i>
                        </div>
                        <div>
                          <a href='/watchToWatch'>
                            <p className="mt-2 hover:underline">{translations[language]?.whatToWatch}</p>
                          </a>
                          <a href='/upComing'>
                            <p className="mt-2 hover:underline">{translations[language]?.latest} Trailers</p>
                          </a>
                          <a href='/trending/netflix'>
                            <p className="mt-2 hover:underline">IMDb {translations[language]?.originals}</p>
                          </a>
                          <a href='/trending/prime'>
                            <p className="mt-2 hover:underline">IMDb {translations[language]?.editorPick}</p>
                          </a>
                          <a href='/keyword/movies/281205/podcast'>
                            <p className="mt-2 hover:underline">IMDb Podcasts</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="items-center">
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-yellow-400">
                          <i className="fa-solid fa-earth-americas"></i>
                        </div>
                        <div>
                          <p className="font-extrabold text-xl font-sans whitespace-nowrap">{translations[language]?.community}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film"></i>
                        </div>
                        <div>
                          <a href='https://help.imdb.com/imdb?ref_=cons_nb_hlp'>
                            <p className="mt-2 hover:underline">{translations[language]?.helpCenter}</p>
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
          {/* Dialog màn hình bự end */}
          {/* Search  màn hình lớn start */}
          <div className="grow ">
            <div className=" hidden lg:flex bg-white w-full z-20">
              <SearchBar />
            </div>
          </div>
          {/* Search  màn hình lớn end */}

          <a href='/IMDbPro'>
            <button
              className=" hidden lg:flex bg-black text-white text-center 
           font-extrabold text-lg font-sans whitespace-nowrap  hover:opacity-90  rounded-md"
            >
              IMDb<span className="text-blue-600">Pro</span>
            </button>
          </a>

          <Divider className=" hidden lg:flex" orientation="vertical" sx={{ bgcolor: "red", color: 'white', border: "1px solid gray", height: '20px' }} />
          {/* Watchlist start */}
          <div className=" items-center bg-black  font-extrabold md:flex hidden lg:flex">
            <a href='/watchList'>
              <button className="flex items-center gap-2">
                <i className="fa-regular fa-bookmark  text-white"></i>
                <p className="text-white border-none ">  Watchlist  </p>
              </button>
            </a>
          </div>
          {/* Watchlist end */}
          {/* icon search start */}
          <div className="lg:hidden text-white " >
            <i className="fa-solid fa-magnifying-glass" onClick={() => setIsSearchOpen(true)}></i>
          </div>
          {/* icon search  end */}
          {/*change language start*/}
          <Button
            id="demo-customized-button"
            aria-controls={openUser ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openUser ? 'true' : undefined}
            sx={{
              bgcolor: 'black', fontWeight: 'extrabold', color: 'white', borderRadius: '0',
              display: { xs: "none", md: "flex" }, '&:hover': { opacity: '80%' }
            }}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {mediatype?.toString().slice(0, 2)}
          </Button>
          <Menu
            elevation={0}
            anchorOrigin={{
              vertical: 'bottom', horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top', horizontal: 'right',
            }}
            sx={{
              "& .MuiPaper-root": { backgroundColor: "black" }, color: "white",
            }}
            id="demo-customized-menu" MenuListProps={{ 'aria-labelledby': 'demo-customized-button', }}
            anchorEl={anchorUserEl} open={openUser} onClose={() => setAnchorUserEl(null)}
          >
            <MenuItem sx={{ color: '#e0e0e0', fontWeight: 'bold', borderBottom: '2px solid gray', padding: '1rem' }}>{translations[language]?.fully} {translations[language]?.supported} <span className='ml-2'> ({translations[language]?.none} film)</span> </MenuItem>
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
                      Film {translations[language]?.episodes} {translations[language]?.supported}
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
                      {translations[language]?.partially}  {translations[language]?.supported}
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
          {/*change language end */}
          {/*user start */}
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
            <a href='/changePassword'>
              <MenuItem sx={{ ":hover": { color: '#ffc107' } }} >
                <Avatar sx={{ backgroundColor: stringToColor(email), width: 40, height: 40, }} children={`${userInfoList[1]?.split(" ")[0][0]}`} />
                {userInfoList[1]}
              </MenuItem>
            </a>

            <div className='hover:text-yellow-300'>
              <a href='/favoriteList'>
                <MenuItem>
                  <Avatar sx={{ backgroundColor: 'green', width: 40, height: 40 }}
                    children={<i className="fa-solid fa-user-astronaut"></i>}
                  />
                  <p>{translations[language]?.favoriteActorList} </p>
                </MenuItem>
              </a>
            </div>
            <a href='/rating'>
              <div className='hover:text-yellow-300'>
                <MenuItem>
                  <Avatar sx={{ backgroundColor: '#FB9AD1', width: 40, height: 40 }}
                    children={<i className="fa-solid fa-ranking-star"></i>}
                  />
                  <p>{translations[language]?.rating}</p>
                </MenuItem>
              </div>
            </a>

            <a href='/activity' className='hover:text-yellow-300'>
              <MenuItem>
                <Avatar sx={{ backgroundColor: 'purple', width: 40, height: 40 }}
                  children={<i className="fa-solid fa-street-view"></i>}
                />
                <p>{translations[language]?.listActivity} </p>
              </MenuItem>
            </a>

            <a className='hover:text-yellow-300'>
              <MenuItem onClick={handleLogout}>
                <Avatar
                  sx={{
                    backgroundColor: 'chocolate', width: 40, height: 40
                  }}
                  children={
                    <i className="fa-solid fa-cat"></i>
                  }
                />
                <p>{translations[language]?.logOut} </p>
              </MenuItem>
            </a>
          </Menu>
          {/*user end */}
          <button onClick={() => window.open('https://apps.apple.com/us/app/imdb-movies-tv-shows/id342792525?_branch_match_id=1303228076714752528&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL86pTNJLLCjQy8nMy9YP9k6pDDRzNDGxBABVqlN1IAAAAA%3D%3D&utm_campaign=mdot+sitewide+footer+Branch+update&utm_medium=marketing&utm_source=IMDb+Mdot', '_blank')}
            className=" bg-yellow-400 text-black text-center border-none font-bold text-sm  rounded-lg whitespace-nowrap hover:bg-black hover:text-blue-500 lg:hidden hover:border-red-500 px-2 py-2 mr-2"
          > {translations[language]?.getApp}</button>
        </div >
      )}

      {/* drawer màn hình nhỏ */}
      <div
        className={`fixed overflow-auto  top-0 left-0 h-screen w-fit bg-black shadow z-40 justify-start  rounded-md  ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Toolbar />
        <Button onClick={toggleDrawer} sx={{ color: 'white', top: '20px', right: '10px', position: "fixed", fontWeight: 'bold', fontSize: '20px', fontFamily: 'sans-serif', backgroundColor: 'red' }}>X</Button>
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
                <ListItem disablePadding key={index} sx={{ color: 'white', textTransform: 'capitalize' }}>
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
              <Typography>{translations[language]?.seePro}</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}></Box>
            <LaunchIcon sx={{ padding: '10px', fontSize: '40px' }} />
          </Fragment>
        </List>

      </div>

      {/* drawer end*/}


    </section >
  );
}
