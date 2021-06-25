const router = require (`express`).Router()
const Controller = require("../controller/controller")
const {authentication, authorization} = require(`../middlewares/auth`)


router.post(`/register`, Controller.register)
router.post(`/login`, Controller.login)

router.use(authentication)
router.get(`/todos`, Controller.getTodos)
router.post(`/todos`, Controller.postTodo)
router.get(`/todos/:id`, Controller.findTodo)

router.use(`/todos/:id`, authorization)
router.put(`/todos/:id`, Controller.putTodo)
router.patch(`/todos/:id`, Controller.patchTodo)
router.delete(`/todos/:id`, Controller.deleteTodo)


module.exports = router