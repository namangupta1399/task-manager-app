const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})