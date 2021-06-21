const {Todo} = require(`../models/index.js`)

class Controller {
    static getTodos(req, res){
        Todo.findAll({order:[[`id`,`ASC`]]})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({ message: "Todos not found"
            })
        })
    }

    static postTodo(req, res){
        let {title,description,status,due_date} = req.body
        Todo.create({
            title,
            description,
            status,
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
        Todo.update({title,description,status,due_date},{where:{id:req.params.id}, returning:true})
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
}


module.exports = Controller