import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import BudgetView from "../views/BudgetView.js";
import CompoundInterestView from "../views/CompoundInterestView.js";
import Container from "@material-ui/core/Container";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Container>
                    <Box>
                        {children}
                    </Box>
                </Container>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    contentArea: {
        marginTop: theme.spacing(3)
    },
}));

export default function Tabbed() {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{background: '#D3D3D3'}}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <Container maxWidth={"md"} className={classes.contentArea}>
                <TabPanel value={selectedTab} index={0}>
                    <BudgetView/>
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <CompoundInterestView/>
                </TabPanel>
            </Container>
        </div>
    );
}