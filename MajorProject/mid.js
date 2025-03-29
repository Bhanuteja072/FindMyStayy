const Listing=require("./Models/Listing.js")
const Review=require("./Models/review.js")

module.exports.isLoggedIn = (req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.flash("error","login first")
        return res.redirect("/listings"); 
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
    let {id} = req.params;
    let listing=await Listing.findById(id);
        if(!listing.owner.equals(res.locals.currUser._id)){
            req.flash("error","You Dont have permission to edit others listings");
            return res.redirect("/listings");
    
         
        }
        next();
}


module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let review=await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currUser._id)){
            req.flash("error","You Dont have permission to delete others reviews");
            return res.redirect("/listings");
    
         
        }
        next();
}


