import React, {useEffect, useState} from 'react';
import './App.css';
import {
    Button,
    FormControl,
    InputAdornment,
    TextField,
    MenuItem,
    Select, Stack, Container, TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';

enum PERIOD {
    ANNUALLY,
    QUARTERLY,
    MONTHLY,
    WEEKLY,
    DAILY
}

function periodToUnit(p: PERIOD) {
    let unit
    switch (p) {
        case PERIOD.ANNUALLY: unit = "Year"; break;
        case PERIOD.QUARTERLY: unit = "Quarter"; break;
        case PERIOD.MONTHLY: unit = "Month"; break;
        case PERIOD.WEEKLY: unit = "Week"; break;
        case PERIOD.DAILY: unit = "Day"; break;
        default: unit="Unknown unit"
    }
    return unit
}

function periodToDays(p: PERIOD) {
    let days
    switch (p) {
        case PERIOD.ANNUALLY: days = 365; break;
        case PERIOD.QUARTERLY: days = 365/4; break;
        case PERIOD.MONTHLY: days = 365/12; break;
        case PERIOD.WEEKLY: days = 7; break;
        case PERIOD.DAILY: days = 1; break;
    }
    return days
}

function calculateResults(
    principal: number,
    interestRate: number, interestRatePeriod: PERIOD,
    contribution: number, contributionPeriod: PERIOD,
    years: number, compoundPeriod: PERIOD
): [[number], [number]] {
    let interestRateDays = periodToDays(interestRatePeriod)
    let compoundPeriodDays = periodToDays(compoundPeriod)
    let contributionDays = periodToDays(contributionPeriod)
    let smallestPeriodDays = Math.min(compoundPeriodDays, contributionDays)
    let convertedRate = Math.pow(1 + interestRate/100, smallestPeriodDays/interestRateDays)
    let compoundSmaller = compoundPeriodDays < contributionDays
    let lastC = 0
    let results: [[number], [number]] = [[0], [0]]
    for (let n= 1; n < years * 365/smallestPeriodDays + 1; n++) {
        let balance = results[0][n-1]
        if (compoundPeriod === contributionPeriod) {
            balance += contribution
            balance *= convertedRate
        } else if (compoundSmaller) {
            balance += contribution
            results[1].push(contribution)
            if (n * smallestPeriodDays > lastC + compoundPeriodDays) {
                lastC = n * smallestPeriodDays
                balance *= convertedRate
            }
        } else {
            if (n * smallestPeriodDays > lastC + contributionDays) {
                lastC = n * smallestPeriodDays
                balance += contribution
                results[1].push(contribution)
            } else {
                results[1].push(0)
            }
            balance *= convertedRate
        }
        results[0].push(balance)
    }
    return [[0], [0]]
}

function convertToTable(results: [[number], [number]]): [{
    balance: number,
    interest: number,
    cuInterest: number,
    deposits: number,
    totalDeposits: number
}] {

    return [{balance: 0, interest: 0, cuInterest: 0, deposits: 0, totalDeposits: 0}]
}

function ParametersSection({
                               principal, setPrincipal,
                               interestRate, setInterestRate,
                               interestRatePeriod, setInterestRatePeriod,
                               contribution, setContribution,
                               contributionPeriod, setContributionPeriod,
                               yearsCount, setYearsCount,
                               compoundPeriod, setCompoundPeriod,
                               handleCalculate
                           }: {
                               principal: string, setPrincipal: (p: string) => void,
                               interestRate: string, setInterestRate: (rate: string) => void,
                               interestRatePeriod: PERIOD, setInterestRatePeriod: (period: PERIOD) => void,
                               contribution: string, setContribution: (contribution: string) => void,
                               contributionPeriod: PERIOD, setContributionPeriod: (period: PERIOD) => void,
                               yearsCount: string, setYearsCount: (years: string) => void,
                               compoundPeriod: PERIOD, setCompoundPeriod: (period: PERIOD) => void
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
            <div>
                <TextField
                    label="Number of Years"
                    id="years-input"
                    sx={{width: '15ch'}}
                    variant="filled"
                    size="small"
                    value={yearsCount}
                    onChange={e => setYearsCount(e.target.value)}
                />
                <FormControl sx={{m: 1, width: '12ch'}}>
                    <Select
                        value={compoundPeriod}
                        onChange={e => setCompoundPeriod(e.target.value as PERIOD)}
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
            <Button variant="contained" size="medium"
                    onClick={handleCalculate}
            >
                Calculate
            </Button>
        </Stack>
    );
}

function ResultsView({compoundPeriod, results}: {
    compoundPeriod: PERIOD,
    results: [[number], [number]]
}) {
    const [rows, setRows] = useState([{
        balance: 0, interest: 0, cuInterest: 0, deposits: 0, totalDeposits: 0
    }])

    useEffect(() => {
        setRows(convertToTable(results))
    }, [results])

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{periodToUnit(compoundPeriod)}</TableCell>
                        <TableCell align="left">Deposits</TableCell>
                        <TableCell align="left">Interest</TableCell>
                        <TableCell align="left">Total Deposits</TableCell>
                        <TableCell align="left">Cumulative Interest</TableCell>
                        <TableCell align="left">Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={row.balance}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left">{index}</TableCell>
                            <TableCell align="left">{row.deposits}</TableCell>
                            <TableCell align="left">{row.interest}</TableCell>
                            <TableCell align="left">{row.totalDeposits}</TableCell>
                            <TableCell align="left">{row.cuInterest}</TableCell>
                            <TableCell align="left">{row.balance}</TableCell>
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
    const [compoundPeriod, setCompoundPeriod] = useState(PERIOD.ANNUALLY)
    const [results, setResults] = useState([[0], [0]])

    function handleCalculate(e: any): void {

    }

    return <div className="App">
        <Container>
            <Stack>
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
                    compoundPeriod={compoundPeriod}
                    setCompoundPeriod={setCompoundPeriod}
                    handleCalculate={handleCalculate}
                />
                <ResultsView compoundPeriod={compoundPeriod} results={results as [[number], [number]]}/>
            </Stack>
        </Container>
    </div>
}

export default App;
