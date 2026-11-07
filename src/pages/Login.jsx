import {Card, Grid, Typography,TextField, Button,Box} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import financeImage from "../assets/finance-image.jpg";
import axios from "axios";
import { useState } from "react";


function Login(){

     
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
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
            "https://manageexpense.runasp.net/api/Auth/login",
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
    
       } catch (err) {
    console.error(err);

    setError(
        err.response?.data?.message || "Invalid email or password."
    );
}
        };
    return (
    <Box
        sx={{
            minHeight: "100vh",
            width: "100%",
            background:
                "linear-gradient(135deg, #F8FAFC, #EEF2FF)",
            overflow: "hidden",
        }}
    >
        <Grid
            container
            sx={{
                minHeight: "100vh",
                width: "100%",
                margin: 0,
            }}
        >

            {/* LEFT IMAGE SECTION */}
            <Grid
                item
                xs={12}
                md={7}
                sx={{
                    display: {
                        xs: "none",
                        md: "block",
                    },
                    position: "relative",
                    height: "100vh",
                }}
            >
                <Box
                    component="img"
                    src={financeImage}
                    alt="Finance"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                />

                {/* Savings Card */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 40,
                        left: {
                            md: 25,
                            lg: 40,
                        },
                        right: {
                            md: 25,
                            lg: "auto",
                        },
                        bgcolor: "white",
                        p: {
                            md: 2,
                            lg: 3,
                        },
                        borderRadius: 4,
                        boxShadow:
                            "0px 10px 30px rgba(0,0,0,0.12)",
                        width: {
                            md: "auto",
                            lg: 220,
                        },
                        boxSizing: "border-box",
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Total Savings
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        ₹50,000
                    </Typography>

                    <Typography
                        sx={{
                            color: "#10B981",
                            mt: 1,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                        }}
                    >
                        +12% this month ↗
                    </Typography>
                </Box>
            </Grid>


            {/* RIGHT LOGIN SECTION */}
            <Grid
                item
                xs={12}
                md={5}
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                        lg: 6,
                    },

                    py: {
                        xs: 3,
                        sm: 4,
                        md: 0,
                    },

                    boxSizing: "border-box",
                }}
            >

                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 500,
                        boxSizing: "border-box",

                        p: {
                            xs: 2.5,
                            sm: 3.5,
                            md: 4,
                        },

                        borderRadius: {
                            xs: 3,
                            sm: 4,
                            md: 5,
                        },

                        boxShadow:
                            "0px 20px 50px rgba(0,0,0,0.08)",
                    }}
                >

                    {/* Heading */}
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                            fontSize: {
                                xs: "1.7rem",
                                sm: "2rem",
                                md: "2.125rem",
                            },
                        }}
                    >
                        Welcome Back!
                    </Typography>


                    {/* Description */}
                    <Typography
                        color="text.secondary"
                        sx={{
                            mb: 3,
                            fontSize: {
                                xs: "0.85rem",
                                sm: "1rem",
                            },
                        }}
                    >
                        Track your expenses and stay on top of
                        your finances.
                    </Typography>


                    {/* Email */}
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        fullWidth
                        margin="normal"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                        }}
                    />


                    {/* Password */}
                    <TextField
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        margin="normal"
                        type="password"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                        }}
                    />
                                    {error && (
                    <Typography
                        color="error"
                        sx={{
                            mt: 1,
                            fontSize: "14px"
                        }}
                    >
                        {error}
                    </Typography>
                )}


                    {/* Forgot Password */}
                    {/* Forgot Password */}
                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{
                            textAlign: "right",
                            mt: 1,
                            cursor: "pointer",
                            fontSize: {
                                xs: "0.8rem",
                                sm: "0.875rem",
                            },
                        }}
                    >
                        <Link
                            to="/forgot-password"
                            style={{
                                color: "#1976D2",
                                textDecoration: "none",
                            }}
                        >
                            Forgot Password?
                        </Link>
                    </Typography>


                    {/* Login Button */}
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleLogin}
                        sx={{
                            mt: 3,
                            py: 1.5,
                            bgcolor: "#4F46E5",
                            borderRadius: 2,

                            "&:hover": {
                                bgcolor: "#4338CA",
                                transform: "translateY(-2px)",
                            },
                        }}
                    >
                        Login
                    </Button>


                    {/* Register */}
                    <Typography
                        align="center"
                        sx={{
                            mt: 3,
                            fontSize: {
                                xs: "0.8rem",
                                sm: "0.9rem",
                                md: "1rem",
                            },
                        }}
                    >
                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            style={{
                                color: "#4F46E5",
                                fontWeight: 600,
                                textDecoration: "none",
                            }}
                        >
                            Register
                        </Link>
                    </Typography>

                </Card>

            </Grid>

        </Grid>
    </Box>
);
}

export default Login;