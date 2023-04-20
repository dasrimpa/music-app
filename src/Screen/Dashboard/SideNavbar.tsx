import React from "react";
import { Link } from "react-router-dom";
import Profile from '../../assets/images/ProfilePhoto.jpg';
import { routes } from "lib/routes";
import { FaRegCreditCard } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { TbLogout } from 'react-icons/tb';


export default function SideNavbar() {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 w-80 bg-white h-full border-r">
      <div className="flex items-center space-x-4 p-6 mb-5">
            <img className="h-14 rounded-full text-gray-500" src={Profile} alt="Profile" />
            <div>
                <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">Rimpa Das</h4>
                <span className="text-sm tracking-wide flex items-center space-x-1">
                    <svg className="h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg><span className="text-gray-600">Verified</span>
                </span>
            </div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Menu
                </div>
              </div>
            </li>
            <li>
              <Link
                to={routes.dashboard.SongList.path}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                 <AiOutlineHome className="w-5 h-5"/>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-gray-600 font-medium">
                  Play List
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={routes.dashboard.addSong.path}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FaRegCreditCard className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-gray-600 font-medium">
                  Manage Song
                </span>
              </Link>
            </li>

            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Settings
                </div>
              </div>
            </li>
            <li>
              <Link
                to=""
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                 <AiOutlineUser className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-gray-600 font-medium">
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                <FiSettings className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-gray-600 font-medium">
                  Settings
                </span>
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                 <TbLogout className="w-5 h-5"/>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate ">
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
