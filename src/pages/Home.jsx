import Dashboard from "../components/Dashboard.jsx";
import useUser from "../hooks/useUser.jsx";
import InfoCard from "../components/InfoCard.jsx";
import {Coins, WalletCards,Wallet} from "lucide-react";
import {addThousandsSeperator} from "../utils/utils.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosConfig} from "../utils/axiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/apiEndpoints.jsx";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";

const Home = () => {
    useUser();
    const navigate = useNavigate();
    const [dashboadData,setDashboadData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDashboadData = async  () => {
        if(isLoading) return;
        try {
            setIsLoading(true);
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_REQUEST);
            if(response.status === 200) {
                setDashboadData(response.data);
            }

        }catch(error) {
            console.error("Something went wrong while fetching dashboard data:",error);
            toast.error("Something went wrong while fetching dashboard data");
            setIsLoading(false);
        }finally {
            setIsLoading(false);
        }

    }
    useEffect(() => {
        fetchDashboadData();
        return () => [];
    },[])

    return (
        <div >
            <Dashboard activeMenu="Dashboard">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Display Cards */}
                        <InfoCard icon={<WalletCards/>} label="Total Balance" value={addThousandsSeperator(dashboadData?.totalBalance || 0)} color={"bg-purple-800"}/>
                        <InfoCard icon={<Wallet/>} label="Total Income" value={addThousandsSeperator(dashboadData?.totalIncome || 0)} color={"bg-green-800"}/>
                        <InfoCard icon={<Coins/>} label="Total Expense" value={addThousandsSeperator(dashboadData?.totalExpense|| 0)} color={"bg-red-800"}/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        { /* Recent Transactions */}
                        <RecentTransactions transactions={dashboadData?.recentTransactions} onMore={() => navigate("/expense")} />
                        {/* Finance Overview chart */}
                        <FinanceOverview totalBalance={dashboadData?.totalBalance || 0} totalIncome={dashboadData?.totalIncome || 0} totalExpense={dashboadData?.totalExpense || 0}/>
                        {/* Expense Transactipms */}
                        <Transactions transactions={dashboadData?.recent5Expenses || []} title={"Recent Expenses"} onMore={() => navigate("/expense")} type={"Expense"} />
                        {/* Income Transactions */}
                        <Transactions transactions={dashboadData?.recent5Incomes || []} title={"Recent Incomes"} onMore={() => navigate("/income")} type={"Income"} />

                    </div>
                </div>
            </Dashboard>
        </div>
    )
}
export default Home
