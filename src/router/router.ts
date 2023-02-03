import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import LoginRegister from "../controllers/GestionUser";

const router: Router = Router();

class  RouterUser extends LoginRegister
{
    public Login() {
        
        router.post( "/login", this.LoginAuth);
        return router;
    }
    
     public registerAdmin(){
        router.post( "/register", this.RegisterUser);
        return router;       
     }
     public registerUser(){
        router.post( "/registerUser", this.loginUser);
        return router;       
     }

     public recoveryPass(){
        router.post( "/recovery", this.recoveryPassword)
        return router;
   }
   
      public veryfiCod(){
        router.post( "/recoverycode", this.veryfidCode)
        return router;
     }
     public newPassword(){
       return router.post("/newPass",this.newPassAdmin)
   }
   public authGoogle(){
       return router.post("/authgoogleAccount",this.passpAuthGoogle)
     }
 
    }
    

export default RouterUser;



        

