const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('project-2 ready to ROCK!')
})


app.listen(port, () => {
    console.log(`project-2 server is running on port ${port}`)
} ) 