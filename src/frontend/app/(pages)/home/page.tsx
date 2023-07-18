"use client";
import React, { useEffect } from "react";
import LeftBar from "./components/LeftBar/LeftBar";
import RightBar from "./components/RightBar/RightBar";
import Middle from "./components/MiddleBar/Middle";
import {
  loadCurrentMessage,
  loadPosts,
  uploadPost,
} from "../../utils/Interact";

const Page = () => {
  useEffect(() => {
    async function fetchMessage() {
      const message = await loadPosts();
      const up = await uploadPost("deneme");
      console.log(message);
      // setMessage(message);
    }
    fetchMessage();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-8">
        <div className="col-span-2">
          <LeftBar />
        </div>
        <div className="col-span-3 border-gray-500 border-[0.01rem] border-t-0">
          <Middle />
        </div>
        <div className="col-span-3">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Page;
