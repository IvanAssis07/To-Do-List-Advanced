import { Box, Drawer, Typography, IconButton } from "@mui/material";
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'

export const AppDrawer = () => {
  [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  return (
    <>
      <IconButton 
        size='large' 
        edge='start' 
        color="inherit"
        aria-label="logo"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
        <Drawer anchor="left" 
          open={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)}>
            <Box padding={2} width='300px' textAlign='center' role='presentation'>
              <Typography variant="h6" component='div'>
                Menu
              </Typography>
            </Box>
        </Drawer>
    </>
  )
}