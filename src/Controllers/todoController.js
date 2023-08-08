const todo= require("../Models/todoModel")

const todoAdd= async(req,res)=>{
    console.log(req.body)
    try {
        const _todo= await todo.findOne({
            name:req.body.name
        })
        if(_todo){
            return res.status(400).json({
                success:false,
                message:"Bu isimde Kayit Mevcut"
            })
        }
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
    todoAdd
}
