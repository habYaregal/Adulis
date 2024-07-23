import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import CarrierNav from "../../components/CarrierNav";
import { onTruckPost } from "../../api/truck"; // Assuming you have an API call for posting truck info

const NewTruck = () => {
    const [formValues, setFormValues] = useState({
        truckType: "",
        truckInfo: "",
        capacity: "",
        manufacturedYear: "",
        licensePlate: "",  // Added license plate state
        photoURL: "",
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
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
            const { data } = await onTruckPost(formValues);
            setError("");
            setSuccess(data.message);
            setFormValues({
                truckType: "",
                truckInfo: "",
                capacity: "",
                manufacturedYear: "",
                licensePlate: "",  // Reset license plate state
                photoURL: "",
            });
            setUploadProgress(0);
        } catch (error) {
            console.error("Error creating truck profile:", error);
            setError("Failed to create truck profile. Please try again.");
            setSuccess("");
        }
    };

    return (
        <>
            <CarrierNav />
            <div>
                <div className="w-full bg-white p-10">
                    <h1 tabIndex={0} role="heading" aria-label="truck information" className="focus:outline-none text-3xl font-bold text-gray-800 mt-2">
                        Truck Info
                    </h1>
                    <p role="contentinfo" className="focus:outline-none text-sm font-light leading-tight text-gray-600 mt-4">
                        Fill in the data for your truck profile. It will take a couple of minutes.
                    </p>
                    <div className="mt-8 md:flex items-center">
                        <div className="flex flex-col">
                            <label className="mb-3 text-sm leading-none text-gray-800">Truck Type</label>
                            <input type="text" name="truckType" value={formValues.truckType} onChange={handleChange} tabIndex={0} aria-label="Enter truck type" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
                        </div>
                        <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                            <label className="mb-3 text-sm leading-none text-gray-800">Capacity</label>
                            <input type="number" name="capacity" value={formValues.capacity} onChange={handleChange} tabIndex={0} aria-label="Enter capacity" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
                        </div>
                    </div>
                    <div className="mt-12 md:flex items-center">
                        <div className="flex flex-col">
                            <label className="mb-3 text-sm leading-none text-gray-800">Manufactured Year</label>
                            <input type="number" name="manufacturedYear" value={formValues.manufacturedYear} onChange={handleChange} tabIndex={0} aria-label="Enter manufactured year" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
                        </div>
                        <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                            <label className="mb-3 text-sm leading-none text-gray-800">Truck Info</label>
                            <textarea name="truckInfo" value={formValues.truckInfo} onChange={handleChange} tabIndex={0} aria-label="Enter truck info" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"></textarea>
                        </div>
                    </div>
                    <div className="mt-12 md:flex items-center">
                        <div className="flex flex-col">
                            <label className="mb-3 text-sm leading-none text-gray-800">License Plate</label> {/* Added label for license plate */}
                            <input type="text" name="licensePlate" value={formValues.licensePlate} onChange={handleChange} tabIndex={0} aria-label="Enter license plate" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
                        </div>
                        <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                            <label className="mb-3 text-sm leading-none text-gray-800">Upload Image</label>
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} tabIndex={0} aria-label="Upload truck image" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" />
                            {formValues.photoURL && (
                                <img src={formValues.photoURL} alt="Uploaded" className="mt-4 h-20 w-20 object-cover border border-gray-300 rounded" />
                            )}
                        </div>
                    </div>
                    {uploadProgress > 0 && (
                        <div className="w-full bg-gray-200 rounded-full mt-2">
                            <div className="bg-main-600 text-xs leading-none py-1 text-center text-white rounded-full" style={{ width: `${uploadProgress}%` }}>
                                {uploadProgress}%
                            </div>
                        </div>
                    )}
                    <span className="text-red-600 font-semibold">{error}</span>
                    <span className="text-green-600 font-semibold">{success}</span>
                    <div className="flex justify-center mt-4">
                        <button role="button" aria-label="Next step" type="submit" onClick={submitHandler}  className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                            <span className="text-sm font-medium text-center text-gray-800 capitalize">Submit</span>
                            <svg className="mt-1 ml-3" width={12} height={8} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.01 3H0V5H8.01V8L12 4L8.01 0V3Z" fill="#242731" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewTruck;
