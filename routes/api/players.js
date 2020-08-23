const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Player Model
const Player = require('../../models/Player');
const { model } = require('../../models/Player');

// @route   GET api/players
// @desc    Get all players
// @access  Public
router.get('/', (req, res) => {
    Player.find()
        .sort({'name': 1})
        .then(players => res.json(players))
});

// @route   POST api/players
// @desc    Create a player record
// @access  Private
router.post('/', auth, (req, res) => {
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
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Player.findById(req.params.id)
        .then(player => player.remove().then(() => res.json({ success: true})))
        .catch(err => res.status(404).json({ success: false }))
});

module.exports = router;