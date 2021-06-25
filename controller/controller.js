const {Todo, User} = require(`../models/index.js`)
const {comparePassword} = require(`../helpers/bcrypt`)
const {generateToken} = require(`../helpers/jwt.js`)


class Controller {
    static getTodos(req, res){
        // console.log(req.currentUser.id);
        Todo.findAll({
            where:{ UserId: req.currentUser.id },
            order: [[`id`,`ASC`]]
        })
            .then(data =>{
                if (data.length === 0){
                    throw {
                        code: 404,
                        message: "Todos not found"
                    }
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err=>{
                let status = err.code || 500
                res.status(status).json(err)
            })
    }

    static postTodo(req, res){
        let {title,description,status,due_date} = req.body
        let UserId = req.currentUser.id
        Todo.create({
            title,
            description,
            status,
            UserId,
            due_date: new Date(due_date)
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err=>{
            if(err.name === "SequelizeValidationError"){
                res.status(400).json({error:err.name})
            } else {
                res.status(500).json(err)
            }
        })
    }

    static findTodo(req, res){
        Todo.findOne({where:{id:req.params.id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        });
    }

    static putTodo(req, res){
        let {title,description,status,due_date} = req.body
        Todo.update({title,description,status,due_date},{
            where: {id:req.params.id}, 
            returning: true
        })
            .then(data=>{
                if(data[0] === 0){
                    res.status(404).json({message: "Todo not Found"})
                } else {
                    res.status(200).json({Todo:data[1][0]})
                }
            })
            .catch(err=>{
                if(err.name === "SequelizeValidationError"){
                    res.status(400).json({message:"Validation Error"})
                } else {
                    res.status(500).json(err)
                }
            });
    }

    static patchTodo (req, res){
        let {status} = req.body
        Todo.update({status}, {where:{id:req.params.id}, returning:true})
        .then(data=>{
            if(data[0] === 0){
                res.status(404).json({message: "Todo not Found"})
            } else {
                res.status(200).json({Todo:data[1][0]})
            }
        })
        .catch(err=>{
            if(err.name === "SequelizeValidationError"){
                res.status(400).json({message:"Validation Error"})
            } else {
                res.status(500).json(err)
            }
        });
    }

    // static deleteTodo(req, res){
    //     Todo.destroy({where:{id:req.params.id}, returning:true})
    //     .then(data=>{
    //         console.log(data);
    //         if(data === 0){
    //             res.status(404).json({message: "Todo not Found"})
    //         } else {
    //             console.log(data[1][0]);
    //             res.status(200).json({message: "Todo success to delete"})
    //         }
    //     })
    //     .catch(err=>{
    //         res.status(500).json(err)
    //     });
    // }

    static deleteTodo(req, res){
        let deletedData
        Todo.findOne({where:{id:req.params.id}})
        .then(data=>{
            deletedData = data
            return Todo.destroy({where:{id:req.params.id}})
        })
        .then(data =>{
            if(data === 0){
                res.status(404).json({message: "Todo not Found"})
            } else {
                res.status(200).json([{message: "succesfully deleted"},deletedData])
            }

        })
        .catch(err=>{
            res.status(500).json(err)
        });
    }

    static register (req, res){
        const {name, email, password, type} = req.body
        User.create({name, email, password, type}, {returning:true})
            .then(data =>{
                console.log(data);
                res.status(200).json(data.email)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }

    static login (req, res){
        const {email, password} = req.body
        User.findOne({where:{email}})
        .then(data=>{
            if(!data){
                throw {message: `Email / Password Salah`}
            }
            if(comparePassword(password, data.password)){
                let token = generateToken({id: data.id, name: data.name, email: data.email, type:data.type})
                res.status(200).json({token})
            } else {
                throw {message: `Email / Password Salah`}
            }
        })
        .catch(err =>{
                res.status(500).json(err)
            })
    }
}


module.exports = Controller