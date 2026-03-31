const AppError = require("../utilts/AppError")

const validate = (schema)=>{
    return (req,res,next)=>{
        if (!req.body||Object.keys(req.body).length===0) {
            throw new AppError("Request body is required",400)
        }
        const {error}=schema.validate(req.body)
        if(error){
            throw new AppError(error.details[0].message,400)
        }
        next()
    }
}
module.exports = validate