const mongoose = require('mongoose');

const linkTest = /http(s)?:\/\/(w{3}\.)?(([\w-]+\.[a-z]+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?([/\w]+(#)?)?/i;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => linkTest.test(v),
      message: (props) => `${props.value} is not a link`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
