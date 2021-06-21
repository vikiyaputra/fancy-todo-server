const express = require (`express`)
const Controller = require("../controller/controller")
const router = express.Router()

router.get(`/todos`, Controller.getTodos)
router.post(`/todos`, Controller.postTodo)
router.get(`/todos/:id`, Controller.findTodo)
router.put(`/todos/:id`, Controller.putTodo)
router.patch(`/todos/:id`, Controller.patchTodo)
router.delete(`/todos/:id`, Controller.deleteTodo)





module.exports = router