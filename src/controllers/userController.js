const router = require('express').Router();
const userData = require('../../data/users.json');

const users = [...userData];
const findUserIndex = (email) => {
    return users.findIndex(user => user.email === email);
};
router.get('/', (req, res) => {
    res.status(200).json(users);
});

router.post('/', (req, res) => {
    users.push(req.body);
    res.status(201).json(req.body);
});

router.get('/:email', (req, res) => {
    res.status(200).json(users.find(user => user.email === req.params.email));
});

router.put('/:email', (req, res) => {
    const userIndex = findUserIndex(req.params.email);
    users.splice(userIndex, 1, req.body);
    res.status(200).json(users[userIndex]);
});

router.delete('/:email', (req, res) => {
    const userIndex = findUserIndex(req.params.email);;
    users.splice(userIndex, 1);
    res.status(200).send(`User ${req.params.email} successfully deleted.`);
});

module.exports = router;