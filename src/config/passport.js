const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/Usuarios');

passport.use(new LocalStrategy({
    usernameField: 'user_email',
    // passwordField: ''
}, async (email, password, done) => {
    const user = await Usuario.findOne({ user_email: email });
    if (!user) {
        // if (email == 'admin@correo.com') {
        //     if (password == 'administrador') {
        //         const Usuarios = true;
        //         const user_email = email;
        //         const user = new Usuario({ user_email, password, Usuarios });
        //         console.log(user);
        //         return done(null, user);
        //     }
        // } else {
        //     return done(null, false, { message: 'Usuario no encontrado' });
        // }
        return done(null, false, { message: 'Usuario no encontrado' });
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, user) => {
        done(err, user);
    });
});