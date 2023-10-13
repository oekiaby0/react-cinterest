import React, {useState} from 'react';
import './App.css';
import {
    Container,
    Paper,
    Typography,
    Grid
} from '@mui/material';

import ResultsTableView from "./views/ResultsTableView";
import ResultsStatisticsView from "./views/ResultsStatisticsView";
import {PERIOD, periodToDays} from "./utilities"
import ParameterSelectionView from "./views/ParameterSelectionView";

export function calculateResults(
    principal: number,
    interestRate: number, interestRatePeriod: PERIOD,
    contribution: number, contributionPeriod: PERIOD,
    years: number
): [[number], [number]] {
    let interestRateDays = periodToDays(interestRatePeriod)
    let contributionDays = periodToDays(contributionPeriod)
    let convertedRate = Math.pow(1 + interestRate / 100, (contributionDays / interestRateDays))
    let results: [[number], [number]] = [[principal], [principal]]
    for (let n = 1; n < years * 365 / contributionDays + 1; n++) {
        let balance = results[0][n - 1]
        balance *= convertedRate
        balance += contribution
        results[1].push(contribution)
        results[0].push(balance)
    }
    return results
}

export function convertToTable(results: [[number], [number]]): {
    balance: number,
    interest: number,
    cuInterest: number,
    deposits: number,
    totalDeposits: number
}[] {
    let table: {
        balance: number,
        interest: number,
        cuInterest: number,
        deposits: number,
        totalDeposits: number
    }[] = [{balance: results[0][0], interest: 0, cuInterest: 0, deposits: results[1][0], totalDeposits: results[1][0]}]

    for (let i = 1; i < results[0].length; i++) {
        let row = {balance: 0, interest: 0, cuInterest: 0, deposits: 0, totalDeposits: 0}
        row.balance = results[0][i]
        row.deposits = results[1][i]
        row.totalDeposits = row.deposits + table[i - 1].totalDeposits
        row.interest = row.balance - (table[i - 1].balance + row.deposits)
        row.cuInterest = row.interest + table[i - 1].cuInterest;
        table.push(row)
    }

    return table
}

function App() {
    const [principal, setPrincipal] = useState('0')
    const [interestRate, setInterestRate] = useState('0')
    const [interestRatePeriod, setInterestRatePeriod] = useState(PERIOD.ANNUALLY)
    const [contribution, setContribution] = useState('0')
    const [contributionPeriod, setContributionPeriod] = useState(PERIOD.ANNUALLY)
    const [yearsCount, setYearsCount] = useState('0')
    const [results, setResults] = useState([{
        balance: 0, interest: 0, cuInterest: 0, deposits: 0, totalDeposits: 0
    }])

    function handleCalculate(_: any): void {
        let principalInt = parseInt(principal)
        let interestRateInt = parseInt(interestRate)
        let contributionInt = parseInt(contribution)
        let yearsInt = parseInt(yearsCount)
        setResults(convertToTable(calculateResults(
            principalInt,
            interestRateInt,
            interestRatePeriod,
            contributionInt,
            contributionPeriod,
            yearsInt
        )))
    }

    return (
        <div className="App">
            <Container maxWidth="md" className="container">
                <Paper elevation={3} className="paper">
                    <Typography data-testid="calculator-title" variant="h4" gutterBottom className="title">
                        Compound Interest Calculator
                    </Typography>
                    <Typography variant="body1" className="body-text">
                        Estimate the future value of your investments with our compound interest calculator.
                        This tool helps you understand how your money can grow over time through the power
                        of compounding. Simply input your principal, interest rate, contribution, and other
                        details to get started.
                    </Typography>
                </Paper>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} className="parameter-paper">
                            <ParameterSelectionView
                                principal={principal}
                                setPrincipal={setPrincipal}
                                interestRate={interestRate}
                                setInterestRate={setInterestRate}
                                interestRatePeriod={interestRatePeriod}
                                setInterestRatePeriod={setInterestRatePeriod}
                                contribution={contribution}
                                setContribution={setContribution}
                                contributionPeriod={contributionPeriod}
                                setContributionPeriod={setContributionPeriod}
                                yearsCount={yearsCount}
                                setYearsCount={setYearsCount}
                                handleCalculate={handleCalculate}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ResultsStatisticsView results={results}/>
                    </Grid>
                </Grid>
                <Paper elevation={3} className="results-paper">
                    <ResultsTableView contributionPeriod={contributionPeriod} results={results}/>
                </Paper>
            </Container>
        </div>
    );
}

export default App;
