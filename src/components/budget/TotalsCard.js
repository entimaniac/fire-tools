import React from "react";
import {makeStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    paper: {
        height: 140,
        width: 100,
    },
    container: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    title: {
        fontSize: 14,
    },
}));

const BudgetTable = ({title, amount}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <Typography color="textSecondary">
                    $ {amount ? amount.toLocaleString(undefined, {maximumFractionDigits:2}) : 0}
                </Typography>
            </CardContent>
        </Card>
    );
}
export default BudgetTable;