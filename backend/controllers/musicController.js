const { json } = require('express');
const music =  require('../models/music');


exports.getAllMusic  = async (req, res)  => {
    try {
        const musics = await music.find();
        res.json(musics);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

exports.getMusicById = async (req, res) => {
    try {
        const musicid= await music.findById(req.params.id);
        if(!musicid) return res.status(404).json({ message: 'Sorry! Sian lose the song :c'});
        res.json(musicid);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.createMusic = async (req, res) => {
    try {
        const newMusic = new music(req.body);
        const savedMusic = await newMusic.save();
        res.status(201).json(savedMusic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateMusic = async (req, res) => {
    try {
        const updatedMusic = await music.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );
        if (!updatedMusic) return res.status(400).json({ message: 'Sorry! We lose the song :c'});
        res.json(updatedMusic);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

exports.deleteMusic = async (req, res) => {
    try {
        const deletedMusic = await music.findByIdAndDelete(req.params.id);
        if(!deletedMusic) return res.status(404).json({ message: 'We delete the song, sorry!'});
        res.json({ message: 'Song deleted'});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};