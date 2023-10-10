const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const errorHandler = require('./middleware/errorMiddleware')

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use(errorHandler);
const port = process.env.PORT || 4000;
require('dotenv').config();

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

mongoose.connect(process.env.MONGO_URL).then((connection) => {
    console.log(`Mongodb connection successful`);
}).catch((err) => {
    console.log(err)
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
