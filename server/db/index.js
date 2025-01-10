const mongoose = require ('mongoose');

mongoose.connect("mongodb://localhost:27017/MiniProject")
.then(()=>{
    console.log("Connected to the database")
})
.catch(err =>console.log(err))