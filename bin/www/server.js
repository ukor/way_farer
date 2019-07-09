require('dotenv').config();
const app = require('../../app');

let port = process.env.PORT;

if ((port === null || port === '') && process.env.NODE_ENV === 'production') {
    port = 8000;
}

app.listen(port, () => console.log(`Server listen on port ${port}`));
