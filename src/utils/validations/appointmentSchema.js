import Joi from "joi"

const appointmentSchema = Joi.object({
    user_id : Joi.required(),
    pharmasist_id : Joi.required(),
    
   
})

export default appointmentSchema;