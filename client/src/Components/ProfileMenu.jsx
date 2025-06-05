import { useEffect, useState } from "react";

const ProfileMenu = ({ name, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative group">
      <img
        src="/images/profile_icon.png"
        className="w-10 drop-shadow cursor-pointer relative z-20"
        alt="default_profil_pic"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />

      {/* Mobile dropdown (click to toggle) */}
      <div className={`absolute text-black top-0 right-0 z-10 pt-12 sm:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <ul className="list-none p-2 bg-white text-sm text-center rounded-lg">
          <li className="px-4 py-1 border-b border-b-gray-300">
            {name}
          </li>
          <li
            onClick={logout}
            className="px-4 py-1"
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Desktop dropdown (hover) */}
      <div className="absolute text-black top-0 right-0 z-10 pt-12 hidden sm:group-hover:block">
        <ul className="list-none p-2 bg-white text-sm text-center rounded-lg">
          <li
            onClick={logout}
            className="px-4 py-1 cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
