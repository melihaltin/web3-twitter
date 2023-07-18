"use client";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";

const UploadPost = () => {
  const [tweet, setTweet] = useState("");

  const handleInputChange = (e: any) => {
    setTweet(e.target.value);
  };

  const handleTweetSubmit = () => {
    // Tweet'i gönderme işlemleri burada yapılabilir
    console.log(tweet);
  };

  return (
    <div className="w-full h-44 grid grid-cols-5 items-center mt-5 border-gray-500  border-b-[0.01rem]">
      <div className="col-span-1 justify-center flex">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-black ">
          <Image
            src="/bebeklikfoto.jpg"
            alt=""
            height={100}
            width={100}
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="col-span-4 ">
        <div className="flex flex-col">
          <textarea
            placeholder="What's happening?"
            onChange={handleInputChange}
            value={tweet}
            className={`flex-grow px-4 pb-2 h-20 block rounded-full bg-transparent ${
              tweet.length > 0 ? "text-xl" : "text-2xl"
            }  focus:outline-none focus:border-blue-500`}
          />
          <div className="flex flex-row justify-between">
            <button>
              <HiOutlinePhoto className="w-10 h-10 self-end mr-5" />
            </button>
            <button
              className="bg-blue-400 w-24 rounded-full h-12 self-end mr-5 
            whitespace-pre-wrap overflow-y-hidden resize-none break-words 
             text-white font-bold"
              onClick={handleTweetSubmit}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPost;
