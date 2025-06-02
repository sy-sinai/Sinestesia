const { json } = require('express');
const food =  require('../models/food.js');


exports.getAllFood  = async (req, res)  => {
    try {
        const foods = await food.find();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

exports.getFoodById = async (req, res) => {
    try {
        const foodid= await food.findById(req.params.id);
        if(!foodid) return res.status(404).json({ message: 'Sorry! Sian lose the song :c'});
        res.json(foodid);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.createFood = async (req, res) => {
    try {
        const newFood = new food(req.body);
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateFood = async (req, res) => {
    try {
        const updatedFood = await food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );
        if (!updatedFood) return res.status(400).json({ message: 'Sorry! We lose the song :c'});
        res.json(updatedFood);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

exports.deleteFood = async (req, res) => {
    try {
        const deletedFood = await food.findByIdAndDelete(req.params.id);
        if(!deletedFood) return res.status(404).json({ message: 'We delete the song, sorry!'});
        res.json({ message: 'Song deleted'});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};