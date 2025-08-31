import {useEffect, useState} from "react";
import {prepareIncomeLineChartData} from "../utils/utils.js";
import CustomLineChart from "./CustomLineChart.jsx";
import {Plus} from "lucide-react";

const IncomeOverview = ({transactions, onAddIncome}) => {
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
                        Income Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings over time and analyze your income trends
                    </p>
                </div>
                <div>

                    <button className="group btn-primary flex items-center cursor-pointer hover:scale-110" onClick={onAddIncome}>
                        <Plus size={15} className={"text-lg group-hover:animate-spin"}/>Add Income
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
export default IncomeOverview
