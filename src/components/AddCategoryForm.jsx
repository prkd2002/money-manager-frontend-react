import {useEffect, useState} from "react";
import {Input} from "./Input.jsx";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import {LoaderCircle} from "lucide-react";

const AddCategoryForm = ({onAddCategory, isEditing, initialCategoryData}) => {
    const [category, setCategory] = useState({
        name: "",
        type: "",
        icon: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if(isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        }else{
            setCategory({name: "", type: "",icon: ""});
        }
    },[isEditing, initialCategoryData]);

    const handleChange = (field,value) => {
        setCategory({...category, [field]: value});

    }

    const handleSubmit = async () => {
        try{
            setIsLoading(true);
            await onAddCategory(category);
        }catch(err){
            console.log(err);
        }finally{
            setIsLoading(false);
        }

    }

    const categoryTypeOptions = [
        { label: "Income", value: "Income" },
        {label: "Expense", value: "Expense" },
    ];
    return (
        <div className="p-4">
            <EmojiPickerPopup icon={category.icon} onSelect={(selectedIcon) => handleChange("icon",selectedIcon)}/>
           <Input value={category.name} onChange={({target}) =>handleChange("name",target.value)} label="Category Name" placeholder="e.g., Freelance, Salary,Groceries" type="text" />
            <Input isSelect={true} value={category.type} onChange={({target}) => handleChange("type",target.value)} label="Category Type"  options={categoryTypeOptions}  />
            <div className="flex justify-end mt-6">
                <button disabled={isLoading} type={"button"} className={`btn-primary hover:scale-110 cursor-pointer fill ${isLoading ? "cursor-not-allowed" : ""}`} onClick={handleSubmit}>
                    {
                        isLoading ? (
                            <>
                            <LoaderCircle className="w-5 h-5 animate-spin"/>
                            { isEditing ? "Editing Category...."  :"Adding Category...."}
                            </>
                        ): (
                            <>
                            {isEditing ? "Edit Category" :  "Add Category"}
                        </>)
                    }
                </button>
            </div>
        </div>
    )
}
export default AddCategoryForm
