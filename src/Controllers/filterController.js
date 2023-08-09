const todo= require("../Models/todoModel")

const FilterCategory = async(req,res)=>{


    try {

        const filteredTodos= await todo.find({
            category:req.body.category
        })

        if (filteredTodos.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Kayit Bulunamadi',
                data: [] // Boş bir dizi dönüyoruz
            });
        }

        return res.status(200).json({
            success: true,
            data: filteredTodos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Bir hata oluştu'
        });
    }

}

module.exports={

FilterCategory
}
