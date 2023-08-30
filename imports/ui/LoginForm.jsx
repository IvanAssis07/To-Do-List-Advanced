import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField, Paper, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AlertModal } from "./AlertModal";

export const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(userName, password, (error) => {
      if (error) {
        console.log(error.reason);
        setErrorState(true);
      } else {
        <Link to="/Home" />;
      }
    });
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
        elevation={24}
        sx={{
          padding: 6,
          paddingTop: 5,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h3" marginBottom={2}>
            Login
          </Typography>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={(e) => setUserName(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginY: 2,
            }}
          >
            Login
          </Button>
          <Link component={RouterLink} to="/CreateAccount">
            Don't have an account? Sign up
          </Link>
          {errorState && 
            <AlertModal
              title="Atenção"
              message='Email ou senha incorretos'
              handleConfirmationButton={() => {
                setErrorState(false);
              }}          
            />
          }
        </form>
      </Paper>
    </Box>
  );
};
