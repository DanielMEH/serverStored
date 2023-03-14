import { Router } from "express";
import LoginRegister from "../controllers/GestionUser";
import fileUpload from "express-fileupload"
const router: Router = Router();
import path from "path"
class  RouterUser extends LoginRegister
{
    public Login() {
        
        router.post( "/login", this.LoginAuth);
        return router;
    }
    
     public registerAdmin(){
        router.post( "/register", this.AdminRegister);
        return router;       
     }
     public registerUser(){
        router.post( "/registerUser", this.RegisterUsuario);
        return router;       
     }
     public getDataAdmin(){

      router.get("/getDataAdmin", this.getAdminData)
      return router
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
   public uploadCsvUsers(){
       return router.post("/uploadcsvUsers",fileUpload( {
         useTempFiles: true,
         
         tempFileDir: path.join( __dirname, "/uploadcsv" )
     } ),this.uploadusersCsv)
     }
     public getUsersAdmin(){
      return router.get("/getUsersData/:idToken",this.getUsersAdminData)


     }
     public UsersDelete(){
      return router.post("/deleteUser",this.deleteAllUsers)


     }
     public GetCountUsers(){
      return router.get("/countUsers/:idToken",this.CountUsersAll)


     }

     public GetModuleUsers(){
      return router.get("/getModuleUsers/:id",this.getModuleUsers)
     }

     public GetPermisions(){
      return router.get("/getPermisions/:idModule",this.getPermisions)
     }

     public UpdateAdmin(){
      return router.post("/updateAdmin",this.updateAdmin)
     }

     public DeleteModuleUser(){
      return router.post("/deleteModuleUser",this.deleteModule)
     }
     
     public SetModuleUsers(){
      return router.post("/setModule",this.setModule)
     }

     public SetPermisionModule(){
      return router.post("/setPermisionModule/:idModule",this.setPermisionModule)
     }

     public DeletePermisionModule(){
      return router.post("/deletePermisionModule/:idModule",this.deletePermisionModule)
     }

      public GetMod(){
      return router.get("/getMod/:id",this.getMod)
      }

      public getAdminDataALL(){
        return router.get("/getAdminAll/:id",this.getAdminAll)
      }
      public UpdateAdminALL(){
        return router.put("/updateAdminALL",this.UpdateAdminAll)
      }
      public uploadImageAdmin(){
        return router.put("/AuploadImageA",fileUpload({
          useTempFiles:true,
          tempFileDir : "./uploads"
        }),this.uploadImageA)
      }
    }
    

export default RouterUser;



        

