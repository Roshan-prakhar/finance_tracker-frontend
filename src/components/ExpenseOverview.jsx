import { useEffect, useState } from "react";
import {Plus} from "lucide-react";
import CustomLineChart from "./CustomLineChart.jsx";
import {prepareIncomeLineChartData} from "../util/util.js";

const ExpenseOverview = ({transactions, onExpenseIncome}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-semibold text-gray-900">Expense Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track spending trends and gain insights into where your money goes.
                    </p>
                </div>

                <button className="add-btn" onClick={onExpenseIncome}>
                    <Plus size={16} />
                    Add Expense
                </button>
            </div>

            <div className="mt-8">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    );
};

export default ExpenseOverview;
