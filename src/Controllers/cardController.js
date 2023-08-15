const todo= require("../Models/cardIDModel")
const axios = require('axios');

const cardAdd= async(req,res)=>{

    console.log(req.body)
    try {

        const todoAdd= new todo(req.body)

        await todoAdd.save()
        .then(()=>{

            return res.status(201).json(todoAdd)

        })


        .catch((err)=>{
            return res.status(400).json({
                success:false,
                message:"Kayit Oluşturulurken Bir Hata Meydana Geldi..."+err
            })
        })
        /*
        const postdata = {

            cardID: '64d5113de931557c1c2dc7c7fattiturn'

        }*/


      //  const response = await axios.post('http://localhost:5000/api/card',postdata);

        console.log('API Yaniti:', response.data);



    } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Sunuucu Hatasi!"
    })
    }

}

module.exports={
    cardAdd


}
