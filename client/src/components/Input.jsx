import React, { forwardRef } from "react";

export const Input = forwardRef(({ className, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className={`py-1 px-2 border border-gray-400 focus:border-blue-500 outline-none rounded w-full ${className}`}
      {...rest}
    />
  );
});
