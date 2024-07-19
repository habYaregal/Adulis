import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase"; // Adjust the import path as needed
import { onShipmentPost } from "../../../api/shipment"; // Adjust the import path as needed

const ShipmentPost = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    origin: "",
    destination: "",
    weight: "",
    description: "",
    photoURL: "",
  });
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const maxCharCount = 800;
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      if (value.length <= maxCharCount) {
        setFormValues({ ...formValues, [name]: value });
        setCharCount(value.length);
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `photos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormValues({ ...formValues, photoURL: downloadURL });
          });
        }
      );
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await onShipmentPost(formValues);
      setError("");
      setSuccess(data.message);

      setFormValues({
        title: "",
        origin: "",
        destination: "",
        weight: "",
        description: "",
        photoURL: "",
      });
      setCharCount(0);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error creating shipment:", error);
    }
  };
  return (
    <div>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        Create Shipment
      </div>
      <style>{`body {background:white !important;}`}</style>
      <form
        onSubmit={submitHandler}
        className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
      >
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
          name="title"
          value={formValues.title}
          onChange={handleChange}
        />
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Origin"
          type="text"
          name="origin"
          value={formValues.origin}
          onChange={handleChange}
        />
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Destination"
          type="text"
          name="destination"
          value={formValues.destination}
          onChange={handleChange}
        />
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Weight"
          type="number"
          name="weight"
          value={formValues.weight}
          onChange={handleChange}
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
          name="description"
          value={formValues.description}
          onChange={handleChange}
        />

        {/* photo upload */}
        <div className="photo-upload flex items-center mt-4">
          <label className="bg-gray-200 border border-gray-300 p-2 rounded cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <span className="text-gray-600">Upload Photo</span>
          </label>
          {formValues.photoURL && (
            <img
              src={formValues.photoURL}
              alt="Uploaded"
              className="ml-4 h-20 w-20 object-cover border border-gray-300 rounded"
            />
          )}
        </div>
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full mt-2">
            <div
              className="bg-main-600 text-xs leading-none py-1 text-center text-white rounded-full"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        )}

        {/* buttons */}
        <span className="text-red-600 font-semibold">{error}</span>
        <span className="text-green-600 font-semibold">{success}</span>
        <div className="buttons flex mt-4 justify-end">
          <button
            type="submit"
            className="btn border border-main-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-main-500"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShipmentPost;
