const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/users', function(req, res, next) {
    // User.find({}).then(function(users) {
    //     res.send(users);
    // })

    
})

//add a new user to the db
router.post('/users', function(req, res, next) {
    // const user = new User(req.body);
    // user.save();

    //上面代码等同于User.create(req.body)
    User.create(req.body).then(function(user) {
        res.send(user);
    }).catch(next);
})

//update a user in the db
router.put('/users/:id', function(req, res, next) {
    const id = req.params.id;
    User.findByIdAndUpdate({_id: id}, req.body).then(function() {
        //更新后重新查找一遍，返回最新数据
        User.findOne({_id: id}).then(function(user) {
            res.send(user);
        })
    })
})

//delete a user from the db
router.delete('/users/:id', function(req, res, next) {
    const id = req.params.id;
    User.findByIdAndRemove({_id: id}).then(function(user) {
        res.send(user);
    })
})

module.exports = router;