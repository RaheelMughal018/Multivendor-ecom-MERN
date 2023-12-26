import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";

const WishList = ({ setOpenWishList }) => {
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
            onClick={() => setOpenWishList(false)}
          />
        </div>
        {/* Items Length */}
        <div className={`${styles.normalFlex} p-4`}>
          <AiOutlineHeart size={25} />
          <h5 className="pl-2 text-[20px] font-[500]">3 Items</h5>
        </div>

        {/* cart single items */}
        <div className="w-full border-t">
          {cartData &&
            cartData.map((i, index) => {
              return <CartSingle key={index} data={i} />;
            })}
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
          <RxCross1 className="cursor-pointer" />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqC7MJiQIhsoyfcI4MGKzdXvWYJDzAwShvC-5BQwgmMw&s"
            alt=""
            className="w-[80px] h-[80px] ml-2"
          />
          <div className="pl-[5px]">
            <h1>{data.name}</h1>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              US ${totalPrice}
            </h4>
          </div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
          />
        </div>
      </div>
    </>
  );
};

export default WishList;
