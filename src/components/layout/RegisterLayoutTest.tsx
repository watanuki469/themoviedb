import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from '../../assets/home-background.jpg';
import { registerMongoApi } from "../../redux/client/api.LoginMongo";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setRegister } from "../../redux/reducers/login.reducer";
import { AppDispatch } from "../../redux/store";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";

const RegisterLayoutTest = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useAppDispatch()
  let navigate = useNavigate()

  const fetchRegister = () => (dispatch: AppDispatch) => {
    dispatch(setGlobalLoading(true))
    Promise.all([
      registerMongoApi(displayName, email, password, confirmPassword),
    ])
      .then((response: any) => {        
        dispatch(setRegister(response));
      })
      .catch((e) => {
        console.log("Register Failed" + e);
        toast.error("Register failed" + e)
      })
    setTimeout(() => {
      dispatch(setGlobalLoading(false));
    }, 1000);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchRegister())
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent bg-cover text-white"
      style={{ backgroundImage: `url(${bg})` }}>
      <form onSubmit={handleSubmit} className="rounded px-8 pt-6 pb-8 mb-4 border-2 border-white backdrop-blur-xl w-96">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <div className="relative w-full h-12 border-b-2  my-8">
          <span className="absolute right-2 text-xl leading-[3rem]">
            <i className="fa-solid fa-person-rays"></i>
          </span>
          <div className="relative">
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full h-full bg-transparent border-none outline-none text-lg font-semibold px-1 peer focus:ring-0"
            />
            <label className={`absolute left-1 transform transition-all duration-500 pointer-events-none
                            ${displayName ? 'top-[-20px] text-sm' : 'top-1/2 -translate-y-1/2'}  font-medium`}
            >
              Display Name
            </label>
          </div>
        </div>
        <div className="relative w-full h-12 border-b-2  my-8">
          <span className="absolute right-2 text-xl leading-[3rem]">
            <i className="fa-solid fa-envelope"></i>
          </span>
          <div className="relative">
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-full bg-transparent border-none outline-none text-lg font-semibold px-1 peer focus:ring-0"
            />
            <label className={`absolute left-1 transform transition-all duration-500 pointer-events-none
                            ${email ? 'top-[-20px] text-sm' : 'top-1/2 -translate-y-1/2'} font-medium`}
            >
              Email
            </label>
          </div>
        </div>
        <div className="relative w-full h-12 border-b-2  mt-8">
          <span className="absolute right-2 text-xl leading-[3rem]">
            <i className="fa-solid fa-lock"></i>
          </span>
          <div className="relative">
            <style>
              {`  input[type="password"]::-ms-reveal {    display: none;  }   `}
            </style>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                // The following styles are to hide the default eye icon
                MozAppearance: 'textfield',
                WebkitAppearance: 'none',
                appearance: 'none',
              }}
              className="w-full h-full bg-transparent border-none outline-none text-lg font-semibold px-1 peer focus:ring-0"
            />
            <label className={`absolute left-1 transform transition-all duration-500 pointer-events-none
                            ${password ? 'top-[-20px] text-sm' : 'top-1/2 -translate-y-1/2'} font-medium`}
            >
              Password
            </label>
          </div>
        </div>
        <div className="relative w-full h-12 border-b-2  mt-8">
          <span className="absolute right-2 text-xl leading-[3rem]">
            {password == confirmPassword ? (
              <i className="fa-solid fa-circle-check"></i>
            ) : (
              <i className="fa-solid fa-circle-xmark"></i>
            )}
          </span>
          <div className="relative">
            <style>
              {`  input[type="password"]::-ms-reveal {    display: none;  }   `}
            </style>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}

              className="w-full h-full bg-transparent border-none outline-none text-lg font-semibold px-1 peer focus:ring-0"

            />
            <label className={`absolute left-1 transform transition-all duration-500 pointer-events-none
                            ${confirmPassword ? 'top-[-20px] text-sm' : 'top-1/2 -translate-y-1/2'} font-medium`}
            >
              Confirm Password
            </label>
          </div>
        </div>
        <button type="submit" className="bth w-full px-4 mt-6 py-2 font-bold text-center bg-black text-white rounded-lg">
          Register
        </button>
        <div className="login-register text-center mt-3">
          <p>Already have an account? <a href="/login" className="login-link hover:underline font-extrabold">Login</a></p>
        </div>

      </form>
    </div>
  );
};

export default RegisterLayoutTest;
