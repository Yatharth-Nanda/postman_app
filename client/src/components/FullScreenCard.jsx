import React from "react";

export function FullScreenCard({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full">{children}</div>
    </div>
  );
}

FullScreenCard.Body = function FullScreenCardBody({ children }) {
  return <div className="bg-white p-6 rounded-lg shadow">{children}</div>;
};

FullScreenCard.BelowCard = function FullScreenCardBody({ children }) {
  return (
    <div className="mt-2 justify-center flex gap-3 bg-transparent">
      {children}{" "}
    </div>
  );
};
