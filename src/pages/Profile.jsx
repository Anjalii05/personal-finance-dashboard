import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

function Profile() {
  return (
    <Box
      sx={{
        background: "#F5F7FB",
        minHeight: "100vh",
        p: 4,
      }}
    >
      {/* Header */}

      <Card
        sx={{
          mb: 4,
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            fontWeight="bold"
          >
            Profile
          </Typography>

          <Typography color="text.secondary">
            Manage your personal account.
          </Typography>
        </CardContent>
      </Card>

      {/* User Card */}

      <Card
        sx={{
          borderRadius: 4,
          mb: 3,
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                fontSize: 35,
                bgcolor: "#4F46E5",
              }}
            >
              A
            </Avatar>

            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
              >
                Anjali Bisht
              </Typography>

              <Typography color="text.secondary">
                Software Developer
              </Typography>

              <Typography color="text.secondary">
                anjali@gmail.com
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Personal Information */}

      <Card
        sx={{
          borderRadius: 4,
          mb: 3,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            mb={3}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Personal Information
            </Typography>

            <Button
              startIcon={<EditIcon />}
              variant="contained"
              size="small"
            >
              Edit
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography color="text.secondary">
                Full Name
              </Typography>

              <Typography fontWeight="bold">
                Anjali Bisht
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography color="text.secondary">
                Email
              </Typography>

              <Typography fontWeight="bold">
                anjali@gmail.com
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography color="text.secondary">
                Phone
              </Typography>

              <Typography fontWeight="bold">
                +91 9876543210
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography color="text.secondary">
                Gender
              </Typography>

              <Typography fontWeight="bold">
                Female
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography color="text.secondary">
                Date of Birth
              </Typography>

              <Typography fontWeight="bold">
                05 June 2004
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography color="text.secondary">
                Country
              </Typography>

              <Typography fontWeight="bold">
                India
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Security */}

      <Card
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={3}
          >
            Security
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography color="text.secondary">
                Password
              </Typography>

              <Typography fontWeight="bold">
                *************
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                fullWidth
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;