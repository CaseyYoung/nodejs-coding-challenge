const {userSchema} = require('./schemas/userSchema.js');

const validate = (object) => {
    return userSchema.validate(object);
};

module.exports = {
    validate
};