import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'users.insert'(userData) {
    try {
      Accounts.createUser({
        email: userData.email,
        password: userData.password,
        profile: {
          name: userData.name,
          sex: userData.sex,
          company: userData.company,
          photo: userData.photo,
          birthDate: userData.birthDate
        }
      })
    } catch (error) {
      throw new Meteor.Error(error.message);
    }
  },
  'users.update'(userId, userData) {
    try {
      check(userId, String);
  
      if (!this.userId) {
        throw new Meteor.Error('Not Authorized');
      }
      
      Meteor.users.update(userId, {
        $set: {
          emails: [{address: userData.email, verified: false}],
          profile:{
            name: userData.name,
            sex: userData.sex,
            company: userData.company,
            photo: userData.photo,
            birthDate: userData.birthDate
          }
        }
      });
    } catch (error) {
      console.log(error.message);
      throw new Meteor.Error(error.message);
    }
  }
});