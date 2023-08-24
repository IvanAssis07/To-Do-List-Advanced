import { Box, 
  Drawer, 
  Typography, 
  IconButton, 
  List, 
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton} from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { RouterLink, useNavigate } from 'react-router-dom'; 

export const AppDrawer = () => {
  [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
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
        <Drawer anchor='left' 
          open={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)}>
            <Box padding={2} marginTop={2} width='300px' textAlign='center' role='presentation'>
              <Typography variant='h6' component='div'>
                Menu
              </Typography>
              <List>
                <ListItemButton
                  component={RouterLink} 
                  to='/Profile'
                >
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary='My Profile' />
                  </ListItem>
                </ListItemButton>
                <ListItem>
                  <ListItemButton
                    component={RouterLink} 
                    to='/'
                  >
                    <ListItemIcon>
                      <PlaylistAddCheckIcon />
                    </ListItemIcon>
                    <ListItemText primary='Tasks List' />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
        </Drawer>
    </>
  )
}