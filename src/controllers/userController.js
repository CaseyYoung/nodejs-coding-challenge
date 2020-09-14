const router = require('express').Router();
const UserService = require('../services/UserService.js');

router.get('/', UserService.getUsers);

router.post('/', UserService.addUser);

router.get('/:email', UserService.getUser);

router.put('/:email', UserService.updateUser);

router.delete('/:email', UserService.deleteUser);

module.exports = router;