import { memo, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="flex item-center justify-between py-4">
      <Link to="/">
        <img
          src="/images/logo.svg"
          alt="logo"
          className="w-28 sm:w-32 lg:w-40"
        />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buycredit")}
              className="flex items-center gap-2 bg-blue-100 rounded-full px-4 sm:px-6 py-1 sm:py-3
              hover:scale-105 transition-all duration-300"
            >
              <img
                className="w-5"
                src="/images/credit_star.svg"
                alt="credit_star"
              />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credit left: 10
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden">Hi, Akshay</p>
            <div>
              <img
                className="w-10 drop-shadow"
                src="/images/profile_icon.png"
                alt="default_profil_pic"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <button
              onClick={() => navigate("/buycredit")}
              className="cursor-pointer"
            >
              pricing
            </button>
            <button className="bg-zinc-800 text-white px-7 py-2 text-sm rounded-full sm:px-10">
              login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Navbar);
