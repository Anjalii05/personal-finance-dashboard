import {Card, Grid, Typography,TextField, Button,Box} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import financeImage from "../assets/finance-image.jpg";
import axios from "axios";
import { useState } from "react";


function Login(){

     
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
    
        const navigate = useNavigate();
        const handleLogin = async () => {
        try {

            if (!email.trim()) {
                alert("Please enter your Email");
                return;
            }
    
            if (!password.trim()) {
                alert("Please enter your Password");
                return;
            }
    
    
            const response = await axios.post(
            "https://localhost:7024/api/Auth/login",
            {
                email,
                password,
            }
            );

            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("userName", response.data.user.fullName);
            setEmail("");
            setPassword("");
    
            navigate("/dashboard");
    
        } catch (error) {
        console.error(error);
    
        alert(
            error.response?.data?.message ||error.message ||"Login Failed");
    }
        };
    return(
        <>
        <Grid container sx={{minHeight: "100vh", justifyContent:"center", alignItems:"center" ,background:
            "linear-gradient(135deg, #F8FAFC, #EEF2FF)"}} > 
            
            <Grid item xs={12} md={7} sx={{position:"relative", overflow:"hidden",minHeight: { xs: 300, md: "100vh" },}}>
            <Box component="img" src={financeImage} sx={{ width: "100%", height: { xs: 300, md: "100vh" }, objectFit: "cover" }} />
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
                    px: { xs: 2, md: 6 },
                    py: 4
                }}>
                <Card sx={{
                        width: "100%",
                        maxWidth: 500, 
                        p: 4,
                        borderRadius: 5,
                        boxShadow: "0px 20px 50px rgba(0,0,0,0.08)",
                    }}>
                 <Typography variant="h4" fontWeight="bold" gutterBottom>Welcome Back!</Typography>
                 <Typography color="text.secondary" sx={{ mb: 3,  }}>Track your expenses and stay on top of your finances.</Typography>
                 <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}fullWidth margin="normal"  sx={{"& .MuiOutlinedInput-root": {borderRadius: 2, }, }}/>
                 <TextField label="Password" fullWidth  value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" type="password" sx={{"& .MuiOutlinedInput-root": {borderRadius: 2, }, }}/>
                 <Typography variant="body2" color="primary"sx={{ textAlign: "right", mt: 1, cursor: "pointer",}}>Forgot Password?</Typography>
                 <Button variant="contained"  size="large" fullWidth onClick={handleLogin} sx={{ mt: 3,  py: 1.5,   bgcolor: "#4F46E5", "&:hover": {bgcolor: "#4338CA",  transform: "translateY(-2px)",},borderRadius: 2, }}>Login</Button>
                 <Typography align="center" sx={{ mt: 3 }}> Don't have an account?{" "}<Link to="/register" style={{ color: "#4F46E5",fontWeight: 600,textDecoration: "none",  }}>Register </Link></Typography>  
                 </Card>
            </Grid>
        </Grid>
        </>
    )
}

export default Login;