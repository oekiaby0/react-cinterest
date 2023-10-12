import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    TextField,
    MenuItem,
    Select
} from '@mui/material';

enum PERIOD {
    YEARLY,
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

function App() {
    const [interestRatePeriod, setInterestRatePeriod] = useState(PERIOD.YEARLY)
    const [principal, setPrincipal] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [yearsCount, setYearsCount] = useState('')

    return (
        <div className="App">
            <header>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </header>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    label="Initial investment"
                    id="principal-input"
                    sx={{ m: 1, width: '15ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    variant="filled"
                    size="small"
                    value={principal}
                    onChange={e => setPrincipal(e.target.value)}
                />
                <TextField
                    label="Interest rate"
                    id="interest-input"
                    sx={{ m: 1, width: '15ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    variant="filled"
                    size="small"
                    value={interestRate}
                    onChange={e => setInterestRate(e.target.value)}
                />
                <FormControl sx={{ m: 1, width: '12ch' }}>
                    <Select
                        value={interestRatePeriod}
                        onChange={e => setInterestRatePeriod(e.target.value as PERIOD)}
                        size="small"
                    >
                        <MenuItem value={PERIOD.YEARLY}>Yearly</MenuItem>
                        <MenuItem value={PERIOD.QUARTERLY}>Quarterly</MenuItem>
                        <MenuItem value={PERIOD.MONTHLY}>Monthly</MenuItem>
                        <MenuItem value={PERIOD.WEEKLY}>Weekly</MenuItem>
                        <MenuItem value={PERIOD.DAILY}>Daily</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Number of Years"
                    id="years-input"
                    sx={{ m: 1, width: '15ch' }}
                    variant="filled"
                    size="small"
                    value={yearsCount}
                    onChange={e => setYearsCount(e.target.value)}
                />
                <Button>

                </Button>
            </Box>
        </div>
    );
}

export default App;
