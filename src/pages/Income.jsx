import Dashboard from "../components/Dashboard.jsx";
import useUser from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import {axiosConfig} from "../utils/axiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/apiEndpoints.jsx";
import {toast} from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import Modal from "../components/Modal.jsx";
import {Plus} from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDownload, setIsLoadingDownload] = useState(false);
    const [isLoadingEmail, setIsLoadingEmail] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert,setOpenDeleteAlert] = useState({
        show:false,
        data:null
    });
    const fetchIncomeDetails = async () => {
        if(isLoading) return;
        try{
            setIsLoading(true);
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if(response.status === 200){
                console.log("Income data", response.data);
                setIncomeData(response.data);
            }


        }catch(e){
            console.error('Failed to fetch income detials: ',e    );
            toast.error(e.response.data.message || "Failed to fetch income details");

        }finally {
            setIsLoading(false);

        }
    }

    const fetchIncomeCategories = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            console.log("Income data categories", response.data);
            if(response.status === 200){
                setCategories(response.data);
            }
        }catch(error){
            console.error('Failed to fetch income categories details');
            toast.error(error.data.message || "Failed to fetch income categories details");

        }
    }

    // Save the Income Details
    const handleAddIncome = async (income) => {
        const {name,amount,date,icon,categoryId} = income;

        // Validation
        if(!name.trim()){
            toast.error("Please enter a name");
            return;
        }


        if(!date.trim()){
            toast.error("Please select a date");
            return;
        }

        if (!amount || Number(amount) <= 0  || isNaN(amount)){
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if(!categoryId.trim()){
            toast.error("Please choose a category");
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        if(date > today){
            toast.error("Date cannot be in the future");
            return;
        }

        try{
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_ICOME,{
                name,amount,date,icon,categoryId
            });
            if(response.status === 201){
                toast.success("Added income successfully!");
                setOpenAddIncomeModal(!openAddIncomeModal);
                fetchIncomeDetails();
            }
        }catch(e){
            console.error('Failed to add income detials: ',e    );
            toast.error(e.response.data.message || "Failed to add income details");


        }
    }


    const handleDownloadIncomeDetails = async () => {
       try{
           setIsLoadingDownload(true);
          const response =  await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,{responseType:"blob"});
          let filename = "income_details.xlsx";
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
          toast.success("Download income details successfully!");
       }catch(e){
           console.error('Failed to download income details',e);
           toast.error(e.response.data.message || "Failed to download income details");
            setIsLoadingDownload(false);
       }finally {
           setIsLoadingDownload(false);
       }
    }


    const handleEmailIncomeDetails  = async () => {
       try{
           setIsLoadingEmail(true);
          const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
          if(response.status === 200){
              toast.success("Email income details emailed successfully!");
          }

       }catch(e){
           console.error('Failed to email income details',e);
           toast.error(e.response.data.message || "Failed to email income details");
            setIsLoadingEmail(false);
       }finally {
           setIsLoadingEmail(false);
       }
    }

    // Delete Income
    const deleteIncome = async (id) => {
        try{
            const response = await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id))
            if(response.status === 204){
                toast.success("Deleted income successfully!");
                setOpenDeleteAlert({show:false,data:null});
                fetchIncomeDetails();
            }

        }catch(e){
            console.error('Failed to delete income detials: ',e    );
            toast.error(e.response.data.message || "Failed to delete income details");
        }

    }


    useEffect(() => {
         fetchIncomeDetails();
         fetchIncomeCategories();
    },[])
    return (
        <div >
            <Dashboard activeMenu="Income">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 gap-6">
                         <div>
                             {/* Overview for income with line chart  */}
                             <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal((prev) => !prev) }/>
                         </div>
                        <IncomeList transactions={incomeData} onDelete={(id) => setOpenDeleteAlert({show:true,data:id})} onDownload={ handleDownloadIncomeDetails} onEmail={handleEmailIncomeDetails} isLoadingDownload={isLoadingDownload} isLoadingEmail={isLoadingEmail} />

                        {/* Add Income Modal */}

                        <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(!openAddIncomeModal)} title={"Add Income"}>
                            <AddIncomeForm onAddIncome={(income) =>handleAddIncome(income) } categories={categories} />
                        </Modal>

                        {/* Delete Income Modal */}
                        <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({show:false, data: null})} title={"Delete Income"}>
                               <DeleteAlert content={"Are you sure want to delete this income details?"} onDelete={() => deleteIncome(openDeleteAlert.data)} />
                        </Modal>

                    </div>
                </div>

            </Dashboard>
        </div>
    )
}
export default Income
