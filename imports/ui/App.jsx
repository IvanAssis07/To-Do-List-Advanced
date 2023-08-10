import React, { useState, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { MultList } from './Task';
import { Navbar } from './NavBar';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  
  return (
    <>
      {user ? (
        <Fragment> 
          <Navbar />
          <MultList />

        </Fragment>
      ) : (
        <LoginForm />
      )}
    </>
  )
};
