export interface AddressesResponse {
    message: string;
    data: Address[];
    error: boolean
}

export interface Address {
    ciudad: string
    codigoPostal: string
    complemento: string
    departamento: string
    id: number
    isPrincipal: boolean
    pais: string
    user: number
}

export interface AddressesRequest {
    message: string;
    data: Address;
    error: boolean
}