import React, { useEffect } from "react";
import { Header } from "./Header.js";

export const Layout = ({ search, searchHidden, children }) => {
  // If user not connected, we redirect him to the top page
  // TODO need to be improved
  useEffect(() => {
    if (!localStorage.getItem("walletAddress")) {
      location.href = "/";
    }
  }, []);
  return (
    <div className="w-full bg-[#1a1c1f] flex flex-row">
      <div className="flex-1 h-screen flex flex-col">
        <Header search={search} searchHidden={searchHidden} />
        {children}
      </div>
    </div>
  );
};
