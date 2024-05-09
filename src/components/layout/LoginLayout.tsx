import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from '../../assets/home-background.jpg';
import { fetchAllUser, loginApi } from "../../redux/client/api.Login";


export default function LoginLayout() {
    let navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

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
                toast.success(`Welcome to Vasiliev movie web `)
            } else {
                // Handle unexpected response format
                toast.error("Unexpected response from server");
            }
        } catch (error) {
            // Handle network errors or other exceptions
            toast.error("Your account not exsis");
        }
        setLoadingAPI(false);
    }
    const [user, setListUser] = useState<any[]>([]);

    // useEffect(() => {
    //     fetchAllUser('1')
    //         .then((res) => {
    //             setListUser(res?.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, []);
    // console.log(user);
    

    return (
        <div className="min-h-screen cursor-pointer py-16 px-2" style={{ backgroundImage: `url(${bg})` }}>
            <div className="bg-black text-white bg-opacity-70 ml-auto mr-auto flex justify-center items-center rounded lg:w-6/12 w-10/12  ">
                <div className="w-full max-w-xl shadow-2xl px-10 py-10 ">
                    <h2 className="text-3xl font-bold mb-4 text-center text-blue-500">Log in IMDb</h2>
                    <div className="mb-4 ">Email or Username (eve.holt@reqres.in)</div>

                    <input type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full h-14 border-0 text-gray-900 ring-1 rounded-md  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Email..."
                    />

                    <div className="py-4">Password (12345678)</div>
                    <input type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password..."
                        id="password" name="password" className="w-full h-14 px-3 py-2 border-0 text-gray-900 rounded-md  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                    <div className="flex justify-center mt-6">
                        <button
                            className={`w-full text-center font-bold  py-2 px-4 mb-4 rounded-md ${email && password ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                            disabled={!email || !password}
                            onClick={handleLogin}
                        >
                            {loadingAPI ? <i className="fas fa-circle-notch fa-spin mr-2"></i> : null}Login
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}