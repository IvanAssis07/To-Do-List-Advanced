import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Task } from './Task';
import { Navbar } from './NavBar';
import { List, Button, Stack, Box } from '@mui/material';
import { TasksCollection } from '../db/TasksCollection';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { Link as RouterLink } from 'react-router-dom'; 

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const { tasks, isLoading } = useTracker(() => {
    const noTasksAvailable = { tasks: [] };

    if (!Meteor.user()) {
      return noTasksAvailable;
    }

    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noTasksAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    return { tasks };
  });

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Stack
            direction='column'
            sx={{
              display: 'flex',
              minHeight: '100vh',
              textAlign: 'center',
            }}
          >
            <Box>
              <RouterLink to='/CreateTask' >
                <Button variant='contained' startIcon={<AddIcon />}>
                  Create Task
                </Button>
              </RouterLink>
            </Box>

            {isLoading && (
              <Box sx={{ 
                display: 'flex',
                marginTop: '10%',
                justifyContent: 'center'
                }}
              >
                <CircularProgress />
              </Box>
            )}

            <Box marginX={'20%'} marginTop={2}>
              <List disablePadding>
                {tasks.map((task) => (
                  <Task key={task._id} task={task}/>
                ))}
              </List>
            </Box>
          </Stack>
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
};
