import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill, RiPlayListFill, RiUser3Fill, RiHeartFill, RiSettings3Fill } from 'react-icons/ri';
import { categories } from '../utils/data';
import {BiLibrary} from 'react-icons/bi'
import logo from '../assets/logo.png'


const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-4 border-[#FF4500] p-2 text-[#FF4500] bg-[#FFEBE8] transition-all duration-200 ease-in-out capitalize';

const icons = { 
  RiLibraryFill:<BiLibrary />,
  RiPlayListFill: <RiPlayListFill />,
  RiUser3Fill: <RiUser3Fill />,
  RiHeartFill: <RiHeartFill />,
  RiSettings3Fill: <RiSettings3Fill />,
};

const Sidebar = ({ closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white w-[200px] h-full overflow-y-scroll min-w-250 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src='https://static.vecteezy.com/system/resources/previews/000/579/872/non_2x/music-symbols-logo-and-icons-template-vector.jpg'alt="logo" className="rounded w-72 h-32" />
        </Link>
        <div className="flex flex-col gap-5 mt-10">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          {categories.map((category) => (
            <NavLink
              to={`/${category.name.toLowerCase()}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {icons[category.icon]}
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
