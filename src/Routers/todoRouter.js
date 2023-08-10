const router= require("express").Router()
const todoController = require("../Controllers/todoController")
const filtercontroller = require("../Controllers/filterController")
const sortController = require("../Controllers/sortController")

router.post("/todo",todoController.todoAdd)

router.get("/todo",todoController.todoGetAll)

router.put("/todo/:id",todoController.todoUpdate)

router.delete("/todo/:id",todoController.todoDelete)

router.get("/todo/:id",todoController.todoGet)

router.post("/filter/category",filtercontroller.FilterCategory)

router.post("/filter/importance",filtercontroller.filterİmportance)

router.post("/filter/complete",filtercontroller.filterComplete)

router.get("/sort/early",sortController.sortEarly)

router.get("/sort/late",sortController.sortLate)

module.exports=router
