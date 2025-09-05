export interface BusinessResponse {
    message: string;
    data: any;
    error: boolean
}

export interface Business {
    ciudad: string
    codigoPostal: string
    complemento: string
    departamento: string
    id: number
    isPrincipal: boolean
    pais: string
    user: number
}