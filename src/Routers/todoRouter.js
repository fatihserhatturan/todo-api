const router= require("express").Router()
const todoController = require("../Controllers/todoController")
router.post("/todo",todoController.todoAdd)
module.exports=router
