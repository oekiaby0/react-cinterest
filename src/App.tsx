import React, {useState} from 'react';
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

function calculateTotal(principal: number, contribution: number, interest: number, n: number): number {
    let total = principal
    for (let x = 0; x < n; x++) {
        total = (total + contribution) * interest
    }
    return total
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
                               principal: string, setPrincipal: (p: string) => void,
                               interestRate: string, setInterestRate: (rate: string) => void,
                               interestRatePeriod: PERIOD, setInterestRatePeriod: (period: PERIOD) => void,
                               contribution: string, setContribution: (contribution: string) => void,
                               contributionPeriod: PERIOD, setContributionPeriod: (period: PERIOD) => void,
                               yearsCount: string, setYearsCount: (years: string) => void,
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

function ResultsView({results}: { results: [[number], [number]] }) {
    let rows: [{ balance: number, interest: number, cuInterest: number, deposits: number, totalDeposits: number }] = [
        {balance: 0, interest: 0, cuInterest: 0, deposits: 0, totalDeposits: 0}
    ]
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
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
    const [principal, setPrincipal] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [interestRatePeriod, setInterestRatePeriod] = useState(PERIOD.ANNUALLY)
    const [contribution, setContribution] = useState('')
    const [contributionPeriod, setContributionPeriod] = useState(PERIOD.ANNUALLY)
    const [yearsCount, setYearsCount] = useState('')
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
                    handleCalculate={handleCalculate}
                />
                <ResultsView results={results as [[number], [number]]}/>
            </Stack>
        </Container>
    </div>
}

export default App;
