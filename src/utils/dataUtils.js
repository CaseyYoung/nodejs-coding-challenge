const fs = require('fs').promises;
const dataFile = require('path').resolve(__dirname, '../../data/users.json');

// Refresh list of users for each request
const users = async () => {
    return JSON.parse(await fs.readFile(dataFile));
};

const publish = async (data) => {
    await fs.writeFile(dataFile, JSON.stringify(data));
};

module.exports = {
    users,
    publish
};