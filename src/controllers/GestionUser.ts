import bcrypt from "bcrypt";
import { Request, Response, NextFunction, response } from "express";
import {
  login,
  PersonRegister,
  UserRegister,
  forgotPassword,
  newPasswordAdmin,
} from "../interfaces/users";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // <--- this is the problem
import { sendMailAdmin } from "../libs/libs";
import { recoveryAdminPass } from "../libs/forGotPassword";
import { authUser } from "../auth/authUser";
import { recoveryUserPass } from "../libs/forgotPassUser";
import moment from "moment-es6";
// import { newPasswordUser } from "../interfaces/users";
let momet:any = moment
abstract class LoginRegister {

  public async veryfidCode(req: Request,
    res: Response,
    next: Partial<NextFunction>):Promise<Response | Request | any> {
    const conn = await conexion.connect();
    conn.query(`CALL ADMIN_SELECT_CODE('${req.body.data.email}')`, async ( error, rows ) => {
      for ( let i = 0; i < rows.length; i++ ) {
        if ( rows[i][0].codigo == parseInt(req.body.data.codigo) ) {
          return res.status(200).json( { message: "CODE_CORRECT", code:rows[i].codigo} );
        } else {
          return res.status(400).json( { message: "CODE_INCORRECT" } );
        }
      }
      
    })

}


public async getAdminData(req: any,
  res: Response,
  next: Partial<NextFunction>): Promise<Response | Request | any>{

    const conn = await conexion.connect()

    


  }
  public async AdminRegister(
    req: any,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    console.log(req.body);
    
    try {

      const data: PersonRegister = {
        correo: req.body.postDataAdmin.email,
        password: req.body.postDataAdmin.password,
        authCuenta: false,
        token: req.body.token,
        refreshToken: req.body.refreshToken,
        nameRol: "superAdmin"
        
      };
      
      const fecha = momet().format("YYYY-MM-DD");
      const hora = momet().format("HH:mm:ss");
        const roundNumber = 10;
        const encriptarPassword = await bcrypt.genSalt( roundNumber );
        const hasPassword = await bcrypt.hash( data.password, encriptarPassword );
        let state = ( data.authCuenta = true );
        let estado = "activo"
        const conn = await conexion.connect();
        conn.query( "SELECT * FROM admin", async ( error, rows ) => {
          for ( let i = 0; i < rows.length; i++ ) {
            if ( rows[i].correo == data.correo )
              return res.status(400).json( { message: "ERR_EXIST_EMAIL" } );
          }
           conn.query(
            `CALL ADMIN_INSERT_ACCOUNT('${data.correo}','${hasPassword}','${state}','${fecha}','${hora}','${data.nameRol}','${req.body.postDataAdmin.toggle}')`,
            ( error: Array<Error> | any, rows: any,fields ) => {
              
              
              if ( error ) {
                return res.status(401).json( { message: "ERROR_DATA_ADMIN", error: error } );
              }
              if ( rows ) {
                const token: any = jwt.sign(
                  { id: data.correo },
                  SECRET || "tokenGenerate",
                  { expiresIn: 60 * 60 * 24 }
                );
                const resultEmail = new sendMailAdmin().sendMailer( data.correo );
               
                
                return res.status(200).json( {
                  message: "USER_CREATE_SUCCESFULL",
                  token,
                  auht: data.authCuenta,
                } );
              }else{
                return res.status(400).json( { message: "ERROR_DATA_ADMIN" } );
              }
            }
          );
        } );
    } catch ( error: any ) {
    return res.status(500).json({message:"ERROR_SERVER"})
    }
  }

  public async LoginAuth(
    req: Partial<any>,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {

    console.log("hello");
    
    try {
      const data: login = {
        correo: req.body.postDataUser.email,
        password: req.body.postDataUser.password,
        authCuenta: true,
        token: req.body.token,
        refreshToken: req.body.refreshToken,
      };


      console.log("email: ", data.correo);
      const conn = await conexion.connect();
      
      
      
      conn.query(
        `CALL ADMIN_AUTH_LOGIN('${data.correo}')`,
        async ( error: Array<Error> | any, rows: any ) => {
          if ( error ) return res.status( 400 ).json( { message: "ERROR_DB", error: error } );
          if ( rows[0].length > 0 ) {
            
            const user = rows[0][0];
            const validPassword = await bcrypt.compare( data.password, user.password );
           if ( validPassword ) {
            console.log(rows[0][0].idUsers);
            const token: any = jwt.sign({id:rows[0][0].idUsers},
              SECRET || "authToken",
              {expiresIn: 60 * 60 * 24}
            
            );
            return res.status(200).json({message:"LOGIN_SUCCESSFULL",token,auth:true,
          rol:rows[0][0].rol})
            

           }else{
              return res.status(401).json({message:"ERROR_PASSWORD"})
           }
              
           
      }else
      return res.status(400).json( { message: "ERROR_AUTH_ADMIN" } );
      
        
     } );
    } catch ( error ) {

      return res.status(500).json( { message: "ERROR_AUTH_ADMIN", error: error } )

    }
  }

  public async passpAuthGoogle( req: Request,
    res: Response,
    next: Partial<NextFunction> ): Promise<Response | Request | any>{
    try {
      const conn = await conexion.connect();
      const {email, name, picture} = req.body.data;
      
      const fecha = momet().format("YYYY-MM-DD");
      const hora = momet().format("HH:mm:ss")
      conn.query( "SELECT * FROM admin  Where correo = ?",
        [email], async ( error: Array<Error> | any, rows: any ) => {

          if ( error ) return res.status( 400 ).json( { message: "ERROR_DB", error: error } );
         
         let rol ="superAdmin"
          if ( rows.length > 0 ) {
               
                 
                 conn.query("SELECT idUsers,rol FROM admin WHERE correo = ?",
                         [email], async ( error: Array<Error> | any, rows: any ) => {
                            if ( error ) return res.status( 400 ).json( { message: "ERROR_DB", error: error } );
                           
                            
                           if ( rows.length > 0 ) {
                              const token: any = jwt.sign(
                                    { id: rows[0].idUsers },
                                    SECRET || "tokenGenerate",
                                    { expiresIn: 60 * 60 * 24 }
                             );
                             return res.status( 200 ).json( {
                               message: "ADMIN_AUTH_SUCCESFULL_GOOGLE",
                               token: token,
                               auth: true,
                               rol: rows[0].rol,
                                
                             });
                             
                           } else {
                             return res.status( 400 ).json( { message: "ERROR_DATA_GOOGLE" } );
                           }
                         })
          } else {
            
          
            conn.query(`CALL AUTH_GOOGLE('${email}', '${name}', '${picture}','${fecha}','${hora}','${rol}')`, async ( error: Array<Error> | any, rows: any ) => {
                     if ( rows ) {
                        
                       conn.query("SELECT idUsers,rol FROM admin WHERE correo = ?",
                         [email], async ( error: Array<Error> | any, rows: any ) => {
                            if ( error ) return res.status( 400 ).json( { message: "ERROR_DB", error: error } );
                           if ( rows.length > 0 ) {
                              const token: any = jwt.sign(
                                    { id: rows[0].idAdmin },
                                    SECRET || "tokenGenerate",
                                    { expiresIn: 60 * 60 * 24 }
                             );
                             const resultEmail = new sendMailAdmin().sendMailer( email );
                             return res.status( 200 ).json( {
                               message: "ADMIN_AUTH_SUCCESFULL_GOOGLE",
                               token: token,
                               auth: true,
                               rol: rows[0].rol,
                                
                             });
                             
                           } 
                         })
                      }

                 })
         }
      })       
    } catch ( error ) {
      return res.status(500).json( { message: "ERROR_AUTH_ADMIN", error: error } )
      
    }
    }
  public async userRegister(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    try {
      let tokenIdAcc: any = req.headers["acc-token-data"];
      
      
      

      const verifyToken: Array<any> | any = jwt.verify( tokenIdAcc, SECRET )!;

      if ( verifyToken?.id ) {

      } else {
        return res.json( { messaje: "error token" } );
      }
    } catch (error) {
      res.status(400).send({ tokenError: error, message: "NOT_VERIFY_TOKEN" });
    }
  }

  public async RegisterUsuario(
    req: Partial<any>,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    
    
    try {
      let tokenIdAcc: any = req.headers["acc-token-data"];
      
      const verifyToken: Array<any> | any = jwt.verify( tokenIdAcc, SECRET )!;
      const data: login = {
        correo: req.body.postDataUserRegister.email ,
        password: req.body.postDataUserRegister.password,
        authCuenta: true,
        token: req.body.token,
        refreshToken: req.body.refreshToken,
      };
      
      console.log("hello");
      
      if ( verifyToken?.id ) {
        const fecha = momet().format("YYYY-MM-DD");
        const hora = momet().format("HH:mm:ss")
        const roundNumber = 10;
        const encriptarPassword = await bcrypt.genSalt( roundNumber );
        const hasPassword = await bcrypt.hash( data.password, encriptarPassword );
        const conn = await conexion.connect();
        conn.query( "SELECT * FROM account", async ( error, rows ) => {
          for ( let i = 0; i < rows.length; i++ ) {
            if ( rows[i].correo == data.correo )
              return res.json( { message: "ERR_MAIL_EXIST_USER", status: 302 } );
          
          }
         
          

          conn.query(
            `CALL CREATE_USER('${data.correo}','${hasPassword}','${fecha}','${verifyToken.id}','${hora}')`,(error,rows) => {
              console.log(error);
              console.log(rows);
              
              

            }
          );
          
        } );
      }else{
        console.log("error");
        
        return res.status(401).json({message:"N0T_ALLOWED"})

      }
       
      
    } catch ( error ) {
      console.log("error");
      
      res.status( 400 ).send( { message: "NOT_AUTORIZED" } );
    }
  }

  public async newPassUser(
    req: any,
    res: any,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    try {
      const conn = await conexion.connect();
      const { codigo, correo, newPassword } = req.body;
       const validate:any  = {
        correo: correo,
        codePass: codigo,
        newPassword: newPassword,
      };
      const expresiones = {
        password: /^.{4,20}$/,
      };
      if (expresiones.password.test(validate.newPassword)) {
        conn.query(
          "SELECT * FROM usuario WHERE correo = ? AND codigo = ?",
          [validate.correo, validate.codePass],
          async (error, rows) => {
            if (error) {
              return res.json({ message: "ERROR_NEW_PASS", error: error });
            }
            if (rows.length) {
              const password = await bcrypt.hashSync(validate.newPassword, 10);
              conn.query(
                "UPDATE usuario SET password = ? WHERE correo = ?",
                [password, validate.correo],
                (error, rows) => {
                  if (error)
                    return res.json({
                      message: "ERROR_UPDATE_PASS",
                      error: error,
                    });
                  if (rows) {
                    return res.json({ message: "PASS_UPDATE_SUCCESFULLY" });
                  }
                }
              );
            } else {
              return res.json({ message: "ERROR_NEW_PASS" });
            }
          }
        );
      } else {
        return res.json({ message: "EMAIL_NOT_VALID" });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  public async recoveryPassword(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    try {
      const conn = await conexion.connect();
      const { email } = req.body;
      const mail: forgotPassword = {
        correo: email,
      };
      conn.query(
        `CALL ADMIN_SELECT_EMAIL('${mail.correo}')`,
        [mail.correo],
        ( error, rows ) => {
          if ( error ) {
            return res.json( { message: error } );
          }
          if ( rows.length ) {
           const min = 100000;
            const max = 999999;
            let codeAcceso = Math.floor( Math.random() * ( max - min + 1 ) + min );

            conn.query(
              `CALL ADMIN_RECOVERY__PASSWORD_CODE('${mail.correo}','${codeAcceso }')`,
              ( error, rows ) => {
                if ( error )
                  return res.json( { message: "ERROR_CODE_WZ", err: error } );

                conn.query(
                  `CALL ADMIN_SELECT_CODE('${mail.correo}')`, ( error, rows ) => {
                    if ( error )
                      return res.json( {
                        message: "ERROR_CODE_OBTENER_CODE_SQL",
                      } );

                    if ( rows.length ) {
                      const resultCode = new recoveryAdminPass().sendCode(
                        rows[0][0].codigo,
                        mail.correo
                      );
                      return res.status(200).json( { message: "VERIFY",email:mail.correo} );
                    } else {
                      if ( error )
                        return res.json( {
                          message: "ERROR_CODE_OBTENER_CODE_SQL",
                        } );
                    }
                  }
                );
              }
            );
          } else {
            res.status( 401 ).json( { message: "EMAIL_NOT_EXIST" } );
          }
        }
      );
    } catch ( error ) {
      return res.status( 400 ).json( { error } );
    }
  }
  public async newPassAdmin(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    try {
      const conn = await conexion.connect();
      const { codigo, correo, newPassword } = req.body.data;
      const validate: newPasswordAdmin = {
        correo: correo,
        codePass: codigo,
        newPassword: newPassword,
      };
      const roundNumber = 10;
        const encriptarPassword = await bcrypt.genSalt( roundNumber );
        const hasPassword = await bcrypt.hash( validate.newPassword, encriptarPassword );
      conn.query(
        `CALL ADMIN_SELECT_EMAIL('${validate.correo}')`,
        ( error, rows ) => {
      if ( error )return res.status(500).json( { message: "ERROR_EMAIL_OBTENER_CODE_SQL", error } );
          if ( rows.length > 0 ) {
           conn.query(`CALL ADMIN_UPDATE_PASSWORD('${validate.correo}','${hasPassword}')`,
            ( error, rows ) => {
              if ( error )return res.status(400).json( { message: "ERROR_UPDATE_PASS", error } );
              if ( rows ) {
                conn.query(`UPDATE admin SET codigo = NULL WHERE correo = ? `,[validate.correo])
                return res.status(204).json( { message: "PASS_UPDATE_SUCCESFULLY" } );
              }
            } 
      )}
        }

      );
    } catch ( error ) {
      console.log(error);
      
      return res.status( 400 ).json( { error } );
    }
  }
}

export default LoginRegister;
