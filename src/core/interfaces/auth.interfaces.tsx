export interface AuthRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    name: string;
    telefono: string;
    email: string;
    tipoDocumento: any;
    documento: any;
    password: string;
    rol: any;
}

export interface PasswordForgetRequest {
    email: string;
}

export interface AuthResponse {
    data: Auth
}

export interface PassForgetResponse {
    error: boolean
	data: any
	message: string
}

export interface SignUpResponse {
    data: SignUp
}

export interface Auth {
    error: boolean;
    message: string;
    data: Result;
}
export interface PassForget {
    status: string;
    code: string;
    message: string;
    fullMessage: string;
    statusResult: boolean;
    result: any;
}
  
export interface Result {
    userAct: User;
    negocio: UserBusiness;
    accessToken: string;
}
  
export interface User {
    id: number;
    name: string;
    email: string;
    rol: any;
    image?: any;
    twoFactorEnabled: boolean;
}

export interface UserBusiness {
    id: any;
    tipoPersona: string
    tipoDocumento: string
    nombreRazonSocial: string
    nombreMostrar: string
    numeroDocumento: string
    estado: boolean
}

export interface SignUp {
    error: boolean;
    message: string;
    data: any;
}