const todo= require("../Models/todoModel")

const sortEarly = async(req,res)=>{
    try {
        const data = await todo.find();

        const today = new Date();
        today.setHours(0, 0, 0, 0);



        const sortedData = data.sort((a, b) => {

          const dateA = new Date(a.lastday);

          const dateB = new Date(b.lastday);
          console.log(dateA);
          return dateA - dateB;
        });



       // res.status(200).json(sortedData);
       return res.status(200).json({
        success:true,
        data:sortedData
    })
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}

const sortLate = async(req,res)=>{

    try {
        const data = await todo.find();

        const today = new Date();
        today.setHours(0, 0, 0, 0);



        const sortedData = data.sort((a, b) => {

          const dateA = new Date(a.lastday);

          const dateB = new Date(b.lastday);
          console.log(dateA);
          return dateB-dateA;
        });



        return res.status(200).json({
          success:true,
          data:sortedData
      })
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


module.exports={

    sortEarly,
    sortLate

    }
