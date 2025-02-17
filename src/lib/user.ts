import { Strategy as LocalStrategy } from "passport-local";
import { createUserToken, findUserByEmailAndPassword } from "../services/user";
import { RequestHandler } from "express";
import passport from "passport";
import { User } from "../types/types.user";

type LocalStrategyResponse = {
  auth: {
    token: string;
  };
  findUser: User;
}

//PRIMEITO PASSO: CRIAR A ESTRATÉGIA DE AUTENTICAÇÃO LOCAL
//SEGUNDO PASSO: CRIAR O MIDDLEWARE DE AUTENTICAÇÃO LOCAL
export const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    // check if the user exists
    console.log("email:", email);
    console.log("password:", password);

    const findUser = await findUserByEmailAndPassword(email, password);
    if(findUser){
      const token = createUserToken(findUser);
      const response: LocalStrategyResponse  = {
        auth: { token },
        findUser     
      }
      return done(null, response);
    } else {
        return done(null, false);
    }
  });

  export const localStratgyAuth: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate('local', 
      (err:any, response:LocalStrategyResponse | undefined)=>{
        //console.log(auth);
        if(response){
          req.user = response.findUser;
          req.authInfo = response.auth;
          return next();
        }
        return res.status(401).json({message: 'Unauthorized'});
    });
    authRequest(req, res, next);
  };