import Joi from "joi"

const userSchema = Joi.object({
    email : Joi.string().required(),
    username : Joi.string().min(2).required(),
    password : Joi.string().min(6).required(),
   
})





export default userSchema;