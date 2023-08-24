import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const TasksCollection = new Mongo.Collection('tasks');

const taskSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date
  },
  status: {
    type: String,
    defaultValue: 'Cadastrada'
  },
  userId: {
    type: String,
    optional: true,
    autoValue: function () {
      return this.userId;
    }
  },
  private: {
    type: Boolean,
    optional: false
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    },
  }
});

TasksCollection.attachSchema(taskSchema);