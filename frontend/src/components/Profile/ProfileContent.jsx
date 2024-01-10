import React, { useState } from "react";
import { backendUrl } from "../../server";
import { useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { MdOutlineTrackChanges } from "react-icons/md";

const ProfileContent = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNo, setPhoneNo] = useState();
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="w-full">
        {/* Profile  */}
        {active === 1 && (
          <>
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src={`${backendUrl}${user?.avatar}`}
                  className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132] "
                  alt=""
                />
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] ">
                  <AiOutlineCamera />
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="w-full px-5 ">
              <form onSubmit={handleFormSubmit} aria-required={true}>
                <div className="w-full  800px:flex block pb-3 ">
                  <div className=" w-full 800px:w-[50%] ">
                    <label className="block pb-2">Full Name</label>
                    <input
                      type="text"
                      className={`${styles.input} w-[95%] mb-4 800px:mb-0`}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className=" w-full 800px:w-[50%] ">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="text"
                      className={`${styles.input} w-[95%] mb-1 800px:mb-0`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full  800px:flex block pb-3 ">
                  <div className=" w-full 800px:w-[50%] ">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      className={`${styles.input} w-[95%] mb-4 800px:mb-0`}
                      required
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  </div>
                  <div className=" w-full 800px:w-[50%] ">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input} w-[95%] mb-4 800px:mb-0`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full  800px:flex block pb-3 ">
                  <div className=" w-full 800px:w-[50%] ">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input} w-[95%] mb-4 800px:mb-0`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className=" w-full 800px:w-[50%] ">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input} w-[95%] mb-4 800px:mb-0`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value="Update"
                  required
                  className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] cursor-pointer rounded-[3px] mt-8 hover:bg-[#3a24db] hover:text-[#fff]"
                />
              </form>
            </div>
          </>
        )}
        {/* Order  */}
        {active === 2 && (
          <div>
            <AllOrders />
          </div>
        )}
        {/* Refund Orders */}
        {active === 3 && (
          <div>
            <AllRefundOrders />
          </div>
        )}
        {/* Track Orders */}
        {active === 5 && (
          <div>
            <TrackOrder />
          </div>
        )}
        {/* Payment Method */}
        {active === 6 && (
          <div>
            <PaymentMethod />
          </div>
        )}
        {/* User Address */}
        {active === 7 && (
          <div>
            <Address />
          </div>
        )}
      </div>
    </>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "61847d5aadf8c91168ffee38",
      orderItems: [
        {
          name: "Shoes",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.value === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US $" + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      <div className="pl-8 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "61847d5aadf8c91168ffee38",
      orderItems: [
        {
          name: "Shoes",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.value === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US $" + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <>
      <div className="pl-8 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          autoHeight
          pageSize={10}
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "61847d5aadf8c91168ffee38",
      orderItems: [
        {
          name: "Shoes",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.value === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US $" + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <>
      <div className="pl-8 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          autoHeight
          pageSize={10}
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 ">
          Payment Methods
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]  ">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white rounded-[4px] h-[70px] flex items-center px-3 shadow justify-between pr-10  ">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="font-[600] pl-5">Raheel Mughal</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** **** 8970</h6>
          <h5 className="pl-5">08/2024</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-betweenp pl-8 ">
          <AiOutlineDelete size={25} className=" cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 ">
          My Address
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]  ">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white rounded-[4px] h-[70px] flex items-center px-3 shadow justify-between pr-10  ">
        <div className="flex items-center">
          <h5 className="font-[600] pl-5">Default</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>Bhobatian Raiwind Road, LHR</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>(+92) 3044498883</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-betweenp pl-8 ">
          <AiOutlineDelete size={25} className=" cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
