const {User} = require(`../models/index.js`)
const {comparePassword} = require(`../helpers/bcrypt`)
const {generateToken} = require(`../helpers/jwt.js`)
const axios = require(`axios`)


class UserController{

    static register (req, res, next){
        const {name, email, password, type} = req.body
        User.create({name, email, password, type}, {returning:true})
            .then(data =>{
                // console.log(data);
                res.status(200).json(data.email)
            })
            .catch(err =>{
                next(err)
                // res.status(500).json(err)
            })
    }

    static login (req, res, next){
        const {email, password} = req.body
        User.findOne({where:{email}})
        .then(data=>{
            if(!data){
                throw {name: `Email / Password Salah`}
            }
            if(comparePassword(password, data.password)){
                let token = generateToken({id: data.id, name: data.name, email: data.email, type:data.type})
                res.status(200).json({token, name:data.name})
            } else {
                throw {name: `Email / Password Salah`}
            }
        })
        .catch(err =>{
                next(err)
                // res.status(500).json(err)
            })
    }
}

module.exports = UserController