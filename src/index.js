const express = require('express');
const UserController = require('./controllers/UserController.js');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', UserController);

app.get('/', (req, res) => {
    res.send('こんいちは、世界! (Hello World)');
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});