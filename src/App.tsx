import React, {useState} from 'react';
import './App.css';
import {
    Button,
    FormControl,
    InputAdornment,
    TextField,
    MenuItem,
    Select,
    Stack,
    Container,
    TableContainer,
    Table,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Box,
    Grid
} from '@mui/material';

enum PERIOD {
    DAILY,
    WEEKLY,
    MONTHLY,
    QUARTERLY,
    ANNUALLY
}

function periodToUnit(p: PERIOD): string {
    let unit
    switch (p) {
        case PERIOD.ANNUALLY:
            unit = "Year";
            break;
        case PERIOD.QUARTERLY:
            unit = "Quarter";
            break;
        case PERIOD.MONTHLY:
            unit = "Month";
            break;
        case PERIOD.WEEKLY:
            unit = "Week";
            break;
        case PERIOD.DAILY:
            unit = "Day";
            break;
        default:
            unit = "Unknown unit"
    }
    return unit
}

function periodToDays(p: PERIOD): number {
    let days
    switch (p) {
        case PERIOD.ANNUALLY:
            days = 365;
            break;
        case PERIOD.QUARTERLY:
            days = 365 / 4;
            break;
        case PERIOD.MONTHLY:
            days = 365 / 12;
            break;
        case PERIOD.WEEKLY:
            days = 7;
            break;
        case PERIOD.DAILY:
            days = 1;
            break;
    }
    return days
}

function calculateResults(
    principal: number,
    interestRate: number, interestRatePeriod: PERIOD,
    contribution: number, contributionPeriod: PERIOD,
    years: number
): [[number], [number]] {
    let interestRateDays = periodToDays(interestRatePeriod)
    let contributionDays = periodToDays(contributionPeriod)
    let convertedRate = Math.pow(1 + interestRate / 100, (contributionDays / interestRateDays))
    console.log(convertedRate)
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

function convertToTable(results: [[number], [number]]): {
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

function ParametersSection({
                               principal, setPrincipal,
                               interestRate, setInterestRate,
                               interestRatePeriod, setInterestRatePeriod,
                               contribution, setContribution,
                               contributionPeriod, setContributionPeriod,
                               yearsCount, setYearsCount,
                               handleCalculate
                           }: {
                               principal: string,
                               setPrincipal: (p: string) => void,
                               interestRate: string,
                               setInterestRate: (rate: string) => void,
                               interestRatePeriod: PERIOD,
                               setInterestRatePeriod: (period: PERIOD) => void,
                               contribution: string,
                               setContribution: (contribution: string) => void,
                               contributionPeriod: PERIOD,
                               setContributionPeriod: (period: PERIOD) => void,
                               yearsCount: string,
                               setYearsCount: (years: string) => void,
                               handleCalculate: (e: any) => void
                           }
) {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={1}
            sx={{padding: 2}}
        >
            <TextField
                label="Initial investment"
                id="principal-input"
                sx={{m: 1, width: '15ch'}}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                variant="filled"
                size="small"
                value={principal}
                onChange={e => setPrincipal(e.target.value)}
            />
            <div>
                <TextField
                    label="Interest rate"
                    id="interest-input"
                    sx={{width: '15ch'}}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    variant="filled"
                    size="small"
                    value={interestRate}
                    onChange={e => setInterestRate(e.target.value)}
                />
                <FormControl sx={{m: 1, width: '12ch'}}>
                    <Select
                        value={interestRatePeriod}
                        onChange={e => setInterestRatePeriod(e.target.value as PERIOD)}
                        size="small"
                    >
                        <MenuItem value={PERIOD.ANNUALLY}>Annually</MenuItem>
                        <MenuItem value={PERIOD.QUARTERLY}>Quarterly</MenuItem>
                        <MenuItem value={PERIOD.MONTHLY}>Monthly</MenuItem>
                        <MenuItem value={PERIOD.WEEKLY}>Weekly</MenuItem>
                        <MenuItem value={PERIOD.DAILY}>Daily</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <TextField
                    label="Periodic Contribution"
                    id="contribution-input"
                    sx={{width: '15ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    variant="filled"
                    size="small"
                    value={contribution}
                    onChange={e => setContribution(e.target.value)}
                />
                <FormControl sx={{m: 1, width: '12ch'}}>
                    <Select
                        value={contributionPeriod}
                        onChange={e => setContributionPeriod(e.target.value as PERIOD)}
                        size="small"
                    >
                        <MenuItem value={PERIOD.ANNUALLY}>Annually</MenuItem>
                        <MenuItem value={PERIOD.QUARTERLY}>Quarterly</MenuItem>
                        <MenuItem value={PERIOD.MONTHLY}>Monthly</MenuItem>
                        <MenuItem value={PERIOD.WEEKLY}>Weekly</MenuItem>
                        <MenuItem value={PERIOD.DAILY}>Daily</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TextField
                label="Number of Years"
                id="years-input"
                sx={{m: 1, width: '15ch'}}
                variant="filled"
                size="small"
                value={yearsCount}
                onChange={e => setYearsCount(e.target.value)}
            />
            <Button variant="contained" size="medium"
                    onClick={handleCalculate}
            >
                Calculate
            </Button>
        </Stack>
    );
}

const formatCurrency = (value: number) => {
    return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};


function ResultsStatisticsView({results}: {
    results: {
        balance: number,
        interest: number,
        cuInterest: number,
        deposits: number,
        totalDeposits: number
    }[]
}) {
    const formatPercentage = (value: number) => {
        return `${value.toFixed(2)}%`;
    };

    const futureInvestmentValue = results[results.length - 1].balance;
    const totalInterestRate = (results[results.length-1].balance/results[results.length-1].totalDeposits - 1)*100

    return (
        <Paper style={{padding: '20px', marginBottom: '20px'}}>
            <Typography variant="h6" gutterBottom>
                Future investment value
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: '#4CAF50'}}>
                {formatCurrency(futureInvestmentValue)}
            </Typography>

            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography variant="subtitle1">Total interest earned</Typography>
                    <Typography variant="h6" style={{color: '#FF5722'}}>
                        {formatCurrency(results[results.length - 1].cuInterest)}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle1">Initial balance</Typography>
                    <Typography variant="h6" style={{color: '#F44336'}}>
                        {formatCurrency(results[0].balance)}
                    </Typography>
                </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" marginTop="20px">
                <Box>
                    <Typography variant="subtitle1">Additional deposits</Typography>
                    <Typography variant="h6">{formatCurrency(results[results.length -1].totalDeposits - results[0].deposits)}</Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle1">Total rate of return</Typography>
                    <Typography variant="h6"  style={{color: '#2196F3'}}>{formatPercentage(totalInterestRate)}</Typography>
                </Box>
            </Box>
        </Paper>
    );
}

function ResultsTableView({contributionPeriod, results}: {
    contributionPeriod: PERIOD,
    results: {
        balance: number,
        interest: number,
        cuInterest: number,
        deposits: number,
        totalDeposits: number
    }[]
}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{periodToUnit(contributionPeriod)}</TableCell>
                        <TableCell align="left">Deposits</TableCell>
                        <TableCell align="left">Interest</TableCell>
                        <TableCell align="left">Total Deposits</TableCell>
                        <TableCell align="left">Cumulative Interest</TableCell>
                        <TableCell align="left">Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((row, index) => (
                        <TableRow
                            key={row.balance}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left">{index}</TableCell>
                            <TableCell align="left">{formatCurrency(row.deposits)}</TableCell>
                            <TableCell align="left">{formatCurrency(row.interest)}</TableCell>
                            <TableCell align="left">{formatCurrency(row.totalDeposits)}</TableCell>
                            <TableCell align="left">{formatCurrency(row.cuInterest)}</TableCell>
                            <TableCell align="left">{formatCurrency(row.balance)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
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

    function handleCalculate(e: any): void {
        let principialInt = parseInt(principal)
        let interestRateInt = parseInt(interestRate)
        let contributionInt = parseInt(contribution)
        let yearsInt = parseInt(yearsCount)
        setResults(convertToTable(calculateResults(
            principialInt,
            interestRateInt,
            interestRatePeriod,
            contributionInt,
            contributionPeriod,
            yearsInt
        )))
    }

    return (
        <div className="App" style={{ paddingTop: '20px' }}>
            <Container>
                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
                        Compound Interest Calculator
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Estimate the future value of your investments with our compound interest calculator.
                        This tool helps you understand how your money can grow over time through the power
                        of compounding. Simply input your principal, interest rate, contribution, and other
                        details to get started.
                    </Typography>
                </Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <ParametersSection
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ResultsStatisticsView results={results} />
                    </Grid>
                </Grid>
                <ResultsTableView contributionPeriod={contributionPeriod} results={results} />
            </Container>
        </div>
    );
}

export default App;
