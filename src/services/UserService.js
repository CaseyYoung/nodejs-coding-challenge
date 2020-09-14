const {users, publish} = require('../utils/dataUtils.js');
const {paginate} = require('../middleware/pagination.js');
// Helper function
const findUserIndex = (array, email) => {
    return array.findIndex(user => user.email === email);
};

// TODO: integrate pagination into the correct request handling pipeline pattern with (req, res, next)
const getUsers = async (req, res) => {
    const {page, limit} = req.query;
    const userList = (page && limit) ?
        paginate(await users(), req.query) : await users();
    res.status(200).json(userList);
};

const addUser = async (req, res) => {
    const userList = await users();
    userList.push(req.body);
    
    await publish(userList);
    res.status(201).json(req.body);
};

const getUser = async (req, res) => {
    const userList = await users();
    res.status(200).json(userList.find(user => user.email === req.params.email));
};

const updateUser = async (req, res) => {
    const userList = await users();
    const userIndex = findUserIndex(userList, req.params.email);
    userList.splice(userIndex, 1, req.body);

    await publish(userList);
    res.status(200).json(req.body);
};

const deleteUser = async (req, res) => {
    const userList = await users();
    const userIndex = findUserIndex(userList, req.params.email);;
    userList.splice(userIndex, 1);

    await publish(userList);
    res.status(200).send(`User ${req.params.email} successfully deleted.`);
};



module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
};

