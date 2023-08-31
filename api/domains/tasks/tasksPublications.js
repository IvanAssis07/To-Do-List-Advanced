import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", function publishTasks() {
  if (!this.userId) {
    throw new Meteor.Error("Not Authorized");
  }

  return TasksCollection.find({
    $or: [{ private: false }, { private: true, creatorId: this.userId }],
  });
});

Meteor.publish("taskData", function (taskId) {
  check(taskId, String);

  if (!this.userId) {
    throw new Meteor.Error("Not Authorized");
  }

  return TasksCollection.find({ _id: taskId });
});