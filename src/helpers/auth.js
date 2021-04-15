const helpers = {};
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Sin autorización de acceso');
    res.redirect('/Login');
};

helpers.permitStart = (req, res, next) => {    
    if (req.user) {
        let User = req.user;
        if (User.Inicio == true) {
            return next();
        } else {
            res.redirect('/WithoutAccess');
        }
    }
}

helpers.permitPhotos = (req, res, next) => {
    if (req.user) {
        let User = req.user;
        if (User.Fotos == true) {
            return next();
        } else {
            res.redirect('/WithoutAccess');
        }
    }
}

helpers.permitIlustrations = (req, res, next) => {
    if (req.user) {
        let User = req.user;        
        if (User.Ilustraciones == true) {
            return next();
        } else {
            res.redirect('/WithoutAccess');
        }
    }
}

helpers.permitGames = (req, res, next) => {    
    if (req.user) {
        let User = req.user;        
        if (User.JuegoMesa == true) {
            return next();
        } else {
            res.redirect('/WithoutAccess');
        }
    }
}

helpers.permitVideoGames = (req, res, next) => {
    if (req.user) {
        let User = req.user;
        if (User.VideoJuegos == true) {
            return next();
        } else {
            res.redirect('/WithoutAccess');
        }
    }
}

helpers.permitUsers = (req, res, next) => {
    if (req.user) {
        let User = req.user;
        if (User.Usuarios == true) {
            return next();
        } else {
            res.redirect('/WithoutAccess');
        }
    }
}

helpers.permitAdmin = (req, res, next)=>{
    console.log(req.user);
    if (req.user) {
        let User = req.user;
        if (User.Usuarios == true) {
            return next();
        } else {
            res.redirect('/WithoutAccess');
        }
    }

}

module.exports = helpers;