import { Meteor }from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const Schema = {}

Schema.UserProfile = new SimpleSchema({
  name: {
    type: String,
    optional: false,
  },
  birthDate: {
    type: Date,
    optional: false,
  },
  sex: {
    type: String,
    allowedValues: ['Male', 'Female'],
    optional: false,
  },
  company: {
    type: String,
    optional: false,
  },
  photo: {
    type: String,
    optional: true,
  }
})

Schema.User = new SimpleSchema({
  emails: {
    type: Array,
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  profile: {
    type: Schema.UserProfile,
    optional: true,
  },
  createdAt: {
    type: Date,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  password: {
    type: String,
    blackbox: true
  },  
})


Meteor.users.attachSchema(Schema.User);