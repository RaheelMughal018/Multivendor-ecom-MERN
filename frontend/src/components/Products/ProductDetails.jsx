import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const increment = () => {
    setCount(count + 1);
  };

  const handlesubmitMessage = () => {
    navigate("/inbox?conversation=45y23089hwefbwi934");
  };

  return (
    <div className="bg-white">
      {data && data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-4">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ${data.discount_price}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}{" "}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrement}
                    >
                      -
                    </button>
                    <span className="px-4 py-[11px] font-medium text-gray-800 bg-gray-200">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={increment}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button}flex items-center !h-11 mt-8 rounded`}
                >
                  <span className="text-white flex items-center">
                    Add to Cart
                    <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center p-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="pr-8 m-3">
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                  <div
                    onClick={handlesubmitMessage}
                    className={`${styles.button} mt-4 rouned h-11 bg-[#6443d1]`}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <>
      <div className="bg-[#f5f6f6] px-3 800px:px-10 py-2 rounded">
        <div className="flex border-b justify-between w-full pt-10 pb-2">
          <div className="relative">
            <h5
              onClick={() => setActive(1)}
              className="text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            >
              Product Details
            </h5>
            {active === 1 ? (
              <div className={`${styles.active_indicator}`}></div>
            ) : null}
          </div>
          <div className="relative">
            <h5
              onClick={() => setActive(2)}
              className="text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            >
              Product Reviews
            </h5>
            {active === 2 ? (
              <div className={`${styles.active_indicator}`}></div>
            ) : null}
          </div>
          <div className="relative">
            <h5
              onClick={() => setActive(3)}
              className="text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            >
              Seller Information
            </h5>
            {active === 3 ? (
              <div className={`${styles.active_indicator}`}></div>
            ) : null}
          </div>
        </div>
        {active === 1 ? (
          <>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              corporis veniam quis distinctio repellat eius aliquam similique
              llaborum voluptatum deleniti ratione porro eaque ducimus non, vel
              nisi incidunt saepe consequuntur ad expedita? Aliquid,
              voluptatibus asperiores! Sint beatae sit quas dolorem similique,
              est necessita officiis. Nobis, cupiditate recusandae esse debitis
              aut quae ullam amet obcaecati sunt quasi. Eum ullam sed inventore
              numquam dolore at architecto. Minima et doloremque voluptatum
              reiciendis cum! Temporibus perspiciatis qui fuga.
            </p>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              corporis veniam quis distinctio repellat eius aliquam similique
              libero laudantium sunt nulla tempore officia iusto nesciunt quod
              explicabo! Reiciendis, amet doloribus. Magnam quas rem, quaerat
              sit ullam accusamus ipsum omnis officiis natus et eligendi aperiam
              dolorem iusto dolore eius consectetur aut. Excepturi maiores
              voluptatem eaq Temporibus perspiciatis qui fuga.
            </p>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              corporis veniam quis distinctio repellat eius aliquam similique
              libero laudantium sunt nulla tempore officia iusto nesciunt quod
              explicabo! Reiciendis, amet doloribus. Magnam quas rem, quaerat
              sit ull totam nostrum! illum dolor corporis nostrum nisi delectus
              eius cupiditate ipsum nihil labore optio earum! Quibusdam,
              voluptatibus placeat. fuga.
            </p>
          </>
        ) : null}
        {active === 2 ? (
          <div className=" w-full justify-center min-h-[40vh] flex items-center">
            <p>No Reviews yet!</p>
          </div>
        ) : null}
        {active === 3 && (
          <div className="w-full block 800px:flex p-5">
            <div className="w-full 800px:w-[50%]">
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div className="flex items-center">
                  <img
                    src={`${data.shop.shop_avatar.url}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt=""
                  />
                  <div className="pl-3">
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-2 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>
              </Link>
              <p className="pt-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
                labore impedit aut, magni incidunt sunt, illo tempore eum vitae
                tenetur voluptatem ut consequatur nesciunt delectus mollitia!
                Atque sed saepe enim.
              </p>
            </div>
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on:
                  <span className="font-[500]">23 Jan,2024</span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Products:
                  <span className="font-[500]">1,233</span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Reviews:
                  <span className="font-[500]">131</span>
                </h5>
                <Link to="/">
                  <div
                    className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                  >
                    <h4 className="text-white">Visit Shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
