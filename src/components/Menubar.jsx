import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {useNavigate} from "react-router-dom";
import {X, Menu, User, LogOut} from "lucide-react";
import {assets} from "../assets/assets.js";
import Sidebar from "./Sidebar.jsx";

const Menubar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const dropDownRef = useRef(null);
    const {user, clearUser} = useContext(AppContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropDown((prevState) => !prevState);
        navigate("/login");
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setShowDropDown((prevState) => !prevState);

            }
        }
            if(showDropDown) {
                document.addEventListener("mousedown", handleClickOutside);
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            }

    }, [showDropDown]);


    return (
        <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30 ">
            {/* Left Side - Menu button and title */}
            <div className="flex items-center gap-5">
                <button className="block cursor-pointer lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors" onClick={() => setOpenSideMenu(!openSideMenu)}>
                    {openSideMenu ? ( <X className="text-2xl"/>) :(
                        <Menu className="text-2xl"/>
                    ) }
                </button>
                <div className="flex items-center cursor-pointer gap-2" onClick={() => navigate("/dashboard")}>
                    <img src={assets.logo} alt="logo" className="w-10 h-10" />
                    <span className="text-lg font-medium text-black truncate">
                        Money Manager
                    </span>
                </div>

            </div>

            {/*Right side - Avatar photo */}
          <div className="relative" ref={dropDownRef}>
              <button onClick={() => setShowDropDown((prev) => !prev)} className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-full  bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2">
                  <User className="text-purple-500"/>

              </button>
              {/* Dropdown menu */}
              {showDropDown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      {/* user Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                    <User className="w-4 h-4 text-purple-600"/>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">
                                        {user.fullName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user.email}
                                    </p>
                                </div>

                            </div>
                      </div>
                      {/* Drop Options */}
                      <div className="py-1">
                            <button onClick={handleLogout } className="flex cursor-pointer   items-center gap-3 w-full px-4 py-2 text-sm text-gray-700  hover:bg-gray-50 transition-colors duration-100">
                                <LogOut className="w-4 h-4 text-gray-500"/>
                                Logout
                            </button>
                      </div>

                  </div>
              )}
          </div>
            {/* Mobile side menu */}
            {
                openSideMenu && (
                    <div className="fixed left-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px]">
                        <Sidebar activeMenu={activeMenu}/>
                    </div>
                )
            }
        </div>
    )
}
export default Menubar
