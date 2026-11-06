
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navbar";

import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const API_URL = "https://localhost:7024/api/Auth";
  const token = localStorage.getItem("token");
  const IMAGE_BASE_URL = "https://localhost:7024/";

  const initialProfile = {
    fullName: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
  };

  const initialPassword = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [passwordData, setPasswordData] = useState(initialPassword);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // PROFILE IMAGE STATES
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // FETCH PROFILE
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data.data);
      console.log("Profile API Data:", response.data.data);
console.log("Profile Image:", response.data.data.profileImage);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // HANDLE PROFILE INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE PROFILE
  const handleSave = async () => {
    if (!profile.fullName?.trim() || !profile.email?.trim()) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await axios.put(
        `${API_URL}/updateProfile`,
        {
          fullName: profile.fullName.trim(),
          email: profile.email.trim(),
          phoneNumber: profile.phoneNumber || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message || "Profile updated successfully."
      );

      setIsEditing(false);
      await fetchProfile();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // CANCEL PROFILE EDITING
  const handleCancelEdit = async () => {
    setIsEditing(false);
    setMessage("");
    setError("");
    await fetchProfile();
  };

  // SELECT PROFILE IMAGE
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size cannot exceed 5 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setMessage("");

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // UPLOAD PROFILE IMAGE
  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      setUploadingImage(true);
      setError("");
      setMessage("");

      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post(
        `${API_URL}/uploadProfileImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile((prev) => ({
        ...prev,
        profileImage: response.data.profileImage,
      }));

      setSelectedImage(null);
      setImagePreview("");

      setMessage(
        response.data.message || "Profile picture uploaded successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to upload profile picture."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  // CANCEL IMAGE SELECTION
  const handleCancelImage = () => {
    setSelectedImage(null);
    setImagePreview("");
  };

  // HANDLE PASSWORD INPUTS
  const handlePasswordInput = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // CHANGE PASSWORD
  const handlePasswordChange = async () => {
    setPasswordMessage("");
    setPasswordError("");

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("Please fill all password fields.");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("New password must contain at least 8 characters.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError(
        "New password and confirm password do not match."
      );
      return;
    }

    try {
      setChangingPassword(true);

      const response = await axios.put(
        `${API_URL}/changePassword`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPasswordMessage(
        response.data.message || "Password changed successfully."
      );

      setPasswordData(initialPassword);
    } catch (err) {
      setPasswordError(
        err.response?.data?.message || "Unable to change password."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Navbar />

        <Typography variant="h5" fontWeight="700" mb={3}>
          My Profile
        </Typography>

        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* PROFILE HEADER */}
        <Card
          sx={{
            borderRadius: 3,
            mb: 3,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
              p: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box>
                <Box sx={{ position: "relative", width: 100 }}>
                 <Avatar
  src={
    imagePreview ||
    (profile.profileImage
      ? profile.profileImage.startsWith("http")
        ? profile.profileImage
        : `${IMAGE_BASE_URL}${profile.profileImage}`
      : undefined)
  }
  sx={{
    width: 100,
    height: 100,
    bgcolor: "#4F46E5",
    fontSize: 30,
    fontWeight: 600,
  }}
>
  {profile.fullName?.charAt(0)?.toUpperCase()}
</Avatar>

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "#fff",
                      borderRadius: "50%",
                      p: 0.5,
                      boxShadow: 1,
                    }}
                  >
                    <CameraAltIcon sx={{ fontSize: 18, color: "#4F46E5" }} />
                  </Box>
                </Box>

                <Button
                  component="label"
                  size="small"
                  sx={{
                    mt: 1,
                    textTransform: "none",
                    color: "#4F46E5",
                  }}
                >
                  Change Photo
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    hidden
                    onChange={handleImageSelect}
                  />
                </Button>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="700">
                  {profile.fullName}
                </Typography>

                <Typography color="text.secondary">
                  {profile.email}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#4F46E5", mt: 0.5 }}
                >
                  Personal Account
                </Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => {
                setIsEditing(!isEditing);
                setMessage("");
                setError("");
              }}
              sx={{
                borderColor: "#4F46E5",
                color: "#4F46E5",
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#4338CA",
                  bgcolor: "#EEF2FF",
                },
              }}
            >
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </Button>
          </CardContent>
        </Card>

        {/* IMAGE UPLOAD ACTIONS */}
        {selectedImage && (
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography fontWeight="600">
                Preview selected photo
              </Typography>

              <Button
                variant="contained"
                onClick={handleImageUpload}
                disabled={uploadingImage}
                sx={{
                  bgcolor: "#4F46E5",
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#4338CA" },
                }}
              >
                {uploadingImage ? "Uploading..." : "Upload Photo"}
              </Button>

              <Button
                variant="outlined"
                onClick={handleCancelImage}
                disabled={uploadingImage}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        )}

        {/* PERSONAL INFORMATION */}
        <Card
          sx={{
            borderRadius: 3,
            mb: 3,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="700" mb={3}>
              Personal Information
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr",
                },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={profile.fullName || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={profile.email || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={profile.phoneNumber || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Box>

            {isEditing && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 3,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={saving}
                  sx={{
                    bgcolor: "#4F46E5",
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#4338CA" },
                  }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleCancelEdit}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* ACCOUNT SECURITY */}
        <Card
          sx={{
            borderRadius: 3,
            mb: 3,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
              }}
            >
              <LockIcon sx={{ color: "#4F46E5" }} />

              <Typography variant="h6" fontWeight="700">
                Account Security
              </Typography>
            </Box>

            {passwordMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {passwordMessage}
              </Alert>
            )}

            {passwordError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {passwordError}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Current Password"
              name="currentPassword"
              type="password"
              margin="normal"
              value={passwordData.currentPassword}
              onChange={handlePasswordInput}
            />

            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              margin="normal"
              value={passwordData.newPassword}
              onChange={handlePasswordInput}
            />

            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              margin="normal"
              value={passwordData.confirmPassword}
              onChange={handlePasswordInput}
            />

            <Button
              variant="contained"
              onClick={handlePasswordChange}
              disabled={changingPassword}
              sx={{
                mt: 2,
                bgcolor: "#4F46E5",
                borderRadius: 2,
                textTransform: "none",
                "&:hover": { bgcolor: "#4338CA" },
              }}
            >
              {changingPassword ? "Changing..." : "Change Password"}
            </Button>
          </CardContent>
        </Card>

        <Footer />
      </Box>
    </Box>
  );
}

export default Profile;
