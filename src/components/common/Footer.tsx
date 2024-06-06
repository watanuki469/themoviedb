export default function Footer() {
    return (
        <footer className="bottom-0 left-0 w-full bg-black text-white py-4 ">
            <div className="container mx-auto px-4  ">
                <div className="hidden w-full lg:block justify-center items-center mb-2  text-white">
                    <div className="flex items-center gap-4">
                        <div className="justify-center w-full border-2 border-gray-800 rounded-lg h-20 px-2 py-2">
                            <p className="text-center font-bold lg:text-xl text-lg">Follow IMDb on social</p>
                            <div className="flex flex-wrap gap-4 space-x-5 justify-center text-center py-2 text-lg ">
                                <a href="https://www.tiktok.com/@imdb">
                                    <i className="hover:text-yellow-300 fa-brands fa-tiktok"></i>
                                </a>
                                <a href="https://www.instagram.com/imdb/">
                                    <i className="hover:text-yellow-300 fa-brands fa-instagram"></i>
                                </a>
                                <a href="https://twitter.com/imdb">
                                    <i className="hover:text-yellow-300 fa-brands fa-twitter"></i>
                                </a>
                                <a href="https://www.youtube.com/imdb">
                                    <i className="hover:text-yellow-300 fa-brands fa-youtube"></i>
                                </a>
                                <a href="https://www.facebook.com/imdb">
                                    <i className="hover:text-yellow-300 fa-brands fa-facebook"></i>
                                </a>
                            </div>
                        </div>
                        <div className="w-full flex items-center border-gray-800 rounded-lg border-2 h-20 px-8 py-4 ">
                            <div>
                                <p className="font-bold lg:text-xl text-lg">Get the IMDb app</p>
                                <p>For Android and iOS</p>
                            </div>
                            <div className="ml-auto w-fit px-1 py-1 bg-white">
                                <img src="https://m.media-amazon.com/images/G/01/IMDb/Mobile/DesktopQRCode-png.png" className="w-12 h-12 justify-center text-center" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block lg:hidden justify-center items-center mb-2 w-full text-white">
                    <button
                        onClick={() => window.open('https://apps.apple.com/us/app/imdb-movies-tv-shows/id342792525?_branch_match_id=1303228076714752528&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL86pTNJLLCjQy8nMy9YP9k6pDDRzNDGxBABVqlN1IAAAAA%3D%3D&utm_campaign=mdot+sitewide+footer+Branch+update&utm_medium=marketing&utm_source=IMDb+Mdot', '_blank')}
                        className="px-2 py-2 flex items-center ml-auto mr-auto justify-center text-center rounded-md font-bold text-black bg-yellow-300 hover:opacity-90">
                        Get the IMDb app
                    </button>

                    <nav className="flex flex-wrap justify-center -mx-5 my-2">
                        <div className="px-5 py-2">
                            <a href="https://www.tiktok.com/@imdb" className="leading-6 text-white hover:text-yellow-300 text-xl">
                                <i className="hover:text-yellow-300 fa-brands fa-tiktok "></i>
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="https://www.instagram.com/imdb/" className="leading-6 text-white hover:text-yellow-300 text-xl">
                                <i className="hover:text-yellow-300 fa-brands fa-instagram "></i>
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="https://twitter.com/imdb" className="leading-6 text-white hover:text-yellow-300 text-xl">
                                <i className="hover:text-yellow-300 fa-brands fa-twitter "></i>
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="https://www.youtube.com/imdb" className="leading-6 text-white hover:text-yellow-300 text-xl">
                                <i className="hover:text-yellow-300 fa-brands fa-youtube "></i>
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="https://www.facebook.com/imdb" className="leading-6 text-white hover:text-yellow-300 text-xl">
                                <i className="hover:text-yellow-300 fa-brands fa-facebook "></i>
                            </a>
                        </div>
                    </nav>
                </div>
                <nav className="flex flex-wrap justify-center -mx-5 my-4">
                    <div className="px-5 py-2">
                        <a href="https://help.imdb.com/imdb" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">
                            Help
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://help.imdb.com/article/imdb/general-information/imdb-site-index/GNCX7BHNSPBTFALQ#so" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">
                            Site Index
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="/IMDbPro" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">
                            IMDbPro
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.boxofficemojo.com/" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">
                            Box Office Mojo
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://developer.imdb.com/" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">
                            IMDb Developer
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.imdb.com/pressroom/?ref_=ft_pr" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">
                            Press Room
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://advertising.amazon.com/resources/ad-specs/imdb/" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">
                            Advertising
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.amazon.jobs/content/en/teams/imdb" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">
                            Jobs
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.imdb.com/conditions?ref_=ft_cou" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">
                            Conditions of Use
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.imdb.com/privacy?ref_=ft_pvc" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">
                            Privacy Policy
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.imdb.com/privacy/adpreferences/?ref_=pvc_redir" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">
                            Your Ads Privacy Choices
                        </a>
                    </div>
                </nav>

                {/* <div className="flex gap-4 font-serif items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" width="50" height="50" className="bg-black rounded-none" alt="Logo" />
                    <div className="">IMDb Movie</div>
                </div>
                <div className="flex gap-4 font-serif items-center py-2 ">
                    <div className="">Made with</div>
                    <img src="https://static1.howtogeekimages.com/wordpress/wp-content/uploads/csit/2019/07/2350564e.png" width="100" height="50" className="rounded-none" alt="Logo" />
                </div>
                <div className="flex gap-4 font-serif items-center py-2">
                    <div className="">Data provided by</div>
                    <img src="https://files.readme.io/29c6fee-blue_short.svg" width="120" height="50" className="bg-black rounded-none" alt="Logo" />
                </div>
                <div className="font-serif py-2">
                    This project uses the TMDB API but is not endorsed or certified by TMDB.
                </div>
                <div className="flex flex-wrap py-2 items-center">
                    <i className="fa-brands fa-github text-4xl"></i>
                    <svg
                        width="80"
                        height="30"
                        viewBox="0 0 76 65"
                        fill="none" xmlns="http://www.w3.org/2000/svg"
                        className=""
                    ><path
                            d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#FFFFFF" />
                    </svg>
                    <div className="h-12 w-1 bg-white mr-4 rounded-full"></div>
                    <div className="">Powered by Vercel</div>
                </div> */}
                <nav className="flex flex-wrap justify-center -mx-5 my-4">
                    <div className="px-2 py-2">
                        <p>an</p>
                    </div>
                    <div className="px-2 py-2">
                        <img className="w-20 h-8"
                            src="https://i.pinimg.com/736x/47/b7/bd/47b7bdac4285ee24654ca7d68cf06351.jpg">
                        </img>
                    </div>
                    <div className="px-2 py-2">
                        <p>company</p>
                    </div>
                </nav>
                <div className="flex gap-4 mt-4 justify-center items-center mb-2  text-white">
                    <p>
                        © 1990-2024 by IMDb.com, Inc
                    </p>
                </div>
            </div >
        </footer>
    )
}