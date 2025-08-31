import React from 'react'
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import {ArrowRight} from "lucide-react";
import moment from "moment";

const RecentTransactions = ({transactions,onMore}) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h4 className="text-lg">
                    Recent Transactions
                </h4>
                <button className="btn-primary cursor-pointer w-30 flex items-center justify-center  " onClick={onMore}>
                    More <ArrowRight className="text-base" size={15} />

                </button>
            </div>
            <div className="mt-6">
                {transactions?.slice(0,5 )?.map((transaction, index) => (
                    <TransactionInfoCard key={index} title={transaction.name} icon={transaction.icon} date={moment(transaction.date).format("Do MM YYYY")} amount={transaction.amount} type={transaction.type} hideDeleteBtn={true} />
                ))}

            </div>
        </div>
    )
}
export default RecentTransactions
