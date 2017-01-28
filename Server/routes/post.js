var express = require('express');
var bodyParser = require('body-parser');
var post = require('../model/post-model.js');

var postRouter = express.Router();
postRouter.use(bodyParser.json());

postRouter.route('/')
.get(function(req,res){
	post.find({}, function(err, response){
		if(err){
			return fails(res, err);
		} else{
			success(res,response);
		}
		//200, application/json
	});
})
.post(function(req, res,next){
	post.create(req.body, function(err, response){
		if(err){
			 if (err.name === 'MongoError' && err.code === 11000) {
				// Duplicate category insertion
				return fails(res, 'Post already exist!');
			 }
			return fails(res, err);
		} else{
			success(res, response);
		}
		res.end();
	});
})
.delete(function(req,res,next){
	post.remove({}, function(err, response){
		if(err){
			// An error occurred
			return fails(res, err);
		} else{
			success(res,response);
		}
	});
});

postRouter.route('/:pid')
.get(function(req,res,next){
	post.findById(req.params.pid, function(err, response){
			if(err){
				// An error occurred
				return fails(res, err);
			} else{
				success(res,response);
			}
		//200, application/json
	});
})
.put(function(req, res, next){
	post.findByIdAndUpdate(req.params.pid,
	{$set: req.body},
	{new : true},
	function(err, response){
		if(err){
			// An error occurred
			return fails(res, err);
		} else{
			success(res,response);
		}

	});
})
.delete(function(req, res, next){
	post.findOneAndRemove(req.params.pid, function(err, response){
			if(err){
				// An error occurred
				return fails(res, err);
			} else{
				success(res,response);
			}
	});
});

function success(res, data){
		if(data == null || (data instanceof Array && (data[0] == null || data[0] == 'undefined'))){
			fails(res, "No post available")
		} else{
		res.json({
				success: true,
				message: "",
				data: data
			});
		}
}


function fails(res, err){
	return res.status(500).send({ succes: false, message: err });
}


module.exports = postRouter;
