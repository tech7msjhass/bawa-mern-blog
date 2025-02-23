import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";

const DashProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileError, setImageFileError] = useState(null);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log("formData", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());

      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return;
    console.log("image is uploading....");
    try {
      const imageData = new FormData();
      imageData.append("image", imageFile);

      // send the file to the backend
      const response = await fetch("/api/auth/upload-image", {
        method: "POST",
        body: imageData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload the Image");
      }
    } catch (error) {
      setImageFileError("Could not upload, Please upload Image File only");
      console.log(error);

      setTimeout(() => {
        setImageFileError(null);
      }, 4000);
    }
  };

  return (
    <div className=" max-w-lg mx-auto p-3 w-full">
      <h1 className=" my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
          ref={filePickerRef}
          hidden
        />
        <div className=" h-40 w-40 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className=" h-full w-full rounded-full object-cover border-8 border-[lightgray] cursor-pointer"
            onClick={() => filePickerRef.current.click()}
          />
        </div>
        {imageFileError && <Alert color={"failure"}>{imageFileError}</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToPink" outline>
          Update
        </Button>
      </form>
      <div className=" text-red-500 flex justify-between mt-5">
        <span className=" cursor-pointer">Delete Account</span>
        <span className=" cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
