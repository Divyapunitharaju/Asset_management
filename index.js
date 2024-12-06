const express = require('express');
const app = express();
const db = require('./db/db');
const path = require('path');
const methodOverride = require('method-override');


const assetCategoryRoute = require('./routes/assetCategory');
const assetRoute = require('./routes/asset');
const stockViewRoute = require('./routes/stockView');
const employeeRoute = require('./routes/employee');
const issueRoute = require('./routes/issue');
const returnRoute = require('./routes/return');
const scrapRoute=require('./routes/scrap')
// const historyRoute=require('./routes/assetHistory')



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

db.sync({ alter: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err))


app.use('/assets', assetRoute)
app.use('/assetCategories', assetCategoryRoute)
app.use('/stock', stockViewRoute)
app.use('/employees', employeeRoute)
app.use('/issue', issueRoute)
app.use('/return', returnRoute);
app.use('/scrap',scrapRoute)
// app.use('/assetHistory',historyRoute)


app.use((req, res) => {
    res.status(404).send('Page not found');
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
})



app.listen(3001, () => {
    console.log("Server is running");
})
