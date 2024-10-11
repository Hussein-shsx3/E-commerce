import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Api/authApi";
import { clearStatus } from "../redux/authSlice";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(auth(formData));
  };

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Sign in was successful");
      setTimeout(() => {
        dispatch(clearStatus());
        navigate("/");
      }, 1000);
    } else if (status === "failed") {
      dispatch(clearStatus());
      toast.error(error || "Sign in failed");
    }
  }, [status, error, navigate, dispatch]);

  return (
    <section className="relative w-full min-h-[100dvh] flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <ToastContainer />
        <Header />
        <form
          className="flex flex-col items-center justify-center pt-28 gap-2 relative w-[95%] md:w-[50%] lg:w-[33%]"
          onSubmit={submitForm}
        >
          <p className="text-3xl text-title fontTitle flex items-center gap-2 mb-3">
            Sign In
            <span className="w-[40px] h-[2px] bg-title border-none" />
          </p>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            className="w-[100%] outline-none h-[42px] px-3 border-title border-[1px] mb-1"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            className="w-[100%] outline-none h-[42px] px-3 border-title border-[1px]"
            onChange={handleChange}
          />
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-[14px]">Forgot your password?</p>
            <Link to="/signUp" className="text-[14px]">
              Create account
            </Link>
          </div>
          {status === "loading" ? (
            <div className="w-full h-[45px] flex justify-center">
              <span className="loader"></span>
            </div>
          ) : (
            <input
              type="submit"
              value="Sign In"
              className="w-[125px] h-[40px] bg-black text-white text-[15px] mt-5"
            />
          )}
        </form>
        <Footer />
      </div>
    </section>
  );
};

export default SignIn;
