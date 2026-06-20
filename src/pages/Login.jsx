import {Card, Grid, Typography,TextField, Button} from '@mui/material';
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";


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
                        width: 420,
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 4,
                    }}>
                 <Typography variant="h4" fontWeight="bold" gutterbottom>Welcome Back!</Typography>
                 <Typography color="text.secondary" sx={{ mb: 3 }}>Sign in to continue</Typography>
                 <TextField label="Email" fullWidth margin="normal"/>
                 <TextField label="Password" fullWidth margin="normal" type="password"/>
                 <Typography variant="body2" color="primary"sx={{ textAlign: "right", mt: 1, cursor: "pointer",}}>Forgot Password?</Typography>
                 <Button variant="contained"  size="large" fullWidth sx={{ mt: 3,  py: 1.5,   bgcolor: "#4F46E5", "&:hover": {bgcolor: "#4338CA", },borderRadius: 2, }}>Login</Button>
                 <Typography align="center" sx={{ mt: 3 }}> Don't have an account?{" "}<Link to="/register" style={{ color: "#4F46E5",fontWeight: 600,textDecoration: "none",  }}>Register </Link></Typography>  
                 </Card>
            </Grid>
        </Grid>
        </>
    )
}

export default Login;