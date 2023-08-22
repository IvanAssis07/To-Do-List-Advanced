import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Stack,
  TextField,
  Box,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Navbar } from './NavBar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { TasksCollection } from '../db/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';

export const TaskData = () => {
  const adapter = new AdapterDayjs();
  const { taskId } = useParams();

  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    taskStatus: '',
    taskDeadline: '',
    taskCreator: ''
  });

  const [originalData, setOriginalData] = useState({
    taskName: '',
    taskDescription: '',
    taskStatus: '',
    taskDeadline: '',
    taskCreator: ''
  });

  const validTransitions = {
    Cadastrada: ['Cadastrada', 'Em Andamento'],
    'Em Andamento': ['Em Andamento', 'Concluída', 'Cadastrada'],
    Concluída: ['Concluída', 'Cadastrada'],
  };

  const availableStatusOptions = validTransitions[formData.taskStatus];
  
  const handleStatusTransitions = (newStatus) => {
    setFormData({ ...formData, taskStatus: newStatus });
  };

  const handleEditButtonClick = () => {
    setEdit(true);
  };

  const handleCancelButtonClick = () => {
    setFormData({ ...originalData });
    setEdit(false);
  };

  const handleSaveButtonClick = () => {
    try{
      setIsLoading(true);
      Meteor.call('tasks.update', taskId, {
        name: formData.taskName,
        description: formData.taskDescription,
        deadline: formData.taskDeadline.toDate(),
        status: formData.taskStatus
      }, (error) => {
        if (error) {
          window.alert(error.message);
        } else {
          setEdit(false);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useTracker(() => {
    if (!Meteor.user()) {
      return;
    }

    const handler = Meteor.subscribe('taskData', taskId);

    if (handler.ready()) {
      const task = TasksCollection.findOne({ _id: taskId });

      if (task) {
        setFormData({
          taskName: task.name,
          taskDescription: task.description,
          taskDeadline: adapter.date(task.deadline),
          taskStatus: task.status,
          taskCreator: task.userId
        });

        setOriginalData({
          taskName: task.name,
          taskDescription: task.description,
          taskDeadline: task.deadline,
          taskStatus: task.status,
          taskCreator: task.userId
        });
      }

      setIsLoading(false);
    }
  }, [taskId]);

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
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              marginTop: '10%',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box component='form' autoComplete='off'>
            {edit ? (
              <Box paddingX='30%'>
                <TextField
                  autoFocus
                  margin='normal'
                  fullWidth
                  id='name'
                  defaultValue={formData.taskName}
                  label='Name'
                  name='name'
                  disabled={!edit}
                  onChange={(e) =>
                    setFormData({ ...formData, taskName: e.target.value })}
                />
                <TextField
                  margin='normal'
                  fullWidth
                  id='description'
                  defaultValue={formData.taskDescription}
                  label='Description'
                  name='taskDescription'
                  disabled={!edit}
                  onChange={(e) =>
                    setFormData({ ...formData, taskDescription: e.target.value })}
                />
                <TextField
                  margin='normal'
                  fullWidth
                  id='creator'
                  defaultValue={formData.taskCreator}
                  label='Creator'
                  name='creator'
                  disabled={!edit}
                />
                <DatePicker
                  minDate={adapter.date()}
                  fullWidth
                  sx={{ width: '100%', marginBottom: 2, marginTop: 2 }}
                  disabled={!edit}
                  label='Deadline'
                  value={adapter.date(formData.taskDeadline)}
                  onChange={(deadline) =>
                    setFormData({ ...formData, taskDeadline: deadline })}
                />
                <Box>
                  <Select
                    id='status'
                    label='status'
                    onChange={(e) => handleStatusTransitions(e.target.value)}
                    disabled={!edit}
                    value={formData.taskStatus}
                    sx={{ width: '70%', marginRight: '5%' }}
                  >
                    {availableStatusOptions.map((status, index) => (
                      <MenuItem
                        key={index}
                        value={status}
                        disabled={index === 0}
                      >
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    variant='outlined'
                    sx={{ width: '25%', height: '100%' }}
                    onClick={() => handleStatusTransitions(originalData.taskStatus)}
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
                  Name: {originalData.taskName}
                </Typography>
                <Typography marginY={2} variant='subtitle1'>
                  Description: {originalData.taskDescription}
                </Typography>
                <Typography marginY={2} variant='subtitle1'>
                  Creator: {originalData.taskCreator}
                </Typography>
                <Typography marginY={2} variant='subtitle1'>
                  Deadline: {originalData.taskDeadline.toLocaleString()}
                </Typography>
                <Typography marginY={2} variant='subtitle1'>
                  Status: {originalData.taskStatus}
                </Typography>
                <Button variant='contained' onClick={handleEditButtonClick}>
                  Edit
                </Button>
              </>
            )}
          </Box>
        )}
      </Stack>
    </>
  );
};
