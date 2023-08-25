import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField, Paper, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(userName, password);
  }

  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        fontWeight: 'bold',
    }}>
      <Paper 
        elevation={24} 
        sx={{
          padding: 6,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant='h4' component='h1' paddingBottom={1}>
              Login
          </Typography>
          <Box>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='off'
              autoFocus
              onChange={e => setUserName(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='off'
              onChange={e => setPassword(e.target.value)}
            />
          </Box>
          <Button 
              type='submit'
              variant='contained'
              fullWidth
              sx = {{
                marginY: 2,
              }}
          >
            Login
          </Button>
            <Link component={RouterLink} to='/CreateAccount'>
              Don't have an account? Sign up
            </Link>
        </form>
      </Paper>
    </Box>
  );
};