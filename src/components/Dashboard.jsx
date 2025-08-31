import Menubar from "./Menubar.jsx";
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";
import Sidebar from "./Sidebar.jsx";


const Dashboard = ({children, activeMenu}) => {
    const {user} = useContext(AppContext);
    return (
        <div><Menubar activeMenu={activeMenu}/>
            {user && (
                <div className="flex">
                       <div className="max-[1080px]:hidden ">
                           {/* Side bar content */}
                           <Sidebar activeMenu={activeMenu}  />

                       </div>
                        <div className="grow mx-5">
                            {children}
                        </div>
                </div>
            )}</div>
    )
}
export default Dashboard
