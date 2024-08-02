import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from '../../assets/image.png';
import { loginMongoApi } from "../../redux/client/api.LoginMongo";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setListLogin, setUser } from "../../redux/reducers/login.reducer";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";

const LoginLayoutTest = () => {
    const [email, setEmail] = useState<any>('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch()
    let navigate = useNavigate()

    const registerUser = useAppSelector((state) => state.login.register)    

    const fetchLogin = () => (dispatch: AppDispatch) => {
        dispatch(setGlobalLoading(true));
        Promise.all([
            loginMongoApi(email, password),
        ])
            .then((response: any) => {
                if (response && response[0].token) {
                    dispatch(setListLogin(response));
                    dispatch(setUser(response));
                    localStorage.setItem("token", response[0].token);
                    localStorage.setItem("user", JSON.stringify(response[0])); // Save user data as JSON string
                    localStorage.setItem("language", "en-US"); // Save language setting
                    navigate('/'); // Navigate to the desired route
                    toast.success('Login successfully');
                } else {
                    throw toast.error('Login failed'
                    )
                }
            })
            .catch((e) => {
                console.log("login failed" + e);
            })
        setTimeout(() => {
            dispatch(setGlobalLoading(false));
        }, 1000);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(fetchLogin())
    };
    useEffect(() => {
        if (registerUser) {
            setEmail(registerUser)
        }
    }, [registerUser]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent bg-cover cursor-pointer"
            style={{ backgroundImage: `url(${bg})` }}>
            <form onSubmit={handleSubmit} className="rounded px-8 pt-6 pb-8 mb-4 border-2 border-white backdrop-blur-xl w-96">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <div className="relative w-full h-12 border-b-2 border-[#162938] my-8">
                    <span className="absolute right-2 text-xl text-[#162938] leading-[3.5rem]">
                        <i className="fa-solid fa-envelope"></i>
                    </span>
                    <div className="relative">
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-full bg-transparent border-none outline-none text-lg text-[#162938] font-semibold px-1 peer focus:ring-0"
                        />
                        <label className={`absolute left-1 transform transition-all duration-500 pointer-events-none
                            ${email?.length>0 ? 'top-[-20px] text-sm' : 'top-1/2 -translate-y-1/2'} text-[#162938] font-medium`}
                        >
                            Email 
                        </label>
                    </div>
                </div>
                <div className="relative w-full h-12 border-b-2 border-[#162938] mt-8">
                    <span className="absolute right-2 text-xl text-[#162938] leading-[3.5rem]">
                        <i className="fa-solid fa-lock"></i>
                    </span>
                    <div className="relative">
                        <style>
                            {`  input[type="password"]::-ms-reveal {  display: none;  }   `}
                        </style>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-full bg-transparent border-none outline-none text-lg text-[#162938] font-semibold px-1 peer focus:ring-0"
                        />
                        <label className={`absolute left-1 transform transition-all duration-500 pointer-events-none
                            ${password ? 'top-[-20px] text-sm' : 'top-1/2 -translate-y-1/2'} text-[#162938] font-medium`}
                        >
                            Password 
                        </label>
                    </div>
                </div>

                <div className='py-3' >
                    <div className="remember-forgot flex items-center">
                        <label>
                            <input type="checkbox" className='accent-pink-500 mr-2 font-light text-sm ' />Remember me
                        </label>
                        <div className='font-semibold hover:underline ml-auto hover:opacity-80' onClick={() => navigate('/changePassword')}>
                            Forgot password?
                        </div>
                    </div>
                </div>
                <button type="submit" className="bth w-full px-4 mt-2 py-2 font-bold text-center bg-black text-white rounded-lg">Login</button>
                <div className="login-register text-center mt-3">
                    <p>Not have an account? <a href="/register" className="login-link hover:underline font-extrabold">Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default LoginLayoutTest;
