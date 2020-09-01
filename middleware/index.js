var Campground = require('../models/campground');
var Comments = require('../models/comment');
var middlewareObj = {}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
	Comments.findById(req.params.comment_id, function(err, foundComment){
		if(err || !foundComment){
			req.flash('error', 'Comment not found')
			res.redirect('back');
		}else if(foundComment.author.id.equals(req.user._id)){
			next();
		}else{
			req.flash('error', 'You dont have permissin to do that');
			res.redirect("back");
		}	
	});
	}else{
		req.flash('error', 'You need to be logged in to do that');
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error', 'You need to be logged in to do that!');
	res.redirect('/login');
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			req.flash('error', 'Campground not found!');
			res.redirect('back');
		}else if(foundCampground.author.id.equals(req.user._id)){
			next();
		}else{
			req.flash('error', 'You dont have permissin to do that');
			res.redirect("back");
		}	
	});
	}else{
		req.flash('error', 'You need to be logged in to do that');
		res.redirect("back");
	}
}

module.exports = middlewareObj;

