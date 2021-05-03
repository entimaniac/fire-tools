import React, {useContext} from "react";
import {BudgetContext} from "../../context/BugetContext.js";
import Grid from "@material-ui/core/Grid";
import TotalsCard from "./TotalsCard.js";


export default function BudgetTotals() {
    // Subscribe to `budget` state and access dispatch function
    const [state] = useContext(BudgetContext);


    const getAnnualTotal = () => {
        return state.items.reduce(function (sum, item) {
            let amount = parseInt(item.amount);
            switch (item.type) {
                case 'daily':
                    return parseInt(sum) + amount * 365;
                case 'weekly':
                    return parseInt(sum) + amount * 52;
                case 'monthly':
                    return parseInt(sum) + amount * 12;
                case 'annually':
                    return parseInt(sum) + amount;
                default:
                    console.log("bad frequency type: ", item.type);
            }
            return parseInt(sum) + parseInt(item.amount);
        }, 0)
    }

    const getDailyTotal = () => {
        return getAnnualTotal() / 365
    };

    const getWeeklyTotal = () => {
        return getAnnualTotal() / 52
    };

    const getMonthlyTotal = () => {
        return getAnnualTotal() / 12
    };

    const getLean3 = () => {
        return getAnnualTotal() / .03;
    };

    const getLean4 = () => {
        return getAnnualTotal() / .04;
    };

    const getLean5 = () => {
        return getAnnualTotal() / .05;
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs>
                    <TotalsCard title={"Daily Total"} amount={getDailyTotal()}/>
                </Grid>
                <Grid item xs>
                    <TotalsCard title={"Weekly Total"} amount={getWeeklyTotal()}/>
                </Grid>
                <Grid item xs>
                    <TotalsCard title={"Monthly Total"} amount={getMonthlyTotal()}/>
                </Grid>
                <Grid item xs>
                    <TotalsCard title={"Annual Total"} amount={getAnnualTotal()}/>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <TotalsCard title={"Lean FIRE @ 3% SWR"} amount={getLean3()}/>
                </Grid>
                <Grid item xs={4}>
                    <TotalsCard title={"Lean FIRE @ 4% SWR"} amount={getLean4()}/>
                </Grid>
                <Grid item xs={4}>
                    <TotalsCard title={"Lean FIRE @ 5% SWR"} amount={getLean5()}/>
                </Grid>
            </Grid>
        </>

    );
}