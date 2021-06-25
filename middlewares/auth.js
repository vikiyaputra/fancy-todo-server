const {User, Todo} = require(`../models`)
const {verifyToken} = require(`../helpers/jwt`)


function authentication(req, res, next){
    try {
        let userDecoded = verifyToken(req.headers.token)
        User.findByPk(userDecoded.id)
        .then(user=>{
                if(!user){
                    throw {message: "Authentication Failed"}
                }
                req.currentUser = user // cara pertama
                // res.locals.user = user // Cara ke2                
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

module.exports = {authentication, authorization}