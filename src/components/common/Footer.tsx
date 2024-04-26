export default function Footer() {
    return (
        <footer className="bottom-0 left-0 w-full bg-black text-white py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center mb-2  text-white">
                    <div className="flex space-x-10 ">
                        <i  className="hover:text-yellow-300 fa-brands fa-tiktok"></i>
                        <i  className="hover:text-yellow-300 fa-brands fa-instagram"></i>
                        <i  className="hover:text-yellow-300 fa-brands fa-twitter"></i>
                        <i  className="hover:text-yellow-300 fa-brands fa-youtube"></i>
                        <i  className="hover:text-yellow-300 fa-brands fa-facebook"></i>
                    </div>
                </div>
                <div className="mt-8 max-w-4xl items-center justify-center ml-auto mr-auto space-x-10 "
                >
                    <div className="justify-center text-white items-center ml-auto mr-auto block">
                        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 justify-center items-center text-center">
                            <div className="hover:underline">Get the IMDb app</div>
                            <div className="hover:underline">Help</div>
                            <div className="hover:underline">Site Index</div>
                            <div className="hover:underline">IMDbPro</div>
                            <div className="hover:underline">Box Office Mojo</div>
                            <div className="hover:underline">IMDb Developer</div>
                            <div className="hover:underline">Press Room</div>
                            <div className="hover:underline">Advertising</div>
                            <div className="hover:underline">Jobs</div>
                            <div className="hover:underline">Conditions of Use</div>
                            <div className="hover:underline">Privacy Policy</div>
                            <div className="hover:underline">Your Ads Privacy Choices</div>
                        </div>
                    </div>

                </div>
                <div className="flex gap-4 mt-8 justify-center items-center mb-2  text-white">
                    <p>An</p>
                    <i className="fa-brands fa-aws text-white text-xl"></i>
                    <p>Company</p>
                </div>
                <div className="flex gap-4 mt-8 justify-center items-center mb-2  text-white">
                    <p>
                        © 1990-2024 by IMDb.com, Inc
                    </p>
                </div>


            </div >
        </footer>
    )
}