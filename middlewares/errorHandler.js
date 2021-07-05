function errorHandler (err, req, res, next){
    // console.log(err.message);
    let code
    let message

    switch (err.name) {
        case "JsonWebTokenError":
            code = 401
            message = "Authentication Failed"
            break;
        
        case "Email / Password Salah":
            code = 401
            message = "Email / Password Salah"
            break;
            
        case "Authentication Failed":
            code = 401
            message = "Authentication Failed"
            break;

        case "You are not Authorized":
            code = 401
            message = "You are not Authorized"
            break;

        case "Todos not found":
            code = 404
            message = "Todo not found"
            break;

        case "SequelizeValidationError":
            let errors = []
            for (let i = 0; i < err.errors.length; i++){
                errors.push(err.errors[i].message)
            }
            code = 400
            message = errors
            break;
        
        case "SequelizeUniqueConstraintError":
            message = err.errors[0].message
            code =  500
            break;

    
        default:
            code = 500
            message = "Internal Server Error"
            break;
    }


    res.status(code).json({
        message,
        errDev: err
    })
}

module.exports = {errorHandler}