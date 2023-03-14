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
// coudinary
export const cludinaryKey = process.env['cloudinaryKey']
export const claudinarySecret = process.env['cloudinarySecret']
export const claudinar_Name = process.env['claudinar_Name']

//  mongoose key 
// ? MONGO
export const MONGO_URI_ATLAS = process.env["MONGO_URI_ATLAS"]
export const MONGO_URI_LOCAL=process.env["MONGO_URI_LOCAL"]