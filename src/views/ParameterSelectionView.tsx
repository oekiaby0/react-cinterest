import {PERIOD} from "../utilities";
import {Button, FormControl, InputAdornment, MenuItem, Select, Stack, TextField} from "@mui/material";
import React from "react";

export function ParameterSelectionView({
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
                name="principal-input"
                sx={{m: 1, width: '20ch'}}
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
                    id="interest-rate-input"
                    name="interest-rate-input"
                    sx={{width: '20ch'}}
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
                    name="contribution-input"
                    sx={{width: '20ch'}}
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
                name="years-input"
                sx={{m: 1, width: '20ch'}}
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

export default ParameterSelectionView