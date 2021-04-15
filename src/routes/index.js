const express = require('express');
const router = express.Router();
const { isAuthenticated, permitStart, permitPhotos, permitIlustrations, permitGames, permitVideoGames} = require('../helpers/auth');

router.get('/', isAuthenticated, permitStart, (req, res) => {
    res.render('Inicio', { title: 'Inicio' });
})

router.get('/Fotos', isAuthenticated, permitPhotos, (req, res) => {
    res.render('Fotos', { title: 'Fotos' });
})

router.get('/Ilustraciones', isAuthenticated, permitIlustrations, (req, res) => {
    res.render('Ilustraciones', { title: 'Ilustraciones' });
})

router.get('/JuegosMesa', isAuthenticated, permitGames, (req, res) => {
    res.render('JuegosMesa', { title: 'Juegos de Mesa' });
})

router.get('/VideoJuegos', isAuthenticated, permitVideoGames, (req, res) => {
    res.render('VideoJuegos', { title: 'VideoJuegos' });
})

router.get('/WithoutAccess', isAuthenticated, (req, res) => {
    res.render('Access', { title: 'Sin acceso' });
});

module.exports = router;