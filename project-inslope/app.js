import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import sequelize from './config/db.js';
import SequelizeStorePkg from 'connect-session-sequelize';
import routeArtikel from './route/routeArtikel.js';
import routePetugas from './route/routePetugas.js';
import cors from 'cors';
import bodyParser from 'body-parser';

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const SequelizeStore = SequelizeStorePkg(session.Store);
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json({ extended: true }));
// Middleware for parsing body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Serve static files from the "asset" and "src" directories
app.use('/asset', express.static(path.join(__dirname, 'asset')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/node_modules/flowbite/dist', express.static(path.join(__dirname, 'node_modules/flowbite/dist')));

// Session 
app.use(session({
  secret: "KrX60p05,9OdF+",
  store: new SequelizeStore({
      db: sequelize
  }),
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS, set false for local testing
}));

// Routing
app.use('/auth', routePetugas);
app.use('/', routeArtikel);
//app.use('/artikel', routeArtikel);

// Handle 404
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Synchronize MySQL2 Connection
sequelize.sync()
  .then(() => {
      app.listen(port, () => {
          console.log(`Server is running on http://localhost:${port}`);
      });
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });
