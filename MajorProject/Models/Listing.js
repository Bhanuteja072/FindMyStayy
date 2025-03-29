const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const Review=require("./review.js");

const listingSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    // image:{
    //     type:String,

    //     default:"https://media.istockphoto.com/id/516180836/photo/green-rice-fild-with-evening-sky.jpg?s=2048x2048&w=is&k=20&c=0jgiQDFxj3JZkIhZv72FQZDokf1rhLSWo9NT9To4EMo=",
    //     set : (v) =>
    //         v === ""
    //         ? "https://media.istockphoto.com/id/516180836/photo/green-rice-fild-with-evening-sky.jpg?s=2048x2048&w=is&k=20&c=0jgiQDFxj3JZkIhZv72FQZDokf1rhLSWo9NT9To4EMo="
    //         : v,
    // },
    image: {
        url:String,
        filename:String,
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",

        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    category:{
        type:String,
    }
});



listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in : listing.reviews}})
    }
});



const Listing = mongoose.model("Listing",listingSchema)



module.exports=Listing;