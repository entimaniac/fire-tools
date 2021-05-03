import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";

const marks = [
    {
        value: 4,
        label: '4%',
    },
    {
        value: 7,
        label: '7%',
    },
    {
        value: 14,
        label: '14%',
    },
];

export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState(65000);
    const [time, setTime] = useState(30);
    const [rate, setRate] = useState(10);
    const [interval, setInterval] = useState(1);
    const [compoundedAmount, setCompoundedAmount] = useState(0);
    useEffect(() => {
        calculateInterest()
    }, [principal, time, rate, interval]);

    const calculateInterest = () => {
        let decimalRate = rate * .01
        let amount = principal * (Math.pow((1 + (decimalRate / interval)), (interval * time)));
        setCompoundedAmount(amount.toLocaleString(undefined, {maximumFractionDigits: 2}));
    };

    const handleRateSliderChange = (event, newValue) => {
        setRate(newValue);
    };

    const handleRateBlur = () => {
        let numberRate = Number(rate)
        if (rate < 0) {
            setRate(0);
        } else if (rate > 100) {
            setRate(100);
        }
    };

    const handleRateChange = (event) => {
        let value = Number(event.target.value)
        if (value) {
            setRate(value);
        } else {
            setRate('');
        }
    };

    // noinspection JSCheckFunctionSignatures
    return (
        <>
            <br/>
            Compound Interest Calculator:
            <form noValidate autoComplete="off">
                <Grid container spacing={3}>

                    <Grid item xs={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField variant="outlined" label={"principal"} value={principal}
                                           onChange={(e) => setPrincipal(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label={"time"} value={time} onChange={(e) => setTime(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom>
                                    Investment growth rate
                                </Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={8}>
                                        <Slider
                                            step={0.25}
                                            min={4}
                                            max={14}
                                            valueLabelDisplay="auto"
                                            value={rate ? rate : 0}
                                            marks={marks}
                                            onChange={handleRateSliderChange}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            variant="outlined"
                                            label={"Growth"}
                                            value={rate}
                                            onBlur={handleRateBlur}
                                            onChange={handleRateChange}
                                        />
                                    </Grid>
                                </Grid>


                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Interval</FormLabel>
                                    <RadioGroup value={interval} onChange={(e) => setInterval(e.target.value)}>
                                        <FormControlLabel value={"1"} control={<Radio/>} label="Annual"/>
                                        <FormControlLabel value={"12"} control={<Radio/>} label="Monthly"/>
                                        <FormControlLabel value={"365"} control={<Radio/>} label="Daily"/>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                result is:

                                {compoundedAmount}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}/>

                </Grid>
            </form>
        </>
    );
}

/*
A = P (1 + r/n) ^ n*t

Here's what these variables mean:

A is the sum you'll end up with
P is your principal contribution
R is your annual interest rate, written in decimal format
N is the number of compounding periods per year (for example, interest that compounds annually would be 1)
T is the number of years that your money compounds*/
