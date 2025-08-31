import {useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {useNavigate} from "react-router-dom";
import {API_ENDPOINTS} from "../utils/apiEndpoints.jsx";
import {axiosConfig} from "../utils/axiosConfig.jsx";

const useUser = () => {
    const {user, setUser, clearUser} = useContext(AppContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            return;
        }

        let isMounted = true;

        const fetchUserInfo = async () => {
            try{
                const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO)
                if(isMounted  && response.data){
                    setUser(response.data);
                }
            }catch(e){
                console.log("Faied to fethc the user info", e);
                if(isMounted){
                    clearUser();
                    navigate("/login");
                }
            }
        }

        fetchUserInfo();

        return () => {
            isMounted = false;
        }
    },[user, setUser, navigate, clearUser])

    return (
        <div>useUser</div>
    )
}
export default useUser
