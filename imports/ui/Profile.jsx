import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import {
  MenuItem,
  TextField,
  Box,
  Button,
  Typography,
  Stack,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  Container,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Navbar } from "./NavBar";
import { Loading } from "./Loading";

export const Profile = () => {
  const adapter = new AdapterDayjs();

  const [hideButtons, setHideButtons] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    sex: "",
    company: "",
    photo: "",
    password: "",
  });

  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    birthDate: "",
    sex: "",
    company: "",
    photo: "",
    password: "",
  });

  const handleCancelButtonClick = () => {
    setHideButtons(true);
    setFormData({ ...originalData });
  };

  const handlePhotoChange = (file) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64 = e.target.result;
        setFormData({ ...formData, photo: base64 });
      };

      reader.readAsDataURL(file);
    } else {
      setPhotoFile(null);
      setFormData({ ...formData, photo: "" });
    }
  };

  useTracker(() => {
    if (!Meteor.user()) {
      return;
    }

    const handler = Meteor.subscribe("userData");

    if (handler.ready()) {
      const user = Meteor.user();

      if (user) {
        setFormData({
          name: user.profile.name,
          email: user.emails[0].address,
          birthDate: adapter.date(user.profile.birthDate),
          sex: user.profile.sex,
          company: user.profile.company,
          photo: user.profile.photo,
        });

        setOriginalData({
          name: user.profile.name,
          email: user.emails[0].address,
          birthDate: adapter.date(user.profile.birthDate),
          sex: user.profile.sex,
          company: user.profile.company,
          photo: user.profile.photo,
        });
      }

      setIsLoading(false);
    }
  }, []);

  const handleSaveButtonClick = () => {
    setIsLoading(true);

    Meteor.call(
      "users.update",
      Meteor.userId(),
      {
        name: formData.name,
        email: formData.email,
        birthDate: formData.birthDate.toDate(),
        sex: formData.sex,
        company: formData.company,
        photo: formData.photo,
      },
      (error) => {
        if (error) {
          window.alert(error.message);
        } else {
          setHideButtons(true);
          setIsLoading(false);
        }
      }
    );
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <Stack
          direction="column"
          sx={{
            display: "flex",
            marginTop: "2%",
            minHeight: "100vh",
            textAlign: "center",
            marginX: "10%",
          }}
        >
          <Typography variant="h3">My Profile</Typography>
          <Box component="form" autoComplete="off">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                paddingY={2}
              >
                <Avatar
                  alt="Profile pic"
                  src={formData.photo}
                  sx={{
                    width: 150,
                    height: 150,
                    border: "solid",
                    borderColor: "#1976d2",
                  }}
                />
              </Box>
              <Box paddingY={1}>
                <label htmlFor="upload-image">
                  <Button variant="contained" component="span">
                    Change profile photo
                  </Button>
                  <input
                    id="upload-image"
                    required
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      handlePhotoChange(e.target.files[0]);
                      setHideButtons(false);
                    }}
                  />
                </label>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="off"
                value={formData.name || ""}
                autoFocus
                onChange={(e) => {
                  setHideButtons(false);
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
              <DatePicker
                isRequired
                sx={{ width: "100%", marginBottom: 2, marginTop: 2 }}
                label="Birth date"
                format="DD/MM/YYYY"
                value={formData.birthDate}
                onChange={(deadline) => {
                  setHideButtons(false);
                  setFormData({ ...formData, birthDate: deadline });
                }}
              />
              <Box>
                <FormControl fullWidth required margin="normal">
                  <InputLabel id="sex">Sex</InputLabel>
                  <Select
                    labelId="sex"
                    label="Sex"
                    id="sex"
                    value={formData.sex || ""}
                    onChange={(e) => {
                      setHideButtons(false);
                      setFormData({ ...formData, sex: e.target.value });
                    }}
                  >
                    <MenuItem id={"Feminine"} value={"Feminine"}>
                      Feminine
                    </MenuItem>
                    <MenuItem id={"Masculine"} value={"Masculine"}>
                      Masculine
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                name="company"
                label="Company"
                id="company"
                autoComplete="off"
                value={formData.company || ""}
                onChange={(e) => {
                  setHideButtons(false);
                  setFormData({ ...formData, company: e.target.value });
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="off"
                autoFocus
                value={formData.email}
                onChange={(e) => {
                  setHideButtons(false);
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
              {/* <TextField
                margin='normal'
                required
                fullWidth
                id='password'
                label='Password'
                name='password'
                autoComplete='off'
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              /> */}
              {!hideButtons && (
                <Box sx={{ marginTop: 2 }}>
                  <Button variant="contained" onClick={handleCancelButtonClick}>
                    Cancel
                  </Button>
                  <Button
                    sx={{ marginLeft: 4 }}
                    variant="contained"
                    onClick={handleSaveButtonClick}
                  >
                    Edit
                  </Button>
                </Box>
              )}
          </Box>
        </Stack>
      </Container>
    </>
  );
};
