import React from "react";
import { Meteor } from 'meteor/meteor';
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { AppDrawer } from "./Drawer";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const logout = () => Meteor.logout();

    navigate('/');
  }

  return (
    <AppBar position="fixed" sx={{ mb: 10 }}>
      <Toolbar>
        <AppDrawer />
        <IconButton 
          size="large" 
          edge='start' 
          color="inherit" 
          aria-label="menu"
        >
          <AddTaskIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          component='div'
          sx={{ flexGrow: 1}}>
          To do App
        </Typography>
        <Button color="inherit" variant="outlined" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}