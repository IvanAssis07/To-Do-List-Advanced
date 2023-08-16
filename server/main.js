import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection'
// import '/imports/api/tasksMethods';
// import '/imports/api/tasksPublications';

const insertTask = (taskName, user) => {
  TasksCollection.insert({
      name: taskName,
      creator: user._id,
      createdAt: new Date(),
    })
};

const SEED_USERNAME = 'user';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find({ creator: user._id }).count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task'
    ].forEach(taskName => insertTask(taskName, user));
  }
});