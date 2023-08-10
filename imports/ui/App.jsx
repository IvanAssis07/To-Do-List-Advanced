import React, { useState, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { ToDosList } from './ ToDosList';
import Container from '@mui/material/Container';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();
  
  return (
    <Container maxWidth='sm'>
            {user ? (
              <Fragment> 
                  <button onClick={logout}>
                    logout
                  </button>

                  <ToDosList />

              </Fragment>
            ) : (
              <LoginForm />
            )}
    </Container>
  )
};
