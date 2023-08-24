import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

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
          private: taskData.private
      });
    } catch (error) {
      console.error('Validation error:', error.message);
      throw new Meteor.Error(('Validation error:', error.message));
    }
  },
  'tasks.remove'(taskId, taskUserId) {
    try{
      check(taskId, String);
  
      if (!this.userId) {
        throw new Meteor.Error('Not authorized.');
      }

      if (taskUserId !== this.userId) {
        throw new Meteor.Error('Not authorized.');
      }
  
      TasksCollection.remove(taskId);
    } catch(error) {
      console.error('Error:', error.message);
      throw new Meteor.Error(('Error:', error.message));
    }
  },
  'tasks.update'(taskId, taskData) {
    try {
      check(taskId, String);
    
      if (!this.userId) {
        throw new Meteor.Error('Not Authorized');
      }

      if (taskData.userId !== this.userId) {
        throw new Meteor.Error('Not authorized.');
      }
    
      const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    
      if (!task) {
        throw new Meteor.Error('Not found.');
      }
    
      TasksCollection.update(taskId, {
        $set: {
          name: taskData.name,
          description: taskData.description,
          deadline: taskData.deadline,
          status: taskData.status,
          private: taskData.private
        },
      });
    } catch (error) {
      throw new Meteor.Error(error.message);
    }
  }
});