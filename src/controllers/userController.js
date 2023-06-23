import jwt from 'jsonwebtoken';

import {User,Appointment} from '../models/user.js';
import { userSchema, userLoginSchema,appointmentSchema } from '../utils/validations/index.js';
import { encode, getPurePassword } from '../utils/functions/encodePassword.js';
import reportJoiError from '../utils/functions/reportError.js'


const createUserAccount = async (req, res) => {

  try {
    const validatInput = userSchema.validate(req.body)
    if (validatInput.error) return reportJoiError(validatInput, res);
    req.body.password = await encode(req.body.password);
    let user = User.create(req.body)
    if (user) res.status(200).json({
      message: 'You have successfully created account',
      result: req.body
    })

  } catch (error) {
    console.error(error);
    res.status(500).send(`500 Internal error : ${error}`);
  }

}

const clientLogin = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;

    const prepareValidation = userLoginSchema.validate(req.body);
    if (prepareValidation.error) return reportJoiError(prepareValidation, res);

    const user = await User.findOne({ where: { email:email } })

    
    if (!user) return res.status(401).send(`Incorrect username or password`);
    const decodedPassword = await getPurePassword(password, user.password);
    if (password != decodedPassword) return res.status(401).send(`Incorrect username or password`);

    let userInfo = {
      username: user.username,
      email: user.email,
      username: user.username
    }

    jwt.sign({ userInfo }, process.env.SECRET_KEY, { expiresIn: '20m' }, (err, token) => {
      if (err) return console.error(err);
      res.status(200).json({
        message: 'Logged in successfully',
        token: token
      })
    });


  } catch (error) {
    console.log(error);
    res.send(`500 Server Error : `, error);
  }
}

const isSecure = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(404).send("Bad request");
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(`Happening now : ${error}`)
    res.status(400).json({
      error
    })
  }
}
const getUser = async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findOne({ where: { userId:userId } });
  if (user) {
    res.json({ result: user })
  } else {
    res.status(404).json({ message: 'User not found' })
  }

}
const getUsers = async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findAll();
  if (user) {
    res.json({ result: user })
  } else {
    res.status(404).json({ message: 'No record found' })
  }
}


const createAppointment=async(req,res)=>{

let newAppointment=await Appointment.create(req.body);
if(newAppointment){
  res.status(200).json({
    message:"appointment created succesfully ",
    result:newAppointment
})
}else{
  res.status(404).send("could not create appointment ")
}

}










export { createUserAccount, clientLogin,createAppointment, isSecure, getUser,getUsers }
