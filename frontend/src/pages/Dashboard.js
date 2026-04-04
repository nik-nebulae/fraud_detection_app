import React, { useEffect, useState } from "react";
import { startSimulation, stopSimulation, getTransactions } from "../services/api";
import { Grid, Card, CardContent } from "@mui/material";

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

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransactions();
    }, 2000); // faster updates
  
    return () => clearInterval(interval);
  }, []);

  const fetchTransactions = async () => {
    const res = await getTransactions();
  
    const newIds = res.data.transactions.map(t => t.id);
    setPrevIds(newIds);
  
    setTransactions(res.data.transactions);
  };

  const handleStart = async () => {
    await startSimulation();
  };

  const handleStop = async () => {
    await stopSimulation();
  };
  const total = transactions.length;
  const fraud = transactions.filter(t => t.decision === "Fraud").length;
  const safe = total - fraud;
  const fraudRate = total ? ((fraud / total) * 100).toFixed(2) : 0; 

  const chartData = transactions.length
  ? transactions.slice(0, 10).map((tx, index) => ({
      name: index + 1,
      value: tx.amount
    }))
  : [];

const pieData = [
  { name: "Fraud", value: fraud || 0 },
  { name: "Safe", value: safe || 0 }
];

const [prevIds, setPrevIds] = useState([]);

  return (
    <Container
  sx={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b, #020617)",
    paddingTop: 3,
    paddingBottom: 3,
    animation: "fadeIn 0.8s ease"
  }}
>
      <Typography variant="h4" align="center" sx={{ mt: 3 }}>
        Fraud Detection Dashboard
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} sx={{ my: 3 }}>
      <Button
  variant="contained"
  onClick={handleStart}
  sx={{
    background: "linear-gradient(45deg, #4caf50, #81c784)",
    boxShadow: "0 4px 15px rgba(76,175,80,0.4)",
    "&:hover": {
      boxShadow: "0 6px 20px rgba(76,175,80,0.7)"
    }
  }}
>
  Start Simulation
</Button>

<Button
  variant="contained"
  onClick={handleStop}
  sx={{
    background: "linear-gradient(45deg, #f44336, #e57373)",
    boxShadow: "0 4px 15px rgba(244,67,54,0.4)",
    "&:hover": {
      boxShadow: "0 6px 20px rgba(244,67,54,0.7)"
    }
  }}
>
  Stop Simulation
</Button>
      </Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>

  <Grid item xs={12} md={3}>
  <Card
  sx={{
    borderRadius: 3,
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.5)"
    }
  }}
>
      <CardContent>
        <Typography variant="subtitle2">Total Transactions</Typography>
        <Typography variant="h5">{total}</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={3}>
  <Card
  sx={{
    borderRadius: 3,
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.5)"
    }
  }}
>
      <CardContent>
        <Typography variant="subtitle2">Fraud Transactions</Typography>
        <Typography variant="h5" color="error">{fraud}</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={3}>
  <Card
  sx={{
    borderRadius: 3,
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.5)"
    }
  }}
>
      <CardContent>
        <Typography variant="subtitle2">Safe Transactions</Typography>
        <Typography variant="h5" color="success.main">{safe}</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={3}>
  <Card
  sx={{
    borderRadius: 3,
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.5)"
    }
  }}
>
      <CardContent>
        <Typography variant="subtitle2">Fraud Rate</Typography>
        <Typography variant="h5">{fraudRate}%</Typography>
      </CardContent>
    </Card>
  </Grid>

</Grid>

<Grid container spacing={3} sx={{ mb: 3 }}>

{/* Line Chart */}
<ResponsiveContainer width="100%" height={250}>
  <LineChart data={chartData}>
    <XAxis dataKey="name" stroke="#888" />
    <YAxis stroke="#888" />
    <Tooltip />

    <Line
      type="monotone"
      dataKey="value"
      stroke="#4caf50"
      strokeWidth={3}
      dot={false}
      style={{
        filter: "drop-shadow(0 0 6px rgba(76,175,80,0.7))"
      }}
    />
  </LineChart>
</ResponsiveContainer>

{/* Pie Chart */}
<ResponsiveContainer width="100%" height={250}>
  <PieChart>
    <Pie
      label
      data={pieData}
      dataKey="value"
      nameKey="name"
      outerRadius={90}
      innerRadius={50}
      paddingAngle={3}
    >
      <Cell fill="#f44336" />
      <Cell fill="#4caf50" />
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>

</Grid>

<Paper
  sx={{
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: 3
  }}
>
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
    <TableRow
      key={tx.id}
      hover
      sx={{
        backgroundColor:
          tx.decision === "Fraud"
            ? "rgba(244,67,54,0.08)"
            : "rgba(76,175,80,0.08)",
        animation: !prevIds.includes(tx.id)
          ? "fadeIn 0.5s ease"
          : "none"
      }}
    >
      {/* Amount */}
      <TableCell>₹ {tx.amount.toFixed(2)}</TableCell>

      {/* Risk bar */}
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 80,
              height: 6,
              backgroundColor: "#ddd",
              borderRadius: 5,
              overflow: "hidden"
            }}
          >
            <Box
              sx={{
                width: `${(tx.fraud_probability * 100).toFixed(0)}%`,
                height: "100%",
                backgroundColor:
                  tx.decision === "Fraud" ? "#f44336" : "#4caf50"
              }}
            />
          </Box>

          <Typography variant="body2">
            {(tx.fraud_probability * 100).toFixed(1)}%
          </Typography>
        </Box>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Box
          sx={{
            display: "inline-block",
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontSize: "12px",
            fontWeight: "bold",
            color: "white",
            backgroundColor:
              tx.decision === "Fraud" ? "#f44336" : "#4caf50"
          }}
        >
          {tx.decision}
        </Box>
      </TableCell>

      {/* Time */}
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