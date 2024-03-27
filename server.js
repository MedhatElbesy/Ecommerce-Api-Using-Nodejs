const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({path:"config.env"});
const ApiError = require('./utils/apiError');
const globalError = require('./middleware/errorMiddleware');
const dbConnection = require('./config/database');

const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoure');
const brandRoute = require('./routes/brandRoute');
const productRoute = require('./routes/productRoute');

//DB connection
dbConnection();

// express app
const app = express();
// middlewares
app.use(express.json());


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log(`mode is ${process.env.NODE_ENV}`);
};




//mount routes
app.use('/api/v1/categories',categoryRoute);
app.use('/api/v1/subcategories',subCategoryRoute);
app.use('/api/v1/brands',brandRoute);
app.use('/api/v1/products',productRoute);

app.all("*" , (req , res , next) => {
    next(new ApiError(`Can't Find This route : ${req.originalUrl}`, 400));
});

// global error handeller MW
app.use(globalError);

const port = process.env.PORT || 8000 ;
const server = app.listen(port,(req , res) => {
    console.log("app listen on port : ",port);
});

// promise error outside express (event)
process.on("unhandledRejection" , (err) => {
    console.log(`unhandledRejection Error : ${err.name} | ${err.message}`);
    server.close(() => {
        console.log("Shutting Down");
        process.exit(1);
    });
});