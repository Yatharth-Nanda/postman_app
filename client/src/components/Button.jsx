import React, { forwardRef } from "react";

export const Button = forwardRef(({ className, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className={`border-2 border-gray-900 bg-blue-600 rounded p-2 w-full text-white font-bold hover:bg-blue-500 focus:bg-blue-400 transition-colors disabled:bg- ${className}`}
      {...rest}
    />
  );
});
