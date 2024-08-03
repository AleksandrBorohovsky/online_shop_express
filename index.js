require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const models = require('./models/models');
const sequelize = require('./db');
const router = require('./routes/index');
const errorHandling = require('./middleware/ErrorHandlingMiddleware');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandling);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is up on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();