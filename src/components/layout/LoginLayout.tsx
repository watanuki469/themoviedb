import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../../redux/client/api.Login";
import { useAppDispatch } from "../../redux/hooks";
import { TextField } from "@mui/material";

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
                toast.success(`Welcome to Vasiliev movie web, `)
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
        <div className=" min-h-screen cursor-pointer py-16 px-2 ">
            <div className="bg-white flex justify-center items-center ">
                <div className="w-full max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center text-blue-500">Log in</h2>
                    <div className="mb-4 ">Email or Username (eve.holt@reqres.in)</div>
                    <TextField
                        type="text"
                        placeholder="Email or Username"
                        name="email"
                        fullWidth
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        sx={{border:4,borderColor:'blue',borderRadius:2}}
                        // color="success"
                    />
                    <div className="py-4">Password (12345678)</div>
                    <div className="relative flex-grow input-password mb-4">
                        <TextField
                            type="password"
                            placeholder="password"
                            name="password"
                            fullWidth
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            sx={{border:4,borderColor:'blue',borderRadius:2}}
                            // color="success"
                        />

                    </div>

                    <div className="flex justify-center">
                        <button
                            className={`w-full text-center font-bold  py-2 px-4 mb-4 rounded-md ${email && password ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                            disabled={!email || !password}
                            onClick={handleLogin}
                        >
                            {loadingAPI ? <i className="fas fa-circle-notch fa-spin mr-2"></i> : null}Login
                        </button>
                    </div>

                    <div
                        className={`w-full py-2 px-4 mb-4 text-center rounded-md bg-gray-300 text-gray-500 hover:bg-gray-200 font-bold cursor-not-allowed`}
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