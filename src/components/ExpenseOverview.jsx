import React, {useEffect, useState} from 'react'
import {prepareIncomeLineChartData} from "../utils/utils.js";
import {Plus} from "lucide-react";
import CustomLineChart from "./CustomLineChart.jsx";

const ExpenseOverview = ({transactions, onAddExpense}) => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return () => {}
    },[transactions]);
    return (
        <div className={"card"}>
            <div className={"flex items-center justify-between"}>
                <div>
                    <h5 className={"text-lg"}>
                        Expense Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings over time and analyze your expense trends
                    </p>
                </div>
                <div>

                    <button className="group btn-primary flex items-center cursor-pointer hover:scale-110" onClick={onAddExpense}>
                        <Plus size={15} className={"text-lg group-hover:animate-spin"}/>Add Expense
                    </button>
                </div>

            </div>
            <div className={"mt-10"}>
                {/* create line chart */}
                <CustomLineChart data={chartData} />

            </div>
        </div>
    )
}
export default ExpenseOverview
