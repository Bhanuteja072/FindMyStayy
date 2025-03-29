const mongoose = require("mongoose");
const initData=require("./data.js");
const Listing=require("../Models/Listing.js");
 


const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((error)=>{
        console.log("Error connecting to MongoDB");
    })



async function main() {
    await mongoose.connect(MONGO_URL);
    
}


const initDb= async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"67dee640b21d6a63f6d401cd"}));
    await Listing.insertMany(initData.data);
    console.log("Database initialized");

}
initDb();

