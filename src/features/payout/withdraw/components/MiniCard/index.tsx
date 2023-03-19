import React from "react";
import { Children } from "types";

export function MiniCard({
  children,
  className = "",
  ...reset
}: {
  children: Children;
  className?: string;
}) {
  return (
    <div
      className={`p-4 sm:px-7 border-[1px] border-gray-dark rounded-lg text-left hover:bg-gray-light ${className}`}
    >
      {children}
    </div>
  );
}

export default MiniCard;
