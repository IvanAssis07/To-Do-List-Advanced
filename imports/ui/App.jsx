import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Task } from './Task';
import { Navbar } from './NavBar';
import { List, Button, Stack, Box } from '@mui/material';
import { TasksCollection } from '../db/TasksCollection';
import AddIcon from '@mui/icons-material/Add';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const deleteTask = ({_id}) => {TasksCollection.remove(_id)};

  const tasks = useTracker(() => TasksCollection.find({},
    {
    sort: { createdAt: -1 },
    }).fetch());

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Stack direction='column' 
            sx={{
              display: 'flex',
              minHeight: '100vh',
              textAlign: 'center',
            }}
          >
            <Box>
              <Button variant='contained' startIcon={<AddIcon />}>
                Create Task
              </Button>
            </Box>
            <Box marginX={'20%'} marginTop={2}>
              <List disablePadding>
                {tasks.map(task => 
                  <Task 
                  key={task._id}
                  task={task}
                  onDeleteClick={deleteTask}
                  />
                  )}
              </List>
            </Box>
          </Stack>
        </>
      ) : (
        <LoginForm />
      )}
    </>
  )
};
