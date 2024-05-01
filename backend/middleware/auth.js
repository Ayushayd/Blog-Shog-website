import {catchAsyncErrors} from '../middleware/catchAsyncError.js'
import {User} from '../models/userSchema.js'
import ErrorHandler from '../middleware/error.js'
import jwt from 'jsonwebtoken'


//AUTHENTICATION
export const isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User is not authenticated", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    next();
});


//AUTHORIZATION
export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`User with role(${req.user.role}) is not allowed to access resource`));
        }
        next();
    };
};