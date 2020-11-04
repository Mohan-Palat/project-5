//___________________
//Dependencies 2
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'project2DB';
// Connect to Mongo
// mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});
mongoose.connect(MONGODB_URI ,    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.on('open' , ()=>{});
//___________________
//Middleware
//___________________
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
//___________________
// Routes

// ToolBox pages controllers
const boxesController = require('./controllers/boxesController.js')
app.use('/boxes', boxesController)

// Tools pages controllers
const toolsController = require('./controllers/toolsController.js')
app.use('/tools', toolsController)

// Home Page navigation controllers - no functionality yet
const homeController = require('./controllers/homeController.js')
app.use('/home', homeController)


//___________________
//localhost:3000
app.get('/' , (req, res) => {
  // res.send('Welcome Home!');
  res.redirect('/home');
});


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));