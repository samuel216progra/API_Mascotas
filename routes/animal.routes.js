const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { animalPost, animalesGet, getAnimalById, putAnimales, animalDelete } = require('../controllers/animal.controller');

const { esRolValido, existenteId } = require('../helpers/db-validator');

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre del animal es obligatorio").not().isEmpty(),
        check("tipo", "El tipo del animal es obligatorio").not().isEmpty(),
        check("raza", "La raza del animal es obligatorio").not().isEmpty(),
        check("estadoDelAnimal", "El estado que se encuentra el animal es obligatorio").not().isEmpty(),
        check("caracterizticas", "El estado que se encuentra el animal es obligatorio").not().isEmpty(),
        check("role").custom(esRolValido),
        validarCampos
    ], animalPost);

router.get("/", animalesGet);
router.get("/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], getAnimalById);


router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        check("role").custom(esRolValido),
        validarCampos
    ]
    ,putAnimales)

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], animalDelete)
module.exports = router;