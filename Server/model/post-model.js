var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tags = new Schema({
    tagName     : String
});

var Comments = new Schema({
  username : String,
  message : String,
  commentRecommendation : Number
},
{
  timestamps:true //Add two field automatically, createAt, updateAt
});

var postModel = new Schema({
		title: { type: String, required: true },
		description: { type: String, required: true },
    authorName: { type: String },
    recommendation: { type: Number },
    tags:[Tags],
    comments : [Comments]
  },
		{
			timestamps:true //Add two field automatically, createAt, updateAt
		});
var Post = mongoose.model("posts" ,postModel);
module.exports = Post;
