import express from "express";
import { 
    createArtikel, 
    updateArtikel, 
    deleteArtikel, 
    getArtikel,
    renderTambahArtikel,
    renderUbahArtikel, 
} from "../controller/controllerArtikel.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const routeArtikel = express.Router();

// Route tanpa autentikasi
routeArtikel.get('/', getArtikel);

// Route dengan autentikasi
routeArtikel.get('/buatartikel', ensureAuthenticated, renderTambahArtikel);
routeArtikel.get('/ubahartikel/:id', ensureAuthenticated, renderUbahArtikel);
routeArtikel.post('/buatartikel', ensureAuthenticated, createArtikel);
routeArtikel.post('/ubahartikel/:id', ensureAuthenticated, updateArtikel);  
routeArtikel.post('/hapusartikel/:id', ensureAuthenticated, deleteArtikel); 

export default routeArtikel;
