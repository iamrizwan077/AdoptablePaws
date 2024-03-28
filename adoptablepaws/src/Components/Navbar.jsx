import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r w-full from-pink-500 py-6 to-pink-700 text-white font-semibold shadow-md">
      <div className="flex-shrink-0 flex items-center justify-center md:text-2xl text-xl font-semibold">
        <Link to="/">
          <p>AdoptablePaws</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
