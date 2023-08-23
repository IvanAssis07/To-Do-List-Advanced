import { Meteor }from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const userSchema = new SimpleSchema({
  username: {
    type: String,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true,
  },
  emails: {
    type: Array,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
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
  createdAt: {
    type: Date,
  },
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
  },
});

Meteor.users.attachSchema(userSchema);