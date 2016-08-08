var express = require('express');
var router = express.Router();
var db = require('../common/db');

//查询
router.get('/', function(req, res, next) {
    db.models.comment.findAll().then(function(results) {
        res.json(results);
    }).catch(function(error) {
        next(error);
    });
});

//添加
router.post('/', function(req, res, next) {
    var payload = req.body;
    payload.date = new Date();
    db.models.comment.create(payload).then(function(result) {
        res.json(result);
    }).catch(function(error) {
        next(error);
    });
});

//修改
router.put('/:comment_id', function(req, res, next) {
    var comment_id = req.param('comment_id');
    if(comment_id) {
        var payload = req.body;
        payload.date = new Date();
        db.models.comment.findById(comment_id).then(function(comment) {
            if(comment){
                comment.update(payload).then(function(new_comment) {
                    res.json(new_comment);
                }).catch(function(error) {
			        next(error);
			    });
            }else{
                next("RESOURCE.NOT.FOUND");
            }
        });
    } else {
        next("PARAMETERS.ERROR");
    }
});

//删除
router.delete('/:comment_id', function(req, res, next) {
    var comment_id = req.param('comment_id');
    if(comment_id) {
        db.models.comment.findById(comment_id).then(function(comment) {
            if(comment) {
                comment.destroy().then(function(result) {
                    res.json(result);
                });
            } else {
                next("RESOURCE.NOT.FOUND");
            }
        });
    } else {
        next("PARAMETERS.ERROR");
    }
});

module.exports = router;