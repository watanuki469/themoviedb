import { useContext } from "react";
import { LanguageContext } from "../../pages/LanguageContext";

export default function Footer() {
    const context = useContext(LanguageContext);
    if (!context) {
        return null;
    }
    const { language, translations, handleLanguageChange } = context;
    return (
        <footer className="bottom-0 left-0 w-full bg-black text-white py-4 ">
            <div className="container mx-auto px-4  ">
                <div className="hidden w-full lg:block justify-center items-center mb-2  text-white">
                    <div className="flex items-center gap-4">
                        <div className="justify-center w-full border-2 border-gray-800 rounded-lg h-20 px-2 py-2">
                            <p className="text-center font-bold lg:text-xl text-lg">{translations[language]?.follow}</p>
                            <div className="flex flex-wrap gap-4 space-x-5 justify-center text-center py-2 text-lg ">
                                <a href="https://www.tiktok.com/@imdb"><i className="hover:text-yellow-300 fa-brands fa-tiktok"></i> </a>
                                <a href="https://www.instagram.com/imdb/"><i className="hover:text-yellow-300 fa-brands fa-instagram"></i> </a>
                                <a href="https://twitter.com/imdb"><i className="hover:text-yellow-300 fa-brands fa-twitter"></i> </a>
                                <a href="https://www.youtube.com/imdb"><i className="hover:text-yellow-300 fa-brands fa-youtube"></i> </a>
                                <a href="https://www.facebook.com/imdb"><i className="hover:text-yellow-300 fa-brands fa-facebook"></i> </a>
                            </div>
                        </div>
                        <div className="w-full flex items-center border-gray-800 rounded-lg border-2 h-20 px-8 py-4 ">
                            <div>
                                <p className="font-bold lg:text-xl text-lg">{translations[language]?.getApp}</p>
                                <p>{translations[language]?.os}</p>
                            </div>
                            <div className="ml-auto w-fit px-1 py-1 bg-white">
                                <img src="https://m.media-amazon.com/images/G/01/IMDb/Mobile/DesktopQRCode-png.png" className="w-12 h-12 justify-center text-center" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block lg:hidden justify-center items-center mb-2 w-full text-white">
                    <button onClick={() => window.open('https://apps.apple.com/us/app/imdb-movies-tv-shows/id342792525?_branch_match_id=1303228076714752528&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL86pTNJLLCjQy8nMy9YP9k6pDDRzNDGxBABVqlN1IAAAAA%3D%3D&utm_campaign=mdot+sitewide+footer+Branch+update&utm_medium=marketing&utm_source=IMDb+Mdot', '_blank')}
                        className="px-2 py-2 flex items-center ml-auto mr-auto justify-center text-center rounded-md font-bold text-black bg-yellow-300 hover:opacity-90">
                        {translations[language]?.getApp}
                    </button>

                    <nav className="flex flex-wrap justify-center -mx-5 my-2">
                        <div className="px-5 py-2">
                            <a href="https://www.tiktok.com/@imdb" className="leading-6 text-white hover:text-yellow-300 text-xl"><i className="hover:text-yellow-300 fa-brands fa-tiktok "></i></a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="https://www.instagram.com/imdb/" className="leading-6 text-white hover:text-yellow-300 text-xl"><i className="hover:text-yellow-300 fa-brands fa-instagram "></i></a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="https://twitter.com/imdb" className="leading-6 text-white hover:text-yellow-300 text-xl"><i className="hover:text-yellow-300 fa-brands fa-twitter "></i></a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="https://www.youtube.com/imdb" className="leading-6 text-white hover:text-yellow-300 text-xl"><i className="hover:text-yellow-300 fa-brands fa-youtube "></i></a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="https://www.facebook.com/imdb" className="leading-6 text-white hover:text-yellow-300 text-xl"><i className="hover:text-yellow-300 fa-brands fa-facebook "></i></a>
                        </div>
                    </nav>
                </div>
                <nav className="flex flex-wrap justify-center -mx-5 my-4">
                    <div className="px-5 py-2">
                        <a href="https://help.imdb.com/imdb" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">{translations[language]?.helpCenter}</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="/IMDbPro" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">IMDbPro</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.boxofficemojo.com/" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">{translations[language]?.topBoxOffice} Mojo</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://developer.imdb.com/" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">IMDb {translations[language]?.developer}</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.imdb.com/pressroom/?ref_=ft_pr" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">{translations[language]?.pressRoom}</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://advertising.amazon.com/resources/ad-specs/imdb/" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">{translations[language]?.advertise}</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.amazon.jobs/content/en/teams/imdb" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">{translations[language]?.job}</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.imdb.com/conditions?ref_=ft_cou" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">{translations[language]?.condition}</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.imdb.com/privacy?ref_=ft_pvc" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">{translations[language]?.privacy}</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="https://www.imdb.com/privacy/adpreferences/?ref_=pvc_redir" className="text-base leading-6 hover:text-yellow-300 text-white hover:underline">{translations[language]?.yourAd}</a>
                    </div>
                </nav>

                <nav className="flex flex-wrap justify-center -mx-5 my-4">
                    <p className="px-2 py-2">an</p>
                    <div className="px-2 py-2">
                        <img className="w-20 h-8" src="https://i.pinimg.com/736x/47/b7/bd/47b7bdac4285ee24654ca7d68cf06351.jpg"></img>
                    </div>
                    <p className="px-2 py-2">company</p>
                </nav>
                <p className="flex gap-4 mt-4 justify-center items-center mb-2  text-white">© 1990-2024 by IMDb.com, Inc</p>
            </div >
        </footer>
    )
}