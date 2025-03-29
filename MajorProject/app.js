require("dotenv").config();
const express = require("express");
const app=express();
const mongoose= require('mongoose');
const path=require("path");
const port = 4000;
const methodOverride = require('method-override');
app.use(methodOverride("_method"));
const wrapAsync=require("./utils/wrapAsync.js");
// const listingSchema=require("./schema.js");
const reviewSchema=require("./schema.js");
const multer=require("multer");
const {storage}=require("./cloudConfig.js");
const upload=multer({storage})

// console.log(process.env.CLOUD_NAME);
// console.log(process.env.CLOUD_API_KEY)


// if(process.env.NODE_ENV !="Production"){
//     console.log(process.env.CLOUD_NAME);
//     require("dotenv").config();
// }
// console.log(process.env.CLOUD_NAME);


const dbUrl=process.env.ATLASDB_URL;





const passport=require("passport");
const LocalStrategy=require("passport-local");

const User=require("../MajorProject/Models/user.js");



const flash=require("connect-flash");




const session=require("express-session");

const MongoStore=require("connect-mongo");

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("Error in session store",err);
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*600*1000,
        httpOnly:true
    },
};




app.use((err,req,res,next)=>{
    console.error("Something Went Wrong");
    res.render("error.ejs",{error:err});
})



app.use(session(sessionOptions));
app.use(flash());





app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//Middleware for login route to redirect to required url
const saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}




//locals for the flsh messages and user
app.use((req,res,next)=>{
    // res.locals.success=req.flash("success");
    // res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    res.locals.redirectUrl=req.session.redirectUrl;
    next();

})







const ejsMate = require('ejs-mate');
app.engine('ejs',ejsMate );


app.use(express.static(path.join(__dirname,"/public")))



// const dbUrl=process.env.ATLASDB_URL;



const Listing=require("../MajorProject/Models/Listing.js");
const Review=require("../MajorProject/Models/review.js");
main()
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((error)=>{
        console.log("Error connecting to MongoDB");
    })




async function main(){
    await mongoose.connect(dbUrl);
}

const validatereview=(req,res,next)=>{
    let {error} =reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        // res.status(400).send({errMsg});
        console.log(errMsg)
    }
    else{
        next();
    }
}





//Index Route
// app.get("/",(req,res)=>{
//     res.send("Hello World");
// })



  


//Demo user
// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"student@gmail.com",
//         username:"Bhanu"
//     });
//     const newUser=await User.register(fakeUser,"Bhanu@123")
//     res.send(newUser);
// })


//Model Testing
// app.get("/testlisting", async(req,res)=>{

//     let sampleListing = new Listing({
//         title: "My Village Villa",
//         description: "This is a beautiful village with a lot of greenery",
//         price:1200,
//         location: "Vizag",
//         country:"India"

//     })
//     await sampleListing.save();
//     console.log("Sample Saced");
//     res.send("Sample Listing Saved");
    

// })

app.set("views",path.join(__dirname,"views"));

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))

//this was the code to use in ejsmate according,but it is not working so we use another
// app.get("/listings",async (req,res)=>{
//     const allListings = await Listing.find();
//     res.render("listings/index.ejs",{key : allListings})
// });


//Import from controllers
const listingController=require("./controllers/listing.js");

//Our Buttons route
app.get('/listings', listingController.getListings);

app.get("/listings",(listingController.index));




const {isLoggedIn, isOwner, isReviewAuthor}=require("./mid.js");
const { log } = require("console");




//new listing
app.get("/listings/new",(listingController.renderNewForm));





//show route
app.get("/listings/:id",(listingController.showListing));







//create listing  (error handling using  try-catch)
// app.post("/listings",async(req,res,next)=>{
//     try{
//         let {title,description,price,location,country} = req.body;
//         let newListing = new Listing({
//             title:title,
//             description:description,
//             price:price,
//             location:location,
//             country:country
//         })
//          await newListing.save();
//          res.redirect("/listings");

//     }catch(err){
//         next(err);
//     }
// })



//Error handling using wrapAsync

// app.post("/listings",wrapAsync(async(req,res,next)=>{
//         let {title,description,price,location,country} = req.body;
//         let newListing = new Listing({
//             title:title,
//             description:description,
//             price:price,
//             location:location,
//             country:country
//         })
//          await newListing.save();
//          res.redirect("/listings");
// }));

// const {storage}=require("../cloudConfig.js");







app.post("/listings",upload.single("image"),wrapAsync(listingController.createListing));





//Edit the listing 
app.get("/listings/:id/edit",isLoggedIn,isOwner,listingController.editForm)

//Update the edited listing
app.put("/listings/:id",isLoggedIn,isOwner,upload.single("image"), wrapAsync(listingController.updateListing))



app.delete("/listings/:id",isLoggedIn,isOwner,listingController.destroyListing)



//Reviews

// app.post("/listings/:id/reviews",async(req,res)=>{
//     let {id} = req.params;
//     let listing=await Listing.findById(id);
//     let newreview=new Review(req.body.review);
//     await newreview.save();


//     listing.reviews.push(newreview);
//     // await review.save();
//     await listing.save();
//     res.redirect(`/listings/${id}`);

// })



//import for reviews
const ReviewController=require("./controllers/review.js");

app.post("/listings/:id/reviews",validatereview,isLoggedIn, wrapAsync(ReviewController.createReview));




//Delete review
app.delete("/listings/:id/reviews/:reviewId", isLoggedIn,isReviewAuthor, wrapAsync(ReviewController.destroyReview))



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


const userController=require("./controllers/user.js");
//Signup 
app.get("/signup",userController.renderSignUpForm)




//data of signed users tto put into database
app.post("/signup",userController.signUp)





//Login user
app.get("/login",userController.renderLoginForm)



app.post("/login",saveRedirectUrl,passport.authenticate('local',
    {failureRedirect: '/login',failureFlash: true}), async(req, res) => {
        req.flash("success","Welcome to the wanderlust");
        let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
)




//logout
app.get("/logout",userController.logout)