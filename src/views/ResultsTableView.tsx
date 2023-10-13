import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {formatCurrency, PERIOD, periodToUnit} from "../utilities";

export function ResultsTableView({contributionPeriod, results}: {
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

export default ResultsTableView