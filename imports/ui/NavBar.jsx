import React from 'react';
import { Meteor } from 'meteor/meteor';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { AppDrawer } from './Drawer';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout();
    
    navigate('/');
  }

  const handleLogoClick = () => {
    navigate('/Home');
  }

  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar>
        <AppDrawer />
        <IconButton 
          size='large' 
          edge='start' 
          color='inherit' 
          aria-label='logo'
          onClick={() => handleLogoClick()}
        >
          <AddTaskIcon />
        </IconButton>
        <Typography 
          variant='h6' 
          component='div'
          sx={{ flexGrow: 1}}>
          To do TasksList
        </Typography>
        <Button color='inherit' variant='outlined' onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}