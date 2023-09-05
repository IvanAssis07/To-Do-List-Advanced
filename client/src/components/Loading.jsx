import React from 'react';
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';


export const Loading = () => {
  return (
    <Box sx={{ 
      display: 'flex',
      marginTop: '10%',
      justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  )
}