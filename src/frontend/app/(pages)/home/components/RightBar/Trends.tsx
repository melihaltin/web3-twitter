import React from "react";
import TrendsData from "../../../../../Trends.json";
const Trends = () => {
  function getTrends() {
    return TrendsData.trends;
  }

  return (
    <div className="w-full h-auto bg-gray-900 rounded-3xl p-5">
      <span className="text-2xl font-medium mb-5">Trends For you</span>
      {getTrends().map((trend) => {
        return (
          <div key={trend.name} className="mt-6">
            <h3 className="text-md text-gray-500">{trend.location}</h3>
            <p className="text-xl text-white font-medium">#{trend.name}</p>
            <p className="text-md text-gray-500">{trend.tweet_volume} Tweets</p>
          </div>
        );
      })}
    </div>
  );
};

export default Trends;
