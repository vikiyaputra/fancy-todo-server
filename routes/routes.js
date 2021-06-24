const express = require (`express`)
const Controller = require("../controller/controller")
const router = express.Router()
const {verifyToken} = require(`../helpers/jwt`)
const {User, Todo} = require(`../models`)

function authentication(req, res, next){
    try{
        let userDecoded = verifyToken(req.headers.token)
        console.log(userDecoded);
        User.findByPk(userDecoded.id)
        .then(user=>{
                if(!user){
                    throw {message: "Authentication Failed"}
                }
                req.currentUser = user // cara pertama
                // res.locals.user = user // Cara ke2
                console.log(`HAHAHAHAHHAHA`);
                
                next()
            })
            .catch(err=>{
                res.status(401).json(err)
            })
        } catch(err){
        res.status(500).json(err)
    }

}

function authorization(req, res, next){
    Todo.findByPk(req.params.id)
        .then(data=>{
            if(!data){
                throw {message: "Todo not found"}
            } 


            if(data.UserId !== req.currentUser.id){
                throw {
                    message: "you are not authorised",
                    code: 401
                }
            } else {
                next()
            }

        })
        .catch(err=>{
            code = err.code || 500
            res.status(code).json(err)
        })
}



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