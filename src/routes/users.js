const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuarios');
const passport = require('passport');
const { isAuthenticated, permitUsers, permitAdmin } = require('../helpers/auth');

router.get('/Usuarios', permitUsers, permitAdmin, async (req, res) => {
    await Usuario.find()
        .then(documents => {
            const context = {
                users: documents.map(documents => {
                    return {
                        _id: documents._id,
                        names: documents.names,
                        user_email: documents.user_email,
                    }
                })
            }
            res.render('Usuarios', { title: 'Usuarios', users: context.users });
        });
});

router.post('/Usuarios', async (req, res) => {
    var Inicio, Fotos, Ilustraciones, JuegoMesa, VideoJuegos, Usuarios;
    const { names, user_email, password, inicio, fotos, ilustraciones, juegosMesa, videoJuegos, usuarios } = req.body;
    const errors = [];
    if (!names) {
        errors.push({ text: 'Por favor, ingresa el nombre' });
    }
    if (!user_email) {
        errors.push({ text: 'Por favor, ingresa el correo' });
    }
    if (!password) {
        errors.push({ text: 'Por favor, ingresa la contraseña' });
    }
    if (password < 6) {
        error.push({ text: 'La contraseña debe ser mayor a 6 caracteres' });
    }
    if (!inicio) {
        Inicio = false;
    } else {
        Inicio = true;
    }
    if (!fotos) {
        Fotos = false;
    } else {
        Fotos = true;
    }
    if (!ilustraciones) {
        Ilustraciones = false;
    } else {
        Ilustraciones = true;
    }
    if (!juegosMesa) {
        JuegoMesa = false;
    } else {
        JuegoMesa = true;
    }
    if (!videoJuegos) {
        VideoJuegos = false;
    } else {
        VideoJuegos = true;
    }
    if (!usuarios) {
        Usuarios = false;
    } else {
        Usuarios = true;
    }
    if (errors.length > 0) {
        res.render('Usuarios', {
            errors,
            names,
            user_email,
            password,
            inicio,
            fotos,
            ilustraciones,
            juegosMesa,
            videoJuegos,
            usuarios,
        });
    }
    else {
        const newUsuario = new Usuario({ names, user_email, password, Inicio, Fotos, Ilustraciones, JuegoMesa, VideoJuegos, Usuarios });
        newUsuario.password = await newUsuario.encryptPassword(password);
        await newUsuario.save();
        req.flash('success_msg', 'Usuario agregado con éxito');
        res.redirect('/Usuarios');
    }
    // console.log(req.body);
});

router.get('/Usuarios/Editar/:id', isAuthenticated, async (req, res) => {
    const user = await Usuario.findById(req.params.id).lean();
    // console.log(user);
    res.render('UsuarioEdit', { title: 'Editar Usuario', user: user });
});

router.put('/Usuarios/Editar/:id', async (req, res) => {
    var Inicio, Fotos, Ilustraciones, JuegoMesa, VideoJuegos, Usuarios; //Las que se insertan a la bd
    const { names, user_email, password, inicio, fotos, ilustraciones, juegosMesa, videoJuegos, usuarios } = req.body; //Las que recibo del cliente
    const errors = [];
    if (!names) {
        errors.push({ text: 'Por favor, ingresa el nombre' });
    }
    if (!user_email) {
        errors.push({ text: 'Por favor, ingresa el correo' });
    }
    // if (!password) {
    //     errors.push({ text: 'Por favor, ingresa la contraseña' });
    // }
    if (!inicio) {
        Inicio = false;
    } else {
        Inicio = true;
    }
    if (!fotos) {
        Fotos = false;
    } else {
        Fotos = true;
    }
    if (!ilustraciones) {
        Ilustraciones = false;
    } else {
        Ilustraciones = true;
    }
    if (!juegosMesa) {
        JuegoMesa = false;
    } else {
        JuegoMesa = true;
    }
    if (!videoJuegos) {
        VideoJuegos = false;
    } else {
        VideoJuegos = true;
    }
    if (!usuarios) {
        Usuarios = false;
    } else {
        Usuarios = true;
    }
    if (errors.length > 0) {
        res.render('Usuarios', {
            errors,
            names,
            user_email,
            password,
            inicio,
            fotos,
            ilustraciones,
            juegosMesa,
            videoJuegos,
            usuarios
        });
    }
    else {
        await Usuario.findByIdAndUpdate(req.params.id, { names, user_email, Inicio, Fotos, Ilustraciones, JuegoMesa, VideoJuegos, Usuarios });
        req.flash('success_msg', 'Usuario editado con éxito');
        res.redirect('/Usuarios');
    }
});

router.get('/Usuarios/Eliminar/:id', async (req, res) => {
    await Usuario.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Usuario eliminado con éxito');
    res.send({ message: 'ok' });
});

router.get('/Login', (req, res) => {
    res.render('Login');
});

router.post('/Login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/Login',
    failureFlash: true,
}));

router.get('/Logout', (req, res) => {
    req.logout();
    res.redirect('/Login');
});

module.exports = router;