const express = require('express');
const router = express.Router();

// Player Model
const Player = require('../../models/Player');
const { model } = require('../../models/Player');

// @route   GET api/players
// @desc    Get all players
// @access  Public
router.get('/', (req, res) => {
    Player.find()
        .then(players => res.json(players))
});

// @route   POST api/players
// @desc    Create a player record
// @access  Public
router.post('/', (req, res) => {
    const newPlayer = new Player({
        name: req.body.name,
        classType: req.body.classType,
        net: req.body.net,
        total: req.body.total,
        spent: req.body.spent
    });

    newPlayer.save().then(player => res.json(player));
});

// @route   DELETE api/players/:id
// @desc    Delete a player record
// @access  Public
router.delete('/:id', (req, res) => {
    Player.findById(req.params.id)
        .then(player => player.remove().then(() => res.json({ success: true})))
        .catch(err => res.status(404).json({ success: false }))
});

module.exports = router;