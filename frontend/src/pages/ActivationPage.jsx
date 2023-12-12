import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import { toast } from "react-toastify";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendResponce = async () => {
        try {
          const res = await axios
            .post(`${server}/user/activation`, { activation_token })
            .then((res) => {
              toast.success("Account created successfully");
            });

          console.log(
            "🚀 ~ file: ActivationPage.jsx:16 ~ activationEmail ~ res:",
            res.data.message
          );
        } catch (error) {
          console.log(
            "🚀 ~ file: ActivationPage.jsx:18 ~ activationEmail ~ error:",
            error.response.data.message
          );
          setError(true);
        }
      };
      sendResponce();
    }
  }, [activation_token]);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully</p>
      )}
    </div>
  );
};

export default ActivationPage;
