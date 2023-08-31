import {
  Box,
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  ListItemButton,
} from '@mui/material';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { RouterLink } from 'react-router-dom';

export const AppDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    photo: '',
    email: ''
  });

  useTracker(() => {
    if (!Meteor.user()) {
      return;
    }

    const handler = Meteor.subscribe('userData');

    if(handler.ready()) {
      const user = Meteor.user();

      setUserData({
        name: user.profile.name,
        email:user.emails[0].address,
        photo: user.profile.photo
      })

      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <IconButton 
        size='large' 
        edge='start' 
        color='inherit'
        aria-label='menu-icon'
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        color='#92a9de'
      >
        <Box
          padding={2}
          marginTop={2}
          width='300px'
          textAlign='center'
          role='presentation'
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            paddingBottom={1}
          >
            <Avatar
              alt='Profile picture'
              src={userData.photo}
              sx={{
                width: 125,
                height: 125,
                border: 'solid',
                borderColor: '#1976d2',
              }}
            />
          </Box>
          <Typography variant='subtitle2' color='#54575b'>
            {userData.name}
          </Typography>
          <Typography variant='subtitle2' color='#54575b' marginBottom={2}>
            {userData.email}
          </Typography>
          <Divider />
          <List>
            <ListItemButton component={RouterLink} to='/Profile'>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='My Profile' />
              </ListItem>
            </ListItemButton>
            <ListItem>
              <ListItemButton component={RouterLink} to='/'>
                <ListItemIcon>
                  <PlaylistAddCheckIcon fontSize='large' />
                </ListItemIcon>
                <ListItemText primary='Tasks List' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>  
  );
};
