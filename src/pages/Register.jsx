import {Card,Grid,Typography,TextField,Button,Box,Dialog,DialogContent} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import axios from "axios";
import { useState } from "react";
import financeImage from "../assets/finance-image.jpg";


function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const [openAlertPopup, setOpenAlertPopup] = useState(false);
    const [alertTitle, setAlertTitle] = useState("Something went wrong");
    const [alertMessage, setAlertMessage] = useState("");
    //const [openDuplicatePopup, setOpenDuplicatePopup] = useState(false);

    const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setOpenAlertPopup(true);
    };
   const handleRegister = async () => {
    try {

        if (!fullName.trim()) {
            showAlert("Required Field", "Please enter your Full Name.");
            return;
        }

        if (!email.trim()) {
            showAlert("Required Field", "Please enter your Email.");
            return;
        }

        if (!password.trim()) {
            showAlert("Required Field", "Please enter your Password.");
            return;
        }

        if (!confirmPassword.trim()) {
            showAlert("Required Field", "Please confirm your Password.");
            return;
        }

        if (password !== confirmPassword) {
            showAlert(
                "Password Mismatch",
                "Password and Confirm Password do not match."
            );
            return;
        }

        const response = await axios.post(
            "https://manageexpense.runasp.net/api/Auth/register",
            {
                full_name: fullName,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
        );

        // Registration successful
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate("/");

    } catch (error) {

        console.error(error);

        const message =
            error.response?.data?.message ||
            error.response?.data?.Message ||
            error.response?.data?.error ||
            error.response?.data?.Error ||
            error.message ||
            "Registration failed. Please try again.";

        // Dynamic API error popup
        showAlert(
            "Registration Failed",
            message
        );
    }
};


    return (

        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                backgroundColor: "#f5f7fa",
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

                {/* IMAGE SECTION */}

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


                {/* REGISTER SECTION */}

                <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

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
                            },

                            boxShadow:
                                "0px 20px 50px rgba(0,0,0,0.08)",
                        }}
                    >

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
                            Create Account
                        </Typography>


                        <Typography
                            color="text.secondary"
                            sx={{
                                mb: 2,
                                fontSize: {
                                    xs: "0.85rem",
                                    sm: "1rem",
                                },
                            }}
                        >
                            Join Finance Tracker and start managing
                            your finances.
                        </Typography>


                        <TextField
                            label="Full Name"
                            fullWidth
                            margin="dense"
                            required
                            value={fullName}
                            onChange={(e) =>
                                setFullName(e.target.value)
                            }
                        />


                        <TextField
                            label="Email"
                            fullWidth
                            margin="dense"
                            required
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />


                        <TextField
                            label="Password"
                            fullWidth
                            margin="dense"
                            type="password"
                            required
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />


                        <TextField
                            label="Confirm Password"
                            fullWidth
                            margin="dense"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />


                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleRegister}
                            size="large"
                            sx={{
                                mt: 2,
                                py: 1.5,
                                borderRadius: 2,
                                bgcolor: "#4F46E5",

                                "&:hover": {
                                    bgcolor: "#4338CA",
                                },
                            }}
                        >
                            Register
                        </Button>


                        <Typography
                            align="center"
                            sx={{
                                mt: 2,
                                fontSize: {
                                    xs: "0.8rem",
                                    sm: "0.9rem",
                                    md: "1rem",
                                },
                            }}
                        >
                            Already have an account?{" "}

                            <Link
                                to="/"
                                style={{
                                    color: "#4F46E5",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                }}
                            >
                                Login
                            </Link>

                        </Typography>

                    </Card>

                </Grid>

            </Grid>


            {/* ================================================= */}
            {/* DUPLICATE EMAIL POPUP */}
            {/* ================================================= */}

            <Dialog
                open={openAlertPopup}
                onClose={() => setOpenDuplicatePopup(false)}
                PaperProps={{
                    sx: {
                        width: "420px",
                        maxWidth: "92%",
                        borderRadius: "20px",
                        padding: "8px",
                        boxShadow:
                            "0px 20px 60px rgba(0,0,0,0.20)",
                    },
                }}
            >

                <DialogContent
                    sx={{
                        textAlign: "center",
                        px: {
                            xs: 3,
                            sm: 4,
                        },
                        py: 4,
                    }}
                >

                    {/* Warning Icon */}

                    <Box
                        sx={{
                            width: 70,
                            height: 70,
                            borderRadius: "50%",
                            backgroundColor: "#FFF4E5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 20px",
                        }}
                    >

                        <WarningAmberRoundedIcon
                            sx={{
                                fontSize: 38,
                                color: "#ED6C02",
                            }}
                        />

                    </Box>


                    <Typography
                        sx={{
                            color: "#6B7280",
                            fontSize: "15px",
                            lineHeight: 1.6,
                            mb: 3,
                            whiteSpace: "pre-line",
                            wordBreak: "break-word",
                        }}
                    >
                        {alertMessage}
                    </Typography>


                    {/* Button */}

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() =>
                            setOpenAlertPopup(false)
                        }
                        sx={{
                            backgroundColor: "#4F46E5",
                            borderRadius: "10px",
                            textTransform: "none",
                            fontSize: "16px",
                            fontWeight: 600,
                            py: 1.3,

                            "&:hover": {
                                backgroundColor: "#4338CA",
                            },
                        }}
                    >
                        Okay, Got It
                    </Button>

                </DialogContent>

            </Dialog>

        </Box>
    );
}


export default Register;