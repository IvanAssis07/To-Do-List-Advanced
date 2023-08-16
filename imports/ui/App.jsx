import React, { useState, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Task } from './Task';
import { Navbar } from './NavBar';
import { Container, Grid, List, Button, Stack, Box } from '@mui/material';
import { TasksCollection } from '../db/TasksCollection';
import AddIcon from '@mui/icons-material/Add';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const tasks = useTracker(() => TasksCollection.find({
    sort: { createdAt: -1 },
    }).fetch());
  
  const tests = [{
    _id: 10,
    name: 'taskName',
    creator: 'user',
    createdAt: new Date(),
  },
  {
    _id: 11,
    name: 'taskName',
    creator: 'user',
    createdAt: new Date(),
  },
  {
    _id: 12,
    name: 'taskName',
    creator: 'user',
    createdAt: new Date(),
  },
  {
    _id: 13,
    name: 'taskName',
    creator: 'user',
    createdAt: new Date(),
  }];

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
              <Button variant="contained" startIcon={<AddIcon />}>
                Create Task
              </Button>
            </Box>
            <Box marginX={'20%'}>
              <List disablePadding>
                {tests.map(test => 
                  <Task 
                  key={test._id}
                  task={test}
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
