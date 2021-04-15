const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
    names: { type: String, required: true },
    user_email: { type: String, required: true },
    password: { type: String, required: true },
    Inicio: { type: Boolean, default: false },
    Fotos: { type: Boolean, default: false },
    Ilustraciones: { type: Boolean, default: false },
    JuegoMesa: { type: Boolean, default: false },
    VideoJuegos: { type: Boolean, default: false },
    Usuarios: { type: Boolean, default: false },
});

UsuarioSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UsuarioSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Usuario', UsuarioSchema);