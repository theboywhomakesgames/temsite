const mongoose = require('mongoose');
const cors = require('cors');

const pass = encodeURIComponent('m4ds31##');
const localDB = 'mongodb://127.0.0.1:27017/tem-db';
const productionDB = 'mongodb:...'

const curDBURI = localDB;

// requiring models

// establish mongoose connection
mongoose.connect(curDBURI, { useNewUrlParser: true })
  .then(result => {
    console.log('successfully connected to mongodb');
  })
  .catch(err => {
    console.log("error connecting to mongodb:")
    console.log(err);
  });

// express app requirements
const express = require('express');
const session = require('express-session');

// express app init
const app = express();
app.disable('x-powered-by');

// setting up helmet
const helmet = require('helmet');
app.use(helmet());

// setting up parsers
const parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// setting up session coockies
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: curDBURI,
  collection: 'session'
});

app.use(
  session({
    name: "temsite-sessions",
    secret: "random-ksadjf;;alskj32irjlkasjfg",
    resave: true,
    saveUninitialized: false,
    cookie: {
      session: process.env.NODE_ENV == "production"
    },
    store: store
  })
);

// routing
const loginRouter = require('./routers/Auth/loginRouter');
const regRouter = require('./routers/Auth/regRouter');
const apiRouter = require('./routers/apiRouter');

app.use('/auth', loginRouter);
app.use('/reg', regRouter);
app.use('/ap', apiRouter);

// put up the express app
app.listen(3000, (res) => {
  console.log("up on port 3000");
});