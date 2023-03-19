import React, { useState } from "react";
import { useSWR, type Fetcher } from "lib/swr";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";
import axios from "axios";

const VerticalTimelineFetcher = async (url: string) => {
  const currentUser = getCookie(COOKIES_KEYS.currentUser);
  console.log(currentUser);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${currentUser?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
const VerticalTimeline = () => {
  const withdrawId = "640f5ceb78fd73b40d217e72";
  const { data, error, isLoading } = useSWR(
    `https://talents-valley-backend.herokuapp.com/api/withdraw/details/${withdrawId}`,
    VerticalTimelineFetcher
  );
  const timelineData = data?.data.withdraw.history;
  const timestamp = data?.data.withdraw.createdAt;
  const date = new Date(timestamp);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );

  let dateText = "";
  if (date >= today) {
    dateText = "today";
  } else if (date >= yesterday) {
    dateText = "yesterday";
  } else {
    dateText = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

 

  return (
    <ol className="text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400 pt-4">
      {timelineData &&
        timelineData.map((item) => (
          <li
            key={item._id}
            className="grid grid-cols-5 divide-x relative "
          >
            <div className=" flex flex-col pb-3">
              <div className="text-sm">{formattedTime} </div>
              <div className="text-sm">{dateText} </div>

            </div>
            <span className="absolute w-3 h-3 ml-[18%] bg-blue-200 rounded-full dark:ring-gray-900 dark:bg-blue-900"></span>
            <div className="font-medium pl-5 ">{item.status}</div>
          </li>
        ))}
    </ol>
  );
};

export default VerticalTimeline;
