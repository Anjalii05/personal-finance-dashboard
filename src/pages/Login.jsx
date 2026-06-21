import {Card, Grid, Typography,TextField, Button} from '@mui/material';
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


function Login(){
    return(
        <>
        <Grid container sx={{minHeight: "100vh", justifyContent:"center", alignItems:"center" ,backgroundColor:"#f8fafc"}} > 
            <Grid item xs={12} md={7}
            sx={{
               background: "linear-gradient(135deg, #E3F2FD, #F5F9FF)",
                color: "#1E293B",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
            }} >
                <AccountBalanceWalletIcon sx={{ fontSize: 60, mb: 2, color: "#4F46E5",}}/>
                <Typography variant="h2" fontWeight="bold">Finance Tracker</Typography>
                <Typography variant="h6" sx={{ mt: 2, maxWidth: 500, textAlign: "center" }}>Manage your finances with ease</Typography>
            </Grid>
            <Grid  item xs={12} md={5}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#f5f7fa",
                }}>
                <Card sx={{
                        width: 450,
                        p: 4,
                        borderRadius: 3,
                        boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                    }}>
                 <Typography variant="h4" fontWeight="bold" gutterBottom>Welcome Back!</Typography>
                 <Typography color="text.secondary" sx={{ mb: 3,  }}>Track your expenses and stay on top of your finances.</Typography>
                 <TextField label="Email" fullWidth margin="normal" sx={{"& .MuiOutlinedInput-root": {borderRadius: 2, }, }}/>
                 <TextField label="Password" fullWidth margin="normal" type="password" sx={{"& .MuiOutlinedInput-root": {borderRadius: 2, }, }}/>
                 <Typography variant="body2" color="primary"sx={{ textAlign: "right", mt: 1, cursor: "pointer",}}>Forgot Password?</Typography>
                 <Button variant="contained"  size="large" fullWidth sx={{ mt: 3,  py: 1.5,   bgcolor: "#4F46E5", "&:hover": {bgcolor: "#4338CA",  transform: "translateY(-2px)",},borderRadius: 2, }}>Login</Button>
                 <Typography align="center" sx={{ mt: 3 }}> Don't have an account?{" "}<Link to="/register" style={{ color: "#4F46E5",fontWeight: 600,textDecoration: "none",  }}>Register </Link></Typography>  
                 </Card>
            </Grid>
        </Grid>
        </>
    )
}

export default Login;