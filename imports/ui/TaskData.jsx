import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Stack,
  TextField,
  Box,
  Button,
  Typography,
  MenuItem
} from '@mui/material';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Navbar } from './NavBar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useParams } from 'react-router-dom';
import { TasksCollection } from '../db/TasksCollection';

export const TaskData = () => {
  const adapter = new AdapterDayjs();
  const { taskId }  = useParams();

  const [edit, setEdit] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('Cadastrada');
  const [taskDeadline, setTaskDeadline] = useState(adapter.date());

  const originalStatus = taskStatus;
  const validTransitions = {
    'Cadastrada': ['Cadastrada', 'Em Andamento'],
    'Em Andamento': ['Em Andamento', 'Concluída', 'Cadastrada'],
    'Concluída': ['Concluída', 'Cadastrada'],
  };

  const handleEditButtonClick = () => {
    setEdit(true);
  };

  const handleCancelButtonClick = () => {
    setEdit(false);
  };

  const handleSaveButtonClick = () => {
    setEdit(false);
  };

  const handleStatusTransitions = (newStatus) => {
    setTaskStatus(newStatus);
  };

  const availableStatusOptions = validTransitions[taskStatus];

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
        <Typography variant='h3'>Edit task</Typography>
        <Box component='form' autoComplete='off'>
          {edit ? (
            <Box paddingX='30%'>
              <TextField
                autoFocus
                margin='normal'
                required
                fullWidth
                id='name'
                label='Name'
                name='name'
                disabled={!edit}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='description'
                label='Description'
                name='taskDescription'
                disabled={!edit}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='creator'
                label='Creator'
                name='creator'
                disabled={!edit}
                onChange={(e) => setTaskDeadline(e.target.value)}
              />
              <DatePicker
                fullWidth
                sx={{ width: '100%', marginBottom: 2, marginTop: 2 }}
                disabled={!edit}
                label='Deadline'
                value={taskDeadline}
                onChange={(deadline) => setTaskDeadline(deadline)}
              />
              <Box >
              <Select
                id='status'
                label='status'
                onChange={(e) => handleStatusTransitions(e.target.value)}
                disabled={!edit}
                value={taskStatus}
                sx={{width: '70%',
                  marginRight: '5%',
                }}
              >
                {availableStatusOptions.map((status, index) => (
                  <MenuItem key={index} value={status} disabled={ index === 0 }>
                    {status}
                  </MenuItem>
                ))}
              </Select>
              <Button  
                variant='outlined'
                sx={{width: '25%',
                  height: '100%', 
                }}
                onClick={() => handleStatusTransitions(originalStatus)}
              >
                Reset Status
              </Button>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <Button variant='contained' onClick={handleCancelButtonClick}>
                  Cancel
                </Button>
                <Button
                  sx={{ marginLeft: 4 }}
                  variant='contained'
                  onClick={handleSaveButtonClick}
                >
                  Save
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Typography marginY={2} variant='subtitle1'>
                Name: ????
              </Typography>
              <Typography marginY={2} variant='subtitle1'>
                Description: ????
              </Typography>
              <Typography marginY={2} variant='subtitle1'>
                Creator: ????
              </Typography>
              <Typography marginY={2} variant='subtitle1'>
                Dealine: ????
              </Typography>
              <Typography marginY={2} variant='subtitle1'>
                ????
              </Typography>
              <Button variant='contained' onClick={handleEditButtonClick}>
                Edit
              </Button>
            </>
          )}
        </Box>
      </Stack>
    </>
  );
};
