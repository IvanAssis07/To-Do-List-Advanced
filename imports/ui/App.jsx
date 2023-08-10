import React, { useState, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { ToDosList } from './ToDosList';
import Container from '@mui/material/Container';
import { AppDrawer } from './Drawer';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();
  
  return (
    <Container>
      {user ? (
        <Fragment> 
          <button onClick={logout}>
            logout
          </button>

          <ToDosList />
          <AppDrawer />

        </Fragment>
      ) : (
        <LoginForm />
      )}
    </Container>
  )
};
