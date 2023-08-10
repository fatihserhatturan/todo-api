
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Başariyla veritabanina Bağlanildi");
})
.catch((err)=>{
    console.log("Veritabanina Bağlanilamadi:"+err);
})

