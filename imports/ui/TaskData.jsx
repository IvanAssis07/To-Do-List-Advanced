import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../db/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import {
  Stack,
  TextField,
  Box,
  Button,
  Typography,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CircularProgress from '@mui/material/CircularProgress';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Navbar } from './NavBar';

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
    taskCreator: '',
    taskPrivate: '',
  });

  const [originalData, setOriginalData] = useState({
    taskName: '',
    taskDescription: '',
    taskStatus: '',
    taskDeadline: '',
    taskCreator: '',
    taskPrivate: '',
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
          taskCreator: task.userId,
          taskPrivate: task.private,
        });

        setOriginalData({
          taskName: task.name,
          taskDescription: task.description,
          taskDeadline: adapter.date(task.deadline),
          taskStatus: task.status,
          taskCreator: task.userId,
          taskPrivate: task.private,
        });
      }

      setIsLoading(false);
    }
  }, [taskId]);
  
  const handleSaveButtonClick = () => {
    setIsLoading(true);

    Meteor.call(
      'tasks.update',
      taskId,
      {
        name: formData.taskName,
        description: formData.taskDescription,
        deadline: formData.taskDeadline.toDate(),
        status: formData.taskStatus,
        userId: originalData.taskCreator,
        private: formData.taskPrivate,
      },
      (error) => {
        if (error) {
          window.alert(error.message);
        } else {
          setEdit(false);
          setIsLoading(false);
        }
      }
    );
  };


  return (
    <>
      <Navbar />
      <Box>
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
                <Box marginX='10%'>
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
                      setFormData({ ...formData, taskName: e.target.value })
                    }
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
                      setFormData({
                        ...formData,
                        taskDescription: e.target.value,
                      })
                    }
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
                    sx={{ 
                      width: '100%', 
                      marginBottom: 2, 
                      marginTop: 2 
                    }}
                    disabled={!edit}
                    label='Deadline'
                    format='DD/MM/YYYY'
                    value={adapter.date(formData.taskDeadline)}
                    onChange={(deadline) =>
                      setFormData({ ...formData, taskDeadline: deadline })
                    }
                  />
                  <Box>
                    <Select
                      id='status'
                      label='status'
                      onChange={(e) => handleStatusTransitions(e.target.value)}
                      disabled={!edit}
                      value={formData.taskStatus}
                      sx={{
                        width: '70%',
                        marginRight: '5%',
                      }}
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
                      disabled={!edit}
                      sx={{ width: '25%', height: '100%' }}
                      onClick={() =>
                        handleStatusTransitions(originalData.taskStatus)
                      }
                    >
                      Reset Status
                    </Button>

                    <FormGroup
                        sx={{
                          alignItems: 'center',
                          marginTop: 2,
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              disabled={!edit}
                              icon={<LockOpenIcon />}
                              checkedIcon={<LockPersonIcon />}
                              checked={formData.taskPrivate}
                              onChange={() =>
                                setFormData({
                                  ...formData,
                                  taskPrivate: !formData.taskPrivate,
                                })
                              }
                            />
                          }
                          label={formData.taskPrivate ? 'Make your task public.' : 'Make your task private.'}
                        />
                      </FormGroup>
                  </Box>
                  {!edit ? (
                    <Button sx={{marginTop: 2}} variant='contained' onClick={handleEditButtonClick}>
                      Edit
                    </Button>
                  ) : (
                    <>
                      
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
                    </>
                  )}
                </Box>
            </Box>
          )}
        </Stack>
      </Box>
    </>
  );
};
