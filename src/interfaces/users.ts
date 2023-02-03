interface PersonLogin {
    correo: string;
    password: string;
    authCuenta:Boolean;
}
export interface PersonRegister extends Pick<PersonLogin, "correo" | "password"|"authCuenta"> {}
export interface Roles {
     nameRol: String;
}
export interface PersonRegister extends Pick<Roles, "nameRol"> {
     token: string;
    refreshToken: string;
}
export interface login extends Pick<PersonLogin, "correo" | "password" | "authCuenta"> {
    token: string;
    refreshToken: string;
}
export interface UserRegister extends Roles{
    tokenId: string;
    nombre: string;
    correo: string;
    password: string;
}
export interface forgotPassword {
    correo : string;
    
}

export interface newPasswordAdmin extends Pick<forgotPassword,"correo">{
    codePass : string;
    newPassword: string;
}

export interface newPasswordUser extends Pick<forgotPassword,"correo">{
    codePass : string;
    newPassword: string;
}