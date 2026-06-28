import { Box, Typography, Avatar } from "@mui/material";

function Navbar() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "white",
        p: 3,
        borderRadius: 3,
        boxShadow: 1,
        mb: 4,
      }}
    >
      {/* Left Section */}
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#1E293B" }}>Dashboard</Typography>
        <Typography variant="body1"sx={{color: "#64748B",mt: 0.5,}}>Manage your finances smarter 💰</Typography>
       </Box>

      {/* Right Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body2"sx={{ color: "#64748B" }}>Welcome Back</Typography>
          <Typography fontWeight="bold">Anjali 👋</Typography>
        </Box>

        <Avatar sx={{bgcolor: "#4F46E5",width: 50,height: 50,fontWeight: "bold",}}>A</Avatar>
      </Box>
    </Box>
  );
}

export default Navbar;