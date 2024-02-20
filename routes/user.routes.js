const { Router } = require('express');
const { check }  = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { 
    usuarioPost,
    usuarioGet,
    getUsuarioById,
    putUsuarios,
    usuarioDelete
    }= require('../controllers/user.controller');
const { existenteEmail, esRolValido, existenteId } = require('../helpers/db-validator');

const router = Router();

router.get("/", usuarioGet);
router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ],getUsuarioById);
router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        check('role').custom(esRolValido),
        validarCampos
    ], putUsuarios);
router.post(
    "/", 
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password", "Debe ser mayor a 6 caracteres").isLength({min: 6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRolValido),        
        validarCampos,
    ],usuarioPost);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], usuarioDelete);

module.exports = router;
