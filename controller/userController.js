const UserData = require("../models/userDataModel");

// check if user's email exist and also check user's password
const getUserByEmailIdAndPassword = async (email, password) => {
  const user = await UserData.findOne({email: email}).exec();
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

// see if user exists based on their id
const getUserById = async (id) => {
  const user = await UserData.findById(id).exec();
  if (user) {
    return user;
  }
  return null;
};

// Check whether user is valid by the password they inputted
function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};