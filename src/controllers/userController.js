import jwt from 'jsonwebtoken';

import User from '../models/user';
import { userSchema, userLoginSchema } from '../utils/validations';
import { encode, getPurePassword} from '../utils/functions/encodePassword';
import reportJoiError from '../utils/functions/reportError';


const createUserAccount = async (req, res) => {

    try {
       const validatInput=userSchema.validate(req.body)
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

        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(401).send(`Incorrect username or password`);
        const decodedPassword = await getPurePassword(password, user.password);
        if (password != decodedPassword) res.status(401).send(`Incorrect username or password`);

        let userInfo = {
            username: user.username,
            email: user.email,
            username:user.username
        }

        jwt.sign({ userInfo }, process.env.SECRET_KEY, { expiresIn: '2m' }, (err, token) => {
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

const getClientInfo = async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(404).send("Bad request");
      }
      const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
      res.status(200).json({
        success: true,
        data: { decodedToken } 
      });
    } catch (error) {
      throw error;
    }
  }
  








export { createUserAccount, clientLogin,getClientInfo }
