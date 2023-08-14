import React from "react";
import { Meteor } from 'meteor/meteor';
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { AppDrawer } from "./Drawer";

export const Navbar = () => {
  const logout = () => Meteor.logout();

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
        <Button color="inherit" variant="outlined" onClick={() => logout()}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}