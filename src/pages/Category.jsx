import Dashboard from "../components/Dashboard.jsx";
import useUser from "../hooks/useUser.jsx";
import{Plus} from "lucide-react";
import CategoryList from "../components/CategoryList.jsx";
import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../utils/apiEndpoints.jsx";
import {axiosConfig} from "../utils/axiosConfig.jsx";
import toast from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";

const Category = () => {
    useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const fetchCategoryDetails = async () => {
        if(isLoading)return;
        setIsLoading(true);
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(response.status === 200){
                console.log(response.data);
                setCategoryData(response.data);
            }else if(response.message.includes("Already exists")){
                toast.error("Category already exists!");
            }
            console.log("Response",response);
        }catch(e){
            console.error('Something wet wrong. Please try again.',e);
            console.error(e);
            toast.error(e.message);

        }finally {
            setIsLoading(false);
        }

    }
    useEffect(() => {
        fetchCategoryDetails();
    },[]);

    const handleAddCategory = async (category) => {
        const {name,type,icon} = category;
        console.log("Category", category);
        if(!name.trim()){
            toast.error("Category Name is required");
            return;
        }

        // check if category already exists
        const isDuplicate = categoryData.some((category) => {

            return category.name.toLowerCase() === name.trim().toLowerCase()
        })

        if(isDuplicate){
            toast.error("Category already exists!");
            return;
        }

        try{
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY,{
                name,type,icon
            });
            console.log("Response:", response);
            if(response.status === 201){
                toast.success("Category Added Successfully.");
                setOpenAddCategoryModal(false);
               fetchCategoryDetails();
            }
        }catch(e){
            console.error('Something wet wrong. Please try again.');
            toast.error(e.response?.data?.message || "Failed to add category.");

        }


    }


    const handleEditCategory = async (category) => {
        setSelectedCategory(category);
        setOpenEditCategoryModal(!openEditCategoryModal);
    }


    const handleUpdateCategory = async (category) => {
        const {id,name,type,icon} = category;
        console.log("Category", selectedCategory);
        if(!name.trim()){
            toast.error("Category Name is required");
            return;
        }

        if(!id){
            toast.error("Category Id is missing for update");
            return;
        }

        try{
             const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,type,icon});
            console.log("Response For Puting:", response);
             setOpenEditCategoryModal(!openEditCategoryModal);
            setSelectedCategory(null);
            toast.success("Category Updated Successfully.");
            fetchCategoryDetails();


        }catch(error){
            console.error('Something wet wrong. Please try again.',error.response?.data?.message || "Failed to update category.");
            toast.error(error.response?.data?.message || "Failed to update category.");


        }





    }
    return (
        <div>
            <Dashboard activeMenu="Category">
                {/* Add button to add category */}
                <div className="flex justify-between items-center mt-5">
                    <h2 className="text-2xl font-semibold">
                        All Categories
                    </h2>
                    <button onClick={() => setOpenAddCategoryModal((prev) => !prev)} className="btn-primary cursor-pointer hover:scale-110 flex items-center gap-1">
                            <Plus size={15}/>
                        Add category
                    </button>

                </div>

                {/* Category list*/}
                <CategoryList categories={categoryData} onEditCategory={(e) => handleEditCategory(e)} />

                {/* Adding category modal */}
                <Modal title="Add Category" isOpen={openAddCategoryModal} onClose={() => setOpenAddCategoryModal((prev) => !prev)}>
                        <AddCategoryForm onAddCategory={handleAddCategory}/>
                </Modal>



                {/*Updating category modal */}
                <Modal title="Update Category" isOpen={openEditCategoryModal} onClose={() => {
                    setOpenEditCategoryModal(!openEditCategoryModal);
                    setSelectedCategory(null);
                }}
                >
                    <AddCategoryForm initialCategoryData={selectedCategory} onAddCategory={handleUpdateCategory} isEditing={true}
          />
                </Modal>
            </Dashboard>
        </div>
    )
}
export default Category
