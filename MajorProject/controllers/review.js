const Listing=require("../Models/Listing.js");
const Review=require("../Models/review.js")
module.exports.createReview=async(req,res)=>{
    let {id} = req.params;
    let listing=await Listing.findById(id);
    let newreview=new Review(req.body.review);
    newreview.author=req.user._id;
    await newreview.save();


    listing.reviews.push(newreview);
    // await review.save();
    await listing.save();
    // req.flash("success","A new review created");

    res.redirect(`/listings/${id}`);

}



module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    // let msg= req.flash("success","Review deleted");
    // if(msg){
    //     res.render("layouts/boilerplate.ejs" ,{msg:req.flash("success")})

    // }
    res.redirect(`/listings/${id}`);

}