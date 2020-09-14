const {users, publish, generateUser} = require('../utils/dataUtils.js');
const {paginate} = require('../middleware/pagination.js');
const {validate} = require('../utils/validationUtils.js');
const RESOURCE_NOT_FOUND = 'Resource not found.';

// Helper functions
const findUserIndex = (array, email) => {
    return array.findIndex(user => user.email === email);
};
const respond = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};

// TODO: integrate pagination into the correct request handling middleware pattern with (req, res, next)
const getUsers = async (req, res) => {
    const {page, limit} = req.query;
    const userList = (page && limit) ?
        paginate(await users(), req.query) : await users();
    
    respond(res, 200, userList);
};

// TODO: integrate validation into the correct request handling middleware pattern with (req, res, next)
const addUser = async (req, res) => {
    const userList = await users();
    const userIndex = findUserIndex(userList, req.params.email);
    const error = validate(req.body).error;
    if(userIndex > -1) {
        respond(res, 400, 'Bad Request: A user with that email already exists.');
    } else if(error){
        respond(res, 400, `Bad Request: ${error}`);
    } else {
        const user = generateUser(req.body);
        userList.push(user);
        await publish(userList);
        respond(res, 201, user);
    }
};

const getUser = async (req, res) => {
    const userList = await users();
    const userIndex = findUserIndex(userList, req.params.email);

    if(userIndex === -1){
        respond(res, 404, RESOURCE_NOT_FOUND);
    } else {
        respond(res, 200, userList[userIndex]);
    };
};

// TODO: integrate validation into the correct request handling middleware pattern with (req, res, next)
const updateUser = async (req, res) => {
    const userList = await users();
    const userIndex = findUserIndex(userList, req.params.email);
    const user = generateUser(req.body);
    const error = validate(req.body).error;

    if(userIndex === -1) {
        respond(res, 404, RESOURCE_NOT_FOUND);
    } else if(error){
        respond(res, 400, `Bad Request: ${error}`);
    } else {
        userList.splice(userIndex, 1, user);
        await publish(userList);
        respond(res, 200, user);
    };
};

const deleteUser = async (req, res) => {
    const userList = await users();
    const userIndex = findUserIndex(userList, req.params.email);

    if(userIndex === -1) {
        respond(res, 404, RESOURCE_NOT_FOUND);
    } else {
        userList.splice(userIndex, 1);
        await publish(userList);
        respond(res, 200, `User ${req.params.email} successfully deleted.`);
    };
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
};

