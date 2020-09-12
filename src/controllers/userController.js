const router = require('express').Router();
const userData = require('../../data/users.json');

const users = [...userData];

router.get('/', (req, res) => {
    res.send(200, users);
});

router.post('/', (req, res) => {
    // TODO: add user to user list
    res.send(201, req.body);
});

router.get('/:email', (req, res) => {
    res.send(200, users.find(user => user.email === req.params.email));
});

router.put('/:email', (req, res) => {
    // TODO: update specified user in user list
    res.send(200, req.body);
});

router.delete('/:email', (req, res) => {
    // TODO: delete specified user in user list
    res.send(200, req.body);
});

module.exports = router;