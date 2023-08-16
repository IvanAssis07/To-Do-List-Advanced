import React, { useState } from "react";
import { Stack, TextField, Box, Button, Typography, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Navbar } from "./NavBar";

export const TaskData = () => {
  const [edit, setEdit] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState("Cadastrada");
  const [taskDeadline, setTaskDeadline] = useState('');

  const validTransitions = {
    "Cadastrada": ["Em Andamento"],
    "Em Andamento": ["Concluída", "Cadastrada"],
    "Concluída": ["Cadastrada"],
  };

  const handleEditButtonClick = () => {
    setEdit(true);
  }

  const handleCancelButtonClick = () => {
    setEdit(false);
  }

  const handleSaveButtonClick = () => {
    setEdit(false);
  }

  const handleStatusTransitions = (newStatus) => {
    if (validTransitions[taskStatus].includes(newStatus)) {
      setTaskStatus(newStatus);
    } else {
      console.log("Invalid status transition");
    }
  };

  const availableStatusOptions = validTransitions[taskStatus];

  return (
    <>
      <Navbar />
      <Stack direction='column' 
        sx={{
          display: 'flex',
          marginTop: '10%',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3">Edit task</Typography>
        <Box 
          component='form'
          autoComplete='off'
        >
          {edit ? (
            <>
              <TextField
                autoFocus
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                disabled={!edit}
                onChange={e => setTaskName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="taskDescription"
                disabled={!edit}
                onChange={e => setTaskDescription(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="creator"
                label="Creator"
                name="creator"
                disabled={!edit}
                onChange={e => setTaskDeadline(e.target.value)}
              />
              <DatePicker
                fullWidth
                sx={{width: '100%', marginBottom: 2, marginTop: 2}}
                disabled={!edit}
                label='Deadline'
                value={taskDeadline}
                onChange={(deadline) => setTaskDeadline(deadline)}
              />
              <Select
                fullWidth
                value={taskStatus}
                onChange={(e) => handleStatusTransitions(e.target.value)}
                disabled={!edit}
              >
                {availableStatusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
              <Box sx={{marginTop: 2}}>
                <Button variant='contained' onClick={handleCancelButtonClick}>Cancel</Button>
                <Button sx={{marginX: 4}} variant='contained' onClick={handleSaveButtonClick}>Save</Button>
              </Box>
            </>
          ) : ( 
            <>
              <Typography marginY={2} variant="subtitle1">Name: ?????</Typography>
              <Typography marginY={2} variant="subtitle1">Description: ?????</Typography>
              <Typography marginY={2} variant="subtitle1">Creator: ??/??/????</Typography>
              <Typography marginY={2} variant="subtitle1">Dealine: ????</Typography>
              <Typography marginY={2} variant="subtitle1">{taskStatus}</Typography>
              <Button variant='contained' onClick={handleEditButtonClick}>Edit</Button>
            </>
          )}
        </Box>
      </Stack>
    </>
  )
}