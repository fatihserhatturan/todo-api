const mongoose =require("mongoose")


const todoSchema = new mongoose.Schema({

    cardID:{
        type:String,
        required:true,
        trim: true
     }

},{
    collection:"Trello",timestamps:true
})

const trello =mongoose.model("Trello",todoSchema)

module.exports= trello


