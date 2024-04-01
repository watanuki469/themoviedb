export default function Footer() {
    return (
        <div>
            <div className="flex justify-center items-center mb-2  text-white">
                <div className="flex space-x-20 ">
                    <i className="fa-brands fa-tiktok"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-youtube"></i>
                    <i className="fa-brands fa-facebook"></i>
                </div>
            </div>
            <div className="mt-8">
                <div className="gap-14 justify-center text-white flex  items-center whitespace-nowrap">
                    <div>Get the IMDb app</div>
                    <div>Help</div>
                    <div>Site Index</div>
                    <div>IMDbPro</div>
                    <div>Box Office Mojo</div>
                    <div>IMDb Developer</div>

                </div>
                <div className="gap-14 justify-center text-white flex items-center whitespace-nowrap">
                    <div>Press Room</div>
                    <div>Advertising</div>
                    <div>Jobs</div>
                    <div>Conditions of Use</div>
                    <div>Privacy Policy</div>
                    <div>Your Ads Privacy Choices</div>
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
    )
}