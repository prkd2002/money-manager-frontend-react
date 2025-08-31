import {useState} from "react";
import { useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import {Input} from "../components/Input.jsx";
import {validationEmail} from "../utils/validation.js";
import {API_ENDPOINTS} from "../utils/apiEndpoints.jsx";
import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";
import {axiosConfig} from "../utils/axiosConfig.jsx";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../utils/uploadProfileImage.js";

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let imageUrl = "";
        setError(null);

        // Validation
        if (!fullName.trim()) return setError("Please enter your full name!");
        if (!email.trim()) return setError("Please enter email!");
        if (!validationEmail(email)) return setError("Please enter a valid email!");
        if (!password.trim()) return setError("Please enter password!");

        try {
            setIsLoading(true);
            if(profilePhoto){
               const imageUrlUploadedImage = await  uploadProfileImage(profilePhoto);
               imageUrl = imageUrlUploadedImage || "";
            }

            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                imageUrl
            });

            if (response.status === 201) {
                toast.success("Profile created successfully");
                navigate("/login");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Something went wrong";
            console.error(errorMessage, err);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-white ">
            {/* Background image with blur */}
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm " />
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start tracking your spendings by joining with us
                    </p>
                    <form className="space-y-4">
                        <div className="flex justify-center mb-6">
                           <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" type="text"  />
                            <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="johndoe@example.com" type="email" />
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

                                <button disabled={isLoading} className={`btn-primary cursor-pointer w-full col-span-2 flex items-center justify-center gap-2 ${isLoading? 'opacity-60 cursor-not-allowed': ''}`} type="submit" onClick={handleSubmit}>
                                    {isLoading  ? (
                                        <>
                                            <LoaderCircle className="animate-spin w-5 h-5"/>
                                            Signing Up...
                                        </>

                                    ) : "SIGN UP"}
                                </button>


                            <p className="text-sm text-slate-700 text-center mt-6 col-span-2 ">
                                    Already have an account?{""} <span className="font-medium text-primary underline hover:text-primary-dark transition-colors cursor-pointer" onClick={() => navigate("/login")}>Login</span>

                            </p>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup
