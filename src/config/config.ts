import dotenv from "dotenv";

dotenv.config()

export const PORT = process.env["PORT"]

export const SECRET: any = process.env["SECRET"];
// ? DATABASE
export const HOST = "localhost";
export const DBNAME = "stored"
export const PASSWORD = process.env["PASSWORD"]
export const USER = process.env["USER"]
export const PORTDB = process.env["PORTDB"]
export const LIMIT_CONNECION = process.env["CONNECTION_LIMIT"]
export const MAIL_PASSWORD = process.env["MAIL_PASSWORD"];
export const MAIL_USER = process.env["MAIL_USER"]