import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert"(taskData) {
    try {
      TasksCollection.insert({
        name: taskData.name,
        description: taskData.description,
        deadline: taskData.deadline,
        private: taskData.private,
        creatorName: taskData.creatorName
      });
    } catch (error) {
      throw new Meteor.Error(("Validation error:", error.message));
    }
  },
  "tasks.remove"(taskId, taskCreatorId) {
    try {
      check(taskId, String);

      if (taskCreatorId !== this.userId) {
        throw new Meteor.Error("Not authorized.");
      }

      TasksCollection.remove(taskId);
    } catch (error) {
      throw new Meteor.Error(("Error:", error.message));
    }
  },
  "tasks.update"(taskId, taskData) {
    try {
      check(taskId, String);

      if (taskData.creatorId !== this.userId) {
        throw new Meteor.Error("Not authorized.");
      }

      TasksCollection.update(taskId, {
        $set: {
          name: taskData.name,
          description: taskData.description,
          deadline: taskData.deadline,
          status: taskData.status,
          private: taskData.private,
        },
      });
    } catch (error) {
      console.log(error.message);
      throw new Meteor.Error(error.message);
    }
  },
});
