import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

Meteor.methods({
  'tasks.insert'(taskData) { 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      name: taskData.name,
      description: taskData.description,
      deadline: taskData.deadline,
      status: 'Cadastrada',
      creator: this.userId,
      userId: this.userId,
      createdAt: new Date()
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.remove(taskId);
  },
  'tasks.update'(taskId, taskData) {
    check(taskId, String);
    check(taskData, {
      name: String,
      description: String,
      deadline: Date,
      status: String,
    });

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
      }
    });
  }
});