import React, {useEffect, useState} from 'react'
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import {Input} from "./Input.jsx";


const AddIncomeForm = ({onAddIncome, categories}) => {
    const [income, setIncome] = useState({
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
        setIncome({...income, [key]: value});

    }

    const handleAddIncome = async (category) => {
        try {
            setIsLoading(true);
            onAddIncome(category);
        } finally {
            setIsLoading(false);

        }

    }

    useEffect(() => {
        if(categories.length > 0 && !income.categoryId) {
           setIncome((prev) => ({...prev,categoryId: categories[0].id}))
        }
    },[categories,income.categoryId])

    return (
        <div>
            <EmojiPickerPopup icon={income.icon} onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}/>
            <Input value={income.name} onChange={({target}) => handleChange('name', target.value)}
                   label={"Income Source"} placeholder={"e.g., Salary, Freelance, Bonus"} type={"text"}/>
            <Input label={"Category"} value={income.categoryId}
                   onChange={({target}) => handleChange('categoryId', target.value)} isSelect={true}
                   options={categoryOptions()}/>
            <Input value={income.amount} onChange={({target}) => handleChange('amount', target.value)} label={"Amount"}
                   placeholder={"e.g.500.00"} type={"number"}/>
            <Input value={income.date} onChange={({target}) => handleChange("date", target.value)} label={"Date"}
                   type={"date"}/>

            <div className={"flex justify-end mt-6"}>
                <button className={"btn-primary cursor-pointer hover:scale-110"}
                        onClick={() => handleAddIncome(income)}>
                    {isLoading ? (
                        <>
                        <LoaderCircle size={15} className={"animate-pulse"}/> Adding income...
                        </>
                    ): (
                        "Add New Income"
                    )}
                </button>
            </div>
        </div>
    )
}
export default AddIncomeForm
