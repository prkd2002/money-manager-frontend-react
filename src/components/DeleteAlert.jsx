import {useState} from "react";
import {LoaderCircle} from "lucide-react";

const DeleteAlert = ({content, onDelete}) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleDelete = async () => {
            try{
                setIsLoading(true);
                await onDelete();
            }finally{
                setIsLoading(false);

            }
    }
    return (
        <div>
            <p className={"text-2xl font-medium text-red-700"}>{content}</p>
            <div className={"flex justify-end mt-6"}>
                <button onClick={handleDelete} type="button" className="btn-primary flex items-center cursor-pointer hover:scale-110">
                    {
                        isLoading ? (
                            <>
                            <LoaderCircle size={20} className="animate-spin" /> Deleting Income
                            </>
                        ):(
                            "Delete"
                        )
                    }

                </button>

            </div>
        </div>
    )
}
export default DeleteAlert
