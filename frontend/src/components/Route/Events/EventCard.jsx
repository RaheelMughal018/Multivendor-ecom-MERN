import React from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown.jsx";

const EventCard = ({ active }) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 mb-12`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={"https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"}
          alt=""
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`{${styles.productTitle}}`}>Iphone 14pro max 8/256gb</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          adipisci enim asperiores recusandae, temporibus itaque dignissimos
          inventore. Nobis enim consectetur iste quos at, mollitia qui delectus?
          Animi asperiores molestias repudiandae.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[10px] text-[#d55b45] pr-3 line-through">
              $ 1099
            </h5>
            <h5 className="font-bold text-[20px] text-black font-Roboto">
              $ 999
            </h5>
            <span className="pr3 font-[400] text-[17px] text-[#44a55e]">
              120 Sold
            </span>
          </div>
          <CountDown />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
