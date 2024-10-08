import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInLoading, signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth(app);

  const handleGoogleAuthClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          photoUrl: resultFromGoogle.user.photoURL,
          // Isverified: resultFromGoogle.user.emailVerified,
          // creationTime: resultFromGoogle.user.metadata.creationTime,
          // lastSignInTime: resultFromGoogle.user.metadata.lastSignInTime,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        console.log(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(signInLoading());
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleAuthClick}
    >
      <AiFillGoogleCircle className=" w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
