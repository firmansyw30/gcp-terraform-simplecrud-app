import express from 'express';
import { login, logout, getPetugasPage } from '../controller/controllerPetugas.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const routePetugas = express.Router();

routePetugas.post('/login', login);
routePetugas.get('/login', (req, res) => {
    res.render('petugas/login');
});

routePetugas.post('/logout', logout);

routePetugas.get('/welcome', ensureAuthenticated, getPetugasPage); // Halaman welcome setelah login

export default routePetugas;
