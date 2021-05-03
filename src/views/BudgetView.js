import React from "react";
import BudgetTable from "../components/budget/BudgetTable.js";
import {BudgetContextProvider} from "../context/BugetContext";
import BudgetTotals from "../components/budget/BudgetTotals.js";

export default function BudgetView() {
    return (
        <BudgetContextProvider>
            <BudgetTable/>
            <br/>
            <BudgetTotals/>
        </BudgetContextProvider>
    );
}