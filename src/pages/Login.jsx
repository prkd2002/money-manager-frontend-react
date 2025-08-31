import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import {Input} from "../components/Input.jsx";
import {validationEmail} from "../utils/validation.js";
import {axiosConfig} from "../utils/axiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/apiEndpoints.jsx";
import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";
import {AppContext} from "../context/AppContext.jsx";

const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(AppContext);
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null);

        // Validation
        if (!email.trim()) {
            setError("Please enter Your email");
            return;
        }

        if(!validationEmail(email)) {
            setError("Please enter a valid email");
            return;
        }


        if(!password.trim()) {
            setError("Please enter your password");
            return;
        }

        try{
            setIsLoading(true);
            const response= await axiosConfig.post(API_ENDPOINTS.LOGIN,  {
                email: email,
                password: password,
            });

            if(response.status === 200){
                toast.success("login successful");
                const {token, user} = response.data;
                if(token){
                    localStorage.setItem("token",token);
                    setUser(user);
                    navigate("/dashboard");
                }

            }

        }catch(err){
            const errorMessage = err.response.data.message || "Something went wrong";
            console.error(errorMessage,err);
            setError(errorMessage);
            setIsLoading(false);


        }finally{
            setIsLoading(false);
        }

    }

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-white ">
            {/* Background image with blur */}
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm " />
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                      Welcome back
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Please enter your details to login in
                    </p>
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <div className="flex justify-center mb-6">
                            {/* Profile image */}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="johndoe@example.com" type="email" />
                            </div>

                            <div className="col-span-2">
                                <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" type="password"  />
                            </div>
                            {
                                error && (
                                    <p className="text-red-800 col-span-2 text-sm text-center bg-red-50 p-2 rounded">
                                        {error}
                                    </p>
                                )
                            }

                            <button disabled={isLoading} className={`btn-primary w-full col-span-2 cursor-pointer flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed': ''}`} type="submit" onClick={handleSubmit} >
                                {
                                    isLoading ? (
                                        <>
                                        <LoaderCircle className="w-5 h-5 animate-spin"/>
                                         Login...
                                        </>
                                    ):
                                        "LOGIN"
                                }
                            </button>


                            <p className="text-sm text-slate-700 text-center mt-6 col-span-2 ">
                                Don't have an account? <span className="font-medium text-primary underline hover:text-primary-dark transition-colors cursor-pointer" onClick={() => navigate("/signup")}>Signup</span>

                            </p>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login
