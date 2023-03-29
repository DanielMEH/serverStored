import { createPool } from "mysql";
import {HOST,DBNAME,PASSWORD,USER,PORTDB,LIMIT_CONNECION} from "../config/config"
 export class Conexion 
{
    public readonly host?:(string | any) = "localhost";
    private readonly user?:(string | any) = "root";
    private readonly password?:(string | any) = "";
    protected readonly database:(string | any)  = "storedv1";
    private readonly charset:(string | any)  = "utf8";
    private readonly port: (Number | any) = 3306;
    private readonly  AUTH  : (string | any) = "mysql_native_password";
    private readonly  waitForConnections: (Boolean | any) = true;
    private readonly  queueLimit: (Number | any) = 0;
    private readonly  multipleStatements: (Boolean | any) = true;
    private readonly  connectTimeout: (Number | any) = 10000;
    private readonly  acquireTimeout: (Number | any) = 10000;
    private readonly  timeout: (Number | any) = 10000;
    private readonly  debug: (Boolean | any) = false;
    private readonly  trace: (Boolean | any) = false;
    private readonly  stringifyObjects: (Boolean | any) = false;
    private readonly  dateStrings: (Boolean | any) = true;
    private readonly  typeCast: (Boolean | any) = true;
    private readonly  supportBigNumbers: (Boolean | any) = true;
   
    


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


