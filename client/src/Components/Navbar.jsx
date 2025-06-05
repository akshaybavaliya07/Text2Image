import { memo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import ProfileMenu from "./ProfileMenu.jsx";
import { useAuth } from '../hooks/useAuth.js'

const Navbar = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const { logout } = useAuth();

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
              onClick={() => navigate("/buy-credits")}
              className="flex items-center gap-2 bg-blue-100 rounded-full px-4 cursor-pointer sm:px-6 py-1 sm:py-3
              hover:scale-105 transition-all duration-300"
            >
              <img
                className="w-5"
                src="/images/credit_star.svg"
                alt="credit_star"
              />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credit left: {user.creditBalance}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden">Hi, {user.name}</p>
            {/* <div className="relative group">
              <img
                src="/images/profile_icon.png"
                className="w-10 drop-shadow"
                alt="default_profil_pic"
              />
              <div className="absolute hidden group-hover:block top-full right-0 z-10 pt-2">
                <ul className="bg-white shadow-lg rounded-md overflow-hidden text-sm min-w-[120px]">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 transition-all duration-200 text-center">
                    Logout
                  </li>
                </ul>
              </div>
            </div> */}
            <ProfileMenu name={user.name} logout={logout} />
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <button
              onClick={() => navigate("/buy-credits")}
              className="cursor-pointer"
            >
              pricing
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 text-sm rounded-full cursor-pointer sm:px-10"
            >
              login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Navbar);
