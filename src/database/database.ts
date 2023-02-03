import { createPool } from "mysql";
import {HOST,DBNAME,PASSWORD,USER,PORTDB,LIMIT_CONNECION} from "../config/config"
 export class Conexion 
{
    public readonly host?:(string | any) = HOST;
    private readonly user?:(string | any) = USER;
    private readonly password?:(string | any) = PASSWORD;
    protected readonly database:(string | any)  = "storedv1";
    private readonly charset:(string | any)  = "utf8";
    private readonly port: (Number | any) = 3306;
    private readonly max:(Number|any)=LIMIT_CONNECION;

     public async connect() {
   const conenct = await createPool({
        
            host: this.host, 
            user: this.user,
            password: this.password,
            database: this.database,
            charset: this.charset,
            port: this.port,
        })
        return conenct;
        
}
}

export const conexion = new Conexion() 


