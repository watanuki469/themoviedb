export default function SolarSystem() {
    return (
        <div>
            <div className="relative flex items-center justify-center h-screen bg-[url('https://t4.ftcdn.net/jpg/01/28/98/53/360_F_128985367_mNdX0b56w6OcgiyUDnZwukpK1bkpfWwI.jpg')] overflow-hidden">
                <div className="stars-container absolute w-full h-full"></div>
                <div className="relative w-[40em] h-[40em] text-[6px]">
                    <div className="absolute top-[15em] left-[15em] w-[10em] h-[10em] rounded-full shadow-[0_0_3em_rgb(255,128,0)] flex items-center justify-center animate-[orbit_50s_linear_infinite]">
                        <div className={`absolute w-[13em] h-[13em] bg-[url('/src/assets/sun.png')] bg-cover rounded-full`}></div>
                    </div>
                    <div className="absolute top-[12.5em] left-[12.5em] w-[15em] h-[15em] border border-white border-t-0 border-r-0 rounded-full animate-[orbit_68.7s_linear_infinite]">
                        <div className={`absolute top-[1.5em] right-[0.8em] w-[2em] h-[2em] bg-[url('/src/assets/mercury.png')] bg-cover rounded-full`}></div>
                    </div>
                    <div className="absolute top-[10em] left-[10em] w-[20em] h-[20em] border border-white border-t-0 border-r-0 rounded-full animate-[orbit_48.7s_linear_infinite]">
                        <div className={`absolute top-[2em] right-[2em] w-[2em] h-[2em] bg-[url('/src/assets/venus.png')] bg-cover rounded-full`}></div>
                    </div>
                    <div className="absolute top-[6em] left-[6em] w-[28em] h-[28em] border border-white border-t-0 border-r-0 rounded-full animate-[orbit_36.5s_linear_infinite]">
                        <div className={`absolute top-[3em] right-0 w-[5em] h-[5em] bg-[url('/src/assets/earth.png')] bg-cover rounded-full`}></div>
                        <div className="absolute top-[2em] right-[-1em] w-[7em] h-[7em] border border-white border-t-0 border-r-0 rounded-full animate-[orbit_2.7s_linear_infinite]">
                            <div className={`absolute top-[0.8em] right-[0.2em] w-[1.2em] h-[1.2em] bg-[url('/src/assets/moon.png')] bg-cover rounded-full`}></div>
                        </div>
                    </div>
                    <div className="absolute top-[2em] left-[2.5em] w-[36em] h-[36em] border border-white border-t-0 border-r-0 rounded-full animate-[orbit_26.5s_linear_infinite]">
                        <div className={`absolute top-[5em] right-[3em] w-[3em] h-[3em] bg-[url('/src/assets/mars.png')] bg-cover rounded-full`}></div>
                    </div>
                    <div className="absolute top-[-2em] left-[-2em] w-[45em] h-[45em] border border-white border-t-0 border-r-0 rounded-full animate-[orbit_21s_linear_infinite]">
                        <div className={`absolute top-[6em] right-[3em] w-[5em] h-[5em] bg-[url('/src/assets/jupiter.png')] bg-cover rounded-full`}></div>
                    </div>
                    <div className="absolute top-[-7em] left-[-7em] w-[55em] h-[55em] border border-white border-t-0 border-r-0 rounded-full animate-[orbit_17s_linear_infinite]">
                        <div className={`absolute top-[7.5em] right-[5em] w-[4.5em] h-[4.5em] bg-[url('/src/assets/saturn.png')] bg-cover rounded-full`}></div>
                    </div>
                    <div className="absolute top-[-12em] left-[-12em] w-[65em] h-[65em] border border-white border-t-0 border-r-0 rounded-full animate-[orbit_19s_linear_infinite]">
                        <div className={`absolute top-[9em] right-[6.5em] w-[4em] h-[4em] bg-[url('/src/assets/uranus.png')] bg-cover rounded-full`}></div>
                    </div>
                    <div className="absolute top-[-17em] left-[-17em] w-[75em] h-[75em] border border-white border-t-0 border-r-0 rounded-full animate-[orbit_15s_linear_infinite]">
                        <div className={`absolute top-[10em] right-[8em] w-[4em] h-[4em] bg-[url('/src/assets/neptune.png')] bg-cover rounded-full`}></div>
                    </div>
                    <div className="absolute top-[-22em] left-[-22em] w-[85em] h-[85em] border border-blue-500 border-t-0 border-r-0 rounded-full animate-[orbit_18s_linear_infinite]">
                        <div className={`absolute top-[10em] right-[8em] w-[4em] h-[4em] bg-[url('/src/assets/pluto.png')] bg-cover rounded-full`}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}