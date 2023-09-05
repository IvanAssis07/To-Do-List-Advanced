import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import {
  Stack,
  TextField,
  Box,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Navbar } from '../components/NavBar';
import { MessageModal } from '../components/MessageModal';

export const CreateTask = () => {
  const navigate = useNavigate();
  const adapter = new AdapterDayjs();

  const [successMsg, setSuccessMsg] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    taskDeadline: adapter.date(),
    taskPrivate: false
  })

  const handleSubmit = e => {
      e.preventDefault();

      const user = Meteor.user();

      if (user) {
        Meteor.call('tasks.insert', {
          name: formData.taskName,
          description: formData.taskDescription,
          deadline: formData.taskDeadline.toDate(),
          private: formData.taskPrivate,
          creatorName: user.profile.name,
        }, (error) => {
          if (error) {
            setErrorState(true);
          } else {
            setSuccessMsg(true);
          }
        });
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
              onChange={(e) => 
                setFormData({...formData, taskName: e.target.value})
              }
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='description'
              label='Description'
              name='taskDescription'
              onChange={(e) => 
                setFormData({...formData, taskDescription: e.target.value})
              }
            />
            <DatePicker
              minDate={adapter.date()}
              require
              format='DD/MM/YYYY'
              fullWidth
              sx={{ width: '100%', marginBottom: 2, marginTop: 2 }}
              label='Deadline'
              value={formData.taskDeadline}
              onChange={(deadline) =>
                setFormData({ ...formData, taskDeadline: deadline })
              }
            />
            <FormGroup
              sx={{
                alignItems: 'center', 
              }}
            > 
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<LockOpenIcon />}
                    checkedIcon={<LockPersonIcon />}
                    checked={formData.taskPrivate}
                    onChange={() => 
                      setFormData({ ...formData, taskPrivate: !formData.taskPrivate})
                    }
                  />
                }
                label={formData.taskPrivate ? 'Make your task public.' : 'Make your task private.'}
              />
            </FormGroup>
            <Box sx={{ marginTop: 2 }}>
              <Button variant='contained' component={RouterLink} to='/TasksList'>
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
      {errorState && 
        <MessageModal
          title='Atenção'
          message='Houve um erro na criação da tarefa, tente novamente.'
          hasCancelButton={false}
          handleConfirmationButton={() => {
            setErrorState(false);
          }}          
        />
      }
      {successMsg &&
        <MessageModal
          title='Parabéns'
          message='Tarefa criada com sucesso.'
          hasCancelButton={false}
          handleConfirmationButton={() => {
            navigate('/TasksList');
          }}          
        />
      }
    </>
  );
};
