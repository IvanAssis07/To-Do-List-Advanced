import '../domains/tasks/tasksMethods';
import '../domains/tasks/tasksPublications';
import '../domains/users/usersMethods';
import '../domains/users/usersPublications';

// const insertTask = (taskName, user) => {
//   TasksCollection.insert({
//       name: taskName,
//       creator: user.username,
//       userId: user._id,
//       createdAt: new Date(),
//     })
// };

// const SEED_USERNAME = 'user';
// const SEED_PASSWORD = 'password';

// Meteor.startup(() => {
//   if (!Accounts.findUserByUsername(SEED_USERNAME)) {
//     Accounts.createUser({
//       username: SEED_USERNAME,
//       password: SEED_PASSWORD,
//     });
//   }

//   const user = Accounts.findUserByUsername(SEED_USERNAME);

//   if (TasksCollection.find({ creator: user._id }).count() === 0) {
//     [
//       'First Task',
//       'Second Task',
//       'Third Task',
//       'Fourth Task'
//     ].forEach(taskName => insertTask(taskName, user));
//   }
// });