const express = require('express');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');


const routes = require('./controllers/homepageController');
const hbs = exphbs.create({});

const app = express();


const PORT = process.env.PORT || 3001;

// Template Engine Setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('WE MADE IT!!! '));
});