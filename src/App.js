import './App.css';
import BudgetInput from "./BudgetInput";
import {useState} from "react";


function App() {
    const [budgetList, setBudgetList] = useState([])
    const [id, setId] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);

    const addBudget = () => {
        setBudgetList([...budgetList, {id: id, purpose: "", price: "", detail: "", isSave: false, initData: {}, isFirst: true}]);
        setId(id+1);
    }

    const handleDelete = (id) => {
        const updateBudgetList = budgetList.filter(budget=> budget.id !== id);
        setBudgetList(updateBudgetList);
    }

    const handleSave = (id, purpose, price, detail) => {
        const saveBudget = budgetList.map((budget) => {
            if (budget.id === id) {
                return {...budget, purpose, price, detail, isSave: true, initData: {purpose, price, detail}, isFirst: false};
            }
            return budget;
        })
        setBudgetList(saveBudget);
    }


    const handleModi = (id) => {
        setActiveIndex(id);
        setBudgetList(budgetList.map((budget) => {
            if (budget.id === id) {
                return {...budget, isSave: false, isFirst: false};
            } else if (!budget.isFirst) {
                handleUndo(budget.id);
                return {...budget,  purpose: budget.initData.purpose, price: budget.initData.price, detail: budget.initData.detail, isSave: true};
            } else {
                return budget
            }
        }));
    };

    const handleUndo = (id) => {
        const undoBudget = budgetList.map((budget)=> {
            if (budget.id === id) {
                return {...budget,  purpose: budget.initData.purpose, price: budget.initData.price, detail: budget.initData.detail, isFirst: false, isSave: true}
            } else {
                return budget
            }
        })
        setBudgetList(undoBudget);
    }

    return(
        <div>
            <button onClick={addBudget}>
                +
            </button>
            <div>
                {budgetList.map((budgetData) => {
                    return (
                        <BudgetInput
                            key={budgetData.id}
                            id={budgetData.id}
                            purpose={budgetData.purpose}
                            price={budgetData.price}
                            detail={budgetData.detail}
                            isSave={budgetData.isSave}
                            isActive={activeIndex === budgetData.id}
                            firstData={budgetData.firstData}
                            onChange={() => setActiveIndex(budgetData.id)}
                            onDelete={() => handleDelete(budgetData.id)}
                            onSave={handleSave}
                            onModi={handleModi}
                            onUndo={handleUndo}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default App;
