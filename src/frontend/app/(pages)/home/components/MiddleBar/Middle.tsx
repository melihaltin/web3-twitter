import React, { useState } from "react";
import UploadPost from "./UploadPost";
import Image from "next/image";

const Middle = () => {
  const [post, setPost] = useState("");

  return (
    <div className="">
      <UploadPost />
      <div>
        <div className="mt-4 font-body px-6 border-b-[1.5px] border-gray-700 pb-4 ">
          <div className="flex gap-3 items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-black ">
              <Image
                src="/bebeklikfoto.jpg"
                alt=""
                height={100}
                width={100}
                className="w-full h-full"
              />
            </div>
            <p className="text-sky-600">wallet addres</p>
            <p className="text-stone-500">time</p>
          </div>

          <div className="ml-20">
            <h3 className="text-lg">
              Testadsaöldösalşödlaödlşsaölşdsöa <br /> klsmdalkmskasda
            </h3>

            <div className="py-3 rounded-md">
              <Image
                data-src="https://ik.imagekit.io/demo/default-image.jpg"
                loading="lazy"
                src="/bebeklikfoto.jpg"
                alt="image"
                width={400}
                height={100}
                className="w-[28rem] rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;
