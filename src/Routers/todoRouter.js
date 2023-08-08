const router= require("express").Router()
const todoController = require("../Controllers/todoController")

router.post("/todo",todoController.todoAdd)

router.get("/todo",todoController.todoGetAll)

router.put("/todo/:id",todoController.todoUpdate)

module.exports=router
