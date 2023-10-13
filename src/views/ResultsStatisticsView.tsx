import {Box, Paper, Typography} from "@mui/material";
import {formatCurrency, formatPercentage} from "../utilities";

export function ResultsStatisticsView({results}: {
    results: {
        balance: number,
        interest: number,
        cuInterest: number,
        deposits: number,
        totalDeposits: number
    }[]
}) {

    const futureInvestmentValue = results[results.length - 1].balance;
    const totalInterestRate = (results[results.length - 1].balance / results[results.length - 1].totalDeposits - 1) * 100

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
                    <Typography
                        variant="h6">{formatCurrency(results[results.length - 1].totalDeposits - results[0].deposits)}</Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle1">Total rate of return</Typography>
                    <Typography variant="h6"
                                style={{color: '#2196F3'}}>{formatPercentage(totalInterestRate)}</Typography>
                </Box>
            </Box>
        </Paper>
    );
}

export default ResultsStatisticsView
