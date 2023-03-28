import bcrypt from "bcrypt";
import { Request, Response, NextFunction} from "express";
import {
  login,
  PersonRegister,
  UserRegister,
  forgotPassword,
  newPasswordAdmin,
} from "../interfaces/users";
import fs from 'fs-extra'
import csvtojson from "csvtojson";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // <--- this is the problem
import { sendMailAdmin } from "../libs/libs";
import { recoveryAdminPass } from "../libs/forGotPassword";
import moment from 'moment-with-locales-es6';
// import { newPasswordUser } from "../interfaces/users";
import {uploadImage, deleteImage} from "../utils/cloudinary"
let momet:any = moment
moment.locale("es");
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
  }
  public async AdminRegister(
    req: any,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
 
    try {

      const datas: PersonRegister = {
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
        const hasPassword = await bcrypt.hash( datas.password, encriptarPassword );
        let state = ( datas.authCuenta = true );
        let estado = "activo"
        const conn = await conexion.connect();
        conn.query( "SELECT * FROM admin", async ( error, rows ) => {
          console.log(error);
          
        if (rows.length < 0) {
          
          return res.status(400).json( { message: "ERROR_DATA_ADMIN" } );
        }
        for ( let i = 0; i < rows.length; i++ ) {
          if ( rows[i].correo == datas.correo )
            return res.status(400).json( { message: "ERR_EXIST_EMAIL" } );
        }

          const url = 'https://ipapi.co/json/';
          const response = await fetch(url);
          const data = await response.json();
          const { country_name,city,longitude,
                      latitude,country_calling_code,languages,ip,
                      network,version } = data;
       

        let cuenta = "Stored"
        let state = "activo"
        let tc ="si"
        let authCount = "OK"
        let rol ="superAdmin"
                //cuent,ipA,paisA,ciudadA,country_calling,idiomaA,longA,lagA
        conn.query(`CALL ADMIN_INSERT_LOGIN('${datas.correo}','${fecha}','${hora}',
        '${rol}','${cuenta}','${ip}','${country_name}','${city}','${country_calling_code}',
        '${languages}','${longitude}','${latitude}','${state}','${tc}','${authCount}','${hasPassword}')`, async ( error: Array<Error> | any, rows: any ) => {
       
          

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
    
    
    try {
      const data: login = {
        correo: req.body.postDataUser.email,
        password: req.body.postDataUser.password,
        authCuenta: true,
        token: req.body.token,
        refreshToken: req.body.refreshToken,
      };
      const conn = await conexion.connect();
      conn.query(
        `CALL ADMIN_AUTH_LOGIN('${data.correo}')`,
        async ( error: Array<Error> | any, rows: any ) => {
          if ( error ) return res.status( 400 ).json( { message: "ERROR_DB", error: error } );
          if ( rows[0].length > 0 ) {         
            const user = rows[0][0];
            const validPassword = await bcrypt.compare( data.password, user.password );
           if ( validPassword ) {
            const token: any = jwt.sign({id:rows[0][0].idUsers},
              SECRET || "authToken",
              {expiresIn: 60 * 60 * 24}
            
            );
            return res.status(200).json({message:"LOGIN_SUCCESSFULL",token,auth:true,
          rol:rows[0][0].rol,type:"admin"})
            

           }else{
              return res.status(401).json({message:"ERROR_PASSWORD",statu:401,type:"admin"})
           }
              
           
      }else

      conn.query(`CALL USER_LOGIN('${data.correo}')`,async(error,rows)=>{
        console.log(rows)
        if (error) return res.status(400).json({message:"ERROR_DB",error:error})
        console.log(rows[0]);
        console.log("Hola");
        
        
        const validPassword = await bcrypt.compare( data.password, rows[0][0].password );
        if ( validPassword ) {
          conn.query(`CALL USER_LOGIN_MODULO('${rows[0][0].idAccount}')`,(error,rowsP)=>{
             if (error) return res.status(400).json({message:"ERROR_DB",error:error})
             let modulo:any = rowsP[0]
           
             const token: any = jwt.sign({id:rows[0][0].idUsers1},
               SECRET || "authToken",
               {expiresIn: 60 * 60 * 24}
             
             );

             const token1: any = jwt.sign({id1:rows[0][0].idAccount},
              SECRET || "authToken",
              {expiresIn: 60 * 60 * 24}
            
            );
       
             
             return res.status(200).json({message:"LOGIN_SUCCESSFULL",token,token1,auth:true,
           module:modulo,type:"user"})
             
             
          })

        }else{
           return res.status(401).json({message:"ERROR_PASSWORD"})
        }
      })
           
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
     
      
      const fecha = momet().format('MMMM Do YYYY');
      const hora = momet().format('h:mm:ss a');
      conn.query( "SELECT * FROM admin  Where correo = ?",
        [email], async ( error: Array<Error> | any, rows: any ) => {

          if ( error ) return res.status( 400 ).json( { message: "ERROR_DB", error: error } );
         
         let rol ="superAdmin"
         let estado = "activo"
          if ( rows.length > 0 ) {
               
                 
                 conn.query("SELECT idUsers,rol FROM admin WHERE correo = ?",
                         [email], async ( error: Array<Error> | any, rows: any ) => {
                          console.log(rows,error);
                          
                            if ( error ) return res.status( 400 ).json( { message: "ERROR_DB", error: error } );
                          conn.query(`UPDATE admin SET estado = '${estado}' WHERE correo = '${email}'`)
                           
                            
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
           
              const url = 'https://ipapi.co/json/';
              const response = await fetch(url);
              const data = await response.json();
              const { country_name,city,longitude,
                          latitude,country_calling_code,languages,ip,
                          network,version } = data;
              

            let cuenta = "Google"
            let state = "activo"
            let tc ="si"
            let authCount = "OK"
            //cuent,ipA,paisA,ciudadA,country_calling,idiomaA,longA,lagA
            conn.query(`CALL AUTH_GOOGLE('${email}', '${name}', '${picture}','${fecha}','${hora}',
            '${rol}','${cuenta}','${ip}','${country_name}','${city}','${country_calling_code}',
            '${languages}','${longitude}','${latitude}','${state}','${tc}','${authCount}')`, async ( error: Array<Error> | any, rows: any ) => {
            
              console.log(error,rows);
              
                     if ( rows ) {
                      
                        
                       conn.query("SELECT idUsers ,rol FROM admin WHERE correo = ?",
                         [email], async ( error: Array<Error> | any, rows: any ) => {
                          console.log(error,rows);
                          
                            if ( error ) return res.status( 400 ).json( { message: "ERROR_DB", error: error } );
                           if ( rows.length > 0 ) {
                              const token: any = jwt.sign(
                                    { id: rows[0].idUsers  },
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
      const permisions={

        delete:"eliminar",
        editar:"editar",
        crear:"crear",
        leer:"leer",
        state:"Inactivo"
      }
      if ( verifyToken?.id ) {
        const fecha = momet().format('MMMM Do YYYY');
        const hora = momet().format('h:mm:ss a');
        const roundNumber = 10;
        const encriptarPassword = await bcrypt.genSalt( roundNumber );
        const hasPassword = await bcrypt.hash( data.password, encriptarPassword );
        const conn = await conexion.connect();
        conn.query( "SELECT * FROM account", async ( error, rows ) => {
          if(rows.length > 0){
            for ( let i = 0; i < rows.length; i++ ) {
              if ( rows[i].correo == data.correo )
                return res.json( { message: "ERR_MAIL_EXIST_USER", status: 302 } );
            
            }
          }
          conn.query(
            `CALL CREATE_USER('${data.correo}','${hasPassword}','${fecha}','${verifyToken.id}','${hora}','${req.body.postDataUserRegister.estado}')`,
            (error,rows) => {
             if (rows) {

              conn.query(`CALL GET_USER_SECOND_USER('${data.correo}')`,(error,rows)=>{
               
                
                if (rows) {
                 
                 conn.query(`CALL INSERT_MODULE_USER('${req.body.postDataUserRegister.modulo}','${req.body.postDataUserRegister.modulo}','${rows[0][0].idAccount}')`,
                 (error,rowsid)=>{
                    if (rowsid) {

                     conn.query(`CALL GET_MODULE_ACCOUNT_USER('${rows[0][0].idAccount}')`,
                     (error,rowsData)=>{
                      
                      
                     if (rowsData) {
                      conn.query(`CALL ASIGNED_PERMISION_USER_ACCOUNT('${rowsData[0][0].IDmodulo}','${permisions.editar}','${permisions.editar}','${permisions.state}')`,
                      (error,rowsData)=>{
                        if (rowsData) {
                       
                          conn.query(`CALL GET_USER_CREATE('${data.correo}')`,(error,rows)=>{

                            return res.status( 201 ).json( {
                              message: "USER_REGISTER_SUCCESFULL",
                              status: 201,
                              data:rows
                            });
                          })
                        }else{
                         
                          
                          return res.status( 400 ).json( {
                            message: "USER_REGISTER_ERROR",
                            status: 400,
                          });
                        }


                      })

                     }else{
                      return res.status( 400 ).json( {
                        message: "USER_REGISTER_ERROR",
                        status: 400,
                      });
                     }
                     })                   
                    }else{
              
                      
                      return res.status( 400 ).json( {
                        message: "USER_REGISTER_ERROR",
                        status: 400,
                      });
                    }

                 })
                }

              })
           
              
             }else{
              return   res.status(400).json({message:"USER_REGISTER_ERROR",status:400})
             }
            }
          );
          
        } );
      }else{ 
        return res.status(401).json({message:"N0T_ALLOWED"})

      }
   
      
    } catch ( error ) {
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
      
      
      return res.status( 400 ).json( { error } );
    }
  }
  public async uploadusersCsv(req: Request|any,
    res: Response,
    next: Partial<NextFunction>): Promise<Response | Request | any> {
     
      
      
      const fecha = momet().format('MMMM Do YYYY');
      const hora = momet().format('h:mm:ss a');
        const permisions={

          delete:"eliminar",
          editar:"editar",
          crear:"crear",
          leer:"leer",
          state:"Inactivo"
        }
       let tokenIdAcc: any = req.headers["acc-token-data"];
       const verifyToken: Array<any> | any = jwt.verify( tokenIdAcc, SECRET )!;
       const { id } = verifyToken;
       
       if(id){
         const roundNumber = 10;
         const encriptarPassword = await bcrypt.genSalt( roundNumber );
         const conn = await conexion.connect();
         
         
        if (req.files?.archivousuariocsv) {
          let fileName = req.files?.archivousuariocsv?.tempFilePath!;
         
          csvtojson().
          fromFile(fileName).
          then(async(source: any) => {
            let users = 1;
            for (let i = 0; i < source.length; i++) {
              let correo = source[i]["correo"],
                password = source[i]["password"];
                  const hasPassword = await bcrypt.hash( password, encriptarPassword );
                  conn.query( "SELECT * FROM account", async ( error, rows ) => {
                    for ( let i = 0; i < rows.length; i++ ) {
                      if ( rows[i].correo == correo )
                        return res.json( { message: "ERR_MAIL_EXIST_USER", status: 302 } );
                    }
                    conn.query(
                      `CALL CREATE_USER('${correo}','${hasPassword}','${fecha}','${id}','${hora}','${req.body['formDataCsv[estado]']}')`,
                      (error,rows) => {
                       if (rows) {
                        conn.query(`CALL GET_USER_SECOND_USER('${correo}')`,(error,rows)=>{
                          if (rows) {
                           
                           conn.query(`CALL INSERT_MODULE_USER('${req.body['formDataCsv[modulo]']}','${req.body['formDataCsv[modulo]']}','${rows[0][0].idAccount}')`,
                           (error,rowsid)=>{
                              if (rowsid) {
          
                               conn.query(`CALL GET_MODULE_ACCOUNT_USER('${rows[0][0].idAccount}')`,
                               (error,rowsData)=>{                         
                               if (rowsData) {
                                conn.query(`CALL ASIGNED_PERMISION_USER_ACCOUNT('${rowsData[0][0].IDmodulo}','${permisions.editar}','${permisions.editar}','${permisions.state}')`,
                                (error,rowsData)=>{                              
                                })
                               }
                               })                   
                              }
          
                           })
                          }
          
                        })    
                        
                       }else{
                      
                            return   res.status(400).json({message:"USER_REGISTER_ERROR",status:400,data:rows})

                       }
                      }
                    );
                    
                  } );
                  
            }

           await fs.remove(req.files?.archivousuariocsv?.tempFilePath)
           conn.query(
            `CALL GET_USER('${id}')`,(error,rows)=>{
              return res.status( 201 ).json( {
                message: "USER_REGISTER_SUCCESFULL",
                status: 201,
                data: rows,
              });

            })
          })
        }else{
          await fs.remove(req.files?.archivousuariocsv?.tempFilePath)
         return  res.send("no subio el documento")
        }
       }else{
        await fs.remove(req.files?.archivousuariocsv?.tempFilePath)
          return res.status( 400 ).json( { message: "ERROR_SESSION" } );
       }

  }

  public  async getUsersAdminData(req: Request|any,
    res: Response,
    next: Partial<NextFunction>): Promise<Response | Request | any> {
      
    try {
      const verifyToken: Array<any> | any = jwt.verify( req.params.idToken, SECRET )!;
      const { id } = verifyToken;
      
      if(id){

        const conn = await conexion.connect();
        conn.query(
          `CALL GET_USER('${id}')`,
          ( error, rows ) => {
            if ( error )return res.status(500).json( { message: "ERROR_GET_USERS_ADMIN_DATA", error } );
            if ( rows ) {
              return res.status(200).json( { message: "GET_USERS_ADMIN_DATA", data:rows[0] } );
            }
          }
        );
      }else{
        return res.status(400).json( { message: "ERROR_SESSION" } );
      }
    } catch ( error ) {
      return res.status( 400 ).json( { error } );
    }
  }
  public async deleteAllUsers(
    req: Request | any,
    res: Response,
    next: Partial<NextFunction>
  ):Promise< Request|Response |any>{
    try {
      
      let tokenIdAcc: any = req.headers["isallowed-x-token"];
     
      
      const verifyToken: Array<any> | any = jwt.verify( tokenIdAcc, SECRET )!;
      const { id } = verifyToken; 
      if(id){
         const conn = await conexion.connect();     
         conn.query(`CALL SELECT_ALL_MODULE_USERS('${req.body.deleteData}')`,(error,rows)=>{
           conn.query(`CALL DELETE_ALL_USERS('${req.body.deleteData}','${rows[0][0].IDmodulo }')`,(error,rows)=>{
            
            
            if (rows) {
             return res.status(200).json( { message: "DELETE_ALL_USERS" } );
            }else{
              return res.status(400).json( { message: "ERROR_DELETE_ALL_USERS" } );
            }
          })

         })
      }else{
        return res.status(400).json( { message: "ERROR_SESSION" } );
      }
    } catch (error) {
      return res.status(400).json( { message: "ERROR_SESSION" } );
    }

  }

  public async CountUsersAll(req: Request | any,
    res: Response,
    next: Partial<NextFunction>):Promise< Request|Response |any>{
    try {
      const verifyToken: Array<any> | any = jwt.verify( req.params.idToken, SECRET )!;
      const { id } = verifyToken;
    
      
      if(id){
        const conn = await conexion.connect();
        conn.query(`CALL GET_COUNT_USERS('${id}')`,(error,rows)=>{
          conn.query(`CALL COUNT_STATE_USER('${id}')`,(error,rowsActive)=>{
            conn.query(`CALL COUNT_STATE_USER_INACTIVO('${id}')`,(error,rowsInactive)=>{
              if (rows) {
                return res.status(200).json( { message: "COUNT_USERS_ALL",countUsers:rows[0][0].total,
              stateActive:rowsActive[0][0].totalActive, stateInactive:rowsInactive[0][0].totalActive } );
              }else{
                return res.status(400).json( { message: "ERROR_COUNT_USERS_ALL" } );
              }

            })

          })
        })
      }

    } catch (error) {
      return res.status(400).json( { message: "ERROR_SESSION" } );
    
      
    }



  }
  // Here go the part of module,permisions
  public async getModuleUsers(
    req: Request | any,
    res: Response,
    next: Partial<NextFunction>
  ):Promise< Request|Response |any>{
    try {
      
     const verifyToken: Array<any> | any = jwt.verify(req.headers["isallowed-x-token"], SECRET )!;
      const { id } = verifyToken;
      if(id){
        const conn = await conexion.connect();
        conn.query(`CALL GET_MODULE_ACCOUNT_USER('${req.params.id}')`,(error,rows)=>{
          if (rows) {
            return res.status(200).json( { message: "GET_MODULE_USER",data:rows[0] } );
          }else{
            return res.status(400).json( { message: "ERROR_GET_MODULE_USER" } );
          }
        })
      }

    } catch (error) {
      res.send("error")
    
      
      return error
    }
  }

  public async getPermisions(
    req: Request | any,
    res: Response,
    next: Partial<NextFunction>
  ):Promise< Request|Response |any>{
    try {
      const verifyToken: Array<any> | any = jwt.verify( req.params.idModule, SECRET )!;
      const { id } = verifyToken;
      if(id){
        const conn = await conexion.connect();
        conn.query(`CALL GET_PERMISIONS_MODULE_USER('${id}')`,(error,rows)=>{
          if (rows) {
            return res.status(200).json( { message: "GET_PERMISIONS_USER",data:rows[0] } );
          }else{
            return res.status(400).json( { message: "ERROR_GET_PERMISIONS_USER" } );
          }
        })
      }

    } catch (error) {
      return res.status(400).json( { message: "ERROR_SESSION" } );
    }


    
  }
  public async updateAdmin(
    req: Request | any,
    res: Response,
    next: Partial<NextFunction>
  ):Promise< Request|Response |any>{
    try {
      const verifyToken: Array<any> | any = jwt.verify( req.params.idToken, SECRET )!;
      const { id } = verifyToken;
      if(id){
        const conn = await conexion.connect();
        
        conn.query(`CALL ADMIN_UPDATE_DATA('${id}','${req.body.name}','${req.body.lastname}','${req.body.email}')`,(error,rows)=>{
         
          if (rows) {
            return res.status(200).json( { message: "UPDATE_ADMIN_USER" } );
          }else{
            return res.status(400).json( { message: "ERROR_UPDATE_ADMIN_USER" } );
          }
        })
      }

    } catch (error) {
      return res.status(400).json( { message: "ERROR_SESSION" } );
    }
  }
  public async deleteModule(
    req: Request | any,
    res: Response,
    next: Partial<NextFunction>
  ):Promise< Request|Response |any>{
    try {

      console.log(req.body);
      
      const verifyToken: Array<any> | any = jwt.verify( req.headers["isallowed-x-token"], SECRET )!;
      const { id } = verifyToken;
      
      
      if(id){
        const conn = await conexion.connect();
        conn.query(`CALL DELETE_MODULE_USER('${req.body.id}')`,(error,rows)=>{
          if (rows) {
            return res.status(200).json( { message: "DELETE_MODULE_USER" } );
          }else{
           
            
            return res.status(400).json( { message: "ERROR_DELETE_MODULE_USER" } );
          }
        })
      }

    } catch (error) {
      return res.status(400).json( { message: "ERROR_SESSION" } );
    }
  }
  public async setModule(
    req: Request | any,
    res: Response,
    next: Partial<NextFunction>
  ):Promise< Request|Response |any>{
    try {
      const verifyToken: Array<any> | any = jwt.verify( req.headers["isallowed-x-token"], SECRET )!;
      const { id } = verifyToken;
      if(id){
        const conn = await conexion.connect();
        conn.query(`CALL INSERT_MODULE_USER('${req.body.data.module}','${req.body.data.module}','${req.body.data.idAccount}')`,(error,rows)=>{
          conn.query("SELECT IDmodulo, titulo FROM modulo WHERE titulo = ?",[req.body.data.module],(error,row)=>{
            if (rows) {
              return res.status(200).json( { message: "SET_MODULE_USER", data:row} );
            }else{
             
              
              return res.status(400).json( { message: "ERROR_SET_MODULE_USER" } );
            }

          })
        })
      }

    } catch (error) {
     return res.status(400).json( { message: "ERROR_SESSION" } );
    }
  }
  public async setPermisionModule(
    req: Request | any,
    res: Response,
    next: Partial<NextFunction>
  ):Promise< Request|Response |any>{
    try {
      const verifyToken: Array<any> | any = jwt.verify( req.params.idToken, SECRET )!;
      const { id } = verifyToken;
      if(id){
        const conn = await conexion.connect();
        conn.query(`CALL ASIGNED_PERMISION_USER_ACCOUNT('${id}','${req.body.idModule}','${req.body.permisions}')`,(error,rows)=>{
          if (rows) {
            return res.status(200).json( { message: "SET_PERMISIONS_MODULE_USER" } );
          }else{
            return res.status(400).json( { message: "ERROR_SET_PERMISIONS_MODULE_USER" } );
          }
        })
      }

    } catch (error) {
      return res.status(400).json( { message: "ERROR_SESSION" } );
    }
  }
  public async deletePermisionModule(
    req: Request | any,
    res: Response,
    next: Partial<NextFunction>
  ):Promise< Request|Response |any>{
    try {
      const verifyToken: Array<any> | any = jwt.verify( req.params.idToken, SECRET )!;
      const { id } = verifyToken;
      if(id){
        const conn = await conexion.connect();
        conn.query(`CALL DELETE_PERMISIONS_MODULE_USER('${id}','${req.body.idModule}')`,(error,rows)=>{
          if (rows) {
            return res.status(200).json( { message: "DELETE_PERMISIONS_MODULE_USER" } );
          }else{
            return res.status(400).json( { message: "ERROR_DELETE_PERMISIONS_MODULE_USER" } );
          }
        })
      }

    } catch (error) {
      return res.status(400).json( { message: "ERROR_SESSION" } );
    }
  }
 
  public async getMod(
    req: Request | any,
    res: Response,
    next: Partial<NextFunction>
  ):Promise< Request|Response |any>{
    console.log(req.params);
    
    try {
      const verifyToken: Array<any> | any = jwt.verify( req.params.id, SECRET )!;
      const { id1 } = verifyToken;
      if(id1){
        const conn = await conexion.connect();
        conn.query(`CALL GET_MODULE_ACCOUNT_USER('${id1}')`,(error,rows)=>{
         
          
          if (rows) {
            return res.status(200).json( { message: "GET_MODULES_USER",data:rows[0] } );
          }else{
            return res.status(400).json( { message: "ERROR_GET_MODULES_USER" } );
          }
        })
      }

    } catch (error) {
      return res.status(400).json( { message: "ERROR_GET_MODULES_USER" } );
      
    }

  }

  public async getAdminAll(
    req: Request | any,
    res: Response,
    next: Partial<NextFunction>
  ):Promise< Request|Response |any>{
    try {
      const verifyToken: Array<any> | any = jwt.verify( req.params.id, SECRET )!;
      const { id } = verifyToken;
      if(id){
        const conn = await conexion.connect();
        conn.query(`CALL ADMIN_SELECT('${id}')`,(error,rows)=>{
          if (rows) {
            return res.status(200).json( { message: "GET_ADMIN_ALL",data:rows[0] } );
          }else{
            return res.status(400).json( { message: "ERROR_GET_ADMIN_ALL" } );
          }
        })
      }

    } catch (error) {
      return res.status(400).json( { message: "ERROR_TOKEN" } );
      
    }

  }

  public async uploadImageA(
    req: Request|any ,res: Response,
    next: Partial<NextFunction>
    ):Promise< Request|Response |any>{
    
    try {

      const verifyToken: Array<any> | any = jwt.verify( req.headers["token-x-id"], SECRET )!;
      const { id } = verifyToken;
  
          
      if(id){
        let url_imagen = null;
        let id_img = null;
       
        
      if(req.files?.imgData){

          const result = await  uploadImage( req.files?.imgData.tempFilePath! )

          url_imagen = result.secure_url;
          id_img = result.public_id;
          
          await fs.remove( req.files?.imgData.tempFilePath)
          const conn = await conexion.connect();
          conn.query(`CALL ADMIN_UPLOAD_IMG('${id}','${url_imagen}','${id_img}')`,(error,rows)=>{
         
            if (rows) {
              return res.status(200).json( { message: "UPLOAD_IMAGE_ADMIN" } );
            }else{
              return res.status(400).json( { message: "ERROR_UPLOAD_IMAGE_ADMIN" } );
            }
          })
      }else{

        return res.status(400).json( { message: "ERROR_UPLOAD_IMAGE_ADMIN" } );

      }
      }else{
        return res.status(400).json( { message: "ERROR_TOKEN_ACC" } );
      }

    } catch (error) {
    
      return res.status(400).json( { message: "ERROR_TOKEN", error} );
      
    }


  }

  public async UpdateAdminAll(
    req: Request | any,
    res: Response,
    next: Partial<NextFunction>
  ):Promise< Request|Response |any>{
    try {

      const verifyToken: Array<any> | any = jwt.verify( req.headers["token-x-id"], SECRET )!;
      const { id } = verifyToken;
      if(id){
        const conn = await conexion.connect();
        conn.query(`CALL ADMIN_UPDATE_DATA('${id}','${req.body.data.name}','${req.body.data.document}','${req.body.data.telefono}','${req.body.data.empresa}')`,(error,rows)=>{
         
          
          if (rows) {

            conn.query(`CALL ADMIN_SELECT('${id}')`,(error,rows)=>{
              return res.status(200).json( { message: "UPDATE_ADMIN_ALL", data:rows[0] } );

            })
          }else{
            return res.status(400).json( { message: "ERROR_DATA" } );
          }
        })
      }else{
        return res.status(400).json( { message: "ERROR_TOKEN" } );
      }
      
    } catch (error) {
      return res.status(400).json( { message: "ERROR_TOKEN" } );
      
    }



}
}

export default LoginRegister;
