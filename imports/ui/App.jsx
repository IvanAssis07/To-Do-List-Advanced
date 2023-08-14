import React, { useState, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { MultList } from './Task';
import { Navbar } from './NavBar';
import { Container } from '@mui/material';
import { TasksCollection } from '../db/TasksCollection'

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const tasks = useTracker(() => TasksCollection.find({
    sort: { createdAt: -1 },
    }).fetch());
    
  return (
    <>
      {user ? (
        <Container sx={{mt:10}}>
          <Navbar />
          <MultList />
        </Container>
      ) : (
        <LoginForm />
      )}
    </>
  )
};
