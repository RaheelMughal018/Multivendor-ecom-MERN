import { toast } from "react-toastify";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { RxAvatar } from "react-icons/rx";
import { useForm } from "react-hook-form";
const ShopCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    console.log("🚀 ~ handleFileInputChange ~ file:", file);

    setAvatar(file);
    console.log("🚀 ~ handleFileInputChange ~ avatar:", avatar);
  };

  const submitHandler = async (data, e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    console.log("🚀 ~ submitHandler ~ avatar:", avatar);
    const formData = new FormData();
    // console.log("🚀 ~ submitHandler ~ formData:", formData);

    formData.append("file", avatar); // 'file' should match the key specified in upload.single("file")
    console.log("🚀 ~ submitHandler ~ formData:", formData);

    // Append other form data properties to formData
    for (const key in data) {
      formData.append(key, data[key]);
    }

    console.log(
      "🚀 ~ file: ShopCreate.jsx:30 ~ submitHandler ~ FormData:",
      formData
    );

    axios
      .post(`${server}/shop/create-shop`, data, config)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8  ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a Seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data, e) => {
              submitHandler(data, e);
            })}
          >
            <div className="block text-sm font-medium text-gray-700">
              <label htmlFor="shopName">Shop Name</label>
              <div className="mt-1">
                <input
                  id="ShopName"
                  type="name"
                  {...register("ShopName", {
                    required: "ShopName is required",
                  })}
                  // value={name}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="block text-sm font-medium text-gray-700">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="mt-1">
                <input
                  type="number"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  {...register("PhoneNumber", {
                    required: "PhoneNumber is required",
                  })}
                />
              </div>
            </div>
            <div className="block text-sm font-medium text-gray-700">
              <label htmlFor="address">Address</label>
              <div className="mt-1">
                <input
                  type="address"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  {...register("address", {
                    required: "address is required",
                  })}
                />
              </div>
            </div>
            <div className="block text-sm font-medium text-gray-700">
              <label htmlFor="zipCode">Zip Code</label>
              <div className="mt-1">
                <input
                  type="number"
                  name="zipCode"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  {...register("ZipCode", {
                    required: "ZipCode is required",
                  })}
                />
              </div>
            </div>
            <div className="block text-sm font-medium text-gray-700">
              <label htmlFor="email">Shop Email</label>
              <div className="mt-1">
                <input
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  {...register("email", {
                    required: "email is required",
                  })}
                />
              </div>
            </div>

            <div className="block text-sm font-medium text-gray-700">
              <label htmlFor="password">Password</label>
              <div className="mt-1 relative ">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer "
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer "
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-full w-full object-cover rounded-full" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] py-2 flex justify-center px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an Account?</h4>
              <Link to="/shop-login" className="text-blue-500 pl-2">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
