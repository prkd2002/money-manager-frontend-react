import Dashboard from "../components/Dashboard.jsx";
import useUser from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import {axiosConfig} from "../utils/axiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/apiEndpoints.jsx";
import {toast} from "react-hot-toast";
import IncomeOverview from "../components/IncomeOverview.jsx";
import IncomeList from "../components/IncomeList.jsx";
import Modal from "../components/Modal.jsx";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";
import ExpenseList from "../components/ExpenseList.jsx";

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDownload, setIsLoadingDownload] = useState(false);
    const [isLoadingEmail, setIsLoadingEmail] = useState(false);

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert,setOpenDeleteAlert] = useState({
        show:false,
        data:null
    });
    const fetchExpenseDetails = async () => {
        if(isLoading) return;
        try{
            setIsLoading(true);
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if(response.status === 200){
                console.log("Expense data", response.data);
                setExpenseData(response.data);
            }


        }catch(e){
            console.error('Failed to fetch expense details: ',e    );
            toast.error(e.response.data.message || "Failed to fetch expense details");

        }finally {
            setIsLoading(false);

        }
    }

    const fetchExpenseCategories = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            console.log("Expense data categories", response.data);
            if(response.status === 200){
                setCategories(response.data);
            }
        }catch(error){
            console.error('Failed to fetch Expense categories details');
            toast.error(error.data.message || "Failed to fetch Expense categories details");

        }
    }

    // Save the Income Details
    const handleAddExpense = async (income) => {
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
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSES,{
                name,amount,date,icon,categoryId
            });
            if(response.status === 201){
                toast.success("Added Expense successfully!");
                setOpenAddExpenseModal(!openAddExpenseModal);
                fetchExpenseDetails();
            }
        }catch(e){
            console.error('Failed to add income detials: ',e    );
            toast.error(e.response.data.message || "Failed to add income details");


        }
    }


    const handleDownloadExpenseDetails = async () => {
        try{
            setIsLoadingDownload(true);
            const response =  await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,{responseType:"blob"});
            let filename = "expense_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download expense details successfully!");
        }catch(e){
            console.error('Failed to download expense details',e);
            toast.error(e.response.data.message || "Failed to download expense details");
            setIsLoadingDownload(false);
        }finally {
            setIsLoadingDownload(false);
        }
    }


    const handleEmailExpenseDetails  = async () => {
        try{
            setIsLoadingEmail(true);
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSES);
            if(response.status === 200){
                toast.success("Email expense details emailed successfully!");
            }

        }catch(e){
            console.error('Failed to email expense details',e);
            toast.error(e.response.data.message || "Failed to email expense details");
            setIsLoadingEmail(false);
        }finally {
            setIsLoadingEmail(false);
        }
    }

    // Delete Income
    const deleteExpense = async (id) => {
        try{
            const response = await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id))
            if(response.status === 204){
                toast.success("Deleted expense successfully!");
                setOpenDeleteAlert({show:false,data:null});
                fetchExpenseDetails();
            }

        }catch(e){
            console.error('Failed to delete income details: ',e    );
            toast.error(e.response.data.message || "Failed to delete expense details");
        }

    }


    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    },[])
    return (
        <div >
            <Dashboard activeMenu="Expense">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            {/* Overview for expense with line chart  */}
                            <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal((prev) => !prev) }/>
                        </div>
                        <ExpenseList transactions={expenseData} onDelete={(id) => setOpenDeleteAlert({show:true,data:id})} onDownload={ handleDownloadExpenseDetails} onEmail={handleEmailExpenseDetails} isLoadingDownload={isLoadingDownload} isLoadingEmail={isLoadingEmail} />

                        {/* Add Expense Modal */}

                        <Modal isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(!openAddExpenseModal)} title={"Add Expense"}>
                            <AddIncomeForm onAddIncome={(expense) =>handleAddExpense(expense) } categories={categories} />
                        </Modal>

                        {/* Delete Income Modal */}
                        <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({show:false, data: null})} title={"Delete Expense"}>
                            <DeleteAlert content={"Are you sure want to delete this expense details?"} onDelete={() => deleteExpense(openDeleteAlert.data)} />
                        </Modal>

                    </div>
                </div>

            </Dashboard>
        </div>
    )
}
export default Expense
