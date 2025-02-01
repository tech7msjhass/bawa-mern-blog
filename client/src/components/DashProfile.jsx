import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [imageFileError, setImageFileError] = useState(null);
  const filePickerRef = useRef();

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

  const uploadImage = async () => {
    if (!imageFile) return;
    console.log("image is uploading....");
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      // send the file to the backend
      const response = await fetch("/api/auth/upload-image", {
        method: "POST",
        body: formData,
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
      <form className=" flex flex-col gap-4">
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
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
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
