import React from "react";
import { ImTwitter } from "react-icons/Im";
import {
  CiSearch,
  CiHome,
  CiViewList,
  CiUser,
  CiCircleMore,
} from "react-icons/Ci";
import { IoIosNotificationsOutline } from "react-icons/Io";
import { VscMail } from "react-icons/Vsc";
import { BsBookmark } from "react-icons/Bs";
import Button from "./Button";

const LeftBar = () => {
  return (
    <div className="flex flex-col py-5  h-screen items-center">
      <div className="gap-7 flex flex-col ">
        <ImTwitter color="white" size={50} />
        <Button text="Home">
          <CiHome color="white" className="" size={40} />
        </Button>

        <Button text="Explore">
          <CiSearch color="white" className="" size={40} />
        </Button>

        <Button text="Notifications">
          <IoIosNotificationsOutline color="white" className="" size={40} />
        </Button>

        <Button text="Messages">
          <VscMail color="white" className="" size={40} />
        </Button>

        <Button text="Lists">
          <CiViewList color="white" className="" size={40} />
        </Button>
        <Button text="Bookmarks">
          <BsBookmark color="white" className="" size={40} />
        </Button>
        <Button text="Profile">
          <CiUser color="white" className="" size={40} />
        </Button>
        <Button text="More">
          <CiCircleMore color="white" className="" size={40} />
        </Button>

        <button className="w-72 font-medium text-xl h-20 rounded-full bg-sky-500">
          Tweet
        </button>
      </div>
    </div>
  );
};

export default LeftBar;
