const AppError = require('../utilts/AppError')

const res = (...roles)=>{
    return (req,res,next)=>{
        const user=req.user;
        if(!roles.includes(user.role)){
            throw new AppError("you are not allowed to access this route",403)
        } 
        next();   

    }
};

module.exports = res;