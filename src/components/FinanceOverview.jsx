import React from 'react'
import {addThousandsSeperator} from "../utils/utils.js";
import CustomLineChart from "./CustomLineChart.jsx";
import CustomPieChart from "./CustomPieChart.jsx";

const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {
    const COLORS = ["#59168B","#a0090e","#016630"]
    const balanceData = [
        {name: "Total Balance",amount: totalBalance},
        {name: "Total Expense",amount: totalExpense},
        {name: "Total Income",amount: totalIncome},
    ]
    return (
        <div className="card mt-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>
            <CustomPieChart data={balanceData} label={"Total Balance"} totalAmount={`€${addThousandsSeperator(totalBalance)}`} color={COLORS} showTextAnchor/>
        </div>
    )
}
export default FinanceOverview
