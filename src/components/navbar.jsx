import {Box, Typography, Avatar} from '@mui/material';
function navbar(){
    return(
        <>
          <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
            }}>
            <Typography variant="h4" fontweight="bold">Dashboard</Typography>
            <Typography color="text.secondary">Welcome back, Anjali!</Typography>
            <Avatar sx={{ bgcolor: "#4F46E5" }}>A</Avatar>
            </Box>  
        </>
    )
}

export default navbar;