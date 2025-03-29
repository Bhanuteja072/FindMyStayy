const User=require("../Models/user")

module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}


module.exports.signUp=async(req,res)=>{
    try {
        let{username,email,password}=req.body;
        // console.log(username);
        const newUser=new User({email,username})
        const registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to the wanderlust");
            res.redirect("/listings");
        })
        console.log(registeredUser);
        // req.flash("success","Welcome to the wanderlust");
        // res.redirect("/listings");
        
    } catch (error) {
        // req.flash("error","Username already exist")
        
        res.send(error)
        
    }

    
}


module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out");
        res.redirect("/listings");
    })
}