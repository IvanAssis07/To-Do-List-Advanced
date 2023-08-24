import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import {
  MenuItem,
  TextField,
  Box,
  Button,
  Typography,
  Paper,
  Select,
  FormControl,
  InputLabel,
  Card
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';

export const CreateAccount = () => {
  const adapter = new AdapterDayjs();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    sex: "",
    company: "",
    photo: "",
    password: "",
  });

  console.log(formData);

  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(formData.birthDate);

    Accounts.createUser({
      email: formData.email,
      password: formData.password,
      profile: {
        name: formData.name,
        sex: formData.sex,
        company: formData.company,
        photo: formData.photo,
        birthDate: formData.birthDate.toDate()
      }
    }, (error) => {
      if(error){
        console.log(error.reason); 
      } else {
        navigate('/'); 
      }
    })
  };

  const handlePhotoChange = (file) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64 = e.target.result;
        setPhotoFile(file);
        setFormData({...formData, photo: base64})
      };

      reader.readAsDataURL(file);
    } else {
      setPhotoFile(null);
      setFormData({...formData, photo: ''})
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      <Paper
        elevation={18}
        sx={{
          padding: 6,
          paddingTop: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography marginBottom={2} variant="h3" component="h1">
            Create your Account
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="off"
            autoFocus
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <DatePicker
            isRequired
            sx={{ width: "100%", marginBottom: 2, marginTop: 2 }}
            label="Birth date"
            format="DD/MM/YYYY"
            value={adapter.date(formData.birthDate)}
            onChange={(deadline) =>
              setFormData({ ...formData, birthDate: deadline })}
          />
          <Box>
            <FormControl fullWidth required margin="normal">
              <InputLabel id="sex">Sex</InputLabel>
              <Select
                labelId="sex"
                label="Sex"
                id="sex"
                value={formData.sex || ''}
                onChange={(e) =>
                  setFormData({ ...formData, sex: e.target.value })
                }
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
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="off"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Card sx={{ paddingY: 2 }}>
            {photoFile && (
              <Box mt={2} marginBottom={2}>
                <img src={formData.photo} alt="Uploaded Image" height="250" />
              </Box>
            )}
            <label htmlFor="upload-image">
              <Button variant="contained" component="span">
                Upload profile photo
              </Button>
              <input
                id="upload-image"
                required
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => handlePhotoChange(e.target.files[0])}
              />
            </label>
          </Card>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 4,
            }}
          >
            Create
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
