const Listing=require("../Models/Listing.js");
const { or } = require("../schema.js");


module.exports.index=async (req,res)=>{
    const allListings = await Listing.find();
    res.render("layouts/boilerplate.ejs" ,{body:"listings/index.ejs",key : allListings, msg:req.flash("success"),errMsg:req.flash("error")});
};


module.exports.renderNewForm=(req, res) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","login first")
        return res.redirect("/login");  // Stop execution after sending the response
    }
    res.render("listings/new.ejs");
}



module.exports.showListing=async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",populate:{path:"author"}})
    .populate("owner");   
    if(!listing){
        req.flash("error","No listing found");
        res.redirect("/listings");
    } 
    console.log(listing);
    
    res.render("listings/show.ejs",{key:listing})
}


module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;

    
    let {title,description,price,location,country} = req.body;

    
    let newListing = new Listing({
        title:title,
        description:description,
        price:price,
        location:location,
        country:country
    })
    newListing.owner=req.user._id;
    newListing.image={url,filename};

    await newListing.save();

    req.flash("success","A new listing created");
    res.redirect("/listings");
}




module.exports.editForm=async(req,res)=>{
    if (!req.isAuthenticated()) {
        req.flash("error","login first")
        return res.redirect("/login");  // Stop execution after sending the response
    }

    const {id} = req.params;
    list= await Listing.findById(id)
    let org=list.image.url;
    org=org.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs",{list,org});

}


module.exports.updateListing=async(req,res)=>{
    let {id} = req.params;
    let {title,description,price,location,country} = req.body; 
    // let listing=await Listing.findById(id);
    // if(!listing.owner.equals(res.locals.currUser._id)){
    //     req.flash("error","You Dont have permission to edit others listings");
    //     return res.redirect("/listings");

    // }
    let updatedListing = await Listing.findByIdAndUpdate(id,{title:title,description:description,price:price,location:location,country:country});
    console.log(req.file)
    if(typeof req.file !== 'undefined'){

        let url=req.file.path;
        let filename=req.file.filename;
        updatedListing.image={url,filename};  
        await updatedListing.save();
    }

    // res.redirect("/listings");
    res.redirect(`/listings/${id}`)
}




module.exports.destroyListing=async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Succesfully deleted");
    res.redirect("/listings");
}




module.exports.getListings=async(req,res)=>{
    try {
        let filter = {};  // Default: Show all listings
        if (req.query.category) {
            filter.category = req.query.category;  // Apply filter if category exists
        }
        const listings = await Listing.find(filter);
        res.render("layouts/boilerplate.ejs" ,{body:"listings/index.ejs",key : listings, msg:req.flash("success"),errMsg:req.flash("error")});

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};