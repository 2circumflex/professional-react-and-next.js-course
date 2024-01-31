import React from "react";

export default function Container({ children }) {
  return (
    <div className="flex  flex-col max-w-7xl min-h-screen mx-auto bg-white/[2%]">
      {children}
    </div>
  );
}
