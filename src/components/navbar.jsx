
import {
  Box,
  Typography,
  Avatar,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://localhost:7024/api/Auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profile = response.data.data;

        setUserName(profile?.fullName || "User");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const pageInfo = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Here's your financial summary",
    },
    "/expenses": {
      title: "Expenses",
      subtitle: "Track and manage your expenses",
    },
    "/income": {
      title: "Income",
      subtitle: "Track and manage your income",
    },
    "/budget": {
      title: "Budget",
      subtitle: "Set and track your monthly budget",
    },
    "/reports": {
      title: "Reports",
      subtitle: "Analyze your financial data",
    },
    "/profile": {
      title: "My Profile",
      subtitle: "Manage your account and preferences",
    },
  };

  const currentPage =
    pageInfo[location.pathname] || pageInfo["/dashboard"];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "white",
        px: 3,
        py: 2,
        borderRadius: 3,
        boxShadow: 1,
        mb: 4,
      }}
    >
      {/* Dynamic Page Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          whiteSpace: "nowrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 700,
              color: "#000000",
              lineHeight: 1.2,
            }}
          >
            {currentPage.title}
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              color: "#64748B",
              mt: 0.5,
            }}
          >
            {currentPage.subtitle}
          </Typography>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Welcome */}
        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ fontSize: 11, color: "#64748B" }}>
            Welcome Back
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#1E293B",
            }}
          >
            {userName} 👋
          </Typography>
        </Box>

        {/* Dynamic Avatar */}
        <Avatar
          onClick={() => navigate("/profile")}
          sx={{
            width: 40,
            height: 40,
            bgcolor: "#4F46E5",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </Avatar>
      </Box>
    </Box>
  );
}

export default Navbar;
