import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

Meteor.methods({
  'tasks.insert'(taskData) {
    const adapter = new AdapterDayjs();
    
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      name: taskData.name,
      description: taskData.description,
      deadline: taskData.name,
      creator: this.userId,
      userId: this.userId,
      createdAt: new Date()
    });
  },
});