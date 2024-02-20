const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if (!existeRol){
        throw new Error (`El role ${ role } no existe en la base de datos`);
    }
};

const existenteEmail = async(correo = '') => {
    const existeEmeail = await Usuario.findOne({correo});
    if(existeEmeail){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existenteId = async( id = '') => {
    const existeId = await Usuario.findOne({ id });
    if(existeId){
        throw new Error (`El id ${ id } no existe el usuario en nuestra memoria`)
    }
}

module.exports = {
    esRolValido,
    existenteEmail,
    existenteId
}