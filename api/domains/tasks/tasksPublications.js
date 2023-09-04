import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", function publishTasks(showCompleted, searchInput) {
  if (!this.userId) {
    throw new Meteor.Error("Not Authorized");
  }

  if(searchInput === '' || searchInput === undefined) {
    if (showCompleted) {
      return TasksCollection.find({
        $or: [{ private: false }, { private: true, creatorId: this.userId }],
      });
    } else {
      return TasksCollection.find({
        $and: [
          {
            $or: [
              { private: false }, 
              { private: true, creatorId: this.userId }
            ],
          },
          { status: { $ne: "Completed" } }, 
        ],
      });
    }
  } else {
    const searchPattern = new RegExp(searchInput, "i");

    if (showCompleted) {
      return TasksCollection.find({
        $and: [{
          $or: [
            { private: false }, 
            { private: true, creatorId: this.userId }
          ],
        },
        { name: { $regex: searchPattern } },
        ]
      });
    } else {
      return TasksCollection.find({
        $and: [
          {
            $or: [
              { private: false }, 
              { private: true, creatorId: this.userId }
            ],
          },
          { status: { $ne: "Completed" } }, 
          { name: { $regex: searchPattern } },
        ],
      });
    }
  }
});

Meteor.publish("taskData", function (taskId) {
  check(taskId, String);

  if (!this.userId) {
    throw new Meteor.Error("Not Authorized");
  }

  return TasksCollection.find({ _id: taskId });
});
