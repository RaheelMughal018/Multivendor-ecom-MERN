import React, { useState } from "react";
import Header from "../components/layouts/Header";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import ProfileContent from "../components/Profile/ProfileContent";
import styles from "../styles/styles";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex py-10 bg-[#f5f5f5]`}>
        <div className=" w-[50px] 800px:w-[355px] sticky mt-[18%] 800px:mt-0">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default ProfilePage;
