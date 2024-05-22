const express = require('express');
const router = express.Router();
const Model = require('../models/clubModel')


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
})

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

router.get('/getbymember/:id', (req, res) => {
    console.log(req.params.id);
    Model.find({ members: { $in: [req.params.id] } }).populate('moderator')
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// getbyid
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;