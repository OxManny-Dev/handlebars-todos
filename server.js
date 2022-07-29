require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);



const sequelize = require('./config/connection');
const routes = require('./controllers/homepageController');


const helpers = require('./utils/helpers');

const hbs = exphbs.create({
  helpers,
});

const sessionSettings = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  // maxAge: ,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();


const PORT = process.env.PORT || 3001;

// Template Engine Setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middlewares
app.use(express.static('public'));
app.use(session(sessionSettings));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('WE MADE IT!!! '));
});