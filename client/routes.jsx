import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { TasksList } from '/imports/ui/TasksList';
import { TaskData } from '../imports/ui/TaskData';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CreateTask } from '../imports/ui/CreateTask';
import { CreateAccount } from '../imports/ui/CreateAccount';
import { Profile } from '../imports/ui/Profile';
import { Home } from '../imports/ui/Home';
import { Login } from '../imports/ui/Login';

Meteor.startup(() => {
  const root = createRoot(document.getElementById('react-target'));

  root.render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/TaskData/:taskId' element={<TaskData />} />
          <Route path='/TasksList' element={<TasksList />}  />
          <Route path='/CreateTask' element={<CreateTask />} />
          <Route path='/CreateAccount' element={<CreateAccount />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
});