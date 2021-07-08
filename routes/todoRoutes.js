const router = require(`express`).Router()
const TodoController = require("../controller/TodoController")
const {authentication, authorization} = require(`../middlewares/auth`)

router.use(authentication)
router.get(`/`, TodoController.getTodos)
router.post(`/`, TodoController.postTodo)
router.get(`/:id`, TodoController.findTodo)

router.use(`/:id`, authorization)
router.put(`/:id`, TodoController.putTodo)
router.patch(`/:id`, TodoController.patchTodo)
router.delete(`/:id`, TodoController.deleteTodo)

module.exports = router