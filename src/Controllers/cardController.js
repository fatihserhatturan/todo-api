const todo= require("../Models/cardIDModel")

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
