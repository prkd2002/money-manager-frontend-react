import React from 'react'
import {ArrowRightIcon} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const Transactions = ({transactions,onMore,type,title}) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className={"text-lg"}>
                    {title}
                </h5>
                <button className={"flex btn-primary cursor-pointer items-center"}>
                    More <ArrowRightIcon className="text-base" size={15} />
                </button>

            </div>
            <div className="mt-6">
                {transactions?.slice(0,5)?.map(item => (
                    <TransactionInfoCard key={item.id} title={item.name} icon={item.icon} date={moment(item.date).format("Do MM YYYY")} amount={item.amount} type={type} hideDeleteBtn={true} />
                ))}
            </div>
        </div>
    )
}
export default Transactions
