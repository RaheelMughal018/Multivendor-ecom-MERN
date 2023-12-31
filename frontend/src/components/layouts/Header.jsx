import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import { backendUrl } from "../../server.js";
import Cart from "../Cart/Cart.jsx";
import WishList from "../WishList/WishList.jsx";
const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setsearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishList] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    setsearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      {loading ? null : (
        <>
          <div className={`${styles.section}`}>
            <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
              <div>
                <Link to="/">
                  <img
                    src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                    alt="logo"
                  />
                </Link>
              </div>
              {/* search box */}
              <div className="w-[50%] relative">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-[#3597db] border-[2px] rounded-md"
                />
                <AiOutlineSearch
                  size={30}
                  className="absolute top-1.5 right-2 cursor-pointer"
                />
                {searchData && searchData !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 a-[9] p-4">
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;

                        const productName = d.replace(/\s+/g, "-");

                        return (
                          <Link key={index} to={`/product/${productName}/`}>
                            <div className="w-full flex items-start py-3">
                              <img
                                src={i.image_Url[0].url}
                                alt=""
                                className="h-[40px] w-[40px] mr-[10px]"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
              <div className={`${styles.button}`}>
                <Link to="/seller">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`${
              active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
            } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
          >
            <div
              className={`${styles.section} ${styles.normalFlex} relative justify-between`}
            >
              {/* caegories */}
              <div
                onClick={() => {
                  setDropDown(!dropDown);
                }}
              >
                <div className="h-[60px] w-[270px] relative mt-[10px] hidden 1000px:block">
                  <BiMenuAltLeft className="absolute top-3 left-2" size={30} />
                  <button className="h-[100%] w-full flex justify-between items-center bg-white pl-10 font-sans text-lg font-[500] select-none rounded-t-sm">
                    All Categories
                  </button>
                  <IoIosArrowDown
                    size={20}
                    className="absolute top-4 right-2 cursor-pointer"
                    onClick={() => {
                      setDropDown(!dropDown);
                    }}
                  />
                  {dropDown ? (
                    <DropDown
                      categoriesData={categoriesData}
                      setDropDown={setDropDown}
                    />
                  ) : null}
                </div>
              </div>
              {/* navitems */}
              <div className={`${styles.normalFlex}`}>
                <Navbar active={activeHeading} />
              </div>

              <div className="flex">
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenWishList(true)}
                >
                  <AiOutlineHeart size={30} color="rgb(255 255 255 /83%)" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    0
                  </span>
                </div>
                <div className="relative cursor-pointer mr-[15px]">
                  <AiOutlineShoppingCart
                    size={30}
                    color="rgb(255 255 255 /83%)"
                    onClick={() => setOpenCart(true)}
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    0
                  </span>
                </div>
                <div className="relative cursor-pointer mr-[15px]">
                  {isAuthenticated ? (
                    <Link to={"/profile"}>
                      <img
                        src={`${backendUrl}${user.avatar}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  ) : (
                    <Link to={"/login"}>
                      <CgProfile size={30} color="rgb(255 255 255 /83%)" />
                    </Link>
                  )}
                </div>
                {/* cart Popup */}
                {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
                {/* WishList Popup */}
                {openWishlist ? (
                  <WishList setOpenWishList={setOpenWishList} />
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
