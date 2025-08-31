import {AppContext} from "../context/AppContext.jsx";
import {useContext} from "react";
import {User} from "lucide-react";
import {SIDE_BAR_DATA} from "../assets/assets.js";
import {NavLink} from "react-router-dom";

const Sidebar = ({activeMenu}) => {
    const {user} = useContext(AppContext);
    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7 border-b border-gray-200">
                {
                    user?.imageUrl ? (
                        <img src={user?.imageUrl || ""} alt="profile image" className="w-20 h-20 bg-slate-400 rounded-full" />

                    ):(
                        <User className="w-20 h-20 cursor-pointer bg-purple-500 rounded-full" />
                        
                    )
                }
                <h5 className="text-gray-950 font-medium leading-6 ">
                    {user.fullName || ""}
                </h5>

            </div>

            <div>
                {
                    SIDE_BAR_DATA.map((item, index) => (
                        <NavLink key={index} to={item.path} className={`w-full flex   items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${activeMenu === item.label ? "bg-purple-500" : ""}`}>
                            <item.icon className="text-xl"/>
                            {item.label}
                        </NavLink>
                    ))
                }
            </div>

        </div>
    )
}
export default Sidebar
