import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";

function Reports() {
  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
      }}
    >
      {/* Header */}
      <Card
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: 2,
          mb: 4,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <AssessmentIcon
            sx={{
              fontSize: 40,
              color: "#4F46E5",
            }}
          />

          <Box>
            <Typography variant="h4" fontWeight="bold">
              Reports
            </Typography>

            <Typography color="text.secondary">
              Analyze your income and expenses with detailed reports.
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* Filters */}
      <Card
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={3}
        >
          Filter Reports
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              label="From Date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              label="To Date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                height: "56px",
                bgcolor: "#4F46E5",
              }}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography color="text.secondary">
                Total Income
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color="success.main"
              >
                ₹0
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography color="text.secondary">
                Total Expense
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color="error.main"
              >
                ₹0
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography color="text.secondary">
                Net Savings
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                ₹0
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography color="text.secondary">
                Transactions
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 350,
              borderRadius: 4,
              p: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Income vs Expense
            </Typography>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="85%"
            >
              <Typography color="text.secondary">
                Chart will appear here
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: 350,
              borderRadius: 4,
              p: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Expense Categories
            </Typography>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="85%"
            >
              <Typography color="text.secondary">
                Pie Chart will appear here
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Export Buttons */}
      <Box
        mt={4}
        display="flex"
        gap={2}
      >
        <Button
          variant="contained"
          startIcon={<PictureAsPdfIcon />}
          color="error"
        >
          Export PDF
        </Button>

        <Button
          variant="contained"
          startIcon={<TableChartIcon />}
          color="success"
        >
          Export Excel
        </Button>
      </Box>
    </Box>
  );
}

export default Reports;