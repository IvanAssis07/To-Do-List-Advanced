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

      const user = Meteor.users.findOne({_id: this.userId});

      if (!user) {
        throw new Meteor.Error('Not found.');
      } 

      Meteor.users.update(user._id, {
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
      throw new Meteor.Error(error.message);
    }
  }
});