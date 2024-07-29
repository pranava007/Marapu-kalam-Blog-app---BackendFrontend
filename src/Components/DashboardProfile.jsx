import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiInformationCircle } from "react-icons/hi";
import {
  setImageFile,
  setImageFileUrl,
  setImageFileUploadProgress,
  setImageFileUploadError,
  resetImageUploadState,
} from "../Redux/Slice/imageUploadSlice";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signOutSuccess,
  deleteUserFilure,
  deleteUserSuccess,
  deleteUserStart,
} from "../Redux/Slice/UserSlice";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const DashboardProfile = () => {
  const dispatch = useDispatch();
  const { currentuser, loading, error } = useSelector((state) => state.user);
  const {
    imageFile,
    imageFileUrl,
    imageFileUploadProgress,
    imageFileUploadError,
  } = useSelector((state) => state.imageUpload);

  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  // accout delete state toggle

  const [showModal, setshowModal] = useState(false);

  const filePickerRef = useRef();

  // onchange in the image uploading
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setImageFile(file));
      dispatch(setImageFileUrl(URL.createObjectURL(file)));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // Firebase image upload and storage part
  const uploadImage = async () => {
    dispatch(setImageFileUploadError(null));
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch(setImageFileUploadProgress(progress.toFixed(0))); // 10.4854
      },
      (error) => {
        dispatch(
          setImageFileUploadError(
            "Could not upload the image (File size must be less than 2MB)"
          )
        );
        dispatch(setImageFileUrl(null));
        dispatch(setImageFileUploadProgress(null));
        dispatch(resetImageUploadState());
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          dispatch(setImageFileUrl(downloadURL));
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  // input feilds data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //updateing user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No Changes Made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait while the image is uploading");
      return;
    }
    try {
      dispatch(updateStart());
      const response = await fetch(
        `http://localhost:5000/api/user/update/${currentuser.rest._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User Profile Updated Successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  //user signout
  const handleSignout = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
  };

  // delete user
  const handleDelete = async () => {
    setshowModal(false);
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/delete/${currentuser.rest._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        dispatch(deleteUserFilure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFilure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 w-full ">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          ref={filePickerRef}
          onChange={handleImageChange}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,190,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentuser.rest.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-50"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure" icon={HiInformationCircle} className="mt-5">
            <span className="font-medium me-2">🥴OOPS!</span>
            {imageFileUploadError}
          </Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="UserName"
          defaultValue={currentuser.rest.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentuser.rest.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="********"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          disabled={loading || imageFileUploading}
        >
          {loading ? "loading..." : "Update"}
        </Button>
        {/* {console.log(currentuser)} */}
        {currentuser.rest.isUser && (
          <Link to="/create-post">
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              Create Post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-600 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setshowModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" icon={HiInformationCircle} className="mt-5">
          <span className="font-medium me-2">😎Yaaa!</span>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" icon={HiInformationCircle} className="mt-5">
          <span className="font-medium me-2">🥴OOPS!</span>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" icon={HiInformationCircle} className="mt-5">
          <span className="font-medium me-2">🥴OOPS!</span>
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setshowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />

        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 text-gray-500 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg  text-gray-500 dark:text-gray-200">
              Are you sure you want to delete this Account ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setshowModal(false)}>
                No,Changed My Mind
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashboardProfile;
