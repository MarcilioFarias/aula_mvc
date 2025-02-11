import { Strategy as LocalStrategy } from "passport-local";
import { createUserToken, loginUser } from "../services/user";
import { RequestHandler } from "express";
import passport from "passport";

type LocalStrategyResponse = {
  auth: {
    token: string;
  };
  findUser: any;
}

//PRIMEITO PASSO: CRIAR A ESTRATÉGIA DE AUTENTICAÇÃO LOCAL
//SEGUNDO PASSO: CRIAR O MIDDLEWARE DE AUTENTICAÇÃO LOCAL
export const localStrategy = new LocalStrategy(
  {
    usernameField: "login",
    passwordField: "password",
  },
  async (email, password, done) => {
    // check if the user exists
    console.log("email", email);
    console.log("password", password);

    const findUser = await loginUser(email, password);
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
      (err:any, auth:LocalStrategyResponse | null)=>{
        console.log(auth);
    });
  };