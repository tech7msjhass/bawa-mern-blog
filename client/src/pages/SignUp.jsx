import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
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
          <form className=" flex flex-col gap-4">
            <div>
              <Label value="Your Username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="text" placeholder="name@gmail.com" id="email" />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink">Sign Up</Button>
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span>Have an Account?</span>
            <Link to="/sign-in" className=" text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
