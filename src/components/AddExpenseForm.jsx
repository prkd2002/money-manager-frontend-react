import React, {useEffect, useState} from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import {Input} from "./Input.jsx";

const AddExpenseForm = ({onAddExpense, categories}) => {
    const [expense, setExpense] = useState({
        name: '',
        amount: '',
        date: '',
        icon: '',
        categoryId: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const categoryOptions = () => categories.map(category => ({
        value: category.id,
        label: category.name,
    }))

    const handleChange = (key, value) => {
        setExpense({...expense, [key]: value});

    }

    const handleAddIncome = async (category) => {
        try {
            setIsLoading(true);
            onAddExpense(category);
        } finally {
            setIsLoading(false);

        }

    }

    useEffect(() => {
        if(categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({...prev,categoryId: categories[0].id}))
        }
    },[categories,expense.categoryId])

    return (
        <div>
            <EmojiPickerPopup icon={expense.icon} onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}/>
            <Input value={expense.name} onChange={({target}) => handleChange('name', target.value)}
                   label={"Expense Source"} placeholder={"e.g., Salary, Freelance, Bonus"} type={"text"}/>
            <Input label={"Category"} value={expense.categoryId}
                   onChange={({target}) => handleChange('categoryId', target.value)} isSelect={true}
                   options={categoryOptions()}/>
            <Input value={expense.amount} onChange={({target}) => handleChange('amount', target.value)} label={"Amount"}
                   placeholder={"e.g.500.00"} type={"number"}/>
            <Input value={expense.date} onChange={({target}) => handleChange("date", target.value)} label={"Date"}
                   type={"date"}/>

            <div className={"flex justify-end mt-6"}>
                <button className={"btn-primary cursor-pointer hover:scale-110"}
                        onClick={() => handleAddIncome(expense)}>
                    {isLoading ? (
                        <>
                            <LoaderCircle size={15} className={"animate-pulse"}/> Adding income...
                        </>
                    ): (
                        "Add New Expense"
                    )}
                </button>
            </div>
        </div>
    )
}
export default AddExpenseForm
