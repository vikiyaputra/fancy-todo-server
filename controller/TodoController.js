const {Todo, User} = require(`../models/index.js`)
const axios = require(`axios`)


class TodoController {
    static getTodos(req, res, next){
        // console.log(req.currentUser.id);
        Todo.findAll({
            where:{ UserId: req.currentUser.id },
            order: [[`id`,`ASC`]]
        })
            .then(data =>{
                if (data.length === 0){
                    throw {
                        code: 404,
                        name: "Todo not found"
                    }
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err=>{
                next(err)
                // let status = err.code || 500
                // res.status(status).json(err)
            })
    }

    static postTodo(req, res, next){
        let {title,description,status,due_date} = req.body
        console.log(req.body);
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
            next(err)
            // if(err.name === "SequelizeValidationError"){
            //     res.status(400).json({error:err.name})
            // } else {
            //     res.status(500).json(err)
            // }
        })
    }

    static findTodo(req, res, next){
        Todo.findOne({where:{id:req.params.id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
            // res.status(500).json(err)
        });
    }

    static putTodo(req, res, next){
        let {title,description,status,due_date} = req.body
        Todo.update({title,description,status,due_date},{
            where: {id:req.params.id}, 
            returning: true
        })
            .then(data=>{
                if(data[0] === 0){
                    throw {name: "Todo not Found"}
                } else {
                    res.status(200).json({Todo:data[1][0]})
                }
            })
            .catch(err=>{
                next(err)
                // if(err.name === "SequelizeValidationError"){
                //     res.status(400).json({message:"Validation Error"})
                // } else {
                //     res.status(500).json(err)
                // }
            });
    }

    static patchTodo (req, res, next){
        let {status} = req.body
        Todo.update({status}, {where:{id:req.params.id}, returning:true})
        .then(data=>{
            if(data[0] === 0){
                throw {name: "Todo not Found"}
                // res.status(404).json({message: "Todo not Found"})
            } else {
                res.status(200).json({Todo:data[1][0]})
            }
        })
        .catch(err=>{
            next(err)
            // if(err.name === "SequelizeValidationError"){
            //     res.status(400).json({name: "Validation Error"})
            // } else {
            //     res.status(500).json(err)
            // }
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

    static deleteTodo(req, res, next){
        let deletedData
        Todo.findOne({where:{id:req.params.id}})
        .then(data=>{
            deletedData = data
            return Todo.destroy({where:{id:req.params.id}})
        })
        .then(data =>{
            if(data === 0){
                throw {message: "Todo not Found"}
                // res.status(404).json({message: "Todo not Found"})
            } else {
                res.status(200).json([{message: "succesfully deleted"},deletedData])
            }

        })
        .catch(err=>{
            next(err)
            // res.status(500).json(err)
        });
    }
}


module.exports = TodoController