import {Card, Grid, Typography,TextField, Button,Box} from '@mui/material';
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import financeImage from "../assets/finance-image.png";


function Register(){
    return (
         <>
                <Grid container sx={{minHeight: "100vh", justifyContent:"center", alignItems:"center" ,backgroundColor:"#f8fafc"}} > 
                   <Grid item xs={12} md={7} sx={{position:"relative", overflow:"hidden"}}>
                               <Box component="img" src={financeImage} sx={{ width: "100%", height: "100vh", objectFit: "cover" }} />
                               <Box
                               sx={{
                                   position: "absolute",
                                   bottom: 40,
                                   left: 40,
                                   bgcolor: "white",
                                   p: 3,
                                   borderRadius: 4,
                                   boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
                                   minWidth: 220,
                               }}
                               >
                               <Typography variant="body2" color="text.secondary">
                                   Total Savings
                               </Typography>
                   
                               <Typography variant="h4" fontWeight="bold">
                                   ₹50,000
                               </Typography>
                   
                               <Typography
                                   sx={{
                                   color: "#10B981",
                                   mt: 1,
                                   fontWeight: 600,
                                   }}
                               >
                                   +12% this month ↗
                               </Typography>
                               </Box>
                               
                   
                               </Grid>
                    <Grid  item xs={12} md={5}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#f5f7fa",
                    pl: 8,
                    pr: 6
                }}>
                <Card sx={{
                        width: 600,
                        p: 4,
                        borderRadius: 5,
                        boxShadow: "0px 20px 50px rgba(0,0,0,0.08)",
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