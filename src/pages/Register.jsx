import {Card, Grid, Typography,TextField, Button} from '@mui/material';
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";


function Register(){
    return (
         <>
                <Grid container sx={{minHeight: "100vh", justifyContent:"center", alignItems:"center" ,backgroundColor:"#f8fafc"}} > 
                    <Grid item xs={12} md={5}
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
                        <Typography variant="h3" fontWeight="bold">Finance Tracker</Typography>
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
                                p: 2,
                                borderRadius: 3,
                                boxShadow: 4,
                            }}>
                         <Typography variant="h4" fontWeight="bold" gutterBottom>Create Account</Typography>
                         <Typography color="text.secondary" sx={{ mb: 2 }}>Join Finance Tracker and start managing your finances.</Typography>
                         <TextField label="Full Name" fullWidth margin="dense"/>
                         <TextField label="Email" fullWidth margin="dense"/>
                         <TextField label="Password" fullWidth margin="dense" type="password"/>
                         <TextField label="Confirm Password" fullWidth margin="dense" type="password"/>
                         <Button variant="contained" color="primary" size="large" fullWidth sx={{ mt: 2,  py: 1.5,  borderRadius: 2,bgcolor: "#4F46E5", "&:hover": { bgcolor: "#4338CA", }, }}>Register</Button>
                         <Typography align="center" sx={{ mt: 2 }}> Already have an account?{" "}  <Link to="/" style={{ color: "#4F46E5",fontWeight: 600,textDecoration: "none",  }}>Login </Link></Typography>  
                         </Card>
                    </Grid>
                </Grid>
                </>
    )
}

export default Register;