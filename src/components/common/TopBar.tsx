import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LaunchIcon from '@mui/icons-material/Launch';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PublicIcon from '@mui/icons-material/Public';
import StarsIcon from "@mui/icons-material/Stars";
import TvIcon from '@mui/icons-material/Tv';
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { Avatar, Box, Button, Divider, FormControl, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Select, SelectChangeEvent, Toolbar, Typography, } from "@mui/material";
import * as Dialog from "@radix-ui/react-dialog";
import "flowbite";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hooks';
import SearchBar from "./SearchBar";

export default function TopBar() {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleCloseDialogClick = () => {
    setOpen(false);
  };

  const languageString = localStorage.getItem('language');
  const initialLanguage: string[] = languageString ? languageString.split(",") : [];
  const [language, setLanguage] = useState<string[]>(initialLanguage);

  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(typeof value === "string" ? value.split(",") : value);
  //   localStorage.setItem("language", personName.join(","));
  //   setLanguage(personName)
  // };
  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const {
      target: { value },
    } = event;
    if (typeof value === "string") {
      localStorage.setItem("language", value);
      setLanguage([value]);
      window.location.reload();
      // toast.success('Please reload page to reflect the change')

    } else {
      localStorage.setItem("language", value.join(","));
      setLanguage(value);
      window.location.reload();
      // toast.success('Please reload page to reflect the change')
    }
  };



  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
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
        return ['Release Calendar', 'Most Popular Movies', 'Top Box Office'
          , 'Showtimes & Ticked', 'Movies News', 'Browse Movie By Genre'];
      case 'TV Shows':
        return ['Whats on TV & Streaming', 'Top 250 TV Shows', 'Most Popular TV Shows', 'TV News'];
      case 'Watch':
        return ['What to Watch', 'Latest Trailers', 'IMDb Originals', 'IMDb Picks', 'IMDb Podcasts'];
      case 'Awards & Events':
        return ['Oscars', 'Emmys', 'Best Of 2023', 'Holiday Picks', 'Starmeter Awards', 'Awards Central', 'Festival Central', 'All Event'];
      case 'Celebs':
        return ['Born Today', 'Most Popular Celebs', 'Celebrity News'];
      case 'Community':
        return ['Help Center', 'Contributor Zone', 'Polls'];
      default:
        return [];
    }
  };
  const handleItemClick = (item: string) => {
    console.log(item);

    switch (selectedMenu) {
      case 'Movies':
        if (item === 'Release Calendar') {
          navigate(`/upComing`);
        } else if (item === 'Most Popular Movies') {
          navigate('/Popular');
        } else if (item === 'Top Box Office') {
          navigate('/topBoxOffice');
        } else if (item === 'Showtimes & Ticked') {
          navigate('/NotFound');
        } else if (item === 'Movies News') {
          navigate('/NotFound');
        } else if (item === 'Browse Movie By Genre') {
          navigate('/features/genre');
        } else {
          navigate('/NotFound');
        }
        break;

      case 'TV Shows':
        if (item === 'Whats on TV & Streaming') {
          navigate('/TVStreaming');
        } else if (item === 'Top 250 TV Shows') {
          navigate('/Top250Tv');
        } else if (item === 'Most Popular TV Shows') {
          navigate('/Top250Tv');
        } else if (item === 'TV News') {
          navigate('/TVNews');
        } else {
          navigate('/NotFound');
        }
        break;

      case 'Watch':
        if (item === 'What to Watch') {
          navigate('/WhatToWatch');
        } else if (item === 'Latest Trailers') {
          navigate('/LatestTrailers');
        } else if (item === 'IMDb Originals') {
          navigate('/IMDbOriginals');
        } else if (item === 'IMDb Picks') {
          navigate('/IMDbPicks');
        } else if (item === 'IMDb Podcasts') {
          navigate('/IMDbPodcasts');
        } else {
          navigate('/NotFound');
        }
        break;

      case 'Awards & Events':
        if (item === 'Oscars') {
          navigate('/Oscars');
        } else if (item === 'Emmys') {
          navigate('/Emmys');
        } else if (item === 'Best Of 2023') {
          navigate('/BestOf2023');
        } else if (item === 'Holiday Picks') {
          navigate('/HolidayPicks');
        } else if (item === 'Starmeter Awards') {
          navigate('/StarmeterAwards');
        } else if (item === 'Awards Central') {
          navigate('/AwardsCentral');
        } else if (item === 'Festival Central') {
          navigate('/FestivalCentral');
        } else if (item === 'All Event') {
          navigate('/AllEvent');
        } else {
          navigate('/NotFound');
        }
        break;

      case 'Celebs':
        if (item === 'Born Today') {
          navigate('/BornToday');
        } else if (item === 'Most Popular Celebs') {
          navigate('/PopularCelebs');
        } else if (item === 'Celebrity News') {
          navigate('/CelebrityNews');
        } else {
          navigate('/NotFound');
        }
        break;

      case 'Community':
        if (item === 'Help Center') {
          navigate('/HelpCenter');
        } else if (item === 'Contributor Zone') {
          navigate('/ContributorZone');
        } else if (item === 'Polls') {
          navigate('/Polls');
        } else {
          navigate('/NotFound');
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
  const handleCopyLink = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate('/login')
  };

  const stringToColor = (str: any) => {
    let hash = 0;
    let i;

    for (i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };


  return (
    <section className="static w-full bg-black mx-auto h-12 py-2 mb-4">
      {isSearchOpen ? (
        <div className='items-center h-full w-full flex '>
          <SearchBar />
          <i className="fa-regular fa-circle-xmark text-white text-3xl" onClick={() => setIsSearchOpen(false)}></i>
        </div>

      ) : (
        <div className="flex gap-x-3 items-center  justify-center ">
          <div onClick={toggleDrawer} className=" lg:hidden font-extrabold text-xl text-white m-3">
            <i className="fa-sharp fa-solid fa-bars"></i>
          </div >
          <button
            onClick={() => navigate("/")}
            className=" bg-yellow-400 text-black text-center 
            border-none font-extrabold text-2xl font-sans
            whitespace-nowrap hover:bg-black hover:text-blue-500
             hover:border-red-500  rounded-md px-1 py-1"
          >
            IMDb
          </button>
          <Dialog.Root open={open} onOpenChange={setOpen} >
            <Dialog.Trigger>
              <div className="hidden lg:flex items-center content-center justify-center self-center text-white gap-2 text-lg hover:bg-black hover:opacity-95">
                <i className="fa-sharp fa-solid fa-bars"></i>
                <p> Menu </p>
              </div>
            </Dialog.Trigger>
            <Dialog.Portal >
              <Dialog.Content
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
               rounded-md bg-black  p-8 shadow w-full  items-center justify-center aligns-center z-30 "
              >
                <div className="max-w-4xl ml-auto mr-auto ">
                  <div className="flex items-center">
                    <button
                      onClick={() => navigate("/")}
                      className="bg-yellow-400 text-black text-center border-none font-extrabold text-2xl font-sans whitespace-nowrap hover:opacity-80 rounded-md"
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
                          <p className="mt-2 hover:underline" onClick={() => (navigate('/upComing'))}>Release Calendar</p>
                          <p className="mt-2 hover:underline " onClick={() => (navigate('/top250Movie'))}>
                            Most Popular Movies
                          </p>
                          <p className="mt-2 hover:underline" onClick={() => (navigate('/topBoxOffice'))}>Top Box Office</p>
                          <p className="mt-2 hover:underline">
                            Showtime & Ticked
                          </p>
                          <p className="mt-2 hover:underline">Movies News</p>
                          <p className="mt-2 hover:underline" onClick={() => (navigate('/features/genre'))}>
                            Browse Movie By Genre
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
                          <p className="mt-2 hover:underline">
                            Whats on TV & Streaming
                          </p>
                          <p onClick={() => navigate('/top250Tv')} className="mt-2 hover:underline">Top 250 TV Shows</p>
                          <p onClick={() => navigate('/top250Tv')} className="mt-2 hover:underline">
                            Most Popular TV Shows
                          </p>
                          <p className="mt-2 hover:underline">TV News</p>
                        </div>
                      </div>
                    </div>
                    <div className="items-center">
                      <div className="flex  items-center gap-3">
                        <div className="aligns-center text-yellow-400 ">
                          <StarsIcon />
                        </div>
                        <div>
                          <p className="font-extrabold text-2xl font-sans whitespace-nowrap">
                            {" "}
                            Award & Event
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film "></i>
                        </div>
                        <div className="">
                          <p className="mt-2 hover:underline">Oscars</p>
                          <p className="mt-2 hover:underline">Emmys</p>
                          <p className="mt-2 hover:underline">Best Of 2023</p>
                          <p className="mt-2 hover:underline">Holiday Picks</p>
                          <p className="mt-2 hover:underline">Starmeter Awards</p>
                          <p className="mt-2 hover:underline">Awards Central</p>
                          <p className="mt-2 hover:underline">Festival Central</p>
                          <p className="mt-2 hover:underline">All Event</p>
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
                            Celebs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film "></i>
                        </div>
                        <div className="">
                          <p className="mt-2 hover:underline">Born Today</p>
                          <p className="mt-2 hover:underline">
                            Most Popular Celebs
                          </p>
                          <p className="mt-2 hover:underline">Celebrity News</p>
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
                          <p className="mt-2 hover:underline">What to Watch</p>
                          <p className="mt-2 hover:underline">Latest Trailers</p>
                          <p className="mt-2 hover:underline">IMDb Originals</p>
                          <p className="mt-2 hover:underline">IMDb Picks</p>
                          <p className="mt-2 hover:underline">IMDb Podcasts'</p>
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
                            Community
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="aligns-start text-black">
                          <i className="fa-solid fa-film "></i>
                        </div>
                        <div className="">
                          <p className="mt-2 hover:underline">Help Center</p>
                          <p className="mt-2 hover:underline">Contributor Zone</p>
                          <p className="mt-2 hover:underline">Polls</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>

          </Dialog.Root>
          <div className="grow ">
            <div className=" hidden lg:flex bg-red-300 w-full z-20">
              <SearchBar />
            </div>
          </div>

          <button
            onClick={() => navigate("/IMDbPro")}
            className=" hidden lg:flex bg-black text-white text-center 
           font-extrabold text-lg font-sans whitespace-nowrap  hover:bg-opacity-90  rounded-md"
          >
            IMDb<span className="text-blue-600">Pro</span>
          </button>
          <Divider className=" hidden lg:flex" orientation="vertical" sx={{ bgcolor: "red", color: 'white', border: "1px solid gray", height: '20px' }} />
          <div className=" items-center bg-black  font-extrabold md:flex hidden lg:flex">
            <button
              onClick={() => navigate("/WatchList")}
              className="flex items-center gap-2"
            >
              <i className="fa-regular fa-bookmark  text-white"></i>
              <p className="text-white text-xl font-extrabold border-none ">
                Watch List
              </p>
            </button>
          </div>
          {/*change language  */}
          <Button sx={{ display: { xs: "none", md: "flex" } }}>
            <FormControl
              sx={{
                bgcolor: "black", color: "red", fontWeight: "extrabold", textAlign: "center", alignContent: "center", alignItems: "center",
              }}
            >
              <Select
                label="Agel"
                value={language}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                variant="standard"
                sx={{
                  "& .MuiSelect-icon": {
                    color: "white", // Thay đổi màu của mũi tên hướng xuống thành màu đỏ
                  },
                  "& .MuiSelect-select.MuiSelect-select": {
                    color: "white", // Thay đổi màu của mục đã chọn thành màu xanh
                    fontWeight: "bold",
                  },
                  mt: "3px",
                }}
              >
                <MenuItem value="language" disabled>
                  Language
                </MenuItem>
                <MenuItem value="en-US">English </MenuItem>
                <MenuItem value="vn-VI">Vietnamese</MenuItem>
                <MenuItem value="ja-JP">Japanese</MenuItem>
                <MenuItem value="fr-FR">French </MenuItem>
                <MenuItem value="de-DE">German</MenuItem>
                <MenuItem value="hi-IN">Hindi</MenuItem>
                <MenuItem value="id-ID">Indonesian </MenuItem>
                <MenuItem value="it-IT">Italian</MenuItem>
                <MenuItem value="ko-KR">Korean</MenuItem>
              </Select>
            </FormControl>
          </Button>
          <div className="lg:hidden text-white " >
            <i className="fa-solid fa-magnifying-glass" onClick={() => setIsSearchOpen(true)}></i>
          </div>
          {/* <button
            onClick={() => navigate("/")}
            className="text-white text-center border-none 
              whitespace-nowrap hover:bg-black hover:text-blue-500
              text-xl font-extrabold px-2 py-2 hover:border-red-500  rounded-md"
          >
           {email}
          </button> */}
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
              <Avatar
                sx={{
                  backgroundColor: stringToColor(email),
                  width: 40,
                  height: 40
                }}
                children={`${email?.split(" ")[0][0]}`}
              />
              {email}
            </MenuItem>

            <div className='hover:text-yellow-300'>
              <MenuItem onClick={handleCopyLink}>
                <ListItemIcon>
                  {/* <i className="fa-solid fa-link text-2xl text-white"></i> */}
                  <i className="fa-solid fa-cat text-2xl "></i>
                </ListItemIcon>
                <p>Logout</p>
              </MenuItem>
            </div>


          </Menu>
          <button
            onClick={() => navigate("/")}
            className=" bg-yellow-400 text-black text-center 
          border-none font-bold text-sm h-10 rounded-lg font-sans
            whitespace-nowrap hover:bg-black hover:text-blue-500
             lg:hidden hover:border-red-500 "
          >
            Use App
          </button>
        </div >
      )
      }


      {/* drawer */}
      <div
        className={`fixed  top-0 left-0 h-screen w-96 bg-black shadow z-40   rounded-md  ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Toolbar />
        <Button onClick={toggleDrawer} sx={{ color: 'white', top: '20px', right: '10px', position: "fixed", fontWeight: 'bold', fontSize: '20px', fontFamily: 'sans-serif' }}>X</Button>
        <List>
          {['Movies', 'TV Shows', 'Watch', 'Awards & Events', 'Celebs', 'Community'].map((text, index) => (
            <Fragment key={text} >
              <ListItem >
                <ListItemButton onClick={() => toggleMenu(text)}>
                  <ListItemIcon sx={{ color: 'white' }}>
                    {index === 0 && <LocalMoviesIcon />}   {index === 1 && <TvIcon />}
                    {index === 2 && <VideoLibraryIcon />}     {index === 3 && <StarsIcon />}
                    {index === 4 && <PeopleAltIcon />}       {index === 5 && <PublicIcon />}
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
                <ListItem disablePadding key={index} sx={{ color: 'white' }}>
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
