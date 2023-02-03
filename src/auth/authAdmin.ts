
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import bcrypt from "bcrypt";
export const authAdmin = async (correo:any,password:any,authCuenta:any,token:any):Promise<any> => {

	try {
		const conn = await conexion.connect();
    const expresiones = {
      password: /^.{4,20}$/,
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    };

    // if (req.headers["authorization-google"]) {

    //   conn.query("")
    // }

    if (
      expresiones.correo.test(correo) &&
      expresiones.password.test(password)
    ) {
      conn.query(
        "SELECT password,idAdmin,rol FROM admin WHERE correo = ?",
        [correo],
        async (error: Array<Error> | any, rows: any) => {
          if (error){

          console.log(error);
          
            return "ERROR_AUTH_ADMIN";
          }
          if (rows) {
            return "Hola"
            
            const password1 = rows[0].password;
            
            const passVerify: Boolean = await bcrypt.compare(
              password1,
              password
            );
            console.log(passVerify);

            if (passVerify) {
              const token: any = jwt.sign(
                { id: rows[0].idAdmin },
                SECRET || "tokenGenerate",
                { expiresIn: 60 * 60 * 24 }
              );
               return  "ERROR_DATE_ADMIN"
               
                 
                //  message: "ADMIN_AUTH_SUCCESFULL",
                // token: token,
                // auht: authCuenta,
                //  rol: rows[0].rol,
              // };
            } else {

              return "ERROR_AUTH_ADMIN";
              // return res.json({
              //   message: "USER_AUTH_ERROR_DATA",
              //   token: null,
              //   auht: false,
              // });
            }
            
          }
        }
      );
    } else {

      return "ERROR_DATE_ADMIN"
      // return res.json({
      //   message: "DATA_NOT_VALID",
      // });
    }
		
	} catch (error) {
		
		return Error
	}
}