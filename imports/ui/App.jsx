import React, { useState, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();
  
  return (
    <div className='app'>
      <div className='main'>
        {user ? (
          <Fragment> 
            <div className="user">
              <button onClick={logout}>
                logout
              </button>
            </div>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )
};
