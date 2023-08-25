import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.publish('userData', function () {
  return Meteor.users.find({_id: this.userId});
});