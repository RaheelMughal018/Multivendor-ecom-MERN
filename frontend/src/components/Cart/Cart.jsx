import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

import styles from "../../styles/styles";

const Cart = ({ setOpenCart }) => {
  const cartData = [
    {
      name: "Headphone",
      price: 109.9,
      description: "test",
    },
    {
      name: "Speaker",
      price: 85.67,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      name: "Headphone",
      price: 109.9,
      description: "test",
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div className="flex w-full justify-end pt-5 pr-5">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenCart(false)}
          />
        </div>
        {/* Items Length */}
        <div className={`${styles.normalFlex} p-4`}>
          <IoBagHandleOutline size={25} />
          <h5 className="pl-2 text-[20px] font-[500]">3 Items</h5>
        </div>

        {/* cart single items */}
        <div className="w-full border-t">
          {cartData &&
            cartData.map((i, index) => {
              return <CartSingle key={index} data={i} />;
            })}
        </div>
        <div className="px-5 mb-3">
          {/* checkout button */}
          <Link to="/checkout" />
          <div className="h-[45px] flex items-center justify-center rounded-[5px] bg-[#e44343]">
            <h1 className="text-#fff text-[18px] font-[600] cursor-pointer">
              Checkout now (USD $1080)
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <>
      <div className="border-b p-4">
        <div className="w-full flex items-center">
          <div>
            <div
              className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
              onClick={() => {
                setValue(value + 1);
              }}
            >
              <HiPlus size={18} color="#fff" />
            </div>
            <span className="pl-[10px]">{value}</span>
            <div
              className="bg-[#a7abb14f] flex items-center rounded-full justify-center cursor-pointer h-[25px] w-[25px]"
              onClick={() => setValue(value === 1 ? 1 : value - 1)}
            >
              <HiOutlineMinus size={25} color="#7d879c" />
            </div>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqC7MJiQIhsoyfcI4MGKzdXvWYJDzAwShvC-5BQwgmMw&s"
            alt=""
            className="w-[80px] h-[80px] ml-2"
          />
          <div className="pl-[5px]">
            <h1>{data.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              ${data.price} * {value}
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              US ${totalPrice}
            </h4>
          </div>
          <RxCross1 className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Cart;
