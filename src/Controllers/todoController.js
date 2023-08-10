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

const todoGetAll = async(req,res)=>{
    const {page} = req.query
    const limit=5
    const skip=Number(page-1)*limit
try {
    const todoGetAll= await  todo.find({}).limit(limit).skip(skip)
    return res.status(200).json({
        success:true,
        data:todoGetAll
    })
} catch (error) {
    return res.status(500).json({
        success:false,
        message:"Kayit Getirme İslemi Basarisiz"
    })

}

}

const todoUpdate = async(req,res)=>{
    const{id}=req.params
    try {
        const todoUpdate=await todo.findByIdAndUpdate(id,req.body)
        if(todoUpdate){
            return res.status(200).json({
                success:true,
                message:"Guncelleme Basarili"
            })
        }
        else return res.status(400).json({
            success:false,
            message:"Güncelleme Islemi Basarisiz Oldu"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Kayit Güncellenemedi"
        })

    }

}

const todoDelete = async(req,res)=>{

    const{id}=req.params

    try {
        const todoDelete= await todo.findByIdAndDelete(id)
        if(todoDelete){
            return res.status(200).json({
                success:true,
                message:"Kayit Silindi"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Kayit Silme Islemi Basarisiz:"+error
            })
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Kayit Silinemedi"
        })

    }
}

const todoGet = async(req,res)=>{
    const{id}=req.params

    const todoGet = await todo.findById(id)

    if(todoGet){
        return res.status(200).json(todoGet)
    }

    else {
        return res.status(404).json({
            success:true,
            message:"Kayit Bulunamadi"
        })
    }

}


module.exports={
    todoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete,
    todoGet
}
