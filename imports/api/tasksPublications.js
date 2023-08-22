import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../db/TasksCollection';
import { check } from 'meteor/check';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({userId: this.userId})
});

Meteor.publish('taskData', function (taskId) {
  check(taskId, String);
  
  return TasksCollection.find({_id: taskId});
});