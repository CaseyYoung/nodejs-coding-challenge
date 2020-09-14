const fs = require('fs').promises;
const dataFile = require('path').resolve(__dirname, '../../data/users.json');

// Refresh list of users for each request
const users = async () => {
    return JSON.parse(await fs.readFile(dataFile));
};

const publish = async (data) => {
    await fs.writeFile(dataFile, JSON.stringify(data));
};

const generateUser = (userData) => {
    const user = {
        email: '',
        name: '',
        dateOfBirth: '',
        phoneNumber: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        },
        ...userData
    };
    return user;
};

module.exports = {
    users,
    publish,
    generateUser
};