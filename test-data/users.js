// @ts-check

const VALID_USER = { username: 'student', password: 'Password123' };

const INVALID_LOGINS = [
  { title: 'invalid username', username: 'incorrectUser', password: VALID_USER.password, message: 'Your username is invalid!' },
  { title: 'invalid password', username: VALID_USER.username, password: 'incorrectPassword', message: 'Your password is invalid!' },
  { title: 'empty username and password', username: '', password: '', message: 'Your username is invalid!' },
  { title: 'username in wrong case', username: 'Student', password: VALID_USER.password, message: 'Your username is invalid!' },
  { title: 'password with trailing space', username: VALID_USER.username, password: `${VALID_USER.password} `, message: 'Your password is invalid!' },
];

module.exports = { VALID_USER, INVALID_LOGINS };
