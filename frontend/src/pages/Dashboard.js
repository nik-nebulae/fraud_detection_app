import React, { useEffect, useState } from "react";
import { startSimulation, stopSimulation, getTransactions } from "../services/api";

import {
  Button,
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransactions();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data.transactions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStart = async () => {
    await startSimulation();
  };

  const handleStop = async () => {
    await stopSimulation();
  };

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 3 }}>
        Fraud Detection Dashboard
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} sx={{ my: 3 }}>
        <Button variant="contained" color="success" onClick={handleStart}>
          Start Simulation
        </Button>

        <Button variant="contained" color="error" onClick={handleStop}>
          Stop Simulation
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Amount</b></TableCell>
              <TableCell><b>Risk %</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Time</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>₹ {tx.amount.toFixed(2)}</TableCell>

                <TableCell>
                  {(tx.fraud_probability * 100).toFixed(2)}%
                </TableCell>

                <TableCell
                  style={{
                    color: tx.decision === "Fraud" ? "red" : "green",
                    fontWeight: "bold"
                  }}
                >
                  {tx.decision}
                </TableCell>

                <TableCell>{tx.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default Dashboard;