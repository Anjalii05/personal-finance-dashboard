import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 5,
        py: 3,
        px: 2,
        borderTop: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        color: "#64748B",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: 13,
        }}
      >
        © 2026 Finance Tracker. All rights reserved.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
        }}
      >
        <Link
          href="#"
          underline="none"
          sx={{
            fontSize: 13,
            color: "#64748B",
            "&:hover": {
              color: "#4F46E5",
            },
          }}
        >
          Privacy Policy
        </Link>

        <Link
          href="#"
          underline="none"
          sx={{
            fontSize: 13,
            color: "#64748B",
            "&:hover": {
              color: "#4F46E5",
            },
          }}
        >
          Terms
        </Link>

        <Link
          href="#"
          underline="none"
          sx={{
            fontSize: 13,
            color: "#64748B",
            "&:hover": {
              color: "#4F46E5",
            },
          }}
        >
          Help
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;