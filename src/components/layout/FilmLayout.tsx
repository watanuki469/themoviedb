import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiController from "../../redux/client/api.Controller.";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";
import { setListSingleMovie } from "../../redux/reducers/singleMovie.reducer";
import { AppDispatch } from "../../redux/store";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import VideoDetail from "../common/VideoDetail";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import apiFilm from "../../redux/client/api.Film";
import { setSingleFilm } from "../../redux/reducers/film.reducer";
import parse, { Element, domToReact } from 'html-react-parser';


import Charts from "../../modules/Charts";
import Player from "../../modules/Artplayer";




export default function FilmLayout() {
    const { id } = useParams()
    const { mediaType } = useParams()
    const { name } = useParams()
    let navigate = useNavigate()
    const [numberIndex, setNumberIndex] = useState(0);

    const [activeSlider, setActiveSlider] = useState(3);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setActiveSlider(2);
            } else {
                setActiveSlider(3);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dispatch = useAppDispatch();
    const singleMovieList = useAppSelector((state) => state.film.singleFilm) || { episodes: [] };

    const fetchSingleMovies = (name: any) => (dispatch: AppDispatch) => {
        apiFilm.fetchSingleFilm.singleFilm(name)
            .then((data) => {
                if (data) {
                    dispatch(setSingleFilm(data));
                } else {
                    setSingleFilm('')
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    // Fetch data when component mounts or when 'id' changes
    useEffect(() => {
        dispatch(fetchSingleMovies(name));
    }, [id, name, dispatch]);

    // Trích xuất nội dung từ API
    const content = singleMovieList?.movie?.content;

    // Hàm lọc chỉ các thẻ <p>
    const filterParagraphs = (htmlContent: string) => {
        return parse(htmlContent, {
            replace: (domNode) => {
                // Kiểm tra nếu domNode là một phần tử (Element)
                if (domNode instanceof Element && domNode.tagName === 'p') {
                    return <p>{domToReact(domNode.children as unknown as Element[])}</p>;
                }
            },
        });
    };

    // Chuyển đổi và lọc nội dung HTML thành phần tử React
    const filteredContent = content ? filterParagraphs(content) : null;

    return (
        <div className=" min-h-screen bg-black">
            <div className="">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                    {singleMovieList?.episodes?.length > 0 ? (
                        <section className="min-h-screen cursor-pointer relative text-white font-sans font-medium " >
                            <div className="grid grid-cols-12 gap-y-4 h-full gap-2">
                                <div className="lg:col-span-8 col-span-12 lg:ml-2 bg-black relative">
                                    <div className='min-h-60 w-full h-full bg-black bg-cover'                            >
                                        <iframe
                                            allowFullScreen
                                            src={`${singleMovieList?.episodes?.[0]?.server_data[numberIndex]?.link_embed}`}
                                            width="100%"
                                            height={"100%"}
                                            style={{ border: 0, minHeight: '350px' }}
                                        >
                                        </iframe>

                                        {/* <Player
                                            option={{
                                                url: singleMovieList?.episodes?.[0]?.server_data?.[numberIndex]?.link_embed,
                                                volume: 0.5,
                                                isLive: false,
                                                muted: false,
                                                autoplay: false,
                                                pip: true,
                                                autoSize: true,
                                                autoMini: true,
                                                screenshot: true,
                                                setting: true,
                                                loop: true,
                                                flip: true,
                                                playbackRate: true,
                                                aspectRatio: true,
                                                fullscreen: true,
                                                fullscreenWeb: true,
                                                subtitleOffset: true,
                                                miniProgressBar: true,
                                                mutex: true,
                                                backdrop: true,
                                                playsInline: true,
                                                autoPlayback: true,
                                                airplay: true,
                                                theme: '#23ade5',
                                                lang: navigator.language.toLowerCase(),
                                                moreVideoAttr: {
                                                    crossOrigin: 'anonymous',
                                                },
                                                settings: [
                                                    {
                                                        html: 'Subtitle',
                                                        tooltip: 'Bilingual',
                                                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M512 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H512zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z"/></svg>',
                                                        selector: [
                                                            {
                                                                html: 'Display',
                                                                tooltip: 'Show',
                                                                switch: true,
                                                                onSwitch: function (item) {
                                                                    item.tooltip = item.switch ? 'Hide' : 'Show';
                                                                    // art.subtitle.show = !item.switch; 
                                                                    return !item.switch;
                                                                },
                                                            },
                                                            {
                                                                default: true,
                                                                html: 'Bilingual',

                                                            },
                                                            {
                                                                html: 'Chinese',
                                                            },
                                                            {
                                                                html: 'Japanese',
                                                            },
                                                        ],
                                                        onSelect: function (item) {
                                                            // art.subtitle.switch(item.url, { name: item.html }); // Handle this as needed
                                                            return item.html;
                                                        },
                                                    },
                                                    {
                                                        html: 'Switcher',
                                                        icon: '<img width="22" heigth="22" src="/assets/img/state.svg">',
                                                        tooltip: 'OFF',
                                                        switch: false,
                                                        onSwitch: function (item) {
                                                            item.tooltip = item.switch ? 'OFF' : 'ON';
                                                            console.info('You clicked on the custom switch', item.switch);
                                                            return !item.switch;
                                                        },
                                                    },
                                                    {
                                                        html: 'Slider',
                                                        icon: '<img width="22" heigth="22" src="/assets/img/state.svg">',
                                                        tooltip: '5x',
                                                        range: [5, 1, 10, 0.1],
                                                        onRange: function (item) {
                                                            return item.range + 'x';
                                                        },
                                                    },
                                                ],
                                                contextmenu: [
                                                    {
                                                        html: 'Custom menu',
                                                        click: function (contextmenu) {
                                                            console.info('You clicked on the custom menu');
                                                            contextmenu.show = false;
                                                        },
                                                    },
                                                ],
                                                layers: [
                                                    {
                                                        html: '<img width="100" src="/assets/sample/layer.png">',
                                                        click: function () {
                                                            window.open('https://aimu.app');
                                                            console.info('You clicked on the custom layer');
                                                        },
                                                        style: {
                                                            position: 'absolute',
                                                            top: '20px',
                                                            right: '20px',
                                                            opacity: '.9',
                                                        },
                                                    },
                                                ],
                                                quality: [
                                                    {
                                                        default: true,
                                                        html: 'SD 480P',
                                                        url: '/assets/sample/video.mp4',
                                                    },
                                                    {
                                                        html: 'HD 720P',
                                                        url: '/assets/sample/video.mp4',
                                                    },
                                                ],
                                                thumbnails: {
                                                    url: '/assets/sample/thumbnails.png',
                                                    number: 60,
                                                    column: 10,
                                                },
                                                subtitle: {
                                                    url: '/assets/sample/subtitle.srt',
                                                    type: 'srt',
                                                    style: {
                                                        color: '#fe9200',
                                                        fontSize: '20px',
                                                    },
                                                    encoding: 'utf-8',
                                                },
                                                highlight: [
                                                    {
                                                        time: 15,
                                                        text: 'One more chance',
                                                    },
                                                    {
                                                        time: 30,
                                                        text: '谁でもいいはずなのに',
                                                    },
                                                    {
                                                        time: 45,
                                                        text: '夏の想い出がまわる',
                                                    },
                                                    {
                                                        time: 60,
                                                        text: 'こんなとこにあるはずもないのに',
                                                    },
                                                    {
                                                        time: 75,
                                                        text: '终わり',
                                                    },
                                                ],
                                                icons: {
                                                    loading: '<img src="/assets/img/ploading.gif">',
                                                    state: '<img width="150" heigth="150" src="/assets/img/state.svg">',
                                                    indicator: '<img width="16" heigth="16" src="/assets/img/indicator.svg">',
                                                },

                                            }}
                                            style={{
                                                width: '100%',
                                                height: '400px',
                                                margin: '60px auto 0',
                                            }}
                                            getInstance={(art: any) => console.info(art)}
                                        /> */}
                                    </div>

                                </div>
                                <div className="lg:col-span-4 col-span-12 h-full ml-2 overflow-hidden">
                                    <div className=" h-1/2 flex px-2 py-2 gap-2 max-h-40">
                                        <img onClick={() => navigate(`/${mediaType}/${id}`)}
                                            src={`${singleMovieList?.movie?.thumb_url ? singleMovieList?.movie?.thumb_url : singleMovieList?.movie?.poster_url}`} alt="product images"
                                            className="max-w-32 h-full" />
                                        <div className='' >
                                            <div className='justify-between flex items-center hover:text-yellow-300' onClick={() => navigate(`/${mediaType}/${id}`)}>
                                                <p className='text-lg'>{singleMovieList?.movie?.name}</p>
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </div>
                                            <div className='flex gap-2 flex-wrap text-gray-500  text-sm'>
                                                {singleMovieList?.movie?.category?.map((item: any, index: any) => (
                                                    <div key={index} className="flex gap-2 flex-wrap ">
                                                        <p className="hover:text-yellow-300 hover:underline " onClick={() => navigate(`/search?mediaType=${mediaType}&genres=${item?.name}`)}>{item?.name}</p>
                                                        <p className=''>{index < Math.min(singleMovieList?.movie?.category?.length) - 1 ? '•' : ''}</p>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2 py-2">
                                        <div className="">
                                            {filteredContent}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>Đang xem: Tập {numberIndex + 1} {singleMovieList?.episodes?.[0]?.server_data[numberIndex]?.filename ? `:` + singleMovieList?.episodes?.[0]?.server_data[numberIndex]?.filename : ''}</div>

                            <div className="flex items-center py-3 mt-3 px-2">
                                <div className="h-8 w-1 bg-yellow-300 mr-2 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-white ">Danh sách tập</h2>
                            </div>

                            <div className="flex flex-wrap gap-2 h-56 overflow-auto px-2">
                                {singleMovieList?.episodes?.[0]?.server_data?.map((item: any, index: any) => (
                                    <div key={index} className="relative">
                                        <div className={`w-full  ${numberIndex === index ? 'bg-black text-white ' : 'bg-gray-300 text-black'} border-2 border-white hover:opacity-90 px-2 py-2`}
                                            onClick={() => { setNumberIndex(index) }}>
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section >
                    )
                        : (
                            <div className="text-white">
                                <img src="https://m.media-amazon.com/images/G/01/IMDbPro/images/Test/AnthemV2/upsellDesktop_v1.jpg"></img>
                                <div className="bg-white text-black">
                                    <div className="grid grid-cols-3 gap-4 px-2 py-2 min-h-40 text-center justify-center items-center lg:text-2xl text-lg">
                                        <div>Find contact info for agents and management</div>
                                        <div>View connections to industry professionals</div>
                                        <div>See who's working on titles in development</div>
                                    </div>
                                    <div className="py-4" onClick={()=>navigate(`/IMDbPro`)}> 
                                        <div className="px-2 py-2 bg-yellow-300 hover:opacity-80 text-black justify-center text-center items-center w-fit ml-auto mr-auto rounded-md">Become Pro Member</div>
                                    </div>
                                </div>
                            </div>
                        )}

                    <Footer />

                </div>
            </div>

        </div>
    )
}