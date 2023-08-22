import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'; 
import {
  Stack,
  TextField,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Navbar } from './NavBar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const CreateTask = () => {
  const navigate = useNavigate();
  const adapter = new AdapterDayjs();
  const { taskId } = useParams();

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState(adapter.date());

  const handleSubmit = e => {
    try {
      e.preventDefault();
  
      Meteor.call('tasks.insert', {
        name: taskName,
        description: taskDescription,
        deadline: taskDeadline.toDate(),
      });
  
      navigate('/');
    } catch (error) {
      window.alert(error.message)
    }
  };

  return (
    <>
      <Navbar />
      <Stack
        direction='column'
        sx={{
          display: 'flex',
          marginTop: '5%',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant='h3'>Create task</Typography>
        <Box component='form' onSubmit={handleSubmit} autoComplete='off' paddingX='30%'>
            <TextField
              autoFocus
              margin='normal'
              required
              fullWidth
              id='name'
              label='Name'
              name='name'
              onChange={(e) => setTaskName(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='description'
              label='Description'
              name='taskDescription'
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <DatePicker
              fullWidth
              sx={{ width: '100%', marginBottom: 2, marginTop: 2 }}
              label='Deadline'
              value={taskDeadline}
              onChange={(deadline) => setTaskDeadline(deadline)}
            />
            <Box sx={{ marginTop: 2 }}>
              <Button variant='contained' component={RouterLink} to='/'>
                Cancel
              </Button>
              <Button
                type='submit'
                sx={{ marginLeft: 4 }}
                variant='contained'
              >
                Save
              </Button>
          </Box>
        </Box>
      </Stack>
    </>
  );
};
