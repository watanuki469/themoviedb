import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import bg from '../../assets/home-background.jpg';
import { registerMongoApi } from "../../redux/client/api.LoginMongo";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setRegister } from "../../redux/reducers/login.reducer";
import { AppDispatch } from "../../redux/store";
import { setGlobalLoading } from "../../redux/reducers/globalLoading.reducer";

const RegisterLayout = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const fetchRegister = async (values: any) => {
    dispatch(setGlobalLoading(true));
    try {
      const response = await registerMongoApi(values.displayName, values.email, values.password, values.confirmPassword);
      dispatch(setRegister(response));
      toast.success('Register Successfully');
      navigate('/login2');
    } catch (e: any) {
      console.error("Register Failed", e);
      toast.error("Register failed: " + e.message);
    } finally {
      dispatch(setGlobalLoading(false));
    }
  }

  const registerForm = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .min(8, "Display name must be at least 8 characters")
        .required("Display name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email must be a Gmail address")
        .required("Email is required"),        
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is required")
    }),
    onSubmit: async (values) => {
      await fetchRegister(values);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent bg-cover text-white"
      style={{ backgroundImage: `url(${bg})` }}>
      <form onSubmit={registerForm.handleSubmit} className="rounded px-8 pt-6 pb-8 mb-4 border-2 border-white backdrop-blur-xl w-96">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <div className="relative w-full h-12 border-b-2 my-8">
          <span className="absolute right-2 text-xl leading-[3rem]">
            <i className="fa-solid fa-person-rays"></i>
          </span>
          <div className="relative">
            <input
              type="text"
              name="displayName"
              value={registerForm.values.displayName}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="w-full h-full bg-transparent border-none outline-none text-lg font-semibold px-1 peer focus:ring-0"
            />
            <label className={`absolute left-1 transform transition-all duration-500 pointer-events-none
              ${registerForm.values.displayName ? 'top-[-20px] text-sm' : 'top-1/2 -translate-y-1/2'} font-medium`}
            >

              {registerForm.touched.displayName && registerForm.errors.displayName ? (
                <span className="text-red-500 text-sm ">{registerForm.errors.displayName}</span>
              ) :
                <span>Display Name</span>
              }
            </label>
          </div>

        </div>


        <div className="relative w-full h-12 border-b-2 my-8">
          <span className="absolute right-2 text-xl leading-[3rem]">
            <i className="fa-solid fa-envelope"></i>
          </span>
          <div className="relative">
            <input
              type="text"
              name="email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="w-full h-full bg-transparent border-none outline-none text-lg font-semibold px-1 peer focus:ring-0"
            />
            <label className={`absolute left-1 transform transition-all duration-500 pointer-events-none
              ${registerForm.values.email ? 'top-[-20px] text-sm' : 'top-1/2 -translate-y-1/2'} font-medium`}
            >
              {registerForm.touched.email && registerForm.errors.email ? (
                <span className="text-red-500 text-sm">{registerForm.errors.email}</span>
              ) :
                <span>Email</span>}
            </label>

          </div>
        </div>

        <div className="relative w-full h-12 border-b-2 my-8">
          <span className="absolute right-2 text-xl leading-[3rem]">
            <i className="fa-solid fa-lock"></i>
          </span>
          <div className="relative">
            <style>
              {`  input[type="password"]::-ms-reveal {    display: none;  }   `}
            </style>
            <input
              type="password"
              name="password"
              required
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              style={{
                // The following styles are to hide the default eye icon
                MozAppearance: 'textfield',
                WebkitAppearance: 'none',
                appearance: 'none',
              }}
              className="w-full h-full bg-transparent border-none outline-none text-lg font-semibold px-1 peer focus:ring-0"
            />
            <label className={`absolute left-1 transform transition-all duration-500 pointer-events-none
              ${registerForm.values.password ? 'top-[-20px] text-sm' : 'top-1/2 -translate-y-1/2'} font-medium`}
            >
              {registerForm.touched.password && registerForm.errors.password ? (
                <span className="text-red-500 text-sm">{registerForm.errors.password}</span>
              ) :
                <span>Password</span>}
            </label>

          </div>
        </div>

        <div className="relative w-full h-12 border-b-2 my-8">
          <span className="absolute right-2 text-xl leading-[3rem]">
            {registerForm.values.password && registerForm.values.password === registerForm.values.confirmPassword ? (
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
              name="confirmPassword"
              value={registerForm.values.confirmPassword}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              style={{
                // The following styles are to hide the default eye icon
                MozAppearance: 'textfield',
                WebkitAppearance: 'none',
                appearance: 'none',
              }}
              className="w-full h-full bg-transparent border-none outline-none text-lg font-semibold px-1 peer focus:ring-0"
            />
            <label className={`absolute left-1 transform transition-all duration-500 pointer-events-none
              ${registerForm.values.confirmPassword ? 'top-[-20px] text-sm' : 'top-1/2 -translate-y-1/2'} font-medium`}
            >

              {registerForm.touched.confirmPassword && registerForm.errors.confirmPassword ? (
                <span className="text-red-500 text-sm">{registerForm.errors.confirmPassword}</span>
              ) :
                <span> Confirm Password</span>}
            </label>

          </div>
        </div>

        <button type="submit" className="btn w-full px-4 mt-2 py-2 font-bold text-center bg-black text-white rounded-lg">
          Register
        </button>
        <div className="login-register text-center mt-3">
          <p>Already have an account? <a href="/login2" className="login-link hover:underline font-extrabold">Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterLayout;
