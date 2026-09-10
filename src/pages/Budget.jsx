import {
  Box, Card, Typography, Button, Grid, LinearProgress, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, IconButton, Select, MenuItem, Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircle";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function Budget() {
  const budget = 50000, spent = 32000, remaining = budget - spent;
  const percentage = Math.round((spent / budget) * 100);

  const categories = [
    { category: "Food", budget: 8000, spent: 6500 },
    { category: "Transport", budget: 5000, spent: 3200 },
    { category: "Shopping", budget: 7000, spent: 7500 },
    { category: "Bills", budget: 10000, spent: 9200 }
  ];

  const status = (b, s) => {
    const p = (s / b) * 100;
    return p > 100 ? ["Over Budget", "error"] : p >= 90 ? ["Almost Used", "warning"] : ["On Track", "success"];
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#F5F7FB", minHeight: "100vh" }}>

      {/* Header */}
      <Card sx={{ p: 4, mb: 3, borderRadius: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
          <Box>
            <Typography variant="h3" fontWeight="700">Budget</Typography>
            <Typography color="text.secondary">Plan your spending and stay on track.</Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Select size="small" defaultValue="September 2026" sx={{ minWidth: 170, bgcolor: "#fff" }}>
              <MenuItem value="September 2026">September 2026</MenuItem>
              <MenuItem value="August 2026">August 2026</MenuItem>
              <MenuItem value="July 2026">July 2026</MenuItem>
            </Select>
            <Button variant="contained" startIcon={<AddIcon />} component={Link} to="/set-budget"
              sx={{ borderRadius: 2.5, textTransform: "none" }}>
              Set Budget
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Summary */}
      <Grid container spacing={3}>
        {[
          ["Monthly Budget", budget, AccountBalanceWalletOutlinedIcon, "#EEF2FF", "#4F46E5"],
          ["Amount Spent", spent, TrendingUpIcon, "#FFF1F2", "#EF4444"],
          ["Remaining", remaining, SavingsOutlinedIcon, "#ECFDF5", "#10B981"]
        ].map(([title, value, Icon, bg, color]) => (
          <Grid item xs={12} sm={6} md={4} key={title}>
            <Card sx={{ p: 3, borderRadius: 4, height: "100%" }}>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary">{title}</Typography>
                  <Typography variant="h4" fontWeight="700" sx={{ mt: 1 }}
                    color={title === "Remaining" ? "success.main" : "inherit"}>
                    ₹{value.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">September 2026</Typography>
                </Box>
                <Box sx={{ width: 48, height: 48, borderRadius: "50%", bgcolor: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon sx={{ color }} />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Progress + Health */}
      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: 4, height: "100%" }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Box>
                <Typography variant="h6" fontWeight="700">Budget Progress</Typography>
                <Typography variant="body2" color="text.secondary">Your spending for September 2026</Typography>
              </Box>
              <Typography fontWeight="700">{percentage}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={percentage}
              sx={{ height: 12, borderRadius: 10 }} />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="body2">Spent ₹{spent.toLocaleString()}</Typography>
              <Typography variant="body2">Budget ₹{budget.toLocaleString()}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 4, height: "100%" }}>
            <Typography variant="h6" fontWeight="700" mb={2}>Budget Health</Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <CheckCircleOutlineIcon sx={{ fontSize: 42, color: "success.main" }} />
              <Box>
                <Typography fontWeight="700">You're on track</Typography>
                <Typography variant="body2" color="text.secondary">
                  ₹{remaining.toLocaleString()} remaining this month.
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Alerts */}
      <Card sx={{ mt: 3, p: 3, borderRadius: 4 }}>
        <Typography variant="h6" fontWeight="700">Budget Alerts</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Categories that need your attention
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#FFF1F2", display: "flex", gap: 2 }}>
             <Typography color="error.main" fontSize={22}>!</Typography>             
 <Box>
                <Typography fontWeight="700" color="error.main">Shopping budget exceeded</Typography>
                <Typography variant="body2">You spent ₹7,500 against a ₹7,000 budget.</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#FFF7ED", display: "flex", gap: 2 }}>
<Typography color="warning.main" fontSize={22}>!</Typography>              <Box>
                <Typography fontWeight="700" color="warning.main">Bills budget almost used</Typography>
                <Typography variant="body2">You've used 92% of your Bills budget.</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Category Table */}
      <Card sx={{ mt: 3, borderRadius: 4, overflow: "hidden" }}>
        <Box p={3} display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" fontWeight="700">Category Budgets</Typography>
            <Typography variant="body2" color="text.secondary">
              Track spending limits by category
            </Typography>
          </Box>
          <Button variant="outlined" startIcon={<AddIcon />} component={Link} to="/set-budget"
            sx={{ textTransform: "none" }}>
            Add Category
          </Button>
        </Box>

        <Divider />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                {["Category", "Budget", "Spent", "Remaining", "Usage", "Status", "Actions"].map(h =>
                  <TableCell key={h}><b>{h}</b></TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {categories.map(item => {
                const remain = item.budget - item.spent;
                const used = Math.round((item.spent / item.budget) * 100);
                const [label, color] = status(item.budget, item.spent);

                return (
                  <TableRow key={item.category} hover>
                    <TableCell><b>{item.category}</b></TableCell>
                    <TableCell>₹{item.budget.toLocaleString()}</TableCell>
                    <TableCell>₹{item.spent.toLocaleString()}</TableCell>
                    <TableCell>
                      <Typography fontWeight="600" color={remain < 0 ? "error.main" : "success.main"}>
                        ₹{remain.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      <Typography variant="caption">{used}%</Typography>
                      <LinearProgress variant="determinate" value={Math.min(used, 100)}
                        color={used > 100 ? "error" : used >= 90 ? "warning" : "primary"}
                        sx={{ height: 7, borderRadius: 5 }} />
                    </TableCell>
                    <TableCell><Chip label={label} color={color} size="small" /></TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary"><EditIcon fontSize="small" /></IconButton>
                      <IconButton size="small" color="error"><DeleteOutlineIcon fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default Budget;