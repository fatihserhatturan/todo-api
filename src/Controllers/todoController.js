const todo= require("../Models/todoModel")
const cardid= require("../Models/cardIDModel")
const Trello = require('node-trello');
const trello = new Trello('3d03980882bec6776becfed7a8d74932', 'ATTAaa891ab7344037bc73fb2de5fe420722889d26ec907813d91ee208f5590638a7318EFFA0');

async function getTargetCardID() {
    try {
        // Veritabanından hedef veriyi çekin (örneğin, bir belirli kriterle)
        const targetTodo = await cardid.findOne({  }).exec();

        if (targetTodo) {
            const targetCardID = targetTodo.cardID;

            // Daha sonra bu targetCardID'yi kullanarak Trello API işlemlerini yapabilirsiniz
            console.log('Hedef kart ID:', targetCardID);
            return targetCardID;



        } else {
            console.log('Veri bulunamadi.');
        }
    } catch (error) {
        console.error('Veri çekilirken hata oluştu:', error);
    }
}

const todoAdd= async(req,res)=>{

    const targetListID = await getTargetCardID();

    // Daha sonra bu targetCardID değerini kullanabilirsiniz
    console.log('Ana fonksiyon içinde hedef kart ID:', targetListID);


   // console.log(req.body)
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

        trello.post('/1/cards', { name:req.body.name , idList: targetListID }, (err, data) => {
            if (err) throw err;
            console.log('Kart oluşturuldu:', data);
        });

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


    const targetListID = await getTargetCardID();


    try {
        const targetCardName = await todo.findById(id);
        console.log("girdi");
        console.log(req.body.name)


        if(req.body.name){
            console.log("girdi");


        trello.get(`/1/lists/${targetListID}/cards`, (err, cards) => {
            if (err) {
                console.error('Kartlar alinamadi:', err);
            } else {
                // Kart listesini döngü ile gez
                console.log("girdi");
                for (const card of cards) {
                    console.log(card.name);
                    if (card.name === targetCardName.name) {
                        const targetCardID = card.id;
                        console.log(`Hedef kartin ID'si: ${targetCardID}`);

                        trello.put(`/1/cards/${targetCardID}`, { name:req.body.name }, (err, data) => {
                            if (err) throw err;
                            console.log('Kart güncellendi:', data);
                        });
                        break; // Eşleşme bulunduğunda döngüyü sonlandır
                    }
                }
            }
        });

    }



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

    const targetListID = await getTargetCardID();


    const{id}=req.params

    const targetCardName = await todo.findById(id);

    try {

        trello.get(`/1/lists/${targetListID}/cards`, (err, cards) => {
            if (err) {
                console.error('Kartlar alinamadi:', err);
            } else {


                // Kart listesini döngü ile gez
                for (const card of cards) {

                    if (card.name === targetCardName.name) {
                        console.log(targetCardName.name)
                        const targetCardID = card.id;
                        console.log(`Hedef kartin ID'si: ${targetCardID}`);

                        trello.del(`/1/cards/${targetCardID}`, (err, data) => {
                            if (err) throw err;
                            console.log('Kart silindi.');
                        });

                        break; // Eşleşme bulunduğunda döngüyü sonlandır
                    }
                }
            }
        });




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
