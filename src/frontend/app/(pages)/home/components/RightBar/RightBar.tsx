import React from "react";
import Search from "./Search";
import Trends from "./Trends";

const RightBar = () => {
  return (
    <div className="mr-64 ml-10 mt-2 gap-9 flex flex-col">
      <Search />
      <Trends />
    </div>
  );
};

export default RightBar;
