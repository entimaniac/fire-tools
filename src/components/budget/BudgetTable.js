import React, {useContext} from "react";
import {BudgetContext} from "../../context/BugetContext.js";
import MaterialTable from "material-table";

export default function BudgetTable() {
    const [state, dispatch] = useContext(BudgetContext);

    const addItem = (data) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: "ADD_ITEM",
                payload: {name: data.name, amount: data.amount, type: data.type}
            });
            resolve();
        })
    };

    const editItem = (newData) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: "EDIT_ITEM",
                payload: newData
            });
            resolve();
        })
    };

    const removeItem = id => {
        dispatch({
            type: "REMOVE_ITEM",
            payload: id
        });
    };

    return (
        <>
            <MaterialTable
                title="Basic Export Preview"
                columns={[
                    {title: 'Name', field: 'name'},
                    {title: 'Amount', field: 'amount', type: 'numeric'},
                    {
                        title: 'Frequency Type',
                        field: 'type',
                        lookup: {'daily': 'daily', 'weekly': 'weekly', 'monthly': 'monthly', 'yearly': 'yearly'},
                    },
                ]}
                data={state.items}
                options={{
                    showTitle: false,
                    search: false,
                    paging: false,
                    // toolbar: false,
                }}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Remove Item',
                        onClick: (event, rowData) => removeItem(rowData.id)
                    }
                ]}
                editable={{
                    onRowUpdate: (newData, oldData) => editItem(newData),
                    onRowAdd: (newData) => addItem(newData),
                }}
            />
        </>
    );
}