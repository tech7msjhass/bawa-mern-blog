import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
  signInLoading,
} from "../redux/user/userSlice";
import CryptoJS from "crypto-js";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all Fields"));
    }

    // Email validation using regex for correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return dispatch(signInFailure("Please Enter a valid email address"));
    }
    // Check password length
    if (formData.password.length < 5) {
      return dispatch(signInFailure("Password must have 5 characters"));
    }
    // Regular expression to check for at least one number and one special character
    const passwordRegex = /^(?=.*\d)(?=.*[\W_]).+$/;
    if (!passwordRegex.test(formData.password)) {
      return dispatch(
        signInFailure(
          "Password must contain at least one number and one special character"
        )
      );
    }
    // Encrypt the password using CryptoJS
    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      "mandeep"
    ).toString();

    const payload = {
      email: formData.email,
      password: encryptedPassword,
    };

    console.log(payload, "payload");

    try {
      // setLoading(true);          // this is using useState
      // setErrorMessage(null);
      dispatch(signInStart()); // this is using redux

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success === false) {
        // return setErrorMessage(data.message);   // this is using useState
        dispatch(signInFailure(data.message)); // this is using redux
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      // setErrorMessage(error.message);             // this is using useState
      dispatch(signInFailure(error.message)); // this is using redux
    } finally {
      // setLoading(false);
      dispatch(signInLoading());
    }
  };

  return (
    <div className=" min-h-screen mt-20">
      <div className=" flex p-3 max-w-3xl mx-auto gap-5 flex-col md:flex-row md:items-center">
        {/* Left Side */}
        <div className="flex-1">
          <Link to="/" className=" text-4xl font-bold dark:text-white">
            <span className=" px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Mandeep's
            </span>{" "}
            Blog
          </Link>
          <p className=" text-md mt-5 text-justify mr-8">
            Bridging Beliefs: Embracing Unity Beyond Boundaries - Transforming
            Hearts, Inspiring Minds, and Cultivating a World of Compassion and
            Understanding.
          </p>
        </div>
        {/* Right Side */}
        <div className=" flex-1">
          <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="text"
                placeholder="name@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className=" pl-2">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span>Don't Have an Account?</span>
            <Link to="/sign-up" className=" text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className=" mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
