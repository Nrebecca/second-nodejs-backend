import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import {param} from "express-validator";


dotenv.config();

class TokenAuth {
   /** 
    *Generate token
   *@static
   *@param{object}data object
   *@memberof TokenAuth
   *@return{string} token
   */
   static tokenGenerator(data) {
      const token = jwt.sign(data, process.env.JWT_KEY);

      return token;
   }
   static decodeToken(token) {
      try {
         const data = jwt.verify(token, process.env.JWT_KEY);
         return data
      }
      catch (er) {
         return er
      }
   }
}

export default TokenAuth