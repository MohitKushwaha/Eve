const express = require('express');
const app = express();
const port = 3000;
const path = require('path')

app.use(express.static('dist/eve/'))

app.get('*', function(req,res) {
    res.sendFile(path.resolve('dist/eve/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})