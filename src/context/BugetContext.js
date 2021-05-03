import React, {createContext, useReducer} from "react";
import _ from "lodash";

export const BudgetContext = createContext();


const calculateTotal = (items) => {
    return items.reduce(function (sum, item) {
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
        }
        return parseInt(sum) + parseInt(item.amount);
    }, 0)
}

const initialItems = [
    {
        id: "10000",
        name: "Cell Phone",
        amount: 360,
        type: 'yearly',
    },
    {
        id: "10001",
        name: "Mortgage",
        amount: 1100,
        type: 'monthly',
    },
    {
        id: "10002",
        name: "Utilities",
        amount: 300,
        type: 'monthly',
    },
    {
        id: "10003",
        name: "Internet",
        amount: 50,
        type: 'monthly',
    },
    {
        id: "10004",
        name: "Vehicle",
        amount: 600,
        type: 'monthly',
    },
    {
        id: "10005",
        name: "Vehicle Insurance",
        amount: 80,
        type: 'monthly',
    },
    {
        id: "10006",
        name: "Groceries",
        amount: 300,
        type: 'monthly',
    },
    {
        id: "10007",
        name: "Eating Out",
        amount: 350,
        type: 'monthly',
    },
    {
        id: "10008",
        name: "Amazon",
        amount: 129,
        type: 'yearly',
    },
]

const initialState = {
    items: initialItems,
    total: calculateTotal(initialItems),
};

const reducer = (state, action) => {
    switch (action.type) {

        case "ADD_ITEM": {
            action.payload.id = _.uniqueId()
            let items = [...state.items, action.payload];
            return {
                ...state,
                total: calculateTotal(items),
                items: items
            };
        }
        case "EDIT_ITEM": {
            const {id, name, amount, type} = action.payload;
            const item = {...state.items.find(c => c.id === id), name, amount, type};
            let items = state.items.map(c => {
                return (c.id !== id) ? c : item;
            })
            return {
                ...state,
                total: calculateTotal(items),
                items: items
            };
        }
        case "REMOVE_ITEM": {
            let items = state.items.filter(
                item => item.id !== action.payload
            )
            return {
                ...state,
                total: calculateTotal(items),
                items: items
            };
        }
        default:
            throw new Error();
    }
};

export const BudgetContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <BudgetContext.Provider value={[state, dispatch]}>
            {props.children}
        </BudgetContext.Provider>
    );
};