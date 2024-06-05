const express = require('express');
const router = express.Router();
const Model = require('../models/announcementModel')


router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body)
        .save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//getall
router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
});

router.post('/join', (req, res) => {
    Model.findByIdAndUpdate
        (req.body.clubId, { $push: { members: req.body.userId } })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// getbyclub
router.get('/getbyclub/:id', (req, res) => {
    console.log(req.params.id);
    Model.find({ club: req.params.id }).populate('club').populate('createdBy')
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;