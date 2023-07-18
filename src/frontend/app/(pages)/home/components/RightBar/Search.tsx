"use client";
import React from "react";
import { CiSearch } from "react-icons/Ci";

const Search = () => {
  const [search, setSearch] = React.useState("");

  return (
    <div className="relative items-center flex ">
      <input
        type="search"
        placeholder="Search Twitter"
        className="w-full h-14 bg-gray-900 rounded-full pl-14  border focus:outline-none focus:border-blue-500 border-transparent"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />

      <CiSearch className="absolute letf-3 ml-3 w-7 h-7" color="gray" />
    </div>
  );
};

export default Search;
