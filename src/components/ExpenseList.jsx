import {Download, LoaderCircle, Mail} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment/moment.js";
import React from "react";

const ExpenseList = ({transactions,onDelete, onDownload,onEmail, isLoadingDownload,isLoadingEmail}) => {
    return (
        <div className="card  ">
            <div className="flex items-center justify-between ">
                <h5 className="text-lg font-semibold">
                    Income Sources
                </h5>
                <div className="flex   items-center justify-end gap-2">
                    <button className="card-btn" onClick={onEmail}>
                        {isLoadingEmail && <LoaderCircle size={15} className="animate-spin"/>}
                        <Mail size={15} className="text-base"/>Email
                    </button>
                    <button className="card-btn" onClick={onDownload}>
                        {isLoadingDownload && <LoaderCircle size={15} className=" animate-spin"/>}
                        <Download size={15} className="text-base"/>Download
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gmd:grid-cols-2  ">
                {/* display the incomes */}
                {transactions?.map((transaction, index) => (
                    <TransactionInfoCard key={index} title={transaction.name} icon={transaction.icon} date={moment(transaction.date).format('DD-MM-YYYY')} amount={transaction.amount} type={"Expense"} onDelete={() => onDelete(transaction.id)} />
                ))}

            </div>
        </div>
    )
}
export default ExpenseList
