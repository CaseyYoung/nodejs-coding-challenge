const userData = require('./../data/users.json');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const users = [...userData];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    res.send(200, users);
});

app.get('/users/:email', (req, res) => {
    res.send(200, users.find(user => user.email === req.params.email));
});

app.post('/users', (req, res) => {
    // TODO: add user to user list
    res.send(201, req.body);
});

app.put('/users/:email', (req, res) => {
    // TODO: update specified user in user list
    res.send(200, req.body);
});

app.delete('/users/:email', (req, res) => {
    // TODO: delete specified user in user list
    res.send(200, req.body);
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});