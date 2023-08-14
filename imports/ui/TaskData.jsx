import React, { useState } from "react";
import { Stack, TextField, Box, Button, Typography, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Navbar } from "./NavBar";

export const TaskData = () => {
  const [edit, setEdit] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');

  return (
    <>
      <Navbar />
      <Stack direction='column' 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Box 
          component='form'
          autoComplete='off'
        >
          <Typography variant="h3">Edit task</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="taskName"
            autoFocus
            onChange={e => setTaskName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="taskDescription"
            onChange={e => setTaskDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="deadline"
            label="Deadline"
            name="taskDeadline"
            onChange={e => setTaskDeadline(e.target.value)}
          />
          {/* <DatePicker
            fullWidth
            label='Deadline'
            renderInput={(params) => <TextField {...params} />}
            value={taskDeadline}
            onChange={(deadline) => setTaskDeadline(deadline)}
          /> */}
          <Box sx={{marginTop: 2}}>
            <Button variant='contained' onClick={() => setEdit}>Edit</Button>
            <Button sx={{marginX: 4}} variant='contained'>Create</Button>
          </Box>
        </Box>
      </Stack>
    </>
  )
}