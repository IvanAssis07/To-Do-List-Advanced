import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

Meteor.methods({
  'tasks.insert'(taskData) { 
    try {
      if (!this.userId) {
        throw new Meteor.Error('Not authorized.');
    }
  
    TasksCollection.insert({
        name: taskData.name,
        description: taskData.description,
        deadline: taskData.deadline,
    });
    } catch (error) {
      console.error('Validation error:', error.message);
      throw new Meteor.Error(('Validation error:', error.message));
    }
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.remove(taskId);
  },
  'tasks.update'(taskId, taskData) {
    try {
      check(taskId, String);
    
      if (!this.userId) {
        throw new Meteor.Error('Not Authorized');
      }
    
      const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    
      if (!task) {
        throw new Meteor.Error('Access denied.');
      }
    
      TasksCollection.update(taskId, {
        $set: {
          name: taskData.name,
          description: taskData.description,
          deadline: taskData.deadline,
          status: taskData.status,
        },
      });
    } catch (error) {
      throw new Meteor.Error(error.message);
    }
  }
});