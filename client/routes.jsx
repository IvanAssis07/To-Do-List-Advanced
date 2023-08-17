import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { App } from '/imports/ui/App';
import { TaskData } from '../imports/ui/TaskData';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CreateTask } from '../imports/ui/CreateTask';

Meteor.startup(() => {
  const root = createRoot(document.getElementById('react-target'));

  root.render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/TaskData/:taskId' element={<TaskData />} />
          <Route path='/Tasks' />
          <Route path='/CreateTask' element={<CreateTask />}/>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
});