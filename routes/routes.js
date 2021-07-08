const router = require (`express`).Router()
const userRoutes = require(`./userRoutes`)
const todoRoutes = require(`./todoRoutes`)
const apiRoutes = require(`./apiRoutes`)


router.use(`/`, userRoutes)
router.use(`/todos`, todoRoutes)
router.use(`/api`, apiRoutes)


// router.post(`/register`, Controller.register)
// router.post(`/login`, Controller.login)

// router.use(authentication)
// router.get(`/todos`, TodoController.getTodos)
// router.post(`/todos`, TodoController.postTodo)
// router.get(`/todos/:id`, TodoController.findTodo)

// router.use(`/todos/:id`, authorization)
// router.put(`/todos/:id`, TodoController.putTodo)
// router.patch(`/todos/:id`, TodoController.patchTodo)
// router.delete(`/todos/:id`, TodoController.deleteTodo)


module.exports = router