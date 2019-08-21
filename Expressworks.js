const express = require('express');
const app = express();
app.get('/', (req, res)=>{
    res.end('Hello World');
    console.log('This has been reached');
})
app.listen(process.argv[2]);