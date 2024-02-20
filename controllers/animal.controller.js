const bcryptjs = require('bcryptjs');
const Animal = require('../models/mascota');
const { response } = require('express');



const animalesGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = {estado: true};

    const [total, animales ] = await Promise.all([
        Animal.countDocuments(query),
        Animal.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        animales
    });
}

const getAnimalById = async (req, res) => {
    const { id } = req.params;
    const animal = await Animal.findOne({_id: id});

    res.status(200).json({
        animal
    });
}

const animalPost = async (req, res ) => {

    const  {nombre, tipo, raza, caracterizticas, estadoDelAnimal, role} = req.body;
    const animal = new Animal({ nombre, 
            tipo, 
            raza, 
            caracterizticas, 
            estadoDelAnimal, 
            role });

    await animal.save();
    res.status(202).json({
        animal
    });
}

const putAnimales = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto} = req.body;
    
    const animal = await Animal.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: "Se actualizo la mascota",
        animal
    });
}

const animalDelete = async (req, res) => {
    const { id } = req.params;
    const animal = await Animal.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Nascota eliminada',
        animal
    });
}

module.exports = {
    animalPost,
    animalesGet,
    getAnimalById,
    putAnimales,
    animalDelete

}