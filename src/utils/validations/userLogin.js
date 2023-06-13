import Joi from "joi"

const userLoginSchema = Joi.object({
    email : Joi.string().required(),
    password : Joi.string().required(),
})





export default userLoginSchema;