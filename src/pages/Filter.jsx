import Dashboard from "../components/Dashboard.jsx";
import useUser from "../hooks/useUser.jsx";
import {SearchIcon,LoaderCircle} from "lucide-react";
import {useState} from "react";
import {axiosConfig} from "../utils/axiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/apiEndpoints.jsx";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";

const Filter = () => {
    useUser();
    const [type,setType] = useState("Income"); // Corrigé : minuscule pour être cohérent
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(type,startDate,endDate,keyword,sortField,sortOrder);
        try{
            setIsLoading(true);
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder
            });
            setTransactions(response.data);
            console.log("response", response.data); // Corrigé : afficher response.data au lieu de transactions

        }catch(err){
            console.error("Failed to fetch transactions:", err); // Corrigé : afficher l'erreur réelle
            toast.error(err.response?.data?.message || err.message || "Failed to fetch transactions. Please try again");

        }finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Dashboard activeMenu="Filters">
                <div className="my-5 mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">
                            Filter Transactions
                        </h2>
                    </div>
                    <div className="card p-4 mb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-lg font-semibold ">
                                Select the filters
                            </h5>
                        </div>
                        <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Type
                                </label>
                                <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded px-3 py-2 cursor-pointer">
                                    <option value="Income">Income</option>
                                    <option value="Expense">Expense</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="startdate" className="block text-sm font-medium mb-1">
                                    Start Date
                                </label>
                                <input id={"startdate"} value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" className="w-full border rounded px-3 py-2 cursor-pointer"/>
                            </div>
                            <div>
                                <label htmlFor="enddate" className="block text-sm font-medium mb-1">
                                    End Date
                                </label>
                                <input id={"enddate"} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border rounded px-3 py-2 cursor-pointer"/>
                            </div>
                            <div>
                                <label htmlFor="sortField" className="block text-sm font-medium mb-1">
                                    Sort Field
                                </label>
                                <select value={sortField} id="sortfield" className="w-full border rounded px-3 py-2" onChange={(e) => setSortField(e.target.value)}> {/* Corrigé : "rouunded" -> "rounded" */}
                                    <option value="date">Date</option>
                                    <option value="amount">Amount</option>
                                    <option value="category">Category</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="sortorder" className="block text-sm font-medium mb-1">
                                    Sort Order
                                </label>
                                <select id="sortorder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full border rounded px-3 py-2">
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                            <div className="sm:col-span-1 md:col-span-1 flex items-end">
                                <div className="w-full">
                                    <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                                    <input type="text" id="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder={"Search...."} className="w-full border rounded px-3 py-2"/> {/* Ajouté "rounded" */}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    disabled={isLoading}
                                    className={`ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-700 text-white rounded flex items-center justify-center ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                >
                                    {isLoading ? (
                                        <LoaderCircle size={15} className="animate-spin" />
                                    ) : (
                                        <SearchIcon size={20} />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="card p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold ">
                                Transactions
                            </h2>
                        </div>
                        {transactions.length === 0 && !isLoading && (
                            <p className="text-gray-500 text-center py-8">Select the filters and click search to filter the transactions</p>
                        )}
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center py-8">
                                <LoaderCircle size={24} className="animate-spin mb-2" />
                                <p className="text-gray-500">Loading Transactions....</p>
                            </div>
                        )}
                        {!isLoading && transactions.length > 0 && (
                            <div className="space-y-4">
                                {transactions.map((transaction, index) => (
                                    <TransactionInfoCard
                                        key={transaction.id || index} // Utiliser l'ID si disponible
                                        title={transaction.name}
                                        icon={transaction.icon}
                                        date={moment(transaction.date).format("Do MMMM YYYY")}
                                        amount={transaction.amount}
                                        type={transaction.type || type} // Utiliser le type de la transaction si disponible
                                        hideDeleteBtn={true}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}
export default Filter