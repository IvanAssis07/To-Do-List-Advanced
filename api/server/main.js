import '../domains/tasks/tasksMethods';
import '../domains/tasks/tasksPublications';
import { TasksCollection } from '../domains/tasks/TasksCollection';
import '../domains/users/usersMethods';
import '../domains/users/usersPublications';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
const fs = require('fs');
const path = require('path');

// const convertPhotoToBase64 = (filePath) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         const base64 = data.toString('base64');
//         resolve(base64);
//       }
//     });
//   });
// };

// Meteor.startup(() => {
//   const userOnePicture = convertPhotoToBase64(path.join(__dirname, '../../client/assets/profilePic1.png'));
//   const userTwoPicture = convertPhotoToBase64(path.join(__dirname, '../../client/assets/profilePic2.png'));

//   if (Meteor.users.find().count() === 0) {
//     Meteor.call('users.insert', {
//       name: 'User One',
//       email: 'userOne@gmail.com',
//       birthDate: new Date(),
//       sex: 'Masculine',
//       company: 'Synergia',
//       photo: userOnePicture,
//       password: 'password',
//     })

//     Meteor.call('users.insert', {
//       name: 'User Two',
//       email: 'userTwo@gmail.com',
//       birthDate: new Date(),
//       sex: 'Feminine',
//       company: 'Synergia',
//       photo: userTwoPicture,
//       password: 'password',
//     })
//   }

//   const user = Accounts.findUserByEmail('userOne@gmail.com');
  
//   if  (user) {
//     if (TasksCollection.find({ creatorId: user._id }).count() === 0) {
//       Meteor.call('tasks.insert', {
//         name: 'First Task',
//         description: 'Read Meteor Docs.',
//         deadline: new Date(),
//         private: true,
//         creatorName: 'User One'
//       });
  
//       Meteor.call('tasks.insert', {
//         name: 'Second Task',
//         description: 'Read React Docs.',
//         deadline: new Date(),
//         private: false,
//         creatorName: 'User One'
//       });
//     }
//   }
// });