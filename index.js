// server.js
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./dist/'));

app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`Example app listening on port ${PORT}!`);
});
