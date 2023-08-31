import { Meteor } from 'meteor/meteor';
import React, {useState} from "react";
import { Navigate } from 'react-router-dom';
import { useTracker } from "meteor/react-meteor-data";

export const RequireAuth = ({ children }) => {
  const [user, setUser] = useState(null);

  useTracker(() => {
    const fetchUser = Meteor.user();
    if (fetchUser) {
      setUser(fetchUser);
    } 
  }, [])

  if(!user) {
    return <Navigate to='/' />;
  }

  return children;
};