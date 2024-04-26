import { useNavigate } from "react-router-dom";
import SwiperRow from "../../modules/SwiperRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Footer from "../common/Footer";
import Slider from "../common/Slider";
import TopBar from "../common/TopBar";
import ListRow from "../../modules/ListRow";
import { toast } from "react-toastify";
import { useState } from "react";
import { loginApi } from "../../redux/client/api.Login";

export default function LoginLayout() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [loadingAPI, setLoadingAPI] = useState(false);
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required!");
            return;
        }

        setLoadingAPI(true);

        try {
            const res = await loginApi(email.trim(), password);
            if (res && (res as any).token) {
                localStorage.setItem("token", (res as any).token);
                localStorage.setItem("email", email); // Assuming email is defined elsewhere
                navigate("/");
            } else {
                // Handle unexpected response format
                toast.error("Unexpected response from server");
            }
        } catch (error) {
            // Handle network errors or other exceptions
            toast.error("An error occurred during login");
        }
        setLoadingAPI(false);
    }

    const handleGoBack = () => {
        navigate("/");
    }

    const handlePressEnter = (event: any) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className=" min-h-screen cursor-pointer py-16">
            {/* <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <TopBar />
                </div>
            </div> */}
            <div className="bg-white flex justify-center items-center">
                <div className="w-full max-w-lg mx-auto ">
                    <h2 className="text-3xl font-bold mb-4 text-center">Log in</h2>
                    <div className="mb-4">Email or Username (eve.holt@reqres.in)</div>
                    <input
                        type="text"
                        placeholder="Email or Username"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="border border-gray-300 rounded-md py-3 px-3 w-full mb-4"
                    />

                    <div className="relative flex-grow input-password mb-4">
                        <input
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => handlePressEnter(event)}
                            className="w-full py-3 rounded-md  px-3 border-0 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Password..."
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                            <div className="flex items-center mr-3">
                                <i
                                    className={isShowPassword ? "fas fa-eye text-gray-300" : "fas fa-eye-slash text-gray-300"}
                                    onClick={() => setIsShowPassword(!isShowPassword)}
                                    style={{ cursor: "pointer" }}
                                ></i>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className={`w-full text-center  py-2 px-4 mb-4 rounded-md ${email && password ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                            disabled={!email || !password}
                            onClick={handleLogin}
                        >
                            {loadingAPI ? <i className="fas fa-circle-notch fa-spin mr-2"></i> : null}Login
                        </button>
                    </div>

                    <div
                        className={`w-full py-2 px-4 mb-4 text-center rounded-md bg-gray-300 text-gray-500 hover:bg-gray-200 cursor-not-allowed`}
                    >
                        <span className="mr-1">
                            <i className="fas fa-angle-left"></i>
                        </span>
                        <span onClick={handleGoBack} className="cursor-pointer">Go Back</span>
                    </div>
                </div>
            </div>

            {/* <div className="bg-black">
                <div className="w-full lg:max-w-5xl xl:max-w-5xl mx-auto aligns-center  ">
                    <div className=" overflow-hidden">
                        <Footer />
                    </div>
                </div>
            </div > */}
        </div >
    )
}