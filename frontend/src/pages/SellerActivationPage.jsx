import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import { toast } from "react-toastify";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sendResponse = async () => {
      try {
        const res = await axios.post(`${server}/shop/activation`, {
          activation_token,
        });

        console.log("Activation success:", res.data.message);
        toast.success("Account created successfully");
      } catch (error) {
        console.error(
          "Activation error:",
          error.response.data.error || "Unknown error"
        );
        setError(
          error.response.data.error || "An error occurred during activation."
        );
      } finally {
        setLoading(false);
      }
    };

    if (activation_token) {
      sendResponse();
    }
  }, [activation_token]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Your account has been created successfully</p>
      )}
    </div>
  );
};

export default SellerActivationPage;
