
import { useState } from "react";
import {
    Box,
    Card,
    Typography,
    TextField,
    Button,
    CircularProgress
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import axios from "axios";

function ForgotPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Read email and token from reset link
    const emailFromLink = searchParams.get("email");
    const tokenFromLink = searchParams.get("token");

    const isResetMode = Boolean(emailFromLink && tokenFromLink);

    const [email, setEmail] = useState(emailFromLink || "");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Send forgot password request
    const handleForgotPassword = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!email.trim()) {
            setError("Please enter your registered email.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "https://manageexpense.runasp.net/api/auth/forgot-password",
                { email: email.trim() }
            );

            setMessage(response.data.message);
        }
        catch (err) {
            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
        finally {
            setLoading(false);
        }
    };

    // Reset password request
    const handleResetPassword = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (newPassword.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "https://manageexpense.runasp.net/api/auth/reset-password",
                {
                    email: emailFromLink,
                    token: tokenFromLink,
                    newPassword: newPassword
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
        catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to reset password. Please try again."
            );
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #F8FAFC, #EEF2FF)",
                px: 2
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 450,
                    p: { xs: 3, sm: 5 },
                    borderRadius: 4,
                    boxShadow: "0px 20px 50px rgba(0,0,0,0.08)"
                }}
            >
                <Box textAlign="center">
                    {isResetMode ? (
                        <LockResetOutlinedIcon
                            sx={{
                                fontSize: 55,
                                color: "#4F46E5",
                                mb: 2
                            }}
                        />
                    ) : (
                        <EmailOutlinedIcon
                            sx={{
                                fontSize: 55,
                                color: "#4F46E5",
                                mb: 2
                            }}
                        />
                    )}

                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {isResetMode ? "Reset Password" : "Forgot Password?"}
                    </Typography>

                    <Typography color="text.secondary" sx={{ mb: 4 }}>
                        {isResetMode
                            ? "Create a new password for your account."
                            : "Enter your registered email address and we'll help you reset your password."
                        }
                    </Typography>
                </Box>

                {/* Forgot Password Form */}
                {!isResetMode && (
                    <form onSubmit={handleForgotPassword}>
                        <TextField
                            label="Email Address"
                            type="email"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        {message && (
                            <Typography color="success.main" sx={{ mb: 2 }}>
                                {message}
                            </Typography>
                        )}

                        {error && (
                            <Typography color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                bgcolor: "#4F46E5",
                                borderRadius: 2,
                                "&:hover": {
                                    bgcolor: "#4338CA"
                                }
                            }}
                        >
                            {loading
                                ? <CircularProgress size={24} color="inherit" />
                                : "Send Reset Link"
                            }
                        </Button>
                    </form>
                )}

                {/* Reset Password Form */}
                {isResetMode && (
                    <form onSubmit={handleResetPassword}>
                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            label="Confirm New Password"
                            type="password"
                            fullWidth
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        {message && (
                            <Typography color="success.main" sx={{ mb: 2 }}>
                                {message}
                            </Typography>
                        )}

                        {error && (
                            <Typography color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                bgcolor: "#4F46E5",
                                borderRadius: 2,
                                "&:hover": {
                                    bgcolor: "#4338CA"
                                }
                            }}
                        >
                            {loading
                                ? <CircularProgress size={24} color="inherit" />
                                : "Reset Password"
                            }
                        </Button>
                    </form>
                )}

                <Typography textAlign="center" sx={{ mt: 3 }}>
                    <Link
                        to="/"
                        style={{
                            color: "#4F46E5",
                            textDecoration: "none",
                            fontWeight: 600
                        }}
                    >
                        ← Back to Login
                    </Link>
                </Typography>
            </Card>
        </Box>
    );
}

export default ForgotPassword;
