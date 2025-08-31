import {useRef, useState, useEffect} from "react";
import {User,Trash,Upload} from "lucide-react"

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    // Nettoyer l'URL quand le composant se démonte ou change
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleImageChange = (e) => {
        e.preventDefault()
        console.log("handleImageChange", e);
        const file = e.target.files[0];
        if(file){
            console.log(file);
            setImage(file);

            // Nettoyer l'ancienne URL avant d'en créer une nouvelle
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = (e) => {
        setImage(null);
        e.preventDefault();

        // Nettoyer l'URL de l'objet
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);

        // Réinitialiser l'input file
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();

    }

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            {!image && !previewUrl ? (
                <div
                    onClick={onChooseFile}
                    className="w-20 cursor-pointer h-20 flex items-center justify-center bg-purple-100 rounded-full relative hover:bg-purple-200 transition-colors"
                >
                    <User className="text-purple-500" size={35}/>
                    <div className="w-8 h-8 flex items-center cursor-pointer justify-center bg-purple-500 text-white rounded-full absolute -bottom-1 -right-1 pointer-events-none">
                        <Upload size={15} className="cursor-pointer" />
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewUrl || (typeof image === 'string' ? image : '')}
                        alt="Profile photo"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                    <button
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex cursor-pointer items-center justify-center bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-red-700 transition-colors"
                    >
                        <Trash size={15} className="cursor-pointer" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector